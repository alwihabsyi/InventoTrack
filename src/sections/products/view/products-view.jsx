import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';

import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import { applyFilter, getComparator } from 'src/sections/user/utils';

import ProductCard from '../product-card';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [filterName, setFilterName] = useState('');
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [userId] = useState(localStorage.getItem('userId'));

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataFiltered = applyFilter({
    inputData: products,
    comparator: getComparator('asc', 'name'),
    filterName,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://inventotrack-api.test/api/v1/userHistory/${userId}?page=${page + 1}&limit=${rowsPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data.data);
        setTotalCount(data.meta.total); // Set the total count of items from the server
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, userId]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Histori Barang
      </Typography>

      <UserTableToolbar
        numSelected={0}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeholder='Cari produk...'
      />

      <Grid container spacing={3} sx={{ px: 3 }}>
        {dataFiltered.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product} />
          </Grid>
        ))}
      </Grid>

      <TablePagination
        page={page}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

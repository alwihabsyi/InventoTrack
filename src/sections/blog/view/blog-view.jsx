import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { TablePagination } from '@mui/material';

import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import { getComparator, applyUnitFilter } from 'src/sections/user/utils';

import PostCard from '../post-card';

// ----------------------------------------------------------------------

export default function BlogView() {
  const [filterName, setFilterName] = useState('');
  const [units, setUnits] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [unitId] = useState(
    localStorage.getItem('userRole') !== 'admin' && 
    localStorage.getItem('userRole') !== 'kepala' ? 
    localStorage.getItem('unitId') : 0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://inventotrack-api.test/api/v1/units/monitorKepala?unitId=${unitId}&page=${page + 1}&limit=${rowsPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUnits(data.data);
        setTotalCount(data.meta.total); // Set the total count of items from the server
      } catch (error) {
        console.error('Error fetching data:', error);
        setUnits([]);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, unitId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const dataFiltered = applyUnitFilter({
    inputData: units,
    comparator: getComparator('asc', 'name'),
    filterName,
  });

  return (
    <Container>


      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeholder='Cari produk...'
        />
      </Stack>

      <Grid container spacing={3} sx={{ px: 3 }}>
        {dataFiltered.map((post) => (
          <PostCard post={post} />
        ))}
      </Grid>

      <TablePagination
        page={page}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[8, 16, 24]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

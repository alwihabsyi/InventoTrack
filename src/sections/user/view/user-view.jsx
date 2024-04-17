import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';
import UserTableToolbar from '../user-table-toolbar';
import UserTableHead from '../user-table-head';
import UserTableRow from '../user-table-row';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.namaBarang); // Assuming "namaBarang" is the property representing the name
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost/inventotrack-api/public/api/v1/inventories?page=${page + 1}&limit=${rowsPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data.data);
        setTotalCount(data.meta.total); // Set the total count of items from the server
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Data Barang</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                rowCount={users.length}
                headLabel={[
                  { id: 'namaBarang', label: 'Nama Barang' },
                  { id: 'kodeBarang', label: 'Kode Barang' },
                  { id: 'stokAwal', label: 'Stok Awal' },
                  { id: 'barangKeluar', label: 'Barang Keluar', align: 'center' },
                  { id: 'stokAkhir', label: 'Stok Akhir' },
                  { id: 'detail', label: 'Aksi' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.namaBarang}
                      fotoBarang={row.gambarBarang}
                      kodeBarang={row.kodeBarang}
                      stokAwal={row.stokAwal}
                      barangKeluar={row.barangKeluar}
                      stokAkhir={row.stokAkhir}
                      selected={selected.indexOf(row.namaBarang) !== -1}
                      handleClick={(event) => handleClick(event, row.namaBarang)}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, totalCount)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalCount} // Use totalCount instead of users.length
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

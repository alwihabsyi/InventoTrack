import { FaPlus } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Button, Popover, IconButton, CardContent } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import Excel from '../../../../public/assets/icons/ic_excel.png';
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
  const [userRole] = useState(localStorage.getItem('userRole') || "");
  const [openExcel, setOpenExcel] = useState(false);
  const [excel, setExcelFile] = useState(null);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.namaBarang);
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
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://inventotrack-api.test/api/v1/inventories?page=${page + 1}&limit=${rowsPerPage}`);
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

  const handleOpenExcel = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenExcel({ anchorEl: event.currentTarget, centerX, centerY });
  };

  const handleCloseExcel = () => {
    setOpenExcel(false);
  };

  const handleExcelChange = (e) => {
    const selectedFile = e.target.files[0];
    setExcelFile(selectedFile);
  };

  const handleUploadExcel = async () => {
    const formData = new FormData();
    formData.append('excel', excel);

    const response = await fetch('https://inventotrack-api.test/api/v1/inventories/batchUpload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.status === 'success') {
      handleCloseExcel();
      alert(data.message);
      window.location.reload();
    } else {
      alert('Terjadi kesalahan pada server');
    }
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Data Barang</Typography>
        {userRole === 'admin' ? (
          <Button onClick={handleOpenExcel} variant="contained" sx={{ gap: '8px' }}> <FaPlus /> Upload File Excel</Button>
        ) : null}
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
                      id={row.id}
                      name={row.namaBarang}
                      fotoBarang={row.gambarBarang}
                      kodeBarang={row.kodeBarang}
                      stokAwal={row.stokAwal}
                      barangKeluar={row.barangKeluar}
                      stokAkhir={row.stokAkhir}
                      selected={selected.indexOf(row.namaBarang) !== -1}
                      handleClick={(event) => handleClick(event, row.namaBarang)}
                      userRole={userRole}
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

      {/* PopOver for excel upload */}
      <Popover
        open={!!openExcel}
        anchorEl={openExcel}
        onClose={handleCloseExcel}
        anchorReference="anchorPosition"
        anchorPosition={{ top: openExcel?.centerY || 0, left: openExcel?.centerX || 0 }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: { width: '400px' }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px' }}>
          <Label style={{ color: 'black', backgroundColor: 'transparent', fontSize: '16px' }}>Upload File Excel</Label>
          <IconButton onClick={handleCloseExcel} size="small" style={{ color: 'blue' }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </div>
        <Card>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <label htmlFor="excel-upload">
              <input
                id="excel-upload"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelChange}
                style={{ display: 'none' }}
              />
              {excel ? (
                <Typography variant="body1" color="textSecondary" style={{ marginBottom: '20px' }}>
                  {excel.name.length > 50 ? `${excel.name.substring(0, 50)}...` : excel.name}
                </Typography>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <img src={Excel} alt="Upload Icon" style={{ width: '100px', height: '100px', color: 'gray' }} />
                  <Typography variant="body1" color="textSecondary">
                    Select an excel file
                  </Typography>
                </div>
              )}
            </label>
            <Button onClick={handleUploadExcel} variant="contained" disabled={!excel} sx={{ width: '40%', mt: '10px' }}>
              Kirim
            </Button>
          </CardContent>
        </Card>
      </Popover>
    </Container>
  );
}

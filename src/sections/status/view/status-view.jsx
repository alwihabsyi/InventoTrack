import { useState, useEffect } from "react";

import { Card, Stack, Table, Container, TableBody, Typography, TableContainer, TablePagination } from "@mui/material";

import Scrollbar from "src/components/scrollbar";

import TableNoData from "src/sections/user/table-no-data";
import TableEmptyRows from "src/sections/user/table-empty-rows";
import UserTableToolbar from "src/sections/user/user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "src/sections/user/utils";

import StatusTableRow from "../status-table-row";
import StatusTableHead from "../status-table-head";

export default function CekStatusPage() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [filterName, setFilterName] = useState('');
    const [orderBy, setOrderBy] = useState('name');
    const [userId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const response = await fetch(`https://inventotrack-api.test/api/v1/statusPinjam/${userId}?page=${page + 1}&limit=${rowsPerPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setItems(data.data);
                setTotalCount(data.meta.total);
            } catch (error) {
                console.error('Error fetching data:', error);
                setItems([]);
            }
        };

        fetchUnit();
    }, [page, rowsPerPage, userId]);

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

    const handleSort = (event, id) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    };

    const dataFiltered = applyFilter({
      inputData: items,
      comparator: getComparator(order, orderBy),
      filterName,
    });
  
    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Cek Status</Typography>
            </Stack>

            <Card>
                <UserTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    placeholder="Search an item..."
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <StatusTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                rowCount={items.length}
                                headLabel={[
                                { id: 'namaBarang', label: 'Nama Barang' },
                                { id: 'kodeBarang', label: 'Kode Barang' },
                                { id: 'jumlah', label: 'Jumlah Barang' },
                                { id: 'tanggal', label: 'Tanggal Ajuan' },
                                { id: 'status', label: 'Status'},
                                { id: 'aksi1', label: 'Aksi' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .map((row) => (
                                        <StatusTableRow
                                            key={row.id}
                                            id={row.id}
                                            itemId={row.inventoryId}
                                            namaBarang={row.namaBarang}
                                            fotoBarang={row.fotoBarang}
                                            kodeBarang={row.kodeBarang}
                                            tanggalAjuan={row.tanggalAjuan}
                                            jumlahBarang={row.jumlah}
                                            status={row.status}
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
    )
}
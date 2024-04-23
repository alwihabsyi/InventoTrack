import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

import { Card, Stack, Table, Avatar, TableBody, TableContainer, TablePagination } from "@mui/material";

import Label from "src/components/label";
import Scrollbar from "src/components/scrollbar";

import TableNoData from "src/sections/user/table-no-data";
import UserTableHead from "src/sections/user/user-table-head";
import TableEmptyRows from "src/sections/user/table-empty-rows";
import { emptyRows, applyFilter, getComparator } from "src/sections/user/utils";

import LaporanTableRow from "./laporan-table-row";

export default function LaporanItems({
    userId,
    namaUnit,
    namaAnggota,
    status
}) {
    const [laporan, setLaporan] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName] = useState('');

    useEffect(() => {
        const fetchLaporan = async () => {
            try {
                const response = await fetch(`https://inventotrack-api.test/api/v1/statusPinjam/${userId}}?page=${page + 1}&limit=${rowsPerPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setLaporan(data.data);
                setTotalCount(3);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLaporan([]);
            }
        };

        fetchLaporan();
    }, [page, rowsPerPage, userId]);


    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID');
    };

    const dataFiltered = applyFilter({
        inputData: laporan,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card sx={{ border: '1px solid lightgray' }}>
            <Scrollbar>
                <Card sx={{ padding: '20px', direction: 'row', justifyContent: 'space-between' }}>
                    <Stack direction="row" alignItems="center" mb={1}>
                        <Avatar alt="profile" src="" />
                        <Stack direction="column" alignItems="flex-start" ml={1} mt={1}>
                            <Label style={{ color: 'black', backgroundColor: 'transparent', fontSize: '15px' }}>{namaAnggota}</Label>
                            <Label style={{ color: 'lightgray', backgroundColor: 'transparent' }}>Unit Kerja: {namaUnit}</Label>
                        </Stack>
                    </Stack>
                </Card>

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 600 }}>
                        <UserTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleSort}
                            rowCount={dataFiltered.length}
                            headLabel={[
                                { id: 'namaBarang', label: 'Nama Barang' },
                                { id: 'tanggalAjuan', label: 'Tanggal Ajuan' },
                                { id: 'jumlah', label: 'Jumlah' },
                                { id: 'aksi', label: 'Aksi' },
                            ]}
                        />
                        <TableBody>
                            {dataFiltered
                                .filter((row) => row.status.split(' ')[0] === status)
                                .map((row) => (
                                    <LaporanTableRow
                                        key={row.id}
                                        id={row.id}
                                        namaBarang={row.namaBarang}
                                        fotoBarang={row.fotoBarang}
                                        tanggalAjuan={formattedDate(row.tanggalAjuan)}
                                        jumlah={row.jumlah}
                                        status={row.status}
                                    />
                                ))}
                            <TableEmptyRows
                                height={77}
                                emptyRows={emptyRows(page, rowsPerPage, totalCount)}
                            />
                            {notFound && <TableNoData />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                page={page}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[3]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}

LaporanItems.propTypes = {
    userId: PropTypes.number,
    namaUnit: PropTypes.string,
    namaAnggota: PropTypes.string,
    status: PropTypes.string
}
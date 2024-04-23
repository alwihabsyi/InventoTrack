import { useState, useEffect } from "react";

import { Card, Stack, Table, Button, Container, Typography, TableContainer, TablePagination } from "@mui/material";

import { applyFilter, getComparator } from "src/sections/user/utils";

import LaporanPermintaanItems from "../laporan-permintaan-items";

export default function LaporanPermintaanPage() {
    const [unit, setUnit] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [order] = useState('asc');
    const [orderBy] = useState('name');
    const [filter] = useState("");
    const [selected, setSelected] = useState("Pending");
    const [role] = useState(localStorage.getItem('userRole') || 'admin');

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const response = await fetch(`https://inventotrack-api.test/api/v1/laporanAdmin?page=${page + 1}&limit=${rowsPerPage}&posisi=${selected}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUnit(data.data);
                setTotalCount(data.meta.total);
            } catch (error) {
                console.error('Error fetching data:', error);
                setUnit([]);
            }
        };

        fetchUnit();
    }, [page, rowsPerPage, selected]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dataFiltered = applyFilter({
        inputData: unit,
        comparator: getComparator(order, orderBy),
        filter
    });

    const handleAjuanOption = () => {
        setSelected("Pending");
    };

    const handleDiterimaOption = () => {
        setSelected("Diterima");
    }

    const handleDitolakOption = () => {
        setSelected("Ditolak");
    }

    if (role === "admin") {
        return (
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Report Permintaan</Typography>
                    <Stack direction="row" alignItems="center" spacing={2} mb={1} padding="10px">
                        <Button variant={selected === 'Pending' ? "contained" : "text"} onClick={handleAjuanOption}>Ajuan</Button>
                        <Button variant={selected === 'Diterima' ? "contained" : "text"} onClick={handleDiterimaOption}>Diterima</Button>
                        <Button variant={selected === 'Ditolak' ? "contained" : "text"} onClick={handleDitolakOption}>Ditolak</Button>
                    </Stack>
                </Stack>

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 600 }}>
                        {dataFiltered
                            .filter((row) => row.jumlahBarang !== 0)
                            .map((row) => (
                                <Card key={row.id} sx={{ padding: '20px' }}>
                                    <LaporanPermintaanItems
                                        userId={row.id}
                                        namaAnggota={row.namaAnggota}
                                        namaUnit={row.namaUnit}
                                        status={selected}
                                    />
                                </Card>
                            ))}

                    </Table>
                </TableContainer>

                <TablePagination
                    page={page}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[3]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        )
    }
    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">You are not authorized to view this content</Typography>
            </Stack>
        </Container>
    )

}

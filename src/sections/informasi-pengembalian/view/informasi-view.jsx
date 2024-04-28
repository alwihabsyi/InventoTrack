import { useState, useEffect } from "react";

import { Grid, Stack, Container, TextField, Typography, TablePagination } from "@mui/material";

import PengembalianCard from "../pengembalian-card";

export default function InformasiView() {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [userId] = useState(localStorage.getItem('userId'));
    const [pickupDate, setPickupDate] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://inventotrack-api.test/api/v1/pengembalian/all?tanggalAmbil=${pickupDate}&page=${page + 1}&limit=${rowsPerPage}`);
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
    }, [page, rowsPerPage, userId, pickupDate]);

    const handlePickupDate = (event) => {
        setPickupDate(event.target.value);
    }

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Histori Barang
            </Typography>

            <Stack direction="column">
            <Typography variant="subtitle2">Pilih Tanggal</Typography>
                <TextField
                    type="date"
                    value={pickupDate}
                    onChange={handlePickupDate}
                    style={{ width: '30%', marginBottom: '10px' }}
                    InputLabelProps={{ shrink: true }}
                />
            </Stack>

            <Grid container spacing={1} sx={{ marginTop: '10px' }}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                        <PengembalianCard product={product} />
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
    )
}
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Link, Stack, Avatar, Button, Select, Popover, TableRow, MenuItem, TableCell, TextField, Typography, IconButton, InputLabel, FormControl } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import ImageUploadCard from './image-upload-card';

export default function StatusTableRow({
    id,
    namaBarang,
    fotoBarang,
    kodeBarang,
    tanggalAjuan,
    jumlah,
    status
}) {
    const [openCetak, setopenCetak] = useState(false);
    const [openApproval, setOpenApproval] = useState(false);
    const [pickupDate, setPickupDate] = useState(null);
    const [image, setImage] = useState(null);

    const handleOpenCetak = (event) => {
        const { clientWidth, clientHeight } = document.documentElement;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;

        setopenCetak({ anchorEl: event.currentTarget, centerX, centerY });
    };

    const handleCloseCetak = () => {
        setopenCetak(false);
    };

    const handleOpenApproval = (event) => {
        const { clientWidth, clientHeight } = document.documentElement;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;

        setOpenApproval({ anchorEl: event.currentTarget, centerX, centerY });
    };

    const handleCloseApproval = () => {
        setOpenApproval(false);
    };

    const handleApprove = async () => {
        try {
            const response = await axios.put(`https://inventotrack-api.test/api/v1/approveKetua/${id}/update`)
            console.log(response.data);

            if (response.data.status === "success") {
                alert(response.data.message);
                handleCloseApproval();
                window.location.reload();
            } else {
                alert(response.data.error)
                handleCloseApproval()
            }
        } catch (error) {
            handleCloseApproval()
            console.error('Error fetching data:', error);
        }
    }

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID');
    };

    const getColor = () => {
        if (status === 'Diterima Admin' || status === 'Selesai') {
            return 'green'
        }

        if (status === 'Ditolak' || status === 'Dibatalkan') {
            return 'red'
        }

        return 'orange'
    }

    const handlePickupDate = (event) => {
        setPickupDate(event.target.value);
    }
    
    const formatDateForDisplay = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const handleImageSelect = (imageUrl) => {
        setImage(imageUrl)
    }

    const handleUploadData = (event) => {
        handleOpenApproval(event)
    }

    return (
        <>
            <TableRow hover tabIndex={-1}>
                <TableCell component="th" scope="row" padding="5px">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={namaBarang} src={fotoBarang} />
                        <Typography variant="subtitle2" noWrap>
                            {namaBarang}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{kodeBarang}</TableCell>

                <TableCell>{jumlah}</TableCell>

                <TableCell>{formattedDate(tanggalAjuan)}</TableCell>

                <TableCell>
                    <Typography variant='subtitle2' color={getColor}>{status}</Typography>
                </TableCell>

                <TableCell>
                    {status === 'Diterima Admin' ? (
                        <Link onClick={handleOpenCetak}>Cetak</Link>
                    ) : (
                        '-'
                    )}
                </TableCell>

                <TableCell>
                    {status === 'Selesai' ? (
                        <Link>Lihat</Link>
                    ) : (
                        '-'
                    )}
                </TableCell>
            </TableRow>

            <Popover
                open={!!openCetak}
                anchorEl={openCetak}
                onClose={handleCloseCetak}
                anchorReference="anchorPosition"
                anchorPosition={{ top: openCetak?.centerY || 0, left: openCetak?.centerX || 0 }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: { width: '600px', height: '600px' }, // Set the width of the popover
                }}
            >
                <Scrollbar
                    sx={{
                        height: 1,
                        '& .simplebar-content': {
                            height: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    }}
                    >
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
                        <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Form Ambil Barang</Label>
                        <IconButton onClick={handleCloseCetak} size="small" style={{ color: 'white' }}>
                            <Iconify icon="eva:close-fill" />
                        </IconButton>
                    </div>
                    <Stack spacing={3} marginTop='25px' paddingX='30px'>
                        <TextField name="namaBarang" label="Nama Barang" value={namaBarang}/>
                        <TextField name="kodeBarang" label="Kode Barang" value={kodeBarang}/>
                        <TextField name="jumlah" label="Jumlah Barang" value={jumlah}/>
                        <FormControl fullWidth >
                            <InputLabel>Tanggal Ambil Barang</InputLabel>
                            <Select value={pickupDate} onChange={handlePickupDate}>
                                <MenuItem value={formatDate(today)}>{formatDateForDisplay(today)}</MenuItem>
                                <MenuItem value={formatDate(tomorrow)}>{formatDateForDisplay(tomorrow)}</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant='subtitle2'>Unggah Gambar</Typography>
                        <ImageUploadCard sx={{ mt:'-10px' }} onImageSelect={handleImageSelect} onImageUpload={handleUploadData}/>
                    </Stack>
                </Scrollbar>
            </Popover>

            <Popover
                open={!!openApproval}
                anchorEl={openApproval}
                onClose={handleCloseApproval}
                anchorReference="anchorPosition"
                anchorPosition={{ top: openApproval?.centerY || 0, left: openApproval?.centerX || 0 }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: { width: '400px' }
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
                    <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Form Ambil Barang</Label>
                    <IconButton onClick={handleCloseApproval} size="small" style={{ color: 'white' }}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </div>
                <Stack direction="column" alignItems="center" justifyContent="center" mb={1}>
                    <Typography variant="h5" sx={{ margin: '20px' }}>Kirim bukti pengambilan ?</Typography>
                    <Stack direction="row" alignItems="center" mb={1} padding="10px">
                        <Button onClick={handleApprove} variant="contained" color="primary">Ya</Button>
                        <Button onClick={handleCloseApproval}>Tidak</Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
}

StatusTableRow.propTypes = {
    id: PropTypes.any,
    namaBarang: PropTypes.any,
    fotoBarang: PropTypes.any,
    kodeBarang: PropTypes.any,
    tanggalAjuan: PropTypes.any,
    jumlah: PropTypes.any,
    status: PropTypes.any
}
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { Stack, Avatar, Button, Popover, TableRow, TableCell, Typography, IconButton } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function LaporanPermintaanTableRow({
    id,
    namaBarang,
    fotoBarang,
    tanggalAjuan,
    jumlah,
    status
}) {
    const [openApproval, setOpenApproval] = useState(false);
    const [openTolak, setOpenTolak] = useState(false);

    const handleOpenApproval = (event) => {
        const { clientWidth, clientHeight } = document.documentElement;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;

        setOpenApproval({ anchorEl: event.currentTarget, centerX, centerY });
    };

    const handleCloseApproval = () => {
        setOpenApproval(false);
    };

    const handleOpenTolak = (event) => {
        const { clientWidth, clientHeight } = document.documentElement;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;

        setOpenTolak({ anchorEl: event.currentTarget, centerX, centerY });
    };

    const handleCloseTolak = () => {
        setOpenTolak(false);
    };

    const handleApprove = async () => {
        try {
            const response = await axios.put(`https://inventotrack-api.test/api/v1/approveAdmin/${id}/update`, {jumlahBarang: jumlah});
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
            alert(error.response.data.message)
            console.error('Error fetching data:', error);
        }
    }


    const handleTolak = async () => {
        try {
            const response = await axios.put(`https://inventotrack-api.test/api/v1/tolakKetua/${id}/update`);
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

                <TableCell>{tanggalAjuan}</TableCell>

                <TableCell>{jumlah}</TableCell>

                <TableCell>
                    {status === 'Diterima Ketua' ? (
                        <>
                            <Button sx={{ marginRight: '5px', color: 'green' }} onClick={handleOpenApproval}>
                                <FaCheck />
                            </Button>
                            <Button sx={{ color: 'red' }} onClick={handleOpenTolak}>
                                <FaTimes />
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body1" color={status === 'Diterima Admin' ? 'green' : 'red'}>{status}</Typography>
                    )}
                </TableCell>
            </TableRow>

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
                    <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Approval Barang</Label>
                    <IconButton onClick={handleCloseApproval} size="small" style={{ color: 'white' }}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </div>
                <Stack direction="column" alignItems="center" justifyContent="center" mb={1}>
                    <Typography variant="h5" sx={{ margin: '20px' }}>Approve barang {namaBarang} ?</Typography>
                    <Stack direction="row" alignItems="center" mb={1} padding="10px">
                        <Button onClick={handleApprove} variant="contained" color="primary">Ya</Button>
                        <Button onClick={handleCloseApproval}>Tidak</Button>
                    </Stack>
                </Stack>
            </Popover>

            <Popover
                open={!!openTolak}
                anchorEl={openTolak}
                onClose={handleCloseTolak}
                anchorReference="anchorPosition"
                anchorPosition={{ top: openTolak?.centerY || 0, left: openTolak?.centerX || 0 }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: { width: '400px' }
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
                    <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Tanda Tangan</Label>
                    <IconButton onClick={handleCloseApproval} size="small" style={{ color: 'white' }}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </div>
                <Stack direction="column" alignItems="center" justifyContent="center" mb={1}>
                    <Typography variant="h5" sx={{ margin: '20px' }}>Tolak barang {namaBarang} ?</Typography>
                    <Stack direction="row" alignItems="center" mb={1} padding="10px">
                        <Button onClick={handleTolak} variant="contained" color="primary">Ya</Button>
                        <Button onClick={handleCloseTolak}>Tidak</Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
}

LaporanPermintaanTableRow.propTypes = {
    id: PropTypes.any,
    namaBarang: PropTypes.any,
    fotoBarang: PropTypes.any,
    tanggalAjuan: PropTypes.any,
    jumlah: PropTypes.any,
    status: PropTypes.any
}
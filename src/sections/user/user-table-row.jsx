import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import DetailBarang from './detail';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  fotoBarang,
  kodeBarang,
  stokAwal,
  barangKeluar,
  stokAkhir,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [jumlahBarang, setJumlahBarang] = useState(0);

  const handleDecrease = () => {
    setJumlahBarang(prevJumlahBarang => Math.max(0, prevJumlahBarang - 1)); // Ensure jumlahBarang is not negative
  };

  const handleIncrease = () => {
    if (jumlahBarang < stokAkhir) {
      setJumlahBarang(prevJumlahBarang => prevJumlahBarang + 1);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenDialog = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenDialog({ anchorEl: event.currentTarget, centerX, centerY });
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setJumlahBarang(0)
    setOpenDialog(false);
  };

  const handleAjuan = () => {
    if (stokAkhir !== 0) {
      alert(`ada barang, jumlah: ${jumlahBarang}`)
    } else if (jumlahBarang > stokAkhir) {
      alert("jumlah barang melebihi stok")
    } else {
      alert("tidak ada barang")
    }
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell component="th" scope="row" padding="5">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={fotoBarang} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{kodeBarang}</TableCell>

        <TableCell>{stokAwal}</TableCell>

        <TableCell>{barangKeluar}</TableCell>

        <TableCell>
          <Label color={(stokAkhir === 'banned' && 'error') || 'success'}>{stokAkhir}</Label>
        </TableCell>

        <TableCell>
          <IconButton onClick={handleOpenDialog}>
            <Label style={{ color: 'green', backgroundColor: 'transparent' }}>Detail</Label>
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          {/* <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} /> */}
          Detail
        </MenuItem>

      </Popover>

      <Popover
        open={!!openDialog}
        anchorEl={openDialog}
        onClose={handleCloseDialog}
        anchorReference="anchorPosition"
        anchorPosition={{ top: openDialog?.centerY || 0, left: openDialog?.centerX || 0 }}
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
          <DetailBarang 
            fotoBarang={fotoBarang}
            kodeBarang={kodeBarang}
            jumlahBarang={jumlahBarang}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleAjuan={handleAjuan}
            name={name}
            stokAkhir={stokAkhir}
            handleCloseDialog={handleCloseDialog}
          />
        </Scrollbar>
      </Popover>

    </>
  );
}

UserTableRow.propTypes = {
  fotoBarang: PropTypes.any,
  kodeBarang: PropTypes.any,
  handleClick: PropTypes.func,
  barangKeluar: PropTypes.any,
  name: PropTypes.any,
  stokAwal: PropTypes.any,
  selected: PropTypes.any,
  stokAkhir: PropTypes.any,
};

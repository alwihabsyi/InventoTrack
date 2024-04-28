import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import DetailBarang from './detail';
import ImageUploadCard from '../status/image-upload-card';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  name,
  fotoBarang,
  kodeBarang,
  stokAwal,
  barangKeluar,
  stokAkhir,
  userRole,
}) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [jumlahBarang, setJumlahBarang] = useState(0);
  const [image, setImage] = useState(null);

  const handleDecrease = () => {
    setJumlahBarang(prevJumlahBarang => Math.max(0, prevJumlahBarang - 1)); // Ensure jumlahBarang is not negative
  };

  const handleIncrease = () => {
    if (jumlahBarang < stokAkhir) {
      setJumlahBarang(prevJumlahBarang => prevJumlahBarang + 1);
    }
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

  const handleOpenEdit = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenEdit({ anchorEl: event.currentTarget, centerX, centerY });
    handleCloseMenu();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAjuan = () => {
    if (stokAkhir !== 0 && jumlahBarang !== 0) {
      ajukanBarang()
    } else if (jumlahBarang > stokAkhir) {
      alert("jumlah barang melebihi stok")
    } else if (jumlahBarang === 0) {
      alert("jumlah barang minimal 1")
    } else {
      alert("tidak ada barang")
    }
  }

  const ajukanBarang = async () => {
    try {
      const data = {
        inventoryId: id,
        jumlah: jumlahBarang,
        user_id: localStorage.getItem('userId')
      }

      const response = await axios.post('https://inventotrack-api.test/api/v1/ajukanBarang', data);
      console.log(response.data);

      if (response.data.status === "success") {
        handleCloseDialog()
        alert(response.data.message)
        window.location.reload();
      } else {
        handleCloseDialog()
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleImageSelect = (imageUrl) => {
      setImage(imageUrl)
  }

  const handleUploadData = async () => {
    const formData = new FormData();
    formData.append('gambarBarang', image);
    formData.append('inventoryId', id);

    const response = await fetch(`https://inventotrack-api.test/api/v1/inventories/editImage`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.status === 'success') {
      handleCloseEdit();
      alert(data.message);
      window.location.reload();
    } else {
      alert('Terjadi kesalahan pada server');
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
          {userRole === 'admin' ? (
            <IconButton onClick={handleOpenEdit}>
              <Label style={{ color: 'blue', backgroundColor: 'transparent' }}>Edit</Label>
            </IconButton>
          ) : (
            <IconButton onClick={handleOpenDialog}>
              <Label style={{ color: 'green', backgroundColor: 'transparent' }}>Detail</Label>
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!openEdit}
        anchorEl={openEdit}
        onClose={handleCloseEdit}
        anchorReference="anchorPosition"
        anchorPosition={{ top: openEdit?.centerY || 0, left: openEdit?.centerX || 0 }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: { width: '400px', maxHeight: '800px' }
        }}
      > 
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px' }}>
          <Label style={{ color: 'black', backgroundColor: 'transparent', fontSize: '16px' }}>Ubah gambar barang</Label>
          <IconButton onClick={handleCloseEdit} size="small" style={{ color: 'blue' }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </div>
        <ImageUploadCard sx={{ mt: '-10px' }} onImageSelect={handleImageSelect} onImageUpload={handleUploadData} />
      </Popover>

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
  id: PropTypes.any,
  fotoBarang: PropTypes.any,
  kodeBarang: PropTypes.any,
  userRole: PropTypes.any,
  barangKeluar: PropTypes.any,
  name: PropTypes.any,
  stokAwal: PropTypes.any,
  selected: PropTypes.any,
  stokAkhir: PropTypes.any,
};

import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button, Popover, IconButton } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import PengembalianDetail from './pengembalian-detail';
import Profile from '../../../public/assets/icons/ic_profile.png'


// ----------------------------------------------------------------------

export default function PengembalianCard({ product }) {
  const [openDetail, setOpenDetail] = useState(false);

  const renderImg = (
    <Box
      component="img"
      alt={product.namaAnggota}
      src={Profile}
      sx={{
        width: '70%',
        height: '70%',
        objectFit: 'cover',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );

  const handleDetailHistory = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenDetail({ anchorEl: event.currentTarget, centerX, centerY });
  }

  const handleCloseDetail = () => {
    setOpenDetail(false);
  }


  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {renderImg}
        </Box>

        <Stack direction='column' spacing={0.5}>
          <Link color="inherit" underline="hover" variant="subtitle1" textAlign='center' noWrap sx={{ pt: 2 }}>
            {product.namaAnggota.length > 20 ? `${product.namaAnggota.substring(0, 20)}...` : product.namaAnggota}
          </Link>

          <Link color="inherit" underline="hover" variant="subtitle2" textAlign='center' noWrap>
            {product.userRole} {product.namaUnit}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button onClick={handleDetailHistory} variant="outlined" sx={{ width: '80%', mt: '10px', mb: '20px' }}>
              Detail
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Popover
        open={!!openDetail}
        anchorEl={openDetail}
        onClose={handleCloseDetail}
        anchorReference="anchorPosition"
        anchorPosition={{ top: openDetail?.centerY || 0, left: openDetail?.centerX || 0 }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: { width: '600px' }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
          <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Detail Pengambilan</Label>
          <IconButton onClick={handleCloseDetail} size="small" style={{ color: 'white' }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </div>
        <PengembalianDetail
          namaAnggota={product.namaAnggota}
          kodeBarang={product.kodeBarang}
          unit={product.namaUnit}
          jumlah={product.jumlahPinjam}
          name={product.namaBarang}
          deskripsi={product.deskripsiBarang}
          fotoUrl={product.buktiAmbil}
          tanggalAmbil={product.tanggalAmbil}
        />
      </Popover>
    </>
  );
}

PengembalianCard.propTypes = {
  product: PropTypes.object
};

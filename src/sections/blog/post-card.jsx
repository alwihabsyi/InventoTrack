import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import { Popover, IconButton, Typography } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import UserTableHead from '../user/user-table-head';
import AnggotaTableRow from '../products/anggota-table-row';
import icPerson from '../../../public/assets/icons/ic_person.svg';

// ----------------------------------------------------------------------

export default function PostCard({ post }) {
  const { namaUnit, jumlahAnggota, jumlahPinjam, anggota } = post;
  const [openDetail, setOpenDetail] = useState(false);

  const handleUnitDetail = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenDetail({ anchorEl: event.currentTarget, centerX, centerY });
  }

  const handleCloseDetail = () => {
    setOpenDetail(false);
  }

  const renderCover = (
    <Box
      component="img"
      alt={namaUnit}
      src={icPerson}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card onClick={handleUnitDetail}>
          <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
            {renderCover}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', pb: 2, pt: 1 }}>
            <Typography variant='subtitle1' >{namaUnit}</Typography>
            <Typography variant='subtitle2' >Jumlah Anggota: {jumlahAnggota}</Typography>
            <Typography variant='subtitle2'>Jumlah Barang: {jumlahPinjam}</Typography>
          </Box>
        </Card>
      </Grid>

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
          sx: {maxHeight: '600px'}
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
          <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Data Anggota {namaUnit}</Label>
          <IconButton onClick={handleCloseDetail} size="small" style={{ color: 'white' }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </div>
        <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <UserTableHead
            order="asc"
            orderBy="name"
            rowCount={anggota.length}
            headLabel={[
              { id: 'nama', label: 'Nama Anggota' },
              { id: 'unit', label: 'Unit' },
              { id: 'jumlah', label: 'Jumlah Pinjam' },
              { id: 'detail', label: 'Aksi' },
            ]}
          />
            {anggota.map((row) => (
              <AnggotaTableRow 
                namaAnggota={row.namaAnggota}
                roleAnggota={row.roleAnggota}
                unitKerja={row.unitKerja}
                jumlahPinjam={row.jumlahPinjam}
                pinjam={row.barangDipinjam} />
            ))}
        </div>
      </Popover>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

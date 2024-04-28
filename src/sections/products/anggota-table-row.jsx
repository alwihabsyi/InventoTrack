import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import AnggotaItemsRow from './anggota-items-row';
import UserTableHead from '../user/user-table-head';

// ----------------------------------------------------------------------

export default function AnggotaTableRow({ namaAnggota, roleAnggota, unitKerja, jumlahPinjam, pinjam }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (event) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;

    setOpenDialog({ anchorEl: event.currentTarget, centerX, centerY });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">

        <TableCell component="th" scope="row" padding="5">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={namaAnggota} src="" />
            <Typography variant="subtitle2" noWrap>
              {namaAnggota}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{roleAnggota} {unitKerja}</TableCell>

        <TableCell>{jumlahPinjam}</TableCell>

        <TableCell>
          <IconButton onClick={handleOpenDialog}>
            <Label style={{ color: 'green', backgroundColor: 'transparent' }}>Detail</Label>
          </IconButton>
        </TableCell>
      </TableRow>

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
          sx: { maxHeight: '600px' }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'white', color: 'blue' }}>
          <Label style={{ color: 'blue', backgroundColor: 'transparent', fontSize: '16px' }}>Data Pinjam {namaAnggota}</Label>
          <IconButton onClick={handleCloseDialog} size="small" style={{ color: 'blue' }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </div>
        <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between', textAlign: 'center' }}>
          <UserTableHead
            order="asc"
            orderBy="name"
            rowCount={pinjam.length}
            headLabel={[
              { id: 'nama', label: 'Nama Barang' },
              { id: 'unit', label: 'Tanggal Ajuan' },
              { id: 'jumlah', label: 'Tanggal Ambil' },
              { id: 'jumlah', label: 'Jumlah' },
              { id: 'detail', label: 'Status' },
            ]}
          />
          {pinjam.length === 0 ? (
            <Label style={{ color: 'gray', backgroundColor: 'transparent', fontSize: '14px', margin: '20px' }}>Belum ada data pinjaman</Label>
          ) : pinjam.map((row) => (
            <AnggotaItemsRow
              namaBarang={row.namaBarang}
              gambarBarang={row.gambarBarang}
              tanggalAjuan={row.tanggalAjuan}
              tanggalAmbil={row.tanggalAmbil}
              jumlah={row.jumlah}
              status={row.status} />
          ))}
        </div>
      </Popover>

    </>
  );
}

AnggotaTableRow.propTypes = {
  namaAnggota: PropTypes.any,
  roleAnggota: PropTypes.any,
  unitKerja: PropTypes.any,
  jumlahPinjam: PropTypes.any,
  pinjam: PropTypes.object
};

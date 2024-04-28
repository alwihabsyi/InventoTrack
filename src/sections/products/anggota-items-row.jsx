import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AnggotaItemsRow({ namaBarang, gambarBarang, tanggalAjuan, tanggalAmbil, jumlah, status }) {

  const formatDateForDisplay = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row" padding="5">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={namaBarang} src={gambarBarang} />
          <Typography variant="subtitle2" noWrap>
            {namaBarang}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{formatDateForDisplay(tanggalAjuan)}</TableCell>

      <TableCell>{tanggalAmbil === null ? '-' : formatDateForDisplay(tanggalAmbil)}</TableCell>

      <TableCell>{jumlah}</TableCell>

      <TableCell>
        <Label style={{ color: 'green', backgroundColor: 'transparent' }}>{status}</Label>
      </TableCell>
    </TableRow>
  );
}

AnggotaItemsRow.propTypes = {
  namaBarang: PropTypes.any,
  gambarBarang: PropTypes.any,
  tanggalAjuan: PropTypes.any,
  tanggalAmbil: PropTypes.any,
  jumlah: PropTypes.any,
  status: PropTypes.any
};

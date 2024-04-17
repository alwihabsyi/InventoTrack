import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

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

        <TableCell align="center">{barangKeluar}</TableCell>

        <TableCell>
          <Label color={(stokAkhir === 'banned' && 'error') || 'success'}>{stokAkhir}</Label>
        </TableCell>

        <TableCell>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

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

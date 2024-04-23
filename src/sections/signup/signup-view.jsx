import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import PaginatedSpinner from './paginated-spinner';

// ----------------------------------------------------------------------

export default function SignUpView() {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [role, setUserRole] = useState('');
  const [password, setUserPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (!inputValidation()) {
      alert("Harap isi semua field")
      return;
    }

    handleSignUp();
  };

  const handleSignUp = async() => {
    try {
        const data = {
          unit_kerja_id: selectedUnit,
          nama_anggota: username,
          user_role: role,
          user_email: email
        }

        const response = await axios.post(`https://inventotrack-api.test/api/v1/anggota/store`, data);
        console.log(response.data);

        if (response.data.status === "success") {
            alert(response.data.message);
            router.push('/login');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(`Error: ${  error.response.data.error}`); // Display the error message from the backend
    }
  }

  const inputValidation = () => selectedUnit !== '' && role !== '' && password !== '' && username !== '' && email !== ''

  const handleLogin = () => {
    router.push('/login');
  }

  const handleSelectUnit = (unitId) => {
    setSelectedUnit(unitId);
  };

  const handleSelectRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <PaginatedSpinner onSelectUnit={handleSelectUnit} />

        <FormControl fullWidth >
            <InputLabel>Select Role</InputLabel>
            <Select value={role} onChange={handleSelectRole}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="anggota">Anggota</MenuItem>
              <MenuItem value="ketua">Ketua</MenuItem>
              <MenuItem value="kepala">Kepala</MenuItem>
            </Select>
        </FormControl>

        <TextField name="username" label="Name" onChange={handleUsername}/>

        <TextField name="email" label="Email Address" onChange={handleEmail}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleUserPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up to InventoTrack</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link onClick={handleLogin} variant="subtitle2" sx={{ ml: 0.5 }}>
              Login
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

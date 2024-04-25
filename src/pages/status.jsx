import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CekStatusView } from 'src/sections/status/view';

// ----------------------------------------------------------------------

export default function CekStatusPage() {
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userRole');
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login page
    }
  });

  
  return (
    <>
      <Helmet>
        <title> Cek Status | InventoTrack </title>
      </Helmet>

      <CekStatusView />
    </>
  );
}

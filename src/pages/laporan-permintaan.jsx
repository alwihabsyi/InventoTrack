import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { LaporanPermintaanView } from 'src/sections/laporan-permintaan/view';

// ----------------------------------------------------------------------

export default function LaporanPermintaanPage() {
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userRole');
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login page
    }
  });

  
  return (
    <>
      <Helmet>
        <title> Data Barang | Minimal UI </title>
      </Helmet>

      <LaporanPermintaanView />
    </>
  );
}

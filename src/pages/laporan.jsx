import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { LaporanView } from 'src/sections/laporan/view';

// ----------------------------------------------------------------------

export default function LaporanPage() {

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

      <LaporanView />
    </>
  );
}

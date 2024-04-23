import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userRole');
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login page
    }
  });

  return (
    <>
      <Helmet>
        <title> Persediaan Barang | Minimal UI </title>
      </Helmet>

      <AppView />
    </>
  );
}

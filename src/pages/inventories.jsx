import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function InventoryPage() {
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

      <UserView />
    </>
  );
}

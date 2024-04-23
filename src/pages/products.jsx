import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userRole');
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  });

  return (
    <>
      <Helmet>
        <title> Histori Barang | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  );
}

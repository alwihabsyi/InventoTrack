import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userRole');
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login page
    }
  });

  return (
    <>
      <Helmet>
        <title> Cek Status | Minimal UI </title>
      </Helmet>

      <BlogView />
    </>
  );
}

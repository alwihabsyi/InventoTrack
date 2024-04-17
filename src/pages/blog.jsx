import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Cek Status | Minimal UI </title>
      </Helmet>

      <BlogView />
    </>
  );
}

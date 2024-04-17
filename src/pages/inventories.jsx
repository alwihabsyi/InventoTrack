import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function InventoryPage() {
  return (
    <>
      <Helmet>
        <title> Data Barang | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}

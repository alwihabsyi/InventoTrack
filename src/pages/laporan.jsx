import { Helmet } from 'react-helmet-async';

import { LaporanView } from 'src/sections/laporan/view';

// ----------------------------------------------------------------------

export default function LaporanPage() {
  return (
    <>
      <Helmet>
        <title> Data Barang | Minimal UI </title>
      </Helmet>

      <LaporanView />
    </>
  );
}

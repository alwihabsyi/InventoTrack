import { Helmet } from 'react-helmet-async';

import { LaporanPermintaanView } from 'src/sections/laporan-permintaan/view';

// ----------------------------------------------------------------------

export default function LaporanPermintaanPage() {
  return (
    <>
      <Helmet>
        <title> Data Barang | Minimal UI </title>
      </Helmet>

      <LaporanPermintaanView />
    </>
  );
}

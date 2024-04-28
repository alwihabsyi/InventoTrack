import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const pngIcon = (name) => (
  <img src={`/assets/icons/navbar/${name}.png`} alt='icon'/>
);

const navConfig = [
  {
    title: 'Persediaan Barang',
    path: '/',
    icon: icon('ic_analytics'),
    allowedRoles: ['admin', 'anggota', 'ketua', 'kepala']
  },
  {
    title: 'Data barang',
    path: '/inventories',
    icon: icon('ic_user'),
    allowedRoles: ['admin', 'anggota', 'ketua', 'kepala']
  },
  {
    title: 'Laporan Permintaan',
    path: '/laporan-permintaan',
    icon: pngIcon('ic_laporan_permintaan'),
    allowedRoles: ['admin']
  },
  {
    title: 'Histori Barang',
    path: '/products',
    icon: icon('ic_cart'),
    allowedRoles: ['anggota', 'ketua', 'kepala']
  },
  {
    title: 'Cek Status',
    path: '/status',
    icon: icon('ic_file'),
    allowedRoles: ['anggota', 'ketua', 'kepala']
  },
  {
    title: 'Informasi Pengambilan',
    path: '/informasi-pengembalian',
    icon: pngIcon('ic_pengambilan'),
    allowedRoles: ['admin']
  },
  {
    title: 'Monitoring',
    path: '/blog',
    icon: pngIcon('ic_computer'),
    allowedRoles: ['admin', 'ketua', 'kepala']
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: pngIcon('ic_pengambilan'),
    allowedRoles: ['ketua']
  },
  {
    title: 'Pedoman',
    path: '/404',
    icon: pngIcon('ic_pedoman'),
    allowedRoles: ['admin', 'anggota', 'ketua', 'kepala']
  },
];

export default navConfig;

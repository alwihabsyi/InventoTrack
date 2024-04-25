import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
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
    icon: icon('ic_analytics'),
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
    title: 'Informasi Pengembalian',
    path: '/404',
    icon: icon('ic_blog'),
    allowedRoles: ['admin']
  },
  {
    title: 'Monitoring',
    path: '/blog',
    icon: icon('ic_disabled'),
    allowedRoles: ['admin', 'ketua', 'kepala']
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: icon('ic_disabled'),
    allowedRoles: ['kepala', 'ketua']
  },
  {
    title: 'Pedoman',
    path: '/404',
    icon: icon('ic_disabled'),
    allowedRoles: ['admin', 'anggota', 'ketua', 'kepala']
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: icon('ic_disabled'),
    allowedRoles: ['admin', 'anggota', 'ketua', 'kepala']
  },
];

export default navConfig;

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
  },
  {
    title: 'Data barang',
    path: '/inventories',
    icon: icon('ic_user'),
  },
  {
    title: 'Histori Barang',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Monitoring',
    path: '/blog',
    icon: icon('ic_disabled'),
  },
  {
    title: 'laporan',
    path: '/login',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Cek Status',
    path: '/404',
    icon: icon('ic_blog'),
  },
  {
    title: 'Pedoman',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Logout',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const InventoryPage = lazy(() => import('src/pages/inventories'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LaporanPage = lazy(() => import('src/pages/laporan'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const LaporanPermintaanPage = lazy(() => import('src/pages/laporan-permintaan'));
export const CekStatusPage = lazy(() => import('src/pages/status'));

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('unitId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const LogoutComponent = () => {
    useEffect(() => {
      handleLogout();
    }, []);

    return null;
  };

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'inventories', element: <InventoryPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'laporan', element: <LaporanPage /> },
        { path: 'laporan-permintaan', element: <LaporanPermintaanPage /> },
        { path: 'status', element: <CekStatusPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'logout', 
      element: <LogoutComponent />
    },
    { path: 'signup', 
      element: <SignUpPage />
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { InformasiView } from 'src/sections/informasi-pengembalian/view';

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
                <title> Informasi Pengembalian | InventoTrack </title>
            </Helmet>

            <InformasiView />
        </>
    );
}

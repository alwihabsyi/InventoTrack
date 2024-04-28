import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';

// ----------------------------------------------------------------------

export default function AppView() {
  const [stokAwal, setStokAwal] = useState(0);
  const [barangKeluar, setBarangKeluar] = useState(0);
  const [stokAkhir, setStokAkhir] = useState(0);
  const [topItems, setTopItems] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`https://inventotrack-api.test/api/v1/dashboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStokAwal(data.data.stokAwal);
        setBarangKeluar(data.data.barangKeluar);
        setStokAkhir(data.data.stokAkhir);
        setTopItems(data.data.topItems);
        setMonthlyData(data.data.monthlyData);
        setInterval(60000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setStokAwal(0);
        setBarangKeluar(0);
        setStokAkhir(0);
        setTopItems([]);
        setMonthlyData([]);
        setInterval(10000);
      }
    };
  
    const fetchData = async () => {
      await fetchDashboardData();
    };
  
    setTimeout(() => {
      fetchData();
    }, interval);
  }, [interval]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Manajemen Sistem Inventaris
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stok Awal"
            total={stokAwal}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Barang Keluar"
            total={barangKeluar}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stok Akhir"
            total={stokAkhir}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Permintaan Terbanyak"
            total={topItems.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto' }}>
            <AppWebsiteVisits
              title="Laporan Stok Barang"
              chart={{
                labels: monthlyData.map(month => {
                  const date = new Date(new Date().getFullYear(), month.month - 1, 1); // month - 1 because months are 0-indexed
                  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
                }),
                series: [
                  {
                    name: 'Stok Masuk',
                    type: 'column',
                    fill: 'solid',
                    data: monthlyData.map(month => month.stokAwal),
                    barWidth: 30,
                    maxBarWidth: 50
                  },
                  {
                    name: 'Barang Keluar',
                    type: 'column',
                    fill: 'gradient',
                    data: monthlyData.map(month => month.barangKeluar),
                    barWidth: 30, 
                    maxBarWidth: 50,
                  },
                ],
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

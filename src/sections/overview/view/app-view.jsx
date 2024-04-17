import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Manajemen Sistem Inventaris
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stok Awal"
            total={250}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Barang Keluar"
            total={25}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stok Akhir"
            total={172}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Permintaan Terbanyak"
            total={4}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto' }}>
            <AppWebsiteVisits
              title="Laporan Stok Barang"
              chart={{
                labels: [
                  '01/01/2024',
                  '02/01/2024',
                  '03/01/2024',
                  '04/01/2024',
                  '05/01/2024',
                  '06/01/2024',
                  '07/01/2024',
                  '08/01/2024',
                  '09/01/2024',
                  '10/01/2024',
                  '11/01/2024',
                ],
                series: [
                  {
                    name: 'Stok Masuk',
                    type: 'column',
                    fill: 'solid',
                    data: [44, 55, 41, 67, 22, 43, 50, 41, 56, 27, 43],
                    // Menyesuaikan lebar batang menjadi lebih lebar
                    barWidth: 30, // Atur lebar batang di sini (dalam satuan piksel)
                    maxBarWidth: 50, // Atur lebar maksimum batang di sini (dalam satuan piksel)
                  },
                  {
                    name: 'Barang Keluar',
                    type: 'column',
                    fill: 'gradient',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    // Menyesuaikan lebar batang menjadi lebih lebar
                    barWidth: 30, // Atur lebar batang di sini (dalam satuan piksel)
                    maxBarWidth: 50, // Atur lebar maksimum batang di sini (dalam satuan piksel)
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

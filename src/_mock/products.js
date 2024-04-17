// Import library yang diperlukan
import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// Daftar nama produk
const PRODUCT_NAME = [
  'Lem Serbaguna',
  'STABILO BOS',
  'SPIDOL WHITEBOARD SNOWMAN',
  'SPIDOL WHITEBOARD WARNA',
  'BALLPOINT BALLINER BIRU',
  'REFIL ROLLER BALL PARKER BLUE 0.7',
  'TRIGONAL CLIPS NO.5',
  'PENGHAPUS PENSIL',
  'BUKU FOLIO',
  'BUKU AGENDA KELUAR MASUK',
  'MAP BATIK',
  'SNELHECTER CETAK',
  'PENGGARIS 30 CM',
  'CUTTER A300 JOYCO',
  'ISOLASI TRANSPARANT 2 NACHI',
  'DOUBLE FOAM 1 INCHI',
  'LEM GLUKOL',
  'DOUBLE TAPE 1 2 INCHI',
  'STANDARD BUKU',
  'KERTAS HVS 80 GRAM FOLIO',
  'KERTAS STIKER UKURAN A4',
  'AMPLOP COKLAT BESAR',
  'KERTAS KOP SURAT',
  'TINTA L210 EPSON',
];

// Generate daftar produk berdasarkan nama produk
export const products = PRODUCT_NAME.map((productName, index) => {
  const setIndex = index + 1;
  const subHeader = `${productName} ikan`; // Menambahkan tulisan "ikan" di bawah setiap nama produk

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: productName,
    subHeader, // Menggunakan shorthand property untuk subHeader
    colors: [],
    status: sample(['Terbaru', 'Terbaru', '', '']),
  };
});

// Contoh penggunaan untuk menampilkan sub header dari setiap produk
products.forEach(product => {
  console.log(product.subHeader);
});

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import Label from 'src/components/label';

import Jpg from '../../../public/assets/icons/ic_photo.png'

export default function ProductDetail({ fotoBarang, jumlah, tanggalAmbil, kodeBarang, name,handleCloseDialog, deskripsi, fotoUrl}) {

    const formatDateForDisplay = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
    };

    const handleOpenLink = () => {
        window.open(fotoUrl, '_blank');
    }

    return (
        <div>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={fotoBarang} style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', marginTop: '10px' }} alt="Foto Barang" />
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>{name}</Label>
            </div>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '14px' }}>{deskripsi}</Label>
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Kode Barang</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{kodeBarang}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px', marginTop: '10px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Jumlah</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{jumlah}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px', marginTop: '10px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Tanggal Ambil Barang</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{formatDateForDisplay(tanggalAmbil)}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' ,paddingLeft: '20px', paddingRight: '20px', marginTop: '10px', marginBottom: '50px'}}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Bukti Pengambilan</Label>
                <Button
                    variant="outlined"
                    style={{
                        width: '150px',
                        borderRadius: '20px',
                        gap: 3
                    }}
                    onClick={handleOpenLink}
                >
                    <img src={Jpg} alt="ic_photo" style={{ width: '20px' }} /> Bukti Ambil
                </Button>
            </div>
        </div>
    );
}

ProductDetail.propTypes = {
    fotoBarang: PropTypes.any,
    kodeBarang: PropTypes.any,
    name: PropTypes.any,
    deskripsi: PropTypes.any,
    fotoUrl: PropTypes.any,
    tanggalAmbil: PropTypes.any,
    jumlah: PropTypes.any,
    handleCloseDialog: PropTypes.any,
};

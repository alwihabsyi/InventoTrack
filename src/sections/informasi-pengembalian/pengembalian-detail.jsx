import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import Label from 'src/components/label';

import Jpg from '../../../public/assets/icons/ic_photo.png'
import Profile from '../../../public/assets/icons/ic_profile.png'

export default function PengembalianDetail({ namaAnggota, jumlah, tanggalAmbil, kodeBarang, name, fotoUrl, unit}) {

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
                <img src={Profile} style={{ maxWidth: '100%', height: 'auto', maxHeight: '180px', marginTop: '10px' }} alt="profile" />
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>{namaAnggota}</Label>
            </div>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '14px' }}>{unit}</Label>
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Nama Barang</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{name}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
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

PengembalianDetail.propTypes = {
    namaAnggota: PropTypes.any,
    unit: PropTypes.any,
    kodeBarang: PropTypes.any,
    name: PropTypes.any,
    fotoUrl: PropTypes.any,
    tanggalAmbil: PropTypes.any,
    jumlah: PropTypes.any,
};

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function DetailBarang({ fotoBarang, jumlahBarang, stokAkhir, handleAjuan, kodeBarang, name, handleCloseDialog, handleIncrease, handleDecrease }) {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '8px', margin: '0px', backgroundColor: 'blue', color: 'white' }}>
                <Label style={{ color: 'white', backgroundColor: 'transparent', fontSize: '16px' }}>Detail Barang</Label>
                <IconButton onClick={handleCloseDialog} size="small" style={{ color: 'white' }}>
                    <Iconify icon="eva:close-fill" />
                </IconButton>
            </div>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={fotoBarang} style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', marginTop: '10px' }} alt="Foto Barang" />
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>{name}</Label>
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Kode Barang</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{kodeBarang}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px', marginTop: '10px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Stok Akhir</Label>
                <Label style={{ display: 'block', color: 'blue', backgroundColor: 'transparent', fontSize: '14px' }}>{stokAkhir}</Label>
                <div style={{ width: '100%', marginTop: '-10px', borderBottom: '1px solid lightgray' }} />
            </div>

            <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px', marginTop: '10px' }}>
                <Label style={{ display: 'block', color: 'black', backgroundColor: 'transparent', fontSize: '16px', marginTop: '20px' }}>Jumlah</Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleDecrease} size="small" style={{ borderRadius: '50%' }}>
                        <Iconify icon="eva:minus-fill" />
                    </IconButton>
                    <TextField value={jumlahBarang} variant="outlined" size="small" style={{ margin: '0 8px' }} />
                    <IconButton onClick={handleIncrease} size="small" style={{ borderRadius: '50%' }}>
                        <Iconify icon="eva:plus-fill" />
                    </IconButton>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '50px' }}>
                <Button
                    variant="contained"
                    style={{
                        borderRadius: '20px',
                        backgroundColor: stokAkhir === 0 ? 'lightgray' : 'blue',
                        textTransform: 'none',
                        width: '200px',
                    }}
                    onClick={handleAjuan}
                >
                    Ajukan Permintaan
                </Button>
            </div>
        </div>
    );
}

DetailBarang.propTypes = {
    fotoBarang: PropTypes.any,
    kodeBarang: PropTypes.any,
    jumlahBarang: PropTypes.func,
    handleIncrease: PropTypes.any,
    name: PropTypes.any,
    handleDecrease: PropTypes.any,
    handleAjuan: PropTypes.any,
    stokAkhir: PropTypes.any,
    handleCloseDialog: PropTypes.any,
};

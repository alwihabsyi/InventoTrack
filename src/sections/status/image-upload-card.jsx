import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Card, Button, CardMedia, Typography, CardContent } from '@mui/material';

import UploadIcon from '../../../public/assets/icons/ic_image.svg';

const ImageUploadCard = ({ onImageSelect, onImageUpload }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        onImageSelect(selectedImage);
    };

    const handleImageUpload = () => {
        onImageUpload(image)
    };

    return (
        <Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <label htmlFor="image-upload">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {image ? (
                        <CardMedia
                            component="img"
                            height="200"
                            image={URL.createObjectURL(image)}
                            alt="Uploaded Image"
                            style={{ marginBottom: '20px' }}
                        />
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <img src={UploadIcon} alt="Upload Icon" style={{ width: '100px', height: '100px', color: 'gray' }} />
                            <Typography variant="body1" color="textSecondary">
                                Select an image
                            </Typography>
                        </div>
                    )}
                </label>
                <Button variant="contained" onClick={handleImageUpload} disabled={!image} sx={{ width: '40%', mt: '10px' }}>
                    Kirim
                </Button>
            </CardContent>
        </Card>
    );
};

ImageUploadCard.propTypes = {
    onImageSelect: PropTypes.any,
    onImageUpload: PropTypes.any
}

export default ImageUploadCard;

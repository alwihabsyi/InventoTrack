import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { Stack, Button } from '@mui/material';

const DigitalSignature = ({ onSignatureSave }) => {
  const [signature, setSignature] = useState(null);
  const sigCanvas = useRef({});

  const saveSignature = (event) => {
    if (sigCanvas.current.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }
    const canvas = sigCanvas.current.getCanvas();
    const signatureData = canvas.toDataURL('image/png');
    setSignature(signatureData);
    onSignatureSave(signatureData, event);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        ref={sigCanvas}
      />
      <Stack direction="row" alignItems="center" mb={1}>
        <Button fullWidth onClick={clearSignature}>Clear</Button>
        <Button fullWidth onClick={(event) => saveSignature(event)} variant="contained" color="primary">Save</Button>
      </Stack>
    </div>
  );
};

DigitalSignature.propTypes = {
  onSignatureSave: PropTypes.func.isRequired,
};

export default DigitalSignature;

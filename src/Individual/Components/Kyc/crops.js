import React, { useRef, useState, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/src/css/cropper.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  '@media(max-width:575.98px)': {
    width: '90%'
  },
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};


const ImageCropper = ({open,handleOpen,handleClose,imageUrl,handleCroppedImage}) => {
  const imageRef = useRef(null); // Reference for the image
  const cropperRef = useRef(null); // Reference for the cropper instance
  const [image, setImage] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

useEffect(() => {
  if (imageRef.current) {
      // Destroy previous Cropper instance if it exists
      if (cropperRef.current) {
          cropperRef.current.destroy();
          cropperRef.current = null; // Ensure it's fully removed
      }

      // Set a timeout to ensure old image is cleared before new one loads
      setTimeout(() => {
          cropperRef.current = new Cropper(imageRef.current, {
              viewMode: 2, // Allows free cropping
              autoCropArea: 1, // Ensures cropping area fills the image
              cropBoxResizable: true, // Allow resizing of crop box
              movable: true, // Allow moving the crop box
              zoomable: true, // Allow zooming in/out
          });
      }, 100);
  }
}, [image]);

  useEffect(() => {
      setImage(imageUrl)
  },[imageUrl])

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
      handleOpen()
    }
  };

  const cropImage = () => {
    if (cropperRef.current) {
        const croppedCanvas = cropperRef.current.getCroppedCanvas();
        if (croppedCanvas) {
            croppedCanvas.toBlob((blob) => {
                if (!blob) return;

                // Create a File object
                const file = new File([blob], "cropped-image.png", { type: "image/png" });

                console.log("Cropped Image File:", file);
                handleCroppedImage(file)
                handleClose(); // Close modal
            }, "image/png");
        }
    }
};

  // Rotate Image
  const rotateImage = () => {
    if (cropperRef.current) {
      cropperRef.current.rotate(90); // Rotate 90 degrees
    }
  };

  return (
    <div>
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {/* Image Preview */}
         <div className="display-3 cursor">
          <h2>
            Crop & Save
          </h2>
          {/* <HighlightOffIcon onClick={handleClose}/> */}
         </div>
      {image && (
        <div style={{ marginTop: 20 }}>
          <img ref={imageRef} src={image} alt="Preview" style={{ maxWidth: "100%" }} />
          <div className="display-2 mt-20" tyle={{ maxWidth: "100%" }}>
            <Button variant="contained" onClick={rotateImage}>Rotate</Button>
            <Button variant="contained" onClick={cropImage}>Crop & Save</Button>
          </div>
        </div>
        
      )}

     
        </Box>
      </Modal>

       
    </div>
  );
};

export default ImageCropper;

import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const onDownloadClick = () => {
    if (!completedCrop || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Download the cropped image
    const croppedImage = canvas.toDataURL('image/jpeg');
    console.log(croppedImage);
    const a = document.createElement('a');
    a.href = croppedImage;
    a.download = 'cropped-image.jpg';
    a.click();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <>
          <ReactCrop
            src={src}
            onImageLoaded={onImageLoaded}
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
          />
          <button onClick={onDownloadClick}>Download Crop</button>
        </>
      )}
    </div>
  );
};

export default ImageCrop;
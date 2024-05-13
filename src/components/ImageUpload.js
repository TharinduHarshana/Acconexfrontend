// Inside ImageUpload component
import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from './InventoryComponent/firebase'; // Adjust the import path as necessary

const ImageUpload = ({ handleImageUrl }) => {
  const [image, setImage] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          // Handle upload error here
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            handleImageUrl(downloadURL); // Call the prop function with the download URL
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploadProgress > 0 && <p>Upload is {uploadProgress}% done</p>}
    </div>
  );
};

export default ImageUpload;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultHandle from '../DefaultHandle';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../InventoryComponent/firebase';

const AddNewCategory = () => {
    const navigate = useNavigate();
  
    // State for form inputs
    const [categoryname, setcategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState('');
    const [imageLink, setImageLink] = useState('');


  
    // Image upload file change handler
    function handleChange(event) {
        setFile(event.target.files[0]);
      }

    const handleUpload = () => {
        if (!file) {
          alert('Please upload an image first!');
        }
    
        const storageRef = ref(storage, `/files/${file.name}`);
    
        // Progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    
            // Update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            // Download URL
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              setImageLink(url);
            });
          }
        );
      };
  
    // Submit form data
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!categoryname ||!description) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all fields.',
        });
        return;
      }
  
      const newCategory = {
        categoryname,
        description,
        imageLink,
      };
      
  
      axios.post('https://acconex-backend.vercel.app/category/add', newCategory)
       .then((res) => {
        console.log(newCategory)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New Category Added!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/categories'); // Navigate to categories page after successful addition
        })
       .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <DefaultHandle>
        <div style={formStyle}>
          <form className='form'>
            <label style={label}>
              Name:
              <input type="text" className='form-control' placeholder="Category Name" onChange={(e) => setcategoryName(e.target.value)} value={categoryname} required style={input} />
            </label>
            <label style={label}>
              Description:
              <textarea className="form-control" placeholder="Category Description" onChange={(e) => setDescription(e.target.value)} value={description} required style={input}></textarea>
            </label>
            <div className="row md-6">
              <div className="col-md-6">
                <label className="labels" style={{ float: "left" }}>
                  Upload Image:
                </label>
                <input type="file" className="form-control" onChange={handleChange} />
                <div style={{ marginTop: "10px" }}>
                  <button type="button" className="btn btn-secondary" onClick={handleUpload}>Upload</button>
                  <p>{percent} % done</p>
                </div>
              </div>
            </div>
            <button className="btn btn-success" onClick={handleSubmit}>
              Add New Category
            </button>
          </form>
        </div>
      </DefaultHandle>
    );
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: '$font-color',
    fontFamily: '$font-family',
    fontSize: '14px',
    fontWeight: '400',
    width: '65%',
    margin: 'auto',
  };
  
  const label = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '18px',
  };
  
  const input = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  };
  
  export default AddNewCategory;
  
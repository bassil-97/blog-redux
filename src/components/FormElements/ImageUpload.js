import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ImageUpload({ id, name, center, location }) {
  const filePickerRef = useRef();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  // const pickImageHandler = () => {
  //   filePickerRef.current.click();
  // };

  return (
    <div>
      {location === "addBlog" && (
        <label className="ms-2">Select blog cover</label>
      )}
      {location === "authForm" && (
        <label className="ms-2">Select Your Image</label>
      )}
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          id={id}
          ref={filePickerRef}
          type="file"
          name={name}
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <PhotoCamera />
      </IconButton>
      {previewUrl && (
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="img-preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
      )}
    </div>
  );
}

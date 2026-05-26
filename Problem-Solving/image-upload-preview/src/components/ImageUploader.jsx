import { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">
        📸 Image Upload Preview
      </h1>

      <input
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <div>
          <img
            src={image}
            alt="Preview"
            className="preview-image"
          />

          <button
            className="remove-btn"
            onClick={removeImage}
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
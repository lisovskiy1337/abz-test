import React from "react";
import "./FormFileUploadStyle.scss";
const FormFileUpload = ({
  register,
  onChange,
  fileName,
  error,
  errorMessage,
}) => {
  return (
    <>
      <label htmlFor="files" className={`file-label ${error && "error"}`}>
        <input
          id="files"
          type="file"
          accept="image/jpeg, image/jpg"
          {...register("photo", { required: true })}
          onChange={onChange}
        />
        <span className="input-file-btn">Upload</span>
        <span type="text" className="input-file-text">
          {fileName}
        </span>
      </label>

      {error && <span className="error-alert">{errorMessage}</span>}
    </>
  );
};

export default FormFileUpload;

import React, { useState } from "react";
import "./FormStyle.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../Loader/Loader";
import Compressor from "compressorjs";
import useToken from "../../hooks/useToken";
import useFetchPositions from "../../hooks/useFetchPositions";
import { useUserContext } from "../../context/usersContext";
import RadioButton from "../RadioButton/RadioButton";
import FormInput from "../FormInput/FormInput";
import FormFileUpload from "../FormFileUpload/FormFileUpload";

const Form = ({ setSuccess }) => {
  const [radioPosition, setRadioPosition] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [formError, setFormError] = useState(null);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
  });
  const { token, getToken } = useToken();
  const { positions } = useFetchPositions();
  const { fetchUsers } = useUserContext();
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file.type !== "image/jpeg") {
      setError("photo", {
        type: "manual",
      });
      return;
    }
    trigger("photo");
    clearErrors("photo");

    try {
      const compressedResult = await new Promise((resolve) => {
        new Compressor(file, {
          quality: 0.6,
          minWidth: 70,
          minHeight: 70,
          success: (result) => {
            resolve(result);
          },
        });
      });

      setFileName(compressedResult || "No file chosen");
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;
      const formData = new FormData();

      for (const key in data) {
        if (key === "photo") {
          formData.append("photo", fileName);
        } else {
          formData.append(key, data[key]);
        }
      }
      await sendDataToAPI(formData);
    } catch (error) {
      setFormError(error);
    }
  };

  const sendDataToAPI = async (formData) => {
    try {
      if (!token) await getToken();

      const response = await axios.post(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users`,
        formData,
        {
          headers: {
            Token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        await fetchUsers();
        reset();
        setRadioPosition(1);
        setFileName(null);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      } else {
        setFormError("Error happened. Try to reload page.");
      }
    } catch (error) {
      setFormError(error.message || "Error happened. Try to reload page.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <FormInput
          name="name"
          label="Your Name"
          placeholder="Input"
          register={register}
          required
          minLength={2}
          maxLength={60}
          error={errors.name}
          errorMessage="This field is required and should be between 2 and 60 characters"
        />
      </div>
      <div className="input-wrapper">
        <FormInput
          name="email"
          label="Email"
          placeholder="Input"
          register={register}
          required
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          error={errors.email}
          errorMessage="Please enter a valid email address"
        />
      </div>
      <div className="input-wrapper">
        <FormInput
          name="phone"
          label="Phone"
          placeholder="Input"
          register={register}
          required
          pattern={/^(\+380)\d{9}$/}
          error={errors.phone}
          errorMessage="Please enter a valid phone number starting with +380"
        />
      </div>
      <div>
        <p>Select your position</p>
        {positions.map((position) => (
          <div className="input-wrapper" key={position.id}>
            <RadioButton
              key={position.id}
              value={position.id}
              label={position.name}
              register={register}
              name="position_id"
              checked={radioPosition === position.id}
              onChange={() => setRadioPosition(position.id)}
            />
          </div>
        ))}
      </div>
      <div className="input-wrapper">
        <FormFileUpload
          register={register}
          onChange={handleFileUpload}
          fileName={fileName?.name || "Upload your photo"}
          error={errors.photo}
          errorMessage="Select an image with the format jpeg/jpg"
        />
      </div>
      <div className="tac">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`btn ${isValid ? "yellow" : "disabled"}`}
        >
          {isSubmitting ? <Loader /> : "Sign up"}
        </button>
      </div>
      {formError && <div className="form-error tac">{formError}</div>}
    </form>
  );
};

export default Form;

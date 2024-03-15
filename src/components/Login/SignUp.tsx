import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp: React.FC = () => {
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit: any = async (values: SignUpValues) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        toast.success("Signup successful! please tap on login button");
       
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code
        setErrors(error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an error
        setErrors("Network error. Please try again.");
      }
      toast.error("Signup failed. Please check your details.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <div className="p-6 bg-white shadow-md flex-col justify-center">
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              handleOnBlur={handleBlur}
              error={errors?.username}
              isTouched={touched?.username}
              placeholder="User Name"
              className="p-2 border border-[#686666]"
              label={"User Name"}
            />
            <div className="mb-4">
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                handleOnBlur={handleBlur}
                error={errors?.email}
                isTouched={touched?.email}
                placeholder="Email"
                className="p-2 border border-[#686666] md:w-full"
                label={"Email"}
              />
            </div>
            <div className="mb-4">
              <Input
                name="password"
                value={values.password}
                onChange={handleChange}
                handleOnBlur={handleBlur}
                error={errors?.password}
                isTouched={touched?.password}
                placeholder="Password"
                type="password"
                className="p-2 border border-[#686666] md:w-full"
                label={"Password"}
              />
            </div>

            <div className="mb-4">
              <Input
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                handleOnBlur={handleBlur}
                error={errors?.confirmPassword}
                isTouched={touched?.confirmPassword}
                placeholder="Confirm Password"
                type="password"
                className="p-2 border border-[#686666] md:w-full"
                label={"Confirm Password"}
              />
            </div>

            <div className="flex flex-col mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#941D39] text-white py-2 mb-3 px-4 cursor-pointer focus:outline-none focus:shadow-outline-blue md:w-[45%] w-[100%]"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </Formik>
      {errors && <p className="text-red-500">{errors}</p>}
    </>
  );
};

export default SignUp;

import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { authContext, usernameContext } from "../../context/context";

interface LoginValues {
  username: string;
  password: string;
}

const initialValues: LoginValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { setUsername } = useContext(usernameContext);
  const [error, setError] = useState<string | null>('hi'); 
  const { setAuth } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        username: values.username,
        password: values.password,
      });
      setError(response.data.message);
      if (response.status === 200) {
        toast.success("Login successful!");
        setUsername(values.username);
        setAuth(true);
        navigate("/user");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("No response received. Please try again.");
        } else {
          setError("Network error. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer /> 
   
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => ( 
          <div className="min-w-[40%] mx-auto p-6 bg-white shadow-md flex flex-col gap-2"> 
                <p>please login with correct details</p>
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              touched={touched.username}
              placeholder="Enter your username"
              className="mt-1 p-2 border-[#686666] border   w-full"
              label="Username"
            />

            <Input
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="Password"
              type="password"
              className="p-2 border border-[#686666] md:w-full"
              label="Password"
            />
            <p className="underline text-[#941D39]">Verify with OTP</p>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 bg-[#941D39] hover:bg-[#862d42] text-white py-2 px-4 focus:outline-none focus:shadow-outline-blue md:w-[50%] w-[100%] "
            >
              Login
            </button>
 
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;

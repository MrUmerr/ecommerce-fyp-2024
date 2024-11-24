import React from 'react';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Login from '../components/Login';
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }
    await axios.post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          
          toast.success("Signup Successfully");
          navigate (from, {replace: true});
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box dark:bg-slate-900">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </Link>

              <div className="dark:bg-slate-900 dark:text-white">
                <h3 className="font-bold text-lg">Signup</h3>

                <div className="mt-8 space-y-1">
                  <span>Name</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-80 px-1 py-1 border rounded-md outline-none dark:text-black"
                    {...register('fullname', { required: true })}
                  />
                  <br />
                  {errors.fullname && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-8 space-y-1">
                  <span>Email</span>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-80 px-1 py-1 border rounded-md outline-none dark:text-black"
                    {...register('email', { required: true })}
                  />
                  <br />
                  {errors.email && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-8 space-y-1">
                  <span>Password</span>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-80 px-1 py-1 border rounded-md outline-none dark:text-black"
                    {...register('password', { required: true })}
                  />
                  <br />
                  {errors.password && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="flex justify-around mt-4">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-600 duration-200"
                  >
                    Signup
                  </button>

                  <p className="mt-1 md:mt-4 ml-4">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => document.getElementById('login_modal').showModal()}
                    >
                      Login
                    </button>
                    <Login  /> 
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;


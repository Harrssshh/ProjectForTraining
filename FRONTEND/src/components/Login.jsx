import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';




const Singup = () => {
    const validationSchema=z.object({
        "email":z.string().min(1,"email is required").email(),
        "password":z.string()
                    .min(8,"password must contain atleast 8 letters")
    })

    const {register,handleSubmit,formState : {errors} }=useForm({
        resolver:zodResolver(validationSchema)
    });
    const dispatch =useDispatch();
    const { isAuth }  = useSelector((state)=>state.auth)

    const navigate=useNavigate();

    const onSubmit= async (Data)=>{
        dispatch(login(Data));
    }

    useEffect(()=>{
      if(isAuth){
        navigate('/');
      }
    },[isAuth]);
    const handleGoogleLogin=()=>{
      window.location.href='http://localhost:3000/api/auth/google'
    }
    
  return (
    <div className='flex w-[100vw] h-[100vh] justify-center items-center '>
      <div className='grid grid-cols-2 gap-5 bg-white w-[85%]'>
        <div className='flex justify-center items-center'>
            <img src="https://imgs.search.brave.com/HGvaHnwhNGF9xbDdlj4jq8sxs3-cXcCx0hxD5IMNpfw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zaWduLWxvZ2lu/LXdlYnNpdGUtcGFn/ZV80MDY4MTEtOTk5/NDIuanBnP3NpemU9/NjI2JmV4dD1qcGc" alt="" />

        </div>
        <div className='flex justify-evenly items-center flex-col'>
            <h1 className='text-4xl font-semibold text-blue-500'>Welcome Back!</h1>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2'>
                    <div>
                        <label className='font-medium text-blue-500'>email :</label>
                        <input type="email" name="email" className={`p-2 border w-[90%] my-2 rounded shadow-xl ${errors.email ? "border-red-500" : "border-gray-500 outline-blue-500"}`} {...register("email")} />
                        {errors.email && (
                            <p className='text-red-500'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='font-medium text-blue-500'>Password :</label>
                        <input type="password" name="password" className={`p-2 border w-[90%] my-2 rounded shadow-xl ${errors.password ? "border-red-500" : "border-gray-500 outline-blue-500"}`}  {...register("password")} />
                        {errors.password && (
                            <p className='text-red-500'>{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <button className='bg-blue-500 w-[95%] h-10 rounded my-4'>Login</button>

                <button className='bg-red-600 w-[95%] h-10 rounded my-4' onClick={handleGoogleLogin}>Login with Google</button>
            </form>
            
        </div>
      </div>
    </div>
  )
}

export default Singup
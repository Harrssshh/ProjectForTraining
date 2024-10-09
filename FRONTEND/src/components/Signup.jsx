import React from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';



const Signup = () => {
    const validationSchema=z.object({
        "name": z.string().min(1,"Name is Required"),
        "email":z.string().min(1,"email is required").email(),
        "password":z.string()
                    .min(8,"password must contain atleast 8 letters")
                    .regex(/[a-z]/,"password must contain atleast 1 lowercase letter")
                    .regex(/[A-Z]/,"password must contain atleast 1 uppercase letter")
                    .regex(/[0-9]/,"password must contain atleast 1 number")
                    .regex(/[\w_]/,"password must contain atleast 1 special character"),
        "phoneNumber":z.string().min(10,"phone number must contain 10 numbers").max(10,"phone number must contain 10 numbers")
    })

    const {register,handleSubmit,formState : {errors} }=useForm({
        resolver:zodResolver(validationSchema)
    });
    const dispatch =useDispatch();

    const onSubmit= async (Data)=>{
        dispatch(signup(Data));
    }

    
  return (
    <div className='flex w-full h-full justify-center items-center '>
      <div className='grid grid-cols-2 gap-5 bg-white w-[85%]'>
        <div className='flex justify-center items-center'>
            <img src="https://th.bing.com/th/id/OIP.vlG3sSKcA4qvJIeaO58Y5AAAAA?rs=1&pid=ImgDetMain" alt="" />

        </div>
        <div className='flex justify-evenly items-center flex-col'>
            <h1 className='text-4xl font-semibold text-blue-500'>Welcome ! Sign up</h1>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2'>
                    <div>
                        <label className='font-medium text-blue-500'>Name :</label>
                        <input type="text" name="name" className={`p-2 w-[90%] border  outline-blue-500 border-gray-500 my-2 rounded shadow-xl ${errors.name ?"border-red-500" : " outline-blue-500"} `} {...register ("name")}/>
                        {errors.name && (
                            <p className='text-red-500'>{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='font-medium text-blue-500'>email :</label>
                        <input type="email" name="email" className={`p-2 border w-[90%] my-2 rounded shadow-xl ${errors.email ? "border-red-500" : "border-gray-500"} outline-blue-500`} {...register("email")} />

                        {errors.email && (
                            <p className='text-red-500'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='font-medium text-blue-500'>Password :</label>
                        <input type="password" name="password" className={`p-2 border border-gray-500 outline-blue-500 w-[90%] my-2 rounded shadow-xl ${errors.password ?"border-red-500" : " border-gray-500 outline-blue-500"} `} {...register ("password")}/>
                        {errors.password && (
                            <p className='text-red-500'>{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='font-medium text-blue-500'>PhoneNumber :</label>
                        <input type="number" name="phoneNumber" className={`p-2 border border-gray-500 outline-blue-500 w-[90%] my-2 rounded shadow-xl ${errors.password ?"border-red-500" : " border-gray-500 outline-blue-500"} `} {...register ("phoneNumber")}/>
                        {errors.phoneNumber && (
                            <p className='text-red-500'>{errors.phoneNumber.message}</p>
                        )}
                    </div>
                </div>
                <button className='bg-blue-500 w-[95%] h-10 rounded my-4'>Sign in</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
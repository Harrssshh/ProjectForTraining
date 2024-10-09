import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset, updateByValue } from '../redux/slices/counterSlice';

const Counter = () => {
    const {count} =useSelector((state)=> state.counter);
    const dispatch=useDispatch();
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <p className='text-7xl font-bold'>{count}</p>
        <div>
            <button className='p-2 border border-black rounded m-2' onClick={()=>{
                dispatch(increment());
            }}>Inc count</button>
            <button className='p-2 border border-black rounded m-2' onClick={()=>{
                dispatch(decrement());
            }}>Desc count</button>
            <button className='p-2 border border-black rounded m-2' onClick={()=>{
                dispatch(reset());
            }}>reset</button>
            <button className='p-2 border border-black rounded m-2' onClick={()=>{
                dispatch(updateByValue(100));
            }}>Inc By Value</button>
        </div>
    </div>
  )
}

export default Counter
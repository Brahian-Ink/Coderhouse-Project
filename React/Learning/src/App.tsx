import { useState } from 'react'
import './App.css'

export default function App(){
  const [count,setCount]= useState<number>(0);
  
  //condiciones de colores 
  let color ="";

  if (count > 0){ color="text-green-500"}
  else if (count < 0){ color="text-red-500"}
  else color ="text-gray-500";
  
  //condicion de textos
  let colortext ="";
  let message="";
  if (count=== 10){message="Límite máximo";colortext="text-yellow-500"}
  if (count=== -10){message="Límite máximo";colortext="text-yellow-500"}

  return(
    <div className='min-h-screen bg-black flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl text-white font-bold'>Contador</h1>
      <p className={`text-xl ${color}`}>{count}</p>
      {message && (
        <p className={`${colortext}`}>{message}</p>

      )}
      <div className=' flex gap-4'>
        <button 
        onClick={()=> { if (count<10){setCount(count+1)}}}
        className='px-4 py-2 cursor-pointer bg-green-500 text-white rounded'
        >+</button>

        <button 
        onClick={()=> { if (count > -10){setCount(count-1)}}}
        className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded'
        >-</button>
      </div>
    </div>
  );
}



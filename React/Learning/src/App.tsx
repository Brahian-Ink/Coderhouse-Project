import { useState } from 'react'
import CounterDisplay from './components/CounterDisplay';
import CounterButtons from './components/CounterButtons';
import ResetButton from './components/ResetButton';
import './App.css'

export default function App(){
  const [count,setCount]= useState<number>(0);
  const Max=count=== 10;
  const Min=count=== -10; 

  function handleIncrement(){
    if(count < 10) setCount(count+1);
  }
  
  function handleDecrement(){
    if(count > -10) setCount(count-1);
  }

  function handleReset(){
    setCount(0);
  }

  return(
    <div className='min-h-screen bg-black flex flex-col items-center justify-center gap-4'>
      <h1 className='text-white text-2xl font-bold'>Contador</h1>
    
      <CounterDisplay count={count}/>
      <CounterButtons 
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      disableIncrement={Max}
      disableDecrement={Min}
      />
      <ResetButton onReset={handleReset}/>
    </div>
  );
}



import React, {useEffect, useState} from 'react'
import './App.css'

function App (){
    const [hour, setHour] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [second, setSecond] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [count, setCount] = useState(1)

    const incrementCount = ()=>{
        if(count <10){
            setCount(count+1)
        }
        if(count >1 ){
            setSecond(parseInt(second)+count)
        }
        if(second<=59){
            setSecond(parseInt(second))
        }
        
    }
    const decrementCount = ()=>{
        if(count>-10){
            setCount(count-1)
        }
        if(count<0){
            setCounter((counter)=>counter+1-count)
        }
    }

    const resetTimer = ()=>{
        setSecond('00')
        setMinutes('00')
        setHour('00')
        setCount(1)
        setCounter(0)
    }

    useEffect(()=>{
        let intervalId;
        if(isActive){
            intervalId= setInterval(()=>{
                const secondCounter = counter % 60
                const minuteCounter = Math.floor(counter/60)
                const hourCounter = Math.floor((counter/(1000*60*60))%24)
                const computedSecond = String(secondCounter).length === 1 ? `0 ${secondCounter}`:secondCounter;
                const computedMinute =String(minuteCounter).length === 1 ? `0 ${minuteCounter}`:minuteCounter;
                const computedHour = String(hourCounter).length ===1 ? `0${hourCounter}`:hourCounter;

                if(computedSecond<=0){
                    setSecond('00')
                    setMinutes('00')
                    setHour('00')
                }else{
                    setSecond(computedSecond);
                    setMinutes(computedMinute)
                    setHour(computedHour)
                }
                setCounter(()=>counter+count)

            },500)
        }
        return ()=>clearInterval(intervalId)

    },[isActive,counter])

    return(
        <div className ="app">
            <div className = "timer">

              <span className='hour'>{hour}</span>
              <span >:</span>
              <span className='minutes'>{minutes}</span>
              <span>:</span>
              <span className='second'>{second}</span>

                
            </div> 
            <div className="buttons">
                <button onClick={()=>setIsActive(!isActive)} className="start">
                {isActive ? 'Pause': 'Start'}</button>
                <button onClick= {resetTimer}>Reset</button>
            </div>
            <div className="count">
                <button onClick = {incrementCount}>+</button>
                <h1>{count}</h1>
                <button onClick= {decrementCount}>-</button>
            </div>
        </div>
    )
}
export default App;
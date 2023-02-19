import {  useRef, useState } from "react";
import "./style.css";


const StopWatch = ()=>{
    
   let [timer,setTimer] = useState({h:0,m:0,s:0,ms:0});
    const [player,setPlayer] = useState([]);
    const [status,setStatus] = useState({start:false,pause:false,reset:true,cast:true})
    const countRef = useRef(null);

    const PauseHandler = ()=>{
        setStatus({...status,start:false,pause:true,reset:false,cast:false})
        clearInterval(countRef.current);
        console.log(player);  
    }
    const StartHandler = ()=>{
        setStatus({...status,start:true,pause:false,reset:false,cast:false})
        countRef.current = setInterval(() =>{
            if(timer.ms<100){
                setTimer({...timer,ms:timer.ms=timer.ms+1});
            } 
            if(timer.ms===100){
                setTimer({...timer,ms:timer.ms=0});
                setTimer({...timer,s:timer.s=timer.s+1});
            }
            if(timer.s===60){
                setTimer({...timer,s:timer.s=0});
                setTimer({...timer,m:timer.m=timer.m+1});
            }
            if(timer.m===60){
                setTimer({...timer,m:timer.m=0});
                setTimer({...timer,h:timer.h=timer.h+1});
            }
          },10)
    }
    const ResetHandler = ()=>{
        setStatus({...status,start:false,pause:false,reset:true,cast:true})
        clearInterval(countRef.current);
        setTimer({...timer,m:timer.m=0,h:timer.h=0,ms:timer.ms=0,s:timer.s=0});
    }

    const CastHandler = ()=>{
        setPlayer([...player,{player:player.length+1,time:`${timer.h}:${timer.m}:${timer.s}:${timer.ms}`}])
    }



   
    

    return (<div className="card-div">
    <div className="card"> 
    <span>{timer.h<10?`0${timer.h}`:timer.h}</span>
    <span>:</span> 
    <span>{timer.m<10?`0${timer.m}`:timer.m}</span>
    <span>:</span>
    <span>{timer.s<10?`0${timer.s}`:timer.s}</span>
    <span>:</span>
    <span>{timer.ms<10?`0${timer.ms}`:timer.ms}</span>
    </div>

    <div className="btn">
       <button id="pause" disabled={status.pause}  onClick={PauseHandler}>Pause</button>
       <button id="start" disabled={status.start} onClick={StartHandler} >Start</button>
       <button id="reset" disabled={status.reset} onClick={ResetHandler}>Reset</button>
       <button id="cast"  disabled={status.cast}  onClick={CastHandler} >Cast</button>
    </div>
      <h4>Cast</h4>
      <div className="player">
       {player.map((item,i)=>{
        return(
        <div>
          <div>{`player ${item.player}`}</div>
          <div id="time">{item.time}</div>
        </div>
        )
       })}
      </div>
    </div>)
    
}
export default StopWatch;
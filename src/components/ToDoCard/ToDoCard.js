import React from 'react'
import "./ToDoCard.css"
import deletIcon from "./delete.png";


function ToDoCard( {index,task,category,deletItem}) {
  const CATEGORY_EMOGI_MAP = {
    learning:"📖",
    work:"📦",
    personal:"🏠",
    health:"🏥",
    shopping:"🛒",
    other:"📦"
}
const CATEGORY_COLORS ={
  learning:"blue",
  work:"red",
  personal:"orange",
  health:"pink",
  shopping:"#ff6600",
  other:"#ff3399"
}
  return (
    <div className='todo-card'>
       <img src={deletIcon} 
       className='delet-icon'
        onClick={()=>{
          deletItem(index)
          }} 
          alt=''
          />

         {task}
         <span className='category' style={{
          backgroundColor:CATEGORY_COLORS[category]
         }}>
        {CATEGORY_EMOGI_MAP[category]}{category}
         </span>
        
    </div>
  )
}

export default ToDoCard
import React from "react"


export default function Question(props) {
   
  return(
        <div className = "quiz-page">
     <h1>{props.quest}</h1>
     <p>{props.id}</p>
     <br></br>
       
    {props.choices.map((title,index) => {
        return (
            <div>
           <label>
            <input
            key={index}
              type="radio"
              value={title}
              name = {props.id}
              
           onClick={props.handleChange}
            />
             {title}
               </label>
               </div>)
      })}
      
    
      
   </div>
    )
}
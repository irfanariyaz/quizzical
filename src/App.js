import React from "react"
import blob from "./images/blobs.png"
import blob1 from "./images/blobsblue.png"
import Question from "./Question"
// import data from "./data"
import { nanoid, random } from 'nanoid'


export default function App() {
    const [startquiz, setStartquiz] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [formdata, setFormdata] = React.useState({})
    const correct_answers = questions.map(elem=>elem.correct_answer)

    function startQuiz() {
        setStartquiz(true)
        const newState = questions.map((item,index )=>{
            const ran =Math.floor(Math.random() * 4)
            item.incorrect_answers.splice(ran,0,item.correct_answer)
          const idval = index+1
            console.log(item.incorrect_answers)
            return {
                ...item,
                id:nanoid()
            }
        })
        setQuestions(newState)
      
        
       
    }
   
    React.useEffect(function () {
        console.log("Effect ran")
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
            
        

    }, [])
    
    function handlechange(event) {
        const { name, value } = event.target
        setFormdata(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
  }   
}) 
console.log(correct_answers)
}
function collectScore(e){
    e.preventDefault();
    console.log("form submitted")
    console.log(formdata)
    let count =0
    const hasVal= Object.values(formdata)
    for (let i=0;i<5;i++){
        if(correct_answers.includes(hasVal[i]))
        count = count+1
    }
    console.log(correct_answers)
    console.log(`you answered ${count} answers correct`)
}
    const questelements = questions.map(prev =>
        (
            <Question
                key={prev.id}
                quest={prev.question}
                correct={prev.correct_answer}
                choices={prev.incorrect_answers}
                 id={prev.id}
                // formdata= {formdata}
                handleChange={handlechange}
            />
        )
        )
   return (


        <main className={startquiz ? "quest-page" : "main"}>

            <img className="blob-image" alt="" src={blob}></img>
            <img className="blob-image1" alt="" src={blob1}></img>

            {startquiz ?
                <div >
                    <form onSubmit={collectScore}>
                        {questelements}
                        <button type="submit">Submit</button>
                    </form>
                </div>

                :
                <div >
                    <h1>Quizzical</h1>
                    <p>Some description if needed</p>
                    <button onClick={startQuiz} className="start-button">Start Quiz</button>

                </div>


            }
        </main>
    )
}
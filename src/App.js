import React from "react"
import blob from "./images/blobs.png"
import blob1 from "./images/blobsblue.png"
import blob_small from "./images/blob5.png"
import blob1_small from "./images/blob5blue.png"

import { nanoid, random } from 'nanoid'


export default function App() {
    const [start, setStart] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [findscore, setfindScore] = React.useState(false)
    const [formData, setFormData] = React.useState([])
    const [nextgame,setNextgame]=React.useState(false)
let eff=0
    const correct_answers = questions.map(elem => elem.correct_answer)

    React.useEffect(function () {
          fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
            
    }, [nextgame])

    function startQuiz() {
        setStart(true)
        const newState = questions.map((item) => {
            const ran = Math.floor(Math.random() * 4)
            item.incorrect_answers.splice(ran, 0, item.correct_answer)
            return {
                ...item,
                id: nanoid(),

            }
        })
        setQuestions(newState)
       
    }
    console.log("findscore",findscore)

    function handleChange(e) {
        const { name, value, checked } = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    
    const selectedAnswers = Object.values(formData)

    function collectScore(e) {
        e.preventDefault()
        if(!findscore){
        setfindScore(true)
       let total_score =0
        const selectedAnswers = Object.values(formData)

        for (let i= 0; i<selectedAnswers.length; i++) {

            if (correct_answers.includes(selectedAnswers[i])) {
               total_score =total_score+1
                }
      }
        setScore(total_score)
    }
        else{
            setStart(false)
            setScore(0)
            setNextgame(true)
            setFormData([])
            setfindScore(false)
          
            }
        
    }

    return (
        <main className={start ? "quest-page" : "main-page"}>

           

            {start ?
            <>
                   <img className="blob-image" alt="" src={blob_small}></img>
                   <img className="blob-image1" alt="" src={blob1_small}></img>
                <div >
                    <form className="form" onSubmit={collectScore}>
                        {questions.map(question => {
                            return (
                                <div className="question">
                                    <p>{question.question}</p>
                                    <div>
                                        <div className="choices">
                                            {question.incorrect_answers.map((option, index) => {
                                                let corr = option === question.correct_answer ? true : false
                                                let sel = selectedAnswers.includes(option)
                                                const radio_name = question.id
                                                const style = {
                                                    backgroundColor: corr && findscore ? "#94D7A2" : findscore && sel && !corr ? "#F8BCBC" : ":#4D5B9E;"

                                                }
                                                return (

                                                    <div className="option">


                                                        <input
                                                            id={`${radio_name}${index}`}
                                                            key={index}
                                                            type="radio"
                                                            value={option}
                                                            name={question.id}
                                                            // checked={formData.radio_name === `${option}` }
                                                            onChange={handleChange}

                                                        />
                                                        <label style={style} htmlFor={`${radio_name}${index}`}>
                                                            {option}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <hr />

                                    </div>
                                    
                                </div>
                              
                            )
                        })}
                    
                        <div className="score-section">
                        {findscore && <p>You scored {score}/5 correct answers</p> }
                        <button className={findscore? "start-button small-button":"start-button small-button btn "}type="submit">{!findscore ? "Check Answers" : "play again"}</button>
                        </div>
                    </form>
                </div>
                </>

                :
                <>
                <img className="blob-image" alt="" src={blob}></img>
                <img className="blob-image1" alt="" src={blob1}></img>
                <div >
                    <h1>Quizzical</h1>
                    <p>Some description if needed</p>
                    <button onClick={startQuiz} className="start-button ">Start Quiz</button>

                </div>
                </>


            }
        </main>
    )
}
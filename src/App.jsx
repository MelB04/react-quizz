import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Question from './components/question'
import TableauDeReponse from './components/ResultatQuizz'
import Reload from './components/reload'

function App() {
  const [stade, setStade] = useState(0);
  const [start, setStart] = useState(false);
  const [points, setPoints] = useState(0);
  const quizz = [
    { question: "Quel est la capitale de la FRANCE ? ", options: ["Paris", "Madrid"], bonne: "Paris" },
    { question: "Quel est la capitale de l'ESPAGNE ? ", options: ["Paris", "Madrid"], bonne: "Madrid" },
    { question: "Quel est la capitale de l'allemagne ? ", options: ["Paris", "Madrid", "Berlin"], bonne: "Berlin" }
  ];

  const [terminer, setTerminer] = useState(false);
  const [timer, setTimer] = useState(60);

  function lancer() {
    setStart(true);
  }

  function fin() {
    setTerminer(true);
  }

  // timer
  let tempsDecompter = setInterval(() => setTimer(timer - 1), 1000);

  function repondre(stade, index) {
    if (quizz[stade].bonne == quizz[stade].options[index]) {
      setPoints(points + 1);
    }

    if (stade == quizz.length - 1) {
      fin();
    } else {
      clearInterval(tempsDecompter);
      setStade(stade + 1);
      setTimer(60);
    }
  }

  // console.log("points", points);

  return (
    <>
      <h1>Mon QUIZ</h1>

      {start ? (
          !terminer ? (
            <>
              <p>{timer} secondes restantes</p>
              <div className="question">
                {/* afficher la question une par une*/}
                <p>{quizz[stade].question}</p>

                {/* afficher les options  */}
                {quizz[stade].options.map((option, index) => (
                  <button key={index} onClick={() => { repondre(stade, index) }}>{option}</button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p>Terminé</p>
              <p>Vous avez eu {points} point(s).</p>
              
              <div><TableauDeReponse quizz={quizz}/></div>
              <div><Reload /></div>
            </>
          )
        ) : (
          <>
            <button onClick={() => { lancer() }}>Lancer le jeu</button>
          </>
        )
      }
    </>
  )
}

export default App

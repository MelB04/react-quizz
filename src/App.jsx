import React, { useState, useEffect } from 'react'
import './App.css'
import Question from './components/question'
import EcranDeFin from './components/EcranDeFin'
import Button from './components/Button'
import PartieAdministrateur from './components/partieAdministrateur'

function App() {
  const motDePasse = "1234"; //mot de passe pour administrateur
  const [nbEssaiMotDePasse, setNbEssaiMotDePasse] = useState(3);
  const [stade, setStade] = useState(0);
  const [partieAdministrateur, setPartieAdministrateur] = useState(false);
  const [start, setStart] = useState(false);
  const [mesReponses, setMesReponses] = useState([]);
  const [points, setPoints] = useState([]);
  const [totalQuizz, setTotalQuizz] = useState(0);
  const [terminer, setTerminer] = useState(false);
  const [timer, setTimer] = useState(10);
  let tempsDecompter;
  const [quizz, setQuizz] = useState([
    { question: "Quel est la capitale de la FRANCE ? ", options: ["Paris", "Madrid"], bonne: "Paris" },
    { question: "Quel est la capitale de l'ESPAGNE ? ", options: ["Paris", "Madrid"], bonne: "Madrid" },
    { question: "Quel est la capitale de l'allemagne ? ", options: ["Paris", "Madrid", "Berlin"], bonne: "Berlin" },
    { question: "Quel est l'organe responsable de la pompe du sang dans le corps humain ?", options: ["Le coeur", "Le cerveau", "Le foie"], bonne: "Le coeur" },
    { question: "Quel est l'élément chimique le plus abondant dans l'univers ?", options: ["L'hydrogène", "L'oxygène", "Le carbone"], bonne: "L'hydrogène" },
    { question: "Qui a peint la Joconde ?", options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"], bonne: "Leonardo da Vinci" },
    { question: "Quelle est la capitale du Japon ?", options: ["Pékin", "Tokyo", "Séoul"], bonne: "Tokyo" },
    { question: "Quel est le plus grand océan du monde ?", options: ["L'océan Atlantique", "L'océan Indien", "L'océan Pacifique"], bonne: "L'océan Pacifique" },
    { question: "Qui a écrit 'Hamlet' ?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen"], bonne: "William Shakespeare" },
    { question: "Quelle est la plus haute montagne du monde ?", options: ["Mont Everest", "Mont Kilimandjaro", "Mont Blanc"], bonne: "Mont Everest" },
    { question: "Combien de continents y a-t-il sur Terre ?", options: ["Quatre", "Cinq", "Sept"], bonne: "Sept" },
    { question: "Quel est l'inventeur du téléphone ?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla"], bonne: "Alexander Graham Bell" }
  ]);

  function lancer(){
    setStart(true);
  }
  function fin() {
    setTerminer(true);
  }

  // timer
  useEffect(() => {
    setTimer(10);
  }, [stade]);
  useEffect(() => {
      if (start && timer > 0) {
        tempsDecompter = setInterval(() => { setTimer(timerPrev => timerPrev - 1) }, 1000);
      } else {
        clearInterval(tempsDecompter);

        if (timer == 0) {
          passerQuestion();
        }
      }
    return () => clearInterval(tempsDecompter);
  }, [start, timer]);

  function passerQuestion() {
    setMesReponses([...mesReponses, "Rien"]);
    setPoints([...points, 0]);

    if (stade == quizz.length - 1) {
      fin();
    } else {
      setStade(stade + 1);
    }
  }

  function repondre(stade, index) {
    setMesReponses([...mesReponses, quizz[stade].options[index]])

    if (quizz[stade].bonne == quizz[stade].options[index]) {
      setPoints([...points, 1]);
      setTotalQuizz(totalQuizz + 1);
    } else {
      setPoints([...points, 0]);
    }

    if (stade == quizz.length - 1) {
      fin();
    } else {
      setStade(stade + 1);
    }
  }

  function accederAdministrateur() {
    if (nbEssaiMotDePasse > 0) {
      const essai = prompt("Quel est le mot de passe administrateur ?")
      setNbEssaiMotDePasse(nbEssaiMotDePasse - 1);
      if (essai == motDePasse) {
        setPartieAdministrateur(true)
        setNbEssaiMotDePasse(3);
      } else {
        if ((nbEssaiMotDePasse - 1) == 0) {
          alert("erreur");
        } else {
          alert(`erreur, encore ${nbEssaiMotDePasse - 1} essai(s)`);
        }
      }
    } else {
      alert("Vous avez bloqué l'espace !");
    }
  }

  return (
    <>
      <h1>Mon QUIZ</h1>

      {!partieAdministrateur && (
        start ? (
          !terminer ? (
            <>
              <p>{timer} secondes restantes</p>
              <Question quizz={quizz} stade={stade} repondre={repondre} />
            </>
          ) : (
            <>
              <EcranDeFin quizz={quizz} points={points} totalQuizz={totalQuizz} mesReponses={mesReponses} />
            </>
          )
        ) : (
          <Button className="button" handleClick={lancer}>Commencer le jeu </Button>
        )
      )}

      {partieAdministrateur ? (
        <PartieAdministrateur quizz={quizz} setQuizz={setQuizz} partieAdministrateur={partieAdministrateur} setPartieAdministrateur={setPartieAdministrateur} />
      ) : (
        !start ? (<Button handleClick={accederAdministrateur}>Accéder à la partie administrateur</Button>) : (<p></p>)
      )}
    </>
  )
}

export default App

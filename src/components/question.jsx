function Question({ quizz, stade, repondre }) {
    return (
        <>
            <div className="question">
                <p>{quizz[stade].question}</p> {/* afficher la question une par une*/}
                {quizz[stade].options.map((option, index) => (
                <button key={index} onClick={() => { repondre(stade, index) }}>{option}</button>
                ))}
            </div>
        </>
    )
}

export default Question

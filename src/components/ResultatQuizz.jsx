function ResultatQuizz({ quizz  }) {
    return (
        <>
            {quizz.map((oneQuestion, index) => (
                <p key={`reponse-${index}`}>{oneQuestion.question} : Bonne réponse {oneQuestion.bonne}</p>
            ))}
        </>
    )
}

export default ResultatQuizz

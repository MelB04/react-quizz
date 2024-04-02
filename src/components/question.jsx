function Question({ oneQuestion, handleClick }) {
    return (
        <>
            <p>{oneQuestion.question}</p>
            {oneQuestion.options.map((option, index) => (
                <button key={index} onClick={handleClick}>{option}</button>
            ))}
        </>
    )
}

export default Question

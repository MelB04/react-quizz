function ResultatQuizz({ quizz, points, mesReponses, totalQuizz }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Question</th>
                        <th scope="col">Bonne réponse</th>
                        <th scope="col">Ma réponse</th>
                        <th scope="col">sousTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {quizz.map((oneQuestion, index) => (
                        <tr key={`reponse-${index}`} className={points[index] == 1 ? `bonneReponse` : `mauvaiseReponse` }>
                            <th scope="row">{index + 1}</th>
                            <td>{oneQuestion.question}</td>
                            <td>{oneQuestion.bonne}</td>
                            <td>{mesReponses[index]}</td>
                            <td>{ points[index] == 1 ? (
                                `${points[index]} point en plus`
                                ) : (
                                    `Mince`
                                )}
                            </td>   
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <th scope="row" colSpan="4">Nombre de points</th>
                        <td>{totalQuizz}/{quizz.length}</td>
                    </tr>
                </tfoot>

            </table>
                
        </>
    )
}

export default ResultatQuizz

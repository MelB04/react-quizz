import TableauDeReponse from './ResultatQuizz'
import Button from './Button'

function EcranDeFin({ quizz, points, totalQuizz, mesReponses }) {
    return (
        <div className="divFin">
            <h2>Terminé</h2>
            <p>Vous avez eu {totalQuizz} point(s).</p>

            <div className='margin'>
                <h3>Récapitulatif de la partie</h3>
                <TableauDeReponse quizz={quizz} points={points} totalQuizz={totalQuizz} mesReponses={mesReponses} />
            </div>
            <Button handleClick={() => window.location.reload()}>Menu du jeu</Button>            
        </div>
    )
}

export default EcranDeFin

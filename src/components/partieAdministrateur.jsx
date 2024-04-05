import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

function PartieAdministrateur({ quizz, setQuizz, partieAdministrateur, setPartieAdministrateur }) {
    const [status, setStatus] = useState("");
    const [optionAAjouter, setOptionAAjouter] = useState("");
    const [indexEnAction, setIndexEnAction] = useState(0);
    const [addOrEditQuestion, setAddOrEditQuestion] = useState({ question: "", bonne: "", options: [] });

    const deleteQuestion = (index) => {
        if (quizz[index] != "") {
            const updatedQuizz = [...quizz];
            delete updatedQuizz[index];
            setQuizz(updatedQuizz.filter((element) => element != undefined));
        }
    };

    const deleteOption = (indexToDelete) => {
        setAddOrEditQuestion(prevState => ({
            ...prevState,
            options: prevState.options.filter((_, index) => index !== indexToDelete)
        }));
    };

    const addOption = () => {
        if (optionAAjouter != "") {
            const found = addOrEditQuestion.options.find((option) => option == optionAAjouter);
            if (found == undefined) {
                const tabOptionTemp = [...addOrEditQuestion.options, optionAAjouter];
                setAddOrEditQuestion(prevState => ({ ...prevState, options: [...tabOptionTemp] }))
                setOptionAAjouter("");
            } else {
                alert("Existe déjà !");
            }
        } else {
            alert("Vide")
        }

    };

    const sauvegarderModification = () => {
        if (addOrEditQuestion.question == "" || addOrEditQuestion.bonne == "" || addOrEditQuestion.options.length == 0) {
            alert("Il faut remplir completement le formulaire");
        } else {
            const foundBonne = addOrEditQuestion.options.find((option) => option == addOrEditQuestion.bonne);
            if (foundBonne != undefined && addOrEditQuestion.options.length >= 2 && addOrEditQuestion.options.length <= 6) {
                if (status == "add") {
                    const tabQuizzTemp = [...quizz, addOrEditQuestion];
                    setQuizz([...tabQuizzTemp])
                } else {
                    const tabQuizzTemp = [...quizz];
                    tabQuizzTemp[indexEnAction] = addOrEditQuestion;
                    setQuizz([...tabQuizzTemp]);
                }
                setAddOrEditQuestion({ question: "", bonne: "", options: [] });
                setOptionAAjouter("");
                setStatus("");
                setIndexEnAction(0);
            } else {
                alert("Veuillez vérifier votre sélection. Il semble qu'il y ait une erreur ou que vous n'ayez pas sélectionné le bon nombre d'options.")
            }
        }
    };

    return (
        <div>
            <h2>Partie Administrateur</h2>
            {(status === "add" || status === "edit") ? (
                <div>
                    <div className="input">
                        <label htmlFor="joueur">Insérez votre question</label>
                        <input type="text" placeholder="Votre nom" name="joueur" id="joueur" value={addOrEditQuestion.question} onChange={(e) => setAddOrEditQuestion({ ...addOrEditQuestion, question: e.target.value })} />
                    </div>

                    <div className="input">
                        <label htmlFor="joueur">Quelles sont les options que vous proposez</label>
                        <p>Les options déjà renseignées :</p>
                        {addOrEditQuestion.options.length > 0 ? (
                            <>
                                <ul>
                                    {addOrEditQuestion.options.map((option, index) => (
                                        <li key={`option-${index}`}>
                                            {option}
                                            <Button handleClick={() => deleteOption(index)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (<p> Aucune option</p>)}
                        {addOrEditQuestion.options.length < 6 && (
                            <div >
                                <input type="text" placeholder="Votre nom" name="joueur" id="joueur" value={optionAAjouter} onChange={(e) => setOptionAAjouter(e.target.value)} />
                                <Button handleClick={addOption}>Ajouter l'option</Button>
                            </div>
                        )}
                    </div>

                    <div className="input">
                        <label htmlFor="joueur">Quelle est la bonne réponse</label>
                        <input type="text" placeholder="Votre nom" name="joueur" id="joueur" value={addOrEditQuestion.bonne} onChange={(e) => setAddOrEditQuestion({ ...addOrEditQuestion, bonne: e.target.value })} />
                    </div>

                    <Button handleClick={sauvegarderModification}>{status == "add" ? `Ajouter` : `Modifier`} une nouvelle question <FontAwesomeIcon icon={faPlus} /></Button>
                    <Button handleClick={() => {
                        setStatus("");
                        setIndexEnAction(0);
                        setAddOrEditQuestion({ question: "", bonne: "", options: [] });
                    }}>Retour</Button>
                </div>

            ) : (
                <>
                    <Button handleClick={() => setStatus("add")}>Ajouter une nouvelle question <FontAwesomeIcon icon={faPlus} /></Button>

                    <h3>Liste des questions</h3>
                    <div>
                        {quizz.length != 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">N°</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Les options</th>
                                        <th scope="col">Bonne réponse</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizz.map((oneQuestion, index) => (
                                        <tr key={`reponse-${index}`}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{oneQuestion.question}</td>
                                            <td>{oneQuestion.options.join(' ')}</td>
                                            <td>{oneQuestion.bonne}</td>
                                            <td>
                                                <Button handleClick={() => {
                                                    setStatus("edit");
                                                    setAddOrEditQuestion(oneQuestion);
                                                    setIndexEnAction(index);
                                                }}><FontAwesomeIcon icon={faPen} /></Button>
                                                <Button quizz={quizz} handleClick={() => deleteQuestion(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Plus aucune question</p>
                        )}
                    </div>

                    <Button handleClick={() => { setPartieAdministrateur(false) }}>Sortir de la partie administrateur</Button>
                </>
            )}
        </div>
    )
}

export default PartieAdministrateur

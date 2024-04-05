function Button({handleClick, children , quizz}) {
    return <button onClick={handleClick} >{children}</button>
}

export default Button
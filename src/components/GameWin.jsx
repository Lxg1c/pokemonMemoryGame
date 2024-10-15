import '../styles/GameScreens.css'

const GameWin = () => {
	return (
		<div className='game-win screen'>
			<h2>You won!</h2>
			<p>You have scored the maximum number of points</p>
			<p>Score: {score}</p>
			<button onClick={onRestart}>Начать заново</button>
		</div>
	)
}

export default GameWin

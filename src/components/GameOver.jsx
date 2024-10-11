import React from 'react'
import '../styles/GameScreens.css'

const GameOverScreen = ({ score, bestScore, onRestart }) => {
	return (
		<div className='game-over-screen screen'>
			<h2>Game Over!</h2>
			<div className='game-over__score score'>
				<p className='screen-score'>Score: {score}</p>
				<p className='screen-score'>Best Score: {bestScore}</p>
			</div>

			<button className='restart-btn game-btn' onClick={onRestart}>
				Restart Game
			</button>
		</div>
	)
}

export default GameOverScreen

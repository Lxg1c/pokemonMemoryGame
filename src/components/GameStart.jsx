import React from 'react'
import '../styles/GameScreens.css'

const StartScreen = ({ onStart }) => {
	return (
		<div className='start-screen screen'>
			<h2>Welcome to the Game!</h2>
			<button className='start-btn game-btn' onClick={onStart}>
				Start Game
			</button>
		</div>
	)
}

export default StartScreen

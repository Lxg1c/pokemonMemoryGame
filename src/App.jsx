import { useState, useEffect } from 'react'
import './App.css'
import PlayField from './components/PlayField'
import Score from './components/Score'
import Loader from './components/Loader'
import GameOverScreen from './components/GameOver'
import StartScreen from './components/GameStart'
import Logo from './assets/pokemon_logo.png'
import pokemonNamesArray from './data'
import fetchAllData from './components/FetchData'
import GameWin from './components/GameWin'

function App() {
	const [pokemonData, setPokemonData] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [score, setScore] = useState(0)
	const [loader, setLoader] = useState(false) // Loader теперь не показывается до начала игры
	const [gameStarted, setGameStarted] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [win, setWin] = useState(false) // Исправлено: isWin -> setWin

	const handleStartGame = () => {
		setLoader(true) // Показываем Loader при начале игры
		setGameStarted(true)

		fetchAllData(pokemonNamesArray)
			.then(data => {
				console.log('Loading data...')
				setPokemonData(data)
				setLoader(false) // Скрываем Loader после загрузки данных
			})
			.catch(error => {
				console.error('Error fetching data:', error)
				setLoader(false) // Скрываем Loader в случае ошибки
			})
	}

	const handleGameOver = () => {
		if (score === pokemonData.length) {
			setWin(true)
		} else {
			setGameOver(true)
		}
		localStorage.setItem('bestScore', score)
	}

	const handleRestartGame = () => {
		setClickedPokemon([])
		setScore(0)
		setGameOver(false)
		setWin(false) // Сбрасываем состояние победы
		// Убираем сброс состояния gameStarted
	}

	return (
		<div className='pokemon-game'>
			<header className='header'>
				<div className='header-logo'>
					<img className='logo' src={Logo} alt='Game Logo' />
					<h3 className='logo-title'>Memory Game</h3>
				</div>
			</header>

			{!gameStarted && !gameOver && !win && (
				<StartScreen onStart={handleStartGame} />
			)}
			{gameOver && (
				<GameOverScreen
					score={score}
					bestScore={localStorage.getItem('bestScore')}
					onRestart={handleRestartGame}
				/>
			)}
			{win && (
				<GameWin
					score={score}
					bestScore={localStorage.getItem('bestScore')}
					onRestart={handleRestartGame}
				/>
			)}

			{loader ? (
				<Loader />
			) : (
				gameStarted &&
				!gameOver &&
				!win && (
					<>
						<Score score={score} setScore={setScore} />
						<PlayField
							pokemonData={pokemonData}
							setPokemonData={setPokemonData}
							clickedPokemon={clickedPokemon}
							setClickedPokemon={setClickedPokemon}
							score={score}
							setScore={setScore}
							onGameOver={handleGameOver}
						/>
					</>
				)
			)}

			<footer className='footer'></footer>
		</div>
	)
}

export default App

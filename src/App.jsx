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

function App() {
	const [pokemonData, setPokemonData] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [score, setScore] = useState(0)
	const [loader, setLoader] = useState(true)
	const [gameStarted, setGameStarted] = useState(false)
	const [gameOver, setGameOver] = useState(false)

	useEffect(() => {
		fetchAllData(pokemonNamesArray)
			.then(data => {
				setPokemonData(data)
				setLoader(false)
			})
			.catch(error => {
				console.error('Error fetching data:', error)
				setLoader(false)
			})
	}, [])

	const handleStartGame = () => {
		setGameStarted(true)
	}

	const handleGameOver = () => {
		setGameOver(true)
	}

	const handleRestartGame = () => {
		setClickedPokemon([])
		setScore(0)
		setGameOver(false)
	}

	return (
		<div className='pokemon-game'>
			<header className='header'>
				<div className='header-logo'>
					<img className='logo' src={Logo} alt='Game Logo' />
					<h3 className='logo-title'>Memory Game</h3>
				</div>
			</header>

			{!gameStarted && !gameOver && <StartScreen onStart={handleStartGame} />}
			{gameOver && (
				<GameOverScreen
					score={score}
					bestScore={localStorage.getItem('bestScore')}
					onRestart={handleRestartGame}
				/>
			)}

			{loader ? (
				<Loader />
			) : (
				gameStarted &&
				!gameOver && (
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

import { useState, useEffect } from 'react'
import './App.css'
import PlayField from './components/PlayField'
import Score from './components/Score'
import Loader from './components/Loader'
import Logo from './assets/pokemon_logo.png'
import pokemonNamesArray from './data'
import fetchAllData from './components/FetchData'

function App() {
	const [pokemonData, setPokemonData] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [score, setScore] = useState(0)
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		fetchAllData(pokemonNamesArray)
			.then(data => {
				setPokemonData(data)
				setLoader(true) // Устанавливаем loader в false после загрузки данных
			})
			.catch(error => {
				console.error('Error fetching data:', error)
				setLoader(false) // Устанавливаем loader в false в случае ошибки
			})
	}, [pokemonNamesArray, setPokemonData])

	return (
		<div className='pokemon-game'>
			<header className='header'>
				<div className='header-logo'>
					<img className='logo' src={Logo} alt='Game Logo' />
					<h3 className='logo-title'>Memory Game</h3>
				</div>

				<div className='header-score'>
					<Score score={score} setScore={setScore} />
				</div>
			</header>
			{loader ? (
				<PlayField
					pokemonData={pokemonData}
					setPokemonData={setPokemonData}
					clickedPokemon={clickedPokemon}
					setClickedPokemon={setClickedPokemon}
					score={score}
					setScore={setScore}
				/>
			) : (
				<Loader />
			)}
			<footer className='footer'></footer>
		</div>
	)
}

export default App

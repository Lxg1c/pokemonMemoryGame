import { useState } from 'react'
import './App.css'
import PlayField from './components/PlayField'
import Score from './components/Score'
import Logo from './assets/pokemon_logo.png'

const pokemonNamesArray = [
	{ name: 'Pikachu' },
	{ name: 'Charizard' },
	{ name: 'Bulbasaur' },
	{ name: 'Squirtle' },
	{ name: 'Jigglypuff' },
	{ name: 'Meowth' },
	{ name: 'Gengar' },
	{ name: 'Gyarados' },
	{ name: 'Dragonite' },
	{ name: 'Mewtwo' },
	{ name: 'Eevee' },
	{ name: 'Snorlax' },
	{ name: 'Lapras' },
	{ name: 'Vaporeon' },
	{ name: 'Flareon' },
	{ name: 'Jolteon' },
	{ name: 'Mew' },
	{ name: 'Charmander' },
]

function App() {
	const [pokemonData, setPokemonData] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [score, setScore] = useState(0)
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
			<PlayField
				pokemonNamesArray={pokemonNamesArray}
				pokemonData={pokemonData}
				setPokemonData={setPokemonData}
				clickedPokemon={clickedPokemon}
				setClickedPokemon={setClickedPokemon}
				score={score}
				setScore={setScore}
			/>
			<footer className='footer'></footer>
		</div>
	)
}

export default App

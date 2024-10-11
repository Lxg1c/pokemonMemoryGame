import React, { useState, useEffect, useCallback, useMemo } from 'react'
import CardLogo from '../assets/card.png'
import '../styles/PlayField.css'

function shuffleCards(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
}

const PlayField = ({
	pokemonData,
	setPokemonData,
	clickedPokemon,
	setClickedPokemon,
	score,
	setScore,
	onGameOver,
}) => {
	const [flippedCards, setFlippedCards] = useState([])

	const handleClick = useCallback(
		(e, pokemon) => {
			e.preventDefault()

			if (clickedPokemon.includes(pokemon.name)) {
				onGameOver()
			} else {
				setScore(score + 1)
				setClickedPokemon([...clickedPokemon, pokemon.name])
			}

			// Переворачиваем все карты
			setFlippedCards(pokemonData.map(p => p.name))

			setTimeout(() => {
				setFlippedCards([])
			}, 2000)

			// Перемешиваем карты после анимации поворота
			setTimeout(() => {
				const newPokemonData = [...pokemonData]
				shuffleCards(newPokemonData)
				setPokemonData(newPokemonData)
				// Возвращаем все карты в исходное положение
			}, 1000) // Длительность анимации поворота
		},
		[
			pokemonData,
			setPokemonData,
			clickedPokemon,
			setClickedPokemon,
			setScore,
			score,
			onGameOver,
		]
	)

	const memoizedPokemonData = useMemo(() => {
		return pokemonData.map(pokemon => (
			<div
				key={pokemon.name}
				className={`pokemon-card ${
					flippedCards.includes(pokemon.name) ? 'flipped' : ''
				}`}
				onClick={e => handleClick(e, pokemon)}
			>
				<img src={pokemon.img} alt={pokemon.name} />
				<h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
				<div className='back'>
					<img src={CardLogo} alt='Logo' className='cardLogo' />
				</div>
			</div>
		))
	}, [flippedCards, handleClick, pokemonData])

	return <div className='field'>{memoizedPokemonData}</div>
}

export default PlayField

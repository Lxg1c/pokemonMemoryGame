import { useState, useEffect } from 'react'
import '../styles/Score.css'

export default function Score({ score, setScore }) {
	const [bestScore, setBestScore] = useState(0)

	// Загрузка лучшего счета из локального хранилища при монтировании компонента
	useEffect(() => {
		const savedBestScore = localStorage.getItem('bestScore')
		if (savedBestScore) {
			setBestScore(parseInt(savedBestScore, 10))
		}
	}, [])

	// Обновление лучшего счета и сохранение его в локальное хранилище
	useEffect(() => {
		if (score == 0) {
			if (score > bestScore) {
				setBestScore(score)
				localStorage.setItem('bestScore', score.toString())
			}
		}
	}, [score, bestScore])

	return (
		<div className='score-info'>
			<h3 className='score'>Score: {score}</h3>
			<h3 className='best-score'>Best Score: {bestScore}</h3>
		</div>
	)
}

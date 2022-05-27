import React from 'react';
import { useEffect, useState } from 'react';

import style from './Ranking.module.scss';

const Ranking = () => {
	const [timeResults, setTimeResults] = useState([]);
	const [movesResults, setMovesResults] = useState([]);

	useEffect(() => {
		setTimeResults(JSON.parse(localStorage.getItem('timeResults')));
		setMovesResults(JSON.parse(localStorage.getItem('movesResults')));
	}, []);

	return (
		<div>
			<div>
				<h1>Top 5 by time</h1>
				<div>
					<div>
						<p>Easy</p>
						<p>Medium</p>
						<p>Hard</p>
					</div>
					<div>
						{Object.keys(timeResults).length > 0 &&
							timeResults.easy.map(elem => {
								return (
									<div key={Math.random()}>
										<p>{elem.time}</p>
										<p>{elem.moves}</p>
									</div>
								);
							})}
					</div>
					<div>
						{Object.keys(timeResults).length > 0 &&
							timeResults.medium.map(elem => {
								return (
									<div key={Math.random()}>
										<p>{elem.time}</p>
										<p>{elem.moves}</p>
									</div>
								);
							})}
					</div>
					<div>
						{Object.keys(timeResults).length > 0 &&
							timeResults.hard.map(elem => {
								return (
									<div key={Math.random()}>
										<p>{elem.time}</p>
										<p>{elem.moves}</p>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ranking;

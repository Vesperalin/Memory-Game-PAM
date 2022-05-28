import React from 'react';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';

import style from './Ranking.module.scss';
import buttonStyle from '../../styles/Button.module.scss';
import onHoverSound from '../../assets/click.mp3';

const Ranking = () => {
	const [play, { stop }] = useSound(onHoverSound);
	const [timeResults, setTimeResults] = useState([]);
	const [movesResults, setMovesResults] = useState([]);
	const navigate = useNavigate();
	let times = [];

	useEffect(() => {
		setTimeResults(JSON.parse(localStorage.getItem('timeResults')));
		setMovesResults(JSON.parse(localStorage.getItem('movesResults')));
	}, []);

	if (timeResults.easy !== undefined) {
		times = timeResults.easy;

		if (timeResults.medium.length > times.length) {
			times = timeResults.medium;
		}

		if (timeResults.hard.length > times.length) {
			times = timeResults.hard;
		}
	}

	const getTime = timeInSeconds => {
		const h = Math.floor(timeInSeconds / 3600);
		const m = Math.floor((timeInSeconds % 3600) / 60);
		const s = Math.floor((timeInSeconds % 3600) % 60);
		return h + ':' + m + ':' + s;
	};

	return (
		<div className={style.ranking}>
			<div className={style.wrapper}>
				<h1>Top 5 by time</h1>
				<div className={style.table}>
					<table>
						<thead>
							<tr>
								<td>Rank</td>
								<td>Easy</td>
								<td>Medium</td>
								<td>Hard</td>
							</tr>
						</thead>
						<tbody>
							{times !== [] &&
								times.map((result, index) => {
									return (
										<tr key={Math.random()}>
											<td>{index + 1}</td>
											<td>
												<span>
													{timeResults.easy[index] !== undefined &&
														'Time: ' + getTime(timeResults.easy[index].time)}
												</span>
												<span>
													{timeResults.easy[index] !== undefined &&
														'Moves: ' + timeResults.easy[index].moves}
												</span>
											</td>
											<td>
												<span>
													{timeResults.medium[index] !== undefined &&
														'Time: ' + getTime(timeResults.medium[index].time)}
												</span>
												<span>
													{timeResults.medium[index] !== undefined &&
														'Moves: ' + timeResults.medium[index].moves}
												</span>
											</td>
											<td>
												<span>
													{timeResults.hard[index] !== undefined &&
														'Time: ' + getTime(timeResults.hard[index].time)}
												</span>
												<span>
													{timeResults.hard[index] !== undefined &&
														'Moves: ' + timeResults.hard[index].moves}
												</span>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<div className={style.wrapper}>
				<h1>Top 5 by moves</h1>
				<div className={style.table}>
					<table>
						<thead>
							<tr>
								<td>Rank</td>
								<td>Easy</td>
								<td>Medium</td>
								<td>Hard</td>
							</tr>
						</thead>
						<tbody>
							{times !== [] &&
								times.map((result, index) => {
									return (
										<tr key={Math.random()}>
											<td>{index + 1}</td>
											<td>
												<span>
													{movesResults.easy[index] !== undefined &&
														'Moves: ' + movesResults.easy[index].moves}
												</span>
												<span>
													{movesResults.easy[index] !== undefined &&
														'Time: ' + getTime(movesResults.easy[index].time)}
												</span>
											</td>
											<td>
												<span>
													{movesResults.medium[index] !== undefined &&
														'Moves: ' + movesResults.medium[index].moves}
												</span>
												<span>
													{movesResults.medium[index] !== undefined &&
														'Time: ' + getTime(movesResults.medium[index].time)}
												</span>
											</td>
											<td>
												<span>
													{movesResults.hard[index] !== undefined &&
														'Moves: ' + movesResults.hard[index].moves}
												</span>
												<span>
													{movesResults.hard[index] !== undefined &&
														'Time: ' + getTime(movesResults.hard[index].time)}
												</span>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<button
				onClick={() => navigate('/')}
				className={buttonStyle.button + ' ' + style.button}
				onMouseEnter={() => play()}
				onMouseLeave={() => stop()}
			>
				Back
			</button>
		</div>
	);
};

export default Ranking;

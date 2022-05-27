import React from 'react';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSound from 'use-sound';
import { useStopwatch } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';
import { Fireworks } from 'fireworks/lib/react';

import style from './Game.module.scss';
import buttonStyle from '../../styles/Button.module.scss';
import coverImage from '../../assets/cover.jpg';
import image1 from '../../assets/monsters-01.png';
import image2 from '../../assets/monsters-02.png';
import image3 from '../../assets/monsters-03.png';
import image4 from '../../assets/monsters-04.png';
import image5 from '../../assets/monsters-05.png';
import image6 from '../../assets/monsters-06.png';
import image7 from '../../assets/monsters-07.png';
import image8 from '../../assets/monsters-08.png';
import image9 from '../../assets/monsters-09.png';
import image10 from '../../assets/monsters-10.png';
import image11 from '../../assets/monsters-11.png';
import image12 from '../../assets/monsters-12.png';
import image13 from '../../assets/monsters-13.png';
import image14 from '../../assets/monsters-14.png';
import image15 from '../../assets/monsters-15.png';
import image16 from '../../assets/monsters-16.png';
import Card from '../../components/card/Card';
import matchSound from '../../assets/match.mp3';
import fanfareSound from '../../assets/fanfare.mp3';
import Modal from '../../components/modal/Modal';

const cardImages = [
	{ src: image1, number: 1, matched: false },
	{ src: image2, number: 2, matched: false },
	{ src: image3, number: 3, matched: false },
	{ src: image4, number: 4, matched: false },
	{ src: image5, number: 5, matched: false },
	{ src: image6, number: 6, matched: false },
	{ src: image7, number: 7, matched: false },
	{ src: image8, number: 8, matched: false },
	{ src: image9, number: 9, matched: false },
	{ src: image10, number: 10, matched: false },
	{ src: image11, number: 11, matched: false },
	{ src: image12, number: 12, matched: false },
	{ src: image13, number: 13, matched: false },
	{ src: image14, number: 14, matched: false },
	{ src: image15, number: 15, matched: false },
	{ src: image16, number: 16, matched: false },
];

const shuffleArray = array => {
	let curId = array.length;
	while (0 !== curId) {
		let randId = Math.floor(Math.random() * curId);
		curId -= 1;
		let tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
};

const Game = ({ level }) => {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [playMatch] = useSound(matchSound);
	const [playFanfare] = useSound(fanfareSound);
	const [isGameStopped, setGameIsStopped] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [wasClosed, setWasClosed] = useState(false);
	const navigate = useNavigate();
	const { seconds, minutes, hours, pause } = useStopwatch({
		autoStart: true,
	});
	AOS.init();

	const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
	const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
	const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

	useEffect(() => {
		let shuffledCards = cardImages.sort(() => Math.random() - 0.5);
		shuffledCards = shuffleArray(shuffledCards).slice(0, level);
		shuffledCards = [...shuffledCards, ...shuffledCards];
		shuffledCards = shuffleArray(shuffledCards).map((elem, id) => {
			return { ...elem, id };
		});

		setCards(shuffledCards);
	}, [level]);

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	const resetTurns = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.number === choiceTwo.number) {
				setTimeout(() => playMatch(), 400);
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.number === choiceOne.number) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurns();
			} else {
				setTimeout(() => resetTurns(), 1000);
			}
		}
	}, [choiceOne, choiceTwo, playMatch]);

	useEffect(() => {
		if (cards[0] !== undefined && !wasClosed) {
			const notMatchedCards = cards.filter(card => card.matched === false);

			if (notMatchedCards.length === 0) {
				setGameIsStopped(true);
				setShowModal(true);
				pause();
				setTimeout(() => playFanfare(), 1000);
			}
		}
	}, [cards, pause, playFanfare]);

	let cardStyle = '';
	if (level === 4) {
		cardStyle = 'small-card-grid';
	} else if (level === 8) {
		cardStyle = 'medium-card-grid';
	} else {
		cardStyle = 'hard-card-grid';
	}

	const message = (
		<>
			<p>
				Your time is: {hourTime}:{minuteTime}:{secondTime}
			</p>
			<p>You made: {turns} moves</p>
		</>
	);

	const saveResults = () => {
		const result = {
			time: parseInt(secondTime) + 60 * parseInt(minuteTime) + 60 * 60 * parseInt(hourTime),
			moves: turns,
		};
		const timeResults = JSON.parse(localStorage.getItem('timeResults'));
		const movesResults = JSON.parse(localStorage.getItem('movesResults'));

		if (level === 4) {
			timeResults.easy.push(result);
			movesResults.easy.push(result);

			timeResults.easy = timeResults.easy.sort((a, b) => a.time - b.time).slice(0, 5);
			movesResults.easy = movesResults.easy.sort((a, b) => a.moves - b.moves).slice(0, 5);
		} else if (level === 8) {
			timeResults.medium.push(result);
			movesResults.medium.push(result);

			timeResults.medium = timeResults.medium.sort((a, b) => a.time - b.time).slice(0, 5);
			movesResults.medium = movesResults.medium.sort((a, b) => a.moves - b.moves).slice(0, 5);
		} else {
			timeResults.hard.push(result);
			movesResults.hard.push(result);

			timeResults.hard = timeResults.hard.sort((a, b) => a.time - b.time).slice(0, 5);
			movesResults.hard = movesResults.hard.sort((a, b) => a.moves - b.moves).slice(0, 5);
		}

		localStorage.setItem('timeResults', JSON.stringify(timeResults));
		localStorage.setItem('movesResults', JSON.stringify(movesResults));
	};

	const onModalClick = () => {
		setShowModal(false);
		setWasClosed(true);
		saveResults();
	};

	let fxProps = {
		count: 3,
		interval: 300,
		colors: ['#30043d', '#7b096a', '#ccc89f'],
		calc: (props, i) => ({
			...props,
			x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
			y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
		}),
	};

	return (
		<div
			className={style['wrapper']}
			data-aos='fade-up'
			data-aos-delay='50'
			data-aos-duration='400'
			data-aos-easing='ease-in-out'
			data-aos-once='true'
		>
			{showModal && (
				<>
					<Fireworks {...fxProps} />
					<Modal title={'You won!'} message={message} onClick={onModalClick} />
				</>
			)}
			<div className={style['data-wrapper']}>
				<p>
					Time: {hourTime}:{minuteTime}:{secondTime}
				</p>
				<p>Moves: {turns}</p>
			</div>
			<div className={style[cardStyle]}>
				{cards.length > 0 &&
					cards.map(card => (
						<Card
							key={card.id}
							card={card}
							cover={coverImage}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
			</div>
			<button onClick={() => navigate('/')} className={buttonStyle.button}>
				{isGameStopped ? 'Back' : 'Give up!'}
			</button>
		</div>
	);
};

export default Game;

import React from 'react';
import useSound from 'use-sound';

import style from './Card.module.scss';
import clickSound from '../../assets/card_click.mp3';

const Card = ({ card, cover, handleChoice, flipped, disabled }) => {
	const [play] = useSound(clickSound);

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
			play();
		}
	};

	return (
		<div className={style.card}>
			<div className={flipped ? style.flipped : ''}>
				<img className={style.front} src={card.src} alt='card' />
				<img className={style.back} src={cover} onClick={handleClick} alt='cover' />
			</div>
		</div>
	);
};

export default Card;

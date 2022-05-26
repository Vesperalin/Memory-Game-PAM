import React from 'react';

import style from './Card.module.scss';

const Card = ({ card, cover, handleChoice, flipped, disabled }) => {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
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

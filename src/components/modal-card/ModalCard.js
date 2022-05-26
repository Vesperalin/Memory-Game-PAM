import React from 'react';

import styles from './ModalCard.module.scss';

const ModalCard = props => {
	return <div className={`${styles.card} ${props.className}`}>{props.children}</div>;
};

export default ModalCard;

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import ModalCard from '../modal-card/ModalCard';
import styles from './Modal.module.scss';

const Backdrop = props => {
	return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = props => {
	return (
		<ModalCard className={styles.modal}>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={styles.content}>{props.message}</div>
			<footer className={styles.actions}>
				<button className={styles.button} onClick={props.onClick}>
					Okay
				</button>
			</footer>
		</ModalCard>
	);
};

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onClick} />,
				document.getElementById('backdrop-root'),
			)}
			{ReactDOM.createPortal(
				<ModalOverlay title={props.title} message={props.message} onClick={props.onClick} />,
				document.getElementById('overlay-root'),
			)}
		</Fragment>
	);
};

export default Modal;

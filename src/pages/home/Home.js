import React from 'react';
import { NavLink } from 'react-router-dom';
import Wave from 'react-wavify';
import useSound from 'use-sound';

import style from './Home.module.scss';
import onHoverSound from '../../assets/click.mp3';
import buttonStyle from '../../styles/Button.module.scss';

const Home = () => {
	const [play, { stop }] = useSound(onHoverSound);

	return (
		<div className={style.wrapper}>
			<h1>Monster memory</h1>
			<h3>Choose game level</h3>
			<nav>
				<NavLink
					onMouseEnter={() => play()}
					onMouseLeave={() => stop()}
					className={buttonStyle.button}
					to='/easy-game'
				>
					Easy
				</NavLink>
				<NavLink
					onMouseEnter={() => play()}
					onMouseLeave={() => stop()}
					className={buttonStyle.button}
					to='/medium-game'
				>
					Medium
				</NavLink>
				<NavLink
					onMouseEnter={() => play()}
					onMouseLeave={() => stop()}
					className={buttonStyle.button}
					to='/hard-game'
				>
					Hard
				</NavLink>
			</nav>
			<div className={style['wave-wrapper']}>
				<Wave
					fill='#30043d'
					paused={false}
					options={{
						height: 10,
						amplitude: 40,
						speed: 0.25,
						points: 4,
					}}
				/>
			</div>
		</div>
	);
};

export default Home;

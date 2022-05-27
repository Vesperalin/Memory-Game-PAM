import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Game from './pages/game/Game';
import Ranking from './pages/ranking/Ranking';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/easy-game' element={<Game level={4} />} />
			<Route path='/medium-game' element={<Game level={8} />} />
			<Route path='/hard-game' element={<Game level={16} />} />
			<Route path='/ranking' element={<Ranking />} />
		</Routes>
	);
};

export default App;

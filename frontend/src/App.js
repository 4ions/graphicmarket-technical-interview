import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

/* Pages */
import Login from './pages/login/login.js'
import Register from './pages/register/register.js'
import Equipos from './pages/equipos/equipos.js'
import NewUpdateTeam from './pages/new-update-team/new-update';
import NewUpdatePlayer from './pages/new-update-player/new-update-player';
import Jugadores from './pages/jugadores/jugadores';
import NotFound from './pages/notfound/notfound';
import UpdatePlayer from './pages/updatePlayer/new-update-player';
import UpdateTeam from './pages/updateTeam/new-update';

const App = () =>{
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} /> 
        <Route exact path="/equipos" element={<Equipos />} /> 
        <Route exact path="/jugadores" element={<Jugadores/>}/>
        <Route exact path="/create/equipo/" element={<NewUpdateTeam />} />
        <Route exact path="/create/jugador/*" element={<NewUpdatePlayer />} />
        <Route exact path="/update/equipo/*" element={<UpdateTeam />} />
        <Route exact path="/update/jugador/*" element={<UpdatePlayer />} />
        
        <Route exact path="*" element={<NotFound />}/>
        
      </Routes>
        
    </Router>
  );
}

export default App;

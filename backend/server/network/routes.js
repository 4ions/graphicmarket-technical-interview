const register = require('../controllers/register/routes');
const jugador = require('../controllers/jugador/routes');
const equipo = require('../controllers/equipo/routes')

const routes = function (server) {
    server.use('/api/auth/v01/register', register);
    server.use('/api/equipo', equipo);
    server.use('/api/jugador', jugador);
  
};

module.exports = routes;
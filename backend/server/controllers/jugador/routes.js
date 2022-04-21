const { Router } = require('express');
const controllers = require('./jugadorController');
const { verifyIsLogin, verifyToken } = require('../../middleware/index');


const router = Router();

router.post('/', [verifyIsLogin, verifyToken], controllers.createPlayer);
router.get('/', [verifyIsLogin, verifyToken],controllers.listPlayers);
router.get('/:id', [verifyIsLogin, verifyToken],controllers.findPlayer);
router.put('/:id', [verifyIsLogin, verifyToken],controllers.updatePlayer);
router.delete('/:id', [verifyIsLogin, verifyToken],controllers.deletePlayer)




module.exports = router
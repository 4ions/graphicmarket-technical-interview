const { Router } = require('express');
const controllers = require('./equipoController');
const { verifyIsLogin, verifyToken } = require('../../middleware/index');


const router = Router();

router.post('/',  [verifyIsLogin, verifyToken],controllers.createTeam);
router.get('/', [verifyIsLogin, verifyToken],controllers.listTeams);
router.get('/:id', [verifyIsLogin, verifyToken],controllers.findTeam);
router.patch('/:id', [verifyIsLogin, verifyToken],controllers.updateTeam);
router.delete('/:id', [verifyIsLogin, verifyToken],controllers.deleteTeam)




module.exports = router
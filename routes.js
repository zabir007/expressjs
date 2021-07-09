const router = require('express').Router();
const controller = require('./controller')

router.delete('/:todosId', controller.deletById);
router.patch('/:todosId', controller.patchUpdate);
router.put('/:todosId', controller.putUpdate);
router.get('/:todosId', controller.findById);
router.get('/',controller.findAll)
router.post('/',controller.create);

module.exports = router;
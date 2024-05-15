
module.exports = app => {
    const router = require('express').Router()
    const basicController = require('../controllers/basic.controller')

    router.get('/basic', basicController.displayAll)

    app.use('/api', router);
}
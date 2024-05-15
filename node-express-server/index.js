const express = require('express')
const axios = require('axios')

const app = express()

const port =  3000


require('./routs/basic.routes')(app)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
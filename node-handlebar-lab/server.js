const express = require('express')

const exphbs = require('express-handlebars')
const {request} = require("express");
const axios = require('axios')
const app = express()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home',{
        title: 'ABC Stores',
        message: 'Welcome to ABC Stores',
    })
})

app.get('/products', async (req, res) => {
    const productsUrl = 'http://fakestoreapi.com/products'
    try {
        const response = await axios.get(productsUrl)
        //console.log(response)
        const productsData = response.data
        console.log(productsData)
        res.render('products', { productsData })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Error Fetching Data')
    }

})


app.listen(5000, () => {
    console.log('Server started')
})
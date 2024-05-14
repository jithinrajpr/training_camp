const express = require('express')
const customers = require('./lib/data/customer')
const middleware = require('./lib/middleware')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware)

app.get('/', (req, res) => {
    res.send({ message: "Welcome to Customer Service Server 1.0" })
})

app.post('/customer/add', (req, res) => {

    let myData = {
        first_name: 'John',
        address: 'UK'
    }
    customers.push(myData)
    console.log(customers)

    res.send('OK')
})

app.get('/customers/all', (req, res) => {
    const customerList = `
    <div>
        ${customers.map(customer => `
            <ul>
                <li>${customer.first_name}</li>
                <li>${customer.address}</li>
                <li>${customer.contact}</li>
            </ul>`
    ).join('')}
    </div>`;
    res.send(customerList);

})

app.delete('/customer/:id', (req, res) => {
    const index = customers.indexOf(req.params.id)
    customers.splice(index,1)
    res.send('DONE')
})

app.put('/customer/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    customers[id].first_name = updatedData.first_name;
    customers[id].last_name = updatedData.last_name;
    customers[id].address = updatedData.address;
    customers[id].contact = updatedData.contact;


    res.send('UPDATED')
})


app.listen(8080, () => {
    console.log('Server started')
})


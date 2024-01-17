const mongoose = require('mongoose')

//get rid of warnings
mongoose.Promise = global.Promise
//db config
const db = require('./config/key').MongoURI

//connect to db
mongoose.connect(db, { useNewUrlParser: true })

//Import customer model
const Customer = require('./models/customer')

// Add Customer
const addCustomer = customer => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added')
    })
}

//find Customer
const findCustomer = name => {
    // name is case sensitive
    const search = new RegExp(name, 'i')
    Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
        customer => {
            console.info(customer)
            console.info(`${customer.length} matches`)
        }
    )
}

const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer).then(customer => {
        console.info('Customer Update')
    })
}
const removeCustomer = _id => {
    Customer.deleteOne({ _id }).then(customer => {
        console.info('Customer Removed')
    })
}
const listCustomer = () => {
    Customer.find().then(customers => {
        console.info(customers)
        console.info(`${customers.length} customers`)
    })
}

module.exports = {
    addCustomer,
    findCustomer,
    listCustomer,
    removeCustomer,
    updateCustomer,
}

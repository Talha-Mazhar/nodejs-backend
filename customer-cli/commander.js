#!/usr/bin/env node
const program = require('commander')

const { prompt } = require('inquirer')

const {
    addCustomer,
    findCustomer,
    removeCustomer,
    listCustomer,
    updateCustomer,
} = require('./app')

//Questions

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name',
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name',
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email',
    },
]

program.version('1.0.0').description('Client Management System')

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add Customer')
//     .action((firstname, lastname, phone, email) => {
//         addCustomer({ firstname, lastname, phone, email })
//     })

program
    .command('add')
    .alias('a')
    .description('Add Customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers))
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find Customer')
    .action(name => findCustomer(name))

program
    .command('update <_id>')
    .alias('u')
    .description('Update Customer')
    .action(_id => {
        prompt(questions).then(answers => updateCustomer(_id, answers))
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove Customer')
    .action(_id => {
        removeCustomer(_id)
    })
//List Command
program
    .command('list')
    .alias('l')
    .description('List Customers')
    .action(() => {
        listCustomer()
    })

program.parse(process.argv)

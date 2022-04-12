require('dotenv').config()

const user = process.env.USER_DATABASE;
const pass = process.env.PASS_DATABASE;
const database = process.env.NAME_DATABASE;
const token = process.env.TOKEN;


module.exports = {
    user,
    pass,
    database,
    token
}
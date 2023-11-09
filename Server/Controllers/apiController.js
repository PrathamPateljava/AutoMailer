require('dotenv').config()
const helpers= require('../helpers')


const googleAuthHandler= async (req,res) =>{
const code = req.query.code
const tokens= await helpers.getToken(code)
console.log(tokens)

const user = await helpers.getUser(tokens)
}

exports.googleAuthHandler=googleAuthHandler
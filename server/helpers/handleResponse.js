const { errorException } = require('./errorException.js')

const handleResponse = (res,promise) =>{
    promise
    .then(results => res.json(results))
    .catch(error =>{
       errorException(error,res)
    })
}

module.exports = { handleResponse }
const errorException = (error,response) =>
        error instanceof Error
        ? response
            .status(500)
            .json({message: error.message})
        : response.status(200).json({ message: error})

const throwErrorOnValidation = (error,response) =>
    response.status(400).json({ message: error})


module.exports = { errorException, throwErrorOnValidation }
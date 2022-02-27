exports.getUser = (req, res, next) => {
    //get user login info from request

    //if user exists and information correct in database, return login token??

    res.status(200).json({
        //token/sesson goes here???
    })
}

exports.createUser = (req, res, next) => {
    //get user info from req, for example
    //const name = req.body.name

    // Create post in db

    //Return response with what was added to database and success message
    res.status(201).json({
        message: 'User created successfully!',
        post: {
            // posted data should go here
        }
    })
}
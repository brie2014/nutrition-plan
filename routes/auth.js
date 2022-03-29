const express = require('express')

const {
    body
} = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

const router = express.Router()
/** 
 * @swagger
 * /signup:
 *  put:
 *      tags: ['Authentication']
 *      description: Sign up a new user
 *      responses:
 *          '201':
 *              description: User created.
 *          '422':
 *              description: Validation failed
 *          '500':
 *              description: System error  
 */  
router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, {
        req
    }) => {
        return User.findOne({
                email: value
            })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email address already exists')
                }
            })
    })
    .normalizeEmail(),
    body('password').trim().isLength({
        min: 5
    }),
    body('name').trim().not().isEmpty()

], authController.signup)

/** 
 * @swagger
 * /login:
 *  post:
 *      tags: ['Authentication']
 *      description: Login as a user
 *      responses:
 *          '200':
 *              description: Logged in and token loaded.
 *          '401':
 *              description: A user with this email couldn't be found or wrong password.
 *          '500':
 *              description: System error.  
 */ 
router.post('/login', authController.login)

module.exports = router
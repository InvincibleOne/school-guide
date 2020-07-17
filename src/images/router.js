const express = require( 'express' )

//const User = require( './model/user' )

const register = require( './controller/register' ) 

const login = require( './controller/login' ) 

const Captcha = require( './controller/captcha' )

const commitComment = require( './controller/commitComment' )

const router = express.Router()

const cdut = require( './cdut.json' )


router.get( '/', ( req, res ) => {
    res.send( 'hello' )
} )

router.get( '/getCaptchas', ( req, res ) => {
    // Captcha.getCaptchas( req, res,  )
    var captcha = Captcha( )
    res.cookie( "cap",  captcha.status , { maxAge:1000*60*60*24 } )
    captcha.status = 1
    res.send(captcha)
} )

router.post( '/register', ( req, res ) => {
    register( req, res )
} )
router.post( '/login', ( req, res ) => {
    login( req, res )
} )

router.post( '/commitComment', ( req, res ) => {
    commitComment( req, res )
} )

router.get( '/sichuan/cdut', ( req, res ) => {
    res.json( {
        errno:0,
        data:cdut,
    } )
} )
module.exports = router
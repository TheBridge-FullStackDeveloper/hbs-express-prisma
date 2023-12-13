const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

const prisma = require('../prisma/client');

// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hashedPassword
        }
        });
        res.redirect('/auth/login-page');
    } catch (error) {
        console.log(error)
        res.redirect('/auth/register-page');
    }
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login-page',
    failureFlash: true,
}));

// LogIn Template
router.get('/login-page', (req, res) => {
    res.render('login');
});

// Register Template
router.get('/register-page', (req, res) => {
    res.render('register');
});

// LogOut
router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/posts")
    });
});

module.exports = router;
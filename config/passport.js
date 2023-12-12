const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: username }
            });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null, user);
        } catch (error) {
        return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    done(null, user);
    } catch (error) {
    done(error, null);
    }
});
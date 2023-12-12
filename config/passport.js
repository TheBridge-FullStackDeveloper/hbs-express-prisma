// Import required modules
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');

// Configure Passport to use a local strategy for authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find a user in the database with the provided username
            const user = await prisma.user.findUnique({
                where: { username: username }
            });

            // If user not found, notify Passport
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // Compare the provided password with the hashed password in the database
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            // Authentication successful, return the user
            return done(null, user);
        } catch (error) {
            // Handle errors and pass them to Passport
            return done(error);
        }
    }
));

// Serialize user information to be stored in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
    try {
        // Retrieve user information from the database based on the stored user id
        const user = await prisma.user.findUnique({ where: { id: id } });

        // Return user information to Passport
        done(null, user);
    } catch (error) {
        // Handle errors and pass them to Passport
        done(error, null);
    }
});

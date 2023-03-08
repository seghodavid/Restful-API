const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          // check if user exists
          const userExists = await User.findOne(username);
          if (userExists) {
            return done(null, false);
          }
          // Create a new user with the user data provided
          const hashedPassword = await User.hashPassword(password);
          const user = await User.save( null, username, hashedPassword );
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne(username);
          if (!user) return done(null, false);
          const isMatch = await user.comparePassword(password, user.password);
          if (!isMatch) return done(null, false);
          // if passwords match return user
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );
};

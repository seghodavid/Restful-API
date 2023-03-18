const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

module.exports = (passport) => {
  passport.use(
    "create",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          // Create a new user with the user data provided
          const hashedPassword = await User.hashPassword(password);
          const user = new User(null,username, hashedPassword )
          console.log(user)
          await user.save()

          console.log(user)
          return done(null, user);
        } catch (error) {
          console.log(error)
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
          const [user, _] = await User.findOne(username);
          if (!user) return done(null, false);
          const userPassword = user[0].password
          const isMatch = await User.comparePassword(password, userPassword);
          if (!isMatch) return done(null, false);
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );


//To be researched and understood in-depth 
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};



const {Strategy: LocalStrategy} = require("passport-local");
const passport = require("passport");
const {User} = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {usernameField: "id", passwordField: "password"},
      async (id, password, done) => {
        try {
          console.log(1111);
          const user = await User.findOne({where: {id}});
          if (!user) {
            return done(null, false, {reason: "존재하지 않는 아이디입니다."});
          }
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, user);
          }
          return done(null, false, {reason: "비밀번호가 일치하지 않습니다."});
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};

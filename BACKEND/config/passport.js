var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
  },
  function(issuer, profile, cb) {    
    
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Google account has not logged in to this app before.  Create a
        // new user record and link it to the Google account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
      
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id.toString(),
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The Google account has previously logged in to the app.  Get the
        // user record linked to the Google account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    }
)}
));


// const passport =require("passport")
// const GoogleStrategy=require('passport-google-oauth20').Strategy;
// const User=require('../model/user');

// passport.use(new GoogleStrategy({
//     clientID :process.env.GOOGLE_CLIENT_ID,
//     clientSecret :process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL : process.env.GOOGLE_CALLBACK_URL
// },
// async(accessToken ,refreshToken,profile,done)=>{
//     try{
//         let user=await User.findOne({googleId : profile.id});
//         if(user){
//             return done(null,user);
//         }

//         user =new User({
//             googleId :profile.id,
//             name : profile.displayName || "google Name",
//             email : profile.emails[0].value,
//             passport:"",
//             phoneNumber : ""
//         });
//         await user.save();
//         done(null,user);
//     }catch(error){
//         done(error,false)
//     }
// }
// ));

// passport.serializeUser((user,done)=>{
//     done(null,user.id);
// })

// passport.deserializeUser(async (id,done)=>{
//     try {
//         const user=await User.findById(id);
//         done(null,user);
//     } catch (error) {
//         done(error,null);
//     }
// })
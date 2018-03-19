const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('./../../config');

function json(obj) {
  return JSON.stringify(obj);
}

const userSchema = new mongoose.Schema({
  email: {
    type:     String,
    unique:   true,
    required: json({ "error": {"email": "required"} }),
    validate: [
      {
        validator: function checkEmail(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: json({ "error": {"email": "novalid"} })
      }
    ]
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt:          {
    required: true,
    type: String
  }
}, {
  timestamps: true
});

// userSchema.methods.getPublicFields = function() {
//   return {
//     email: this.email
//   }
// };

userSchema.virtual('password')
    .set(function(password) {
        if (!password) this.invalidate('password', json({ "error": {"password": "required"} }))

        if (password.length < 4) this.invalidate('password', json({ "error": {"password": "minlength"} }))

        this._plainPassword = password;

        this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1');
    })
    .get(function() {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false; // empty password means no login by password
  
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

  return crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);

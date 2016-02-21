import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createToken(payload, callback) {
    jwt.sign(payload, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration ,
      subject: 'USER_AUTHENTICATION'
    }, (token) => {
      callback(null, token);
    });
  }
}

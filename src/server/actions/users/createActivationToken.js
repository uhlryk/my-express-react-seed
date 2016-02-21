import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createActivationToken(payload, callback) {
    jwt.sign(payload, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration,
      subject: 'USER_ACTIVATION'
    }, (token) => {
      callback(null, token);
    });
  }
}

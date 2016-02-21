import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createResetPasswordToken(payload, callback) {
    jwt.sign(payload, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration,
      subject: 'RESET_PASSWORD'
    }, (token) => {
      callback(null, token);
    });
  }
}

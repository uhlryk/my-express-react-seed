import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createResetPasswordToken(params, callback) {
    jwt.sign({ id: params.id }, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration,
      subject: 'RESET_PASSWORD'
    }, (token) => {
      callback(null, {
        token: token
      });
    });
  }
}

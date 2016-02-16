import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createToken(params, callback) {
    jwt.sign({ id: params.id }, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration,
      subject: 'USER_ACTIVATION'
    }, (token) => {
      callback(null, {
        token: token
      });
    });
  }
}

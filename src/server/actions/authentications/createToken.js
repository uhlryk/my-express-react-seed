import jwt from 'jsonwebtoken';

export default function (globals) {
  return function createToken(params, callback) {
    var token = jwt.sign({ id: params.id }, globals.config.jwtToken.secret, {
      expiresIn: globals.config.jwtToken.expiration ,
      subject: 'USER_AUTHENTICATION'
    }, (token) => {
      callback(null, {
        token: token
      });
    });
  }
}

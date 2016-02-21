import jwt from 'jsonwebtoken';

export default function (globals) {
  return function verifyToken(token, callback) {
    jwt.verify(token, globals.config.jwtToken.secret, {
      subject: 'USER_AUTHENTICATION'
    }, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      callback(null, decoded);
    });
  }
}

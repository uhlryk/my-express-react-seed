import jwt from 'jsonwebtoken';

export default function (globals) {
  return function verifyToken(token, callback) {
    var token = jwt.verify(token, globals.config.jwtToken.secret, {}, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      callback(null, {
        id: decoded.id
      });
    });
  }
}

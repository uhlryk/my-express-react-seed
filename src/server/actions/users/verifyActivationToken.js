import jwt from 'jsonwebtoken';

export default function (globals) {
  return function verifyActivationToken(token, callback) {
    jwt.verify(token, globals.config.jwtToken.secret, {
      subject: 'USER_ACTIVATION'
    }, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      callback(null, decoded);
    });
  }
}

import jwt from 'jsonwebtoken';

export default function (globals) {
  return function verifyPasswordToken(token, callback) {
    jwt.verify(token, globals.config.jwtToken.secret, {
      subject: 'RESET_PASSWORD'
    }, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      callback(null, decoded);
    });
  }
}

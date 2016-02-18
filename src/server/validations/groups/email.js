export default function() {
  return function (req) {
    req.checkBody('email').notEmpty().isEmail().isLength({min:3, max:60});
    req.sanitizeBody('email').trim();
    req.sanitizeBody('email').normalizeEmail();
  }
}

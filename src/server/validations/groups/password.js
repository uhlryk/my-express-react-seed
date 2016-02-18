export default function() {
  return function (req) {
    req.checkBody('password').notEmpty().isLength({min:6, max:60});
  }
}

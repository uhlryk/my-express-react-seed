export default function() {
  return function (req) {
    req.checkBody('name').notEmpty().isLength({min:0, max:60});
  }
}

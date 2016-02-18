/**
 * when you use for example email in multiple routes and each time you have to
 * add validators with params and sanitizers. And after one change of parameter
 * you have to apply changes in all places. This module allow to set all validators
 * and sanitizers to certain field one time and then just trigger this group in routes
 */

import email from './email';
import password from './password';
import name from './name';

export default function(){
  var group = {
    email: email(),
    password: password(),
    name: name(),
    //someField:  function (req) {
    //  req.checkBody('someField').notEmpty().isEmail().isLength({min:3, max:60});
    //  req.sanitizeBody('someField').trim();
    //}
  };

  return function validationGroup (req, res, next) {

    req.checkGroup = function(name) {
      if(group[name]) {
        group[name](req);
      } else {
        throw new Error('Validation group `' + name + '` doesn\'t exist');
      }
    };
    next();
  }
}

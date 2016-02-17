export default function (globals) {
  return function listUsers(params, callback) {
    var id = params.id;
    var email = params.email;
    var limit = params.limit;
    var status = params.status;

    var options = {
      where: {}
    };
    if(status) {
      options.where.status = status;
    }
    options.limit = limit;

    if(id) {
      options.where.id = id;
    }
    if(email) {
      options.where.email = email;
    }

    globals.models.user.findAll(options).then((users) => {
      callback(null, users);
    }).catch((err) => {
      callback(err)
    });
  }
}

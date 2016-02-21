import validator from 'validator';

export default function (globals) {
  return function listEntities(params, callback) {
    var id = params.id;
    var limit = params.limit || 20;
    var page = params.page || 1;
    var options = {
      where: {}
    };
    options.limit = limit;
    options.offset = page * limit - limit;

    if(id) {
      options.where.id = id;
    } else if(params.where) {
      options.where = params.where;
    }

    if(params.attributes) {

    }

    if(params.orderColumn) {
      options.order = [[params.orderColumn, params.orderType || 'DESC']];
    }

    globals.models.item.findAll(options).then((entites) => {
      callback(null, entites);
    }).catch((err) => {
      callback(err)
    });;
  }
}

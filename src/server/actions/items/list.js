import validator from 'validator';

export default function (globals) {
  return function listItems(params, callback) {
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
    }

    if(params.orderColumn) {
      options.order = [[params.orderColumn, params.orderType || 'DESC']];
    }

    globals.models.item.findAll(options).then((items) => {
      callback(null, items);
    }).catch((err) => {
      callback(err)
    });;
  }
}

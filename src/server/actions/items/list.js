import validator from 'validator';

export default function (globals) {
  return function listItems(params, callback) {
    var id = params.id;
    var limit = params.limit;

    var options = {
      where: {}
    };
    options.limit = limit;

    if(id) {
      options.where.id = id;
    }

    globals.models.item.findAll(options).then((items) => {
      callback(null, items);
    }).catch((err) => {
      callback(err)
    });;
  }
}

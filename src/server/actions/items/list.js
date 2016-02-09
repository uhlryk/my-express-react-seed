import validator from 'validator';

export default function (globals) {
  return function listItems(params, callback) {
    globals.models.item.findAll({
    }).then((items) => {
      callback(null, items);
    }).catch((err) => {
      callback(err)
    });;
  }
}

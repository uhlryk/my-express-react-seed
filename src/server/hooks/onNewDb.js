import Promise from 'bluebird';
/**
 * Run first time when db was dropped or when db is new
 * This is good place to put init data to db
 */
export default function (globals) {
  return new Promise((resolve, reject) => {
    resolve();
  }).then(() => {

  });
}

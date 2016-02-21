/**
 * checks if page value is correct. If no then return undefined and other modules will work with
 * default value. Correct value is positive integer
 * example:
 * req.sanitizeQuery('page').listPage();
 */
export default function listPage(value, options) {
  if(value) {
    var intVal = parseInt(value);
    if(intVal > 0) {
      return intVal;
    }
  }
  return undefined;
}

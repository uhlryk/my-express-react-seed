
class ValidationError {
  constructor(field) {
    this.message = 'Validation error in ' + field;
    this.name = 'ValidationError';
  }
}
export default ValidationError;

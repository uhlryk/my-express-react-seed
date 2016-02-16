var config = {
  db: {
    name: '',
    user: '',
    password: '',
    port: 5432,
    host: '',
    dialect: ''
  },
  dropDb: false,
  port: 3000,
  jwtToken:{
    secret: 'jbfaf2323uru09',
    expiration: 60*60*24 //1day
  },
  smtpEmail: {
    host: '0.0.0.0',
    port: 1025,
    ignoreTLS: true,
    //auth: {
    //  user: 'username',
    //  pass: 'password'
    //}
  }
}

module.exports = config;


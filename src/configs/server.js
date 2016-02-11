var config = {
  db: {
    name: '',
    user: '',
    password: '',
    port: 5432,
    host: '',
    dialect: ''
  },
  port: 3000,
  jwtToken:{
    secret: 'jbfaf2323uru09',
    expiration: 60*60*24 //1day
  },
}

module.exports = config;


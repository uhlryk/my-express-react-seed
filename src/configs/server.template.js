var config = {
  db: {
    name: '',
    user: '',
    password: '',
    port: 5432,
    host: '',
    dialect: ''
  },
  enableEmailActivation: true,
  enableEmailTest: false,
  dropDb: false,
  port: 3000,
  jwtToken:{
    secret: '',
    expiration: 60*60*24 //1day
  },
  smtpEmail: {
    host: '0.0.0.0',
    port: 1025,
    ignoreTLS: true,
    auth: {
      user: '',
      pass: ''
    }
  },
  clientUrl: '//0.0.0.0:3000',
  fromEmail: 'your.email@test.com'
}

module.exports = config;


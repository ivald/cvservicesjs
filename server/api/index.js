// api router will mount other routers
module.exports = (app) => {
  //app.get('/', (req, res) => { res.send('hello world') });
  app.use('/rest', require('./user/user.routes'));
  // app.use('/api/logins', require('./login/login.routes'));
  // app.use('/api/roles', require('./role/role.routes'));
  // app.use('/api/auth', require('./auth/genre.routes'));
}

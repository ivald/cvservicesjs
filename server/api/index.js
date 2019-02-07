// api router will mount other routers
module.exports = (app) => {
  //app.get('/', (req, res) => { res.send('hello world') });
  app.use('/api/users', require('./user/user.routes'));
  app.use('/api/logins', require('./login/login.routes'));
  app.use('/api/books', require('./old_api/book/book.routes'));
  app.use('/api/genres', require('./old_api/genre/genre.routes'));
  // app.use('/api/auth', require('./auth/genre.routes'));
}

const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
  .add('/user/:address','/user/details')
  .add('/approver/:address','/approver/details')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;

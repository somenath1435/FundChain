const routes = require('next-routes')();

routes
  .add('/campaigns/newcampaign', '/campaigns/newcampaign')
  .add('/campaigns/allcampaign', '/campaigns/allcampaign')
  .add('/campaigns/:campaignid', '/campaigns/details')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
  .add('/user/:address','/user/details')
  .add('/user/:address/approvedcampaigns','/user/approvedcampaigns')
  .add('/user/:address/rejectedcampaigns','/user/rejectedcampaigns')
  .add('/approver/:address','/approver/details')
  .add('/approver/:address/allrequest','/approver/allrequest')
  .add('/approver/:address/pendingrequest','/approver/pendingrequest')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;

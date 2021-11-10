const routes = require('next-routes')();

routes
  .add('/campaigns/newcampaign', '/campaigns/newcampaign')
  .add('/campaigns/allcampaign', '/campaigns/allcampaign')
  .add('/campaigns/:campaignid', '/campaigns/details')
  .add('/campaigns/:campaignid/newrequest', '/campaigns/newrequest')
  .add('/campaigns/:campaignid/pendingrequest', '/campaigns/pendingrequest')
  .add('/campaigns/:campaignid/completedrequest', '/campaigns/completedrequest')
  .add('/campaigns/:campaignid/request/:requestid', '/campaigns/requestdetails')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
  .add('/user/:address','/user/details')
  .add('/user/:address/approvedcampaigns','/user/approvedcampaigns')
  .add('/user/:address/rejectedcampaigns','/user/rejectedcampaigns')
  .add('/user/:address/contributedcampaigns','/user/contributedcampaigns')
  .add('/user/:address/pendingrequest','/user/pendingrequest')
  .add('/user/:address/completedrequest','/user/completedrequest')
  .add('/approver/:address','/approver/details')
  .add('/approver/:address/allrequest','/approver/allrequest')
  .add('/approver/:address/pendingrequest','/approver/pendingrequest')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;

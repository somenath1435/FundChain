import web3 from './web3';
import CampaignFactory from './build_approver/ApproverManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6Cd21329c0A8e763d51cB8d16F84eE8444F3F6F1'
);

export default instance;

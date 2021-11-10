import web3 from './web3';
import CampaignFactory from './build_approver/ApproverManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x43504ea967f2D181d41a2547994b6a7F348D21e8'
);

export default instance;

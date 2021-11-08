import web3 from './web3';
import CampaignFactory from './build_approver/ApproverManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3EdB9A597df7Eac7B0c0Ceb922F8BC622473ee01'
);

export default instance;

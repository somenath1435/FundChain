import web3 from './web3';
import CampaignFactory from './build_approver/ApproverManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8Cbfa510784F27806c3B8a0d46497ecaD746e03A'
);

export default instance;

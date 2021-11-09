import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5d7e05fC4Be0945D71E129fdC69bC9F3D0776eA6'
);

export default instance;

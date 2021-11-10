import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x52Bb9a10cEb6fb522747DaEeaa6C61CfB1cC9F51'
);

export default instance;

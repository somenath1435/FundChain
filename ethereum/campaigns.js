import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x05Cc6D0a0D52C44B0290B5ACff77efD0C44D10a8'
);

export default instance;

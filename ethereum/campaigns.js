import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6F5f0F9ed41fDeb889059B402f8E5D1643F3fb53'
);

export default instance;

import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3c902EaAd4e2ab6733D93e0c1116959b82C742Cc'
);

export default instance;

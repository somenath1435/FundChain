import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xc053de7df3dCAFb568edC057291BCe41F0720f3C'
);

export default instance;

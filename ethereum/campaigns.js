import web3 from './web3';
import CampaignFactory from './build_campaign/Campaigns.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x69784D86f9CA193f2077322684e4374b4b1b1290'
);

export default instance;

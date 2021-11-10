import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xEAE148952D7621604A22502e5a6771EB2a90444E'
);

export default instance;

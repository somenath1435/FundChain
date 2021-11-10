import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xE5e404d02C426F05a13c272515D3e036669C9852'
);

export default instance;

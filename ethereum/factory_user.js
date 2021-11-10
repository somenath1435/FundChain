import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x17362a46a15830416b330ca40ef4018d2Bbcc98A'
);

export default instance;

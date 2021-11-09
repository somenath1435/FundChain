import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xa905611700692a3DeDb87b3d14939Da4e0F687d0'
);

export default instance;

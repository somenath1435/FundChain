import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x26c3c68Bca35753B3b6c9F71123A50bc0af5d60F'
);

export default instance;

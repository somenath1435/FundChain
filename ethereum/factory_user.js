import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x621865b17Bf5c0C69bb25Fa1476237744Cd135bF'
);

export default instance;

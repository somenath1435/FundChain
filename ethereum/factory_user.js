import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9F4Dc596c5e3067Fa2dEB47183533A0EFDD23e71'
);

export default instance;

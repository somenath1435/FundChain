import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xC3DE5EB99Ff15BDFAc8d254C545E99EbEa11D259'
);

export default instance;

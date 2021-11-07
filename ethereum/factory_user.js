import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x835c71fDa837892AE7A58D761a281f099980Adac'
);

export default instance;

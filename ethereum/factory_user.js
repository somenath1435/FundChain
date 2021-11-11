import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8Ea24f64cDC03fFcfc658f22889f25962A3F1f41'
);

export default instance;

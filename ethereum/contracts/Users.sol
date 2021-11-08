pragma solidity >=0.4.17 <0.9.0;
contract UserManager 
{
    
    uint public usercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address) public usermanagermap;
    address public storeaddress;
    
    //this array stores the list of address of users
    address [] public  useraddress;
    function registeruser 
    (
        string  firstname ,
        string  lastname ,
        uint phone ,
        uint aadhar,
        address eth, 
        string email
    ) 
    public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     User newuser = new User(firstname,lastname,phone,aadhar,eth,email);
     checker[msg.sender]=true;
     storeaddress=address(newuser);
     usermanagermap[msg.sender]=storeaddress;
     useraddress.push(eth);
     usercount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        
        //require(eth == msg.sender);
        
        return usermanagermap[eth];
    }
    
    
}

contract User 
{
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    uint public aadharnum;
    string public email;
    string public firstname;
    string public lastname;
   
    
    function User
    (
        string  firnam, 
        string lasnam, 
        uint phone, 
        uint aadhar,
        address eth, 
        string mail
    ) 
    public
    {
        phonenum=phone;
        aadharnum= aadhar;
        id= eth;
        firstname= firnam;
        lastname= lasnam;
        email= mail;
        
    }
    
    function showdetails() public view returns
    (
        string ,string ,uint,uint ,address,string
    )
    {
        return(firstname,lastname,phonenum,aadharnum,id,email);
    }
    
    uint public contributed_campaigns_count=0;
    uint [] public contributed_campaigns;
    uint public created_campaigns_count=0;
    uint [] public created_campaigns;
    uint public rejected_campaigns_count=0;
    uint [] public rejected_campaigns;
    
    function insert_contributed_campaign(uint campaign_id) public 
    {
        contributed_campaigns.push(campaign_id);
        contributed_campaigns_count++;
    }
    
    function insert_created_campaign(uint campaign_id) public 
    {
        created_campaigns.push(campaign_id);
        created_campaigns_count++;
    }
    
    function insert_rejected_campaign(uint campaign_id) public 
    {
        rejected_campaigns.push(campaign_id);
        rejected_campaigns_count++;
    }
    
    uint public requestcount=0;
    uint [] public requests;
    //This status will store whether request is pending or approved by this user
    bool [] public status_of_request;
    mapping(uint => uint)getposition;
    
    function insert_request(uint requestid) public
    {
        getposition[requestid]=requests.length;
        requests.push(requestid);
        status_of_request.push(false);
        requestcount++;
    }
    
    function update_completed(uint requestid) public
    {
        status_of_request[getposition[requestid]]=true;
    }
    
    
    
    
   
}
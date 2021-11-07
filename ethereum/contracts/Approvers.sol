pragma solidity >=0.4.17 <0.9.0;

contract ApproverManager 
{
    
    uint public approvercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public approvermanagermap;
    address public storeaddress;
    //this array stores the list of address of approvers
    address [] public  approveraddress;
    
    function registerapprover 
    (
        string  firstname ,
        string  lastname ,
        string email,
        uint phone ,
        address eth, 
        string organisation
    ) 
    public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     Approver newapprover = new Approver(firstname,lastname,email,phone,eth,organisation);
     approveraddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newapprover);
     approvermanagermap[msg.sender]=storeaddress;
     approvercount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        
        //require(eth == msg.sender);
        
        return approvermanagermap[eth];
    }
    
}

contract Approver 
{
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    string public organisation;
    string public firstname;
    string public lastname;
    string public email;
   
    
    function Approver
    (
        string  firnam, 
        string lasnam, 
        string email1,
        uint phone,
        address eth, 
        string org
    ) 
    public
    {
        phonenum=phone;
        id= eth;
        firstname= firnam;
        lastname= lasnam;
        organisation = org;
        email=email1;
        
    }

    function showdetails() public view returns
    (
        string ,string ,uint ,string ,address ,string
    )
    {
        return(firstname,lastname,phonenum,organisation,id,email);
    }
    
    uint [] public campaign_request;
    //status [i] = false; this request is still pending;
    bool [] public status;
    
    mapping(uint => uint) position;
    
    function insert_campaign_request(uint campaignid) public
    {
        campaign_request.push(campaignid);
        position[campaignid]=status.length;
        status.push(false);
    }
    
    function update_status(uint campaignid) public
    {
        status[position[campaignid]]=true;
    }
    
    
}
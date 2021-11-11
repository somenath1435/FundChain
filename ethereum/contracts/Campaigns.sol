pragma solidity >=0.4.17 <0.9.0;

contract Campaigns 
{
    uint public campaigncount=0;
    struct Campaign 
    {
        uint campaignid;
        string description;
        string typeofcampaign;
        string targetcity;
        uint minimumcontribution;
        address managerid;
        uint priority;
        address approvedby;
        string proposalhash;
        uint [] requestlist;
        mapping(address => bool)backers;
        address [] backerslist;
        uint backerscount;
        uint totalmoney;
    }
    
    Campaign [] public campaigns;
    string [] public status_of_campaigns;
    uint [] public requestlist_size; //This gives requestslist size for ith campaign
    uint [] public backerslist_size; //This gives backerslist size for ith campaign
    
    function createcampaign
    (
        string description1,
        string targetcity1,
        uint minimumcontribution1,
        address managerid1,
        string _proposalhash
    )
    public
    {
        uint [] memory initialize_array;
        address [] memory _backerslist;
        
        Campaign memory newcampaign = Campaign ({
           campaignid: campaigncount,
           description: description1,
           typeofcampaign: "Undecided",
           targetcity: targetcity1,
           minimumcontribution: minimumcontribution1,
           managerid: managerid1,
           priority: 0,
           approvedby: 0x0000000000000000,
           proposalhash: _proposalhash,
           backerscount: 0,
           requestlist: initialize_array,
           backerslist: _backerslist,
           totalmoney: 0
        }) ;
        
        campaigns.push(newcampaign);
        status_of_campaigns.push("Pending");
        campaigncount++;
        requestlist_size.push(0);
        backerslist_size.push(0);
        
    }
    
    function change_status_of_campaign
    (
        uint campaignid, 
        string new_status,
        uint _priority,
        address approver,
        string type_campaign
    ) 
    public
    {
        status_of_campaigns[campaignid]=new_status;
        campaigns[campaignid].priority = _priority;
        campaigns[campaignid].approvedby = approver;
        campaigns[campaignid].typeofcampaign = type_campaign;
    }
    
    struct Request
    {
        uint requestid;
        uint campaignid;
        string description;
        uint value;
        address recipient;
        bool status;
        uint approvalCount;
        mapping(address => bool) approvals;
        uint yescount;
        string status_str;
        string proposalhash;
    }
    
    uint public requestcount=0;
    Request[] public requests;
    
    function contribute(uint campaignid) public payable 
    {
        
        require(msg.value >= campaigns[campaignid].minimumcontribution);

        campaigns[campaignid].backers[msg.sender] = true;
        campaigns[campaignid].backerslist.push(msg.sender);
        campaigns[campaignid].backerscount++;
        campaigns[campaignid].totalmoney +=(msg.value);
        backerslist_size[campaignid]++;
    }
    
    function create_spend_Request
    (
        string _description, 
        uint value,
        address recipient,
        uint campaignid1,
        string _proposalhash
    )
    public 
    {
        Request memory newRequest = Request
        ({
           requestid: requestcount,
           description: _description,
           value: value,
           recipient: recipient,
           status: false,
           approvalCount: 0,
           yescount: 0,
           campaignid: campaignid1,
           status_str: "Pending",
           proposalhash: _proposalhash
        });
        
        requests.push(newRequest);
        campaigns[campaignid1].requestlist.push(requestcount);
        requestcount++;
        requestlist_size[campaignid1]++;
    }
    
     function approve_spend_Request(uint request_index) public 
     {
        Request storage request = requests[request_index];
        uint campaignid = request.campaignid;
        require(campaigns[campaignid].backers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
        request.yescount++;
    }
     function reject_spend_Request(uint request_index) public 
     {
        Request storage request = requests[request_index];
        uint campaignid = request.campaignid;
        require(campaigns[campaignid].backers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalize_spend_Request(uint request_index) public 
    {
        Request storage request = requests[request_index];
        uint campaignid = request.campaignid;
        require(!request.status);

        request.recipient.transfer(request.value);
        campaigns[campaignid].totalmoney -=(request.value);
        request.status = true;
        request.status_str = "Approved and Money Transfered";
    }
     function disapprove_spend_Request(uint request_index) public 
    {
        Request storage request = requests[request_index];
        require(!request.status);
        request.status = true;
        request.status_str = "Rejected by Backers";
    }
    
    function get_backerslist(uint campaignid) public view returns(address [] memory)
    {
        return campaigns[campaignid].backerslist;
    }

   function get_requestlist(uint campaignid) public view returns(uint [] memory)
    {
        return campaigns[campaignid].requestlist;
    }
    
    function check_backer(uint campaignid, address _caller) public view returns(bool)
    {
        return campaigns[campaignid].backers[_caller];
        
    }
    
}
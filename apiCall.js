let axios = require("axios");
let qs = require("qs");

class ApiInterface {
  accessToken = "";
  constructor() {
    this.accessToken = this.getAccessToken();
  }

  getAccessToken = async () => {
    let data = qs.stringify({
      client_id:
        "97362042616-gi00enukqpurpf2miirfio244.apps.googleusercontent.com",
      client_secret: "JUk6I4zxz0lAvltJAhS",
      refresh_token:
        "1//0gzoM1QlCgYIARAAGBASNwF-Lp0Tom1emMG9eK0hXaTTCNkxFYatcupth-iwHVuf7oRumMVN7DivbMz6Pms",
      grant_type: "refresh_token",
    });
    let config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let accessToken = "";
    try{
      let result = await axios(config);
      accessToken = result.data.access_token;
      console.log("Access Token " + accessToken);
    }catch(error){
      console.log(error.message);
    }

    return accessToken;
  };

  searchGmail = async (searchItem) => {
    let config1 = {
      method: "get",
      url:
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken} `,
      },
    };
    let threadId = "";

    try{
      let result = await axios(config1);
      threadId = response.data["messages"];

      console.log("ThreadId = " + threadId);
    }catch(err){
      console.log(err);
    }

    return threadId;
  };

  sendReplyToThreadList = async (unreadThreadList) => {

    for(let i=0;i<unreadThreadList.length;i++){
      let config = {
        method: "get",
        url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${unreadThreadList[i]}`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      };
  
      let msgData = {};
  
      try{
        let result = await axios(config);
        data = result.data;

        let msgHeader = msgData.payload.headers;

        let senderEmail = msgHeader.map(_item => {return _item.name == "From"});
        senderEmail = senderEmail[0].value;

        // send email 

        const options = {
          to: 'receiver@gmail.com',
          subject: 'i am on vacation',
          text: 'I will check this later as i am on vacation.',
          
        };
      
        let configSend = {
          method: "POST",
          url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          message: {
            raw: options
          }
        };

        let resultSend = await axios(configSend);

      }catch(err){
        console.log(err);
      }
    }
  
    
  };

  sendReply = async (searchText) => {
    const unreadThreadList = await this.searchGmail("is:unread");
    await this.sendReplyToThreadList(unreadThreadList);

    
  };
}

module.exports = new ApiInterface();

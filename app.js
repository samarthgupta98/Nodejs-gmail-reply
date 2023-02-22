let interface = require("./apiCall");

function doWork(){
  // do whatever you like here
  interface.sendReply("from:xyz@gmail.com ");
  setTimeout(doWork, 5000);
}

doWork();


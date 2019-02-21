const fs = require('fs');
const jsonPath = "test.json";

var data, dar, parseDar;

function read() {
  fs.readFile(jsonPath, "utf-8", function read(err, dat) {
    if(err){throw err;}
    dar = JSON.parse(dat);
    callback();
  });
}
function callback() {
  console.log("access");
  parseDar = dar;
}
function write(data) {
  var hg = JSON.stringify(data);
  fs.writeFile(jsonPath, hg, function(err) {
    if(err){throw err;}
    console.log("Write comp");
  });
}
function returnRead() {
   return parseDar;  
}
module.exports.read = read;
module.exports.write = write;
module.exports.callback = callback;
module.exports.returnRead = returnRead;


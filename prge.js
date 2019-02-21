const rls = require('readline-sync');
const fs = require('fs');
const ch = require('chalk');
const cls = require('clear-screen');
const fm = require("./file-manager.js");
const log = console.log;
const jsonPath = "test.json";

const version = 0.1;
const status = "UNRELEASED";

var stBud = 200, speBud, curBud, parsedData;

var wants_array = [];

startLogic();
runtime();
function runtime() {
   cls();
   log(ch.yellow("PRGE Helper"));
   log("b. Budget ");
   log("s. Settings ");
   log("m. Map ");
   log("w. Wants");
   log("i. Input");
   log("ex. Exit");
   var opt = rls.question("");
   switch(opt.toLowerCase()) {
     case 'b':
      budgetPanel();
      break;
     case 's':
      log(ch.red("Info"));
      log(ch.yellow("Sys Version: ") + version);
      log(ch.yellow("Release Status: ") + status);
      setTimeout(function () {
          runtime();
        }, 10000)
      break;
     case 'm':
      break;
     case 'w':
     wantsPanel();
      break;
     case 'db':
      debug();
      break;
    case 'i':
     input();
     break;
    case 'ex':
     process.exit(0);
     break;
   }
}
function budgetPanel() {
  cls();
  log(ch.red("Budget: "));
  log(ch.yellow("Starting Amount: ") + stBud);
  log(ch.yellow("Current Spent: ") + speBud);
  log(ch.yellow("Current spendable: ") + curBud);
}
function mapPanel() {

}
function wantsPanel() {
  cls();
  log(ch.red("Wants"));
  for(var i=0; i < wants_array.length; i++) {
    log(ch.yellow(wants_array[i]));
  }
  setTimeout( function() {
    runtime();
  }, 10000);
}
function debug() {
  recallArray();
  log(wants_array[0]);
}
function input() {
  log(ch.red("Current $: ") + curBud);
  log("Has money been spent? (y/n)");
  var opt1 = rls.question("");
  if(opt1 == "y" || opt1 == 'Y') {
    var subMon = rls.question("How much? ");
    curBud = curBud - subMon;
    log(ch.red("Current $: ") + curBud);
    setTimeout(function() {
      runtime();
    }, 3000);
  }else if(opt1 == "n" || opt1 == 'N') {
    log(ch.red("Reload previous current $ and Wants? (y/n): "));
    var opt2 = rls.question("");
    if(opt2.toLowerCase() == 'y') {
       recallArray();
       log("Complete!");
       setTimeout(function() {
         runtime();
       }, 3000);
    }else if(opt2.toLowerCase() == 'n') {
      runtime();
    }
  }
}
function backupArry() {
  fs.writeFileSync("test.json", JSON.stringify(wants_array), 'utf-8');
}
function recallArray() {
  var unParsedData = fs.readFileSync("test.json").toString();
  parsedData = JSON.parse(unParsedData);
  wants_array = parsedData;
  log(unParsedData);
  log(parsedData);
}
function startLogic() {
  curBud = stBud;
}
//TO:DO: Storing wants


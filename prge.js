const rls = require('readline-sync');
const fs = require('fs');
const ch = require('chalk');
const cls = require('clear-screen');
const log = console.log;
const jsonPath = "test.json";

const version = 0.2;
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
   log("bc. backup");
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
    case 'bc':
      backup();
     break;
    case 'ex':
     process.exit(0);
     break;
   }
}
function budgetPanel() {
  cls();
  log(ch.red("Budget: "));
  log(ch.yellow("Current Spent: ") + speBud);
  log(ch.yellow("Current spendable: ") + curBud);
  var monSpent = rls.question(ch.yellow("Any money spent?: "));
  switch(monSpent) {
    case 'y':
      var spent = rls.question(ch.yellow("How much?: "));
      curBud = curBud - spent;
      speBud = speBud + spent;
      budgetPanel();
     break;
    case 'n':
    setTimeout( function() {
      runtime();
    }, 5000);
     break;
}}
function mapPanel() {
//TODO
}
function wantsPanel() {
  cls();
  log(ch.red("Wants"));
  for(var i=0; i < wants_array.length; i++) {
    log(ch.yellow(wants_array[i]));
  }
  setTimeout( function() {
    runtime();
  }, 5000);
}
function debug() {

}
function backup() {
  backupArray("wants");
  backupArray("budget");
  log("Backup Complete! Going back to runtime in 2 seconds");
  setTimeout(function() {
    runtime();
  }, 2000)
}
function backupArray(jsonP) {
  var jsonP;
  if(jsonP == "budget") {
    fs.writeFileSync("budget.txt", curBud, 'utf-8');
  }else if(jsonP == "wants") {
    fs.writeFileSync("wants.json", JSON.stringify(wants_array), 'utf-8');
  }}
function recallArray(jsonP) {
  var jsonP;
  if(jsonP == "budget") {
    var ren = fs.readFileSync("budget.txt").toString();
    curBud = parseInt(ren);
  }else if(jsonP == "wants") {
    var unParsedData = fs.readFileSync("wants.json").toString();
    parsedData = JSON.parse(unParsedData);
    wants_array = parsedData;
    log("t4");
  }}

function startLogic() {
  recallArray("wants");
  recallArray("budget");
}

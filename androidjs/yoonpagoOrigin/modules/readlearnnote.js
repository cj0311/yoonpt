

exports.readlearnnote = function(){
function readlearnnote(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var studylists = readdir(sdcard + "/yoonpago_db/" + room + "/학습");
  var i = 0;
  var studylist = "-----학습목록-----\n";
  if(studylists == null ){
    replier.reply("학습한게 없서요...");
    return null;
}
  while (i < studylists.length) {
    studylist = studylist + studylists[i].split(".txt")[0];
    i = i + 1;
    if (i != studylists.length)
      studylist = studylist + "\n";
  }
  replier.reply(studylist);
}
return readlearnnote;
}
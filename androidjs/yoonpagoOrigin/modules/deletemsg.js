
exports.deletemsg = function(){
function deletemsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {

  var del_msg = msg.substr(3);
  if (deletecommand(sdcard + "/yoonpago_db/" + room + "/학습/" + del_msg.trim() + ".txt")) {
    replier.reply(del_msg + "를(을) 잊었습니다.");
  } else {
    replier.reply("난 모르는 일이오...");
  }
}
return  deletemsg;
}
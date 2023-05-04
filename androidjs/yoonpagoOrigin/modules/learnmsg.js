

exports.learnmsg = function() {

function learnmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    var learntotalk = read(sdcard + "/yoonpago_db/" + room + "/학습/" + msg.trim() + ".txt");
    if (learntotalk != null) {
      replier.reply(learntotalk);
    }
    if (msg.substr(0, 4) == "가르치기") {
      if (msg == "가르치기") {
        replier.reply("윤파고에게 대화를 학습시킵니다. \n 가르치키 키워드=대답할내용\n"
          + "ex) 가르치기 안녕=안녕하세요");
      }
      else {
        var learningword = msg.substr(5);
        var learning_keyword = learningword.split("=")[0];
        var learning_content = learningword.split("=")[1];
  
        if (learning_content == null) {
          replier.reply(learning_keyword + "에 대해 알려준거 맞아영?");
        } else {
          save(sdcard + "/yoonpago_db/" + room + "/학습/" + learning_keyword.trim() + ".txt", learning_content.ltrim());
          save_log(sdcard + "/yoonpago_db/" + room + "/학습목록/studylist.txt", learning_keyword.trim() + "\n");
  
          replier.reply("학습내용 : " + learning_keyword + " -> " + learning_content);
        }
      }
    }
  }
  return learnmsg;
}


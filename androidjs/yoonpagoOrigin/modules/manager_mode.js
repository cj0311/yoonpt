


exports.manager_mode = function() {
function manager_mode(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {

  /*replier.reply("room :" + room +
    "\n msg : " + msg +
    "\n sender : " + sender +
    "\n isGroupChat : " + isGroupChat +
    "\n replier : " + replier +
    "\n imageDB : " + imageDB +
    "\n packageName : " + packageName +
    "\n threadId : " + threadId);*/
  replier.reply(msg.substr(msg.length - 2,2));
  if (msg == "/패치시작") {
    replier.reply("패치를 시작합니다.");
    save(sdcard + "/yoonpago_setting/" + "fetch_process/" + "fetch.txt", "on");
  }
  if (msg == "/패치종료") {
    replier.reply("패치를 종료합니다.");
    save(sdcard + "/yoonpago_setting/fetch_process/fetch.txt", "off");
  }
  if (msg.substr(0, 7) == "/건의사항보기") {
    if (msg == "/건의사항보기") {
      var sug_lists = readdir(sdcard + "/yoonpago_db/" + "건의사항");

      var i = 0;
      var sug_list = "-----일별건의목록-----\n";
      while (i < sug_lists.length) {
        sug_list = sug_list + sug_lists[i].split(".txt")[0];
        i = i + 1;
        if (i != sug_lists.length)
          sug_list = sug_list + "\n";
      }
      replier.reply(sug_list);
    }
    else {
      var sug_txt = read(sdcard + "/yoonpago_db/건의사항/suggestion_" + msg.substr(8).trim() + ".txt");

      if (sug_txt != null) {
        replier.reply(sdcard + "/yoonpago_db/건의사항/suggestion_" + msg.substr(8).trim() + ".txt");
        replier.reply(sug_txt);
      } else {
        replier.reply(sdcard + "/yoonpago_db/건의사항/suggestion_" + msg.substr(8).trim() + ".txt");
        replier.reply("건의사항없음");
      }
    }
  }
  
  

  if(msg.startsWith("알람추가 ")  ){
    if (msg.startsWith("알람추가 ") && msg.split(" ").length == 3) {
      msg = msg.split(" ");
​     
      let alarmmsg = ''
      let j = 0 ;
      for(j = 3 ; j < msg.length ; j++ ){
        alarmmsg = alarmmsg + " " + msg[j];

      }

      if ([msg[1], msg[2]].some(s => isNaN(s) || s < 0 || s > 60) || msg[1] > 23) {
          replier.reply("[Bot]\n형식에 맞지 않습니다.\n형식 : 알람추가 [시] [분]");
          return;
      }
      else {
          alarm.push("{ \"Room\": \"" + room + "\", \"Sender\": \"" + sender + "\", \"Hour\": " + msg[1] + ", \"Minute\": " + msg[2] + ", \"almsg\": " + alarmmsg+  " }");
          replier.reply("알람추가\n"+alarm +"\n");
          replier.reply(alarm[0]);
          replier.reply(alarm[alarm.length - 1]);
          let _alarm = JSON.parse(alarm[alarm.length - 1]);
          replier.reply("알람추가2");
          replier.reply("[Bot]\n" + (_alarm.Hour / 12 < 1 ? "오전 " : "오후 ") + (_alarm.Hour % 12) + "시 " + _alarm.Minute + "분\n메세지 : "+_alarm.almsg +"알람을 설정했습니다.");
      }
    }
  }

    
    if (!loop) {
      replier.reply("1loop");  
      if (msg == "알람시작") {
          loop = true;
          on = true;
          replier.reply("[Bot]\n작동을 시작합니다.");
      }      ​
      if (msg == "알람정지")
                replier.reply("[Bot]\n작동 중이 아닙니다.");
    }
    else if (loop) {

      replier.reply("loop");  
            if (msg == "알람정지") {
                loop = false;
                replier.reply("[Bot]\n작동을 정지합니다.");
            }
      ​
      if (msg == "알람시작")
                replier.reply("[Bot]\n작동 중 입니다.");
    }

   // let _alarm = JSON.parse(alarm[alarm.length - 1]);
    while (on) {
          replier.reply(on);  
            if (!loop)
                break;
            on = false;
          let day = new Date();
          ​
        //  replier.reply(on);  
          java.lang.Thread.sleep(1000);
          on = true;
          for (let i of alarm) {
                i = JSON.parse(i);      ​
                if (day.getHours() == i.Hour && day.getMinutes() == i.Minute) {
                  replier.reply(i.Room, ("[Bot]\n" + i.Sender + " 님이 등록하신 알람이 울립니다.\n" + (i.Hour / 12 < 1 ? "오전 " : "오후 ") + (i.Hour % 12) + "시 " + i.Minute + "분 입니다."));
                
                  //replier.reply((i.Hour / 12 < 1 ? "오전 " : "오후 ") + (i.Hour % 12) + "시 " + i.Minute + "분 알람\n" +_alarm.almsg);
                  on = false;
                  on = false;
                  on = false;
                break;
                }
            }
           replier.reply(_alarm.almsg);  
      ​
        }

  

  /*
    if (msg.substr(0, 2) == "번억") {  //언어감지
      if(msg == "번역 "){
        replier.reply("윤파고가 번역을 시도합니다.\nex)번역 안녕 윤파고");
  
      }else {
      replier.reply(scanlang(msg.substr(3)).substr(13, 2));
      }
    }
  */

  


  if (msg == "컴파일") {

    Api.reload("yoonpago.js")
  }

}
return manager_mode;
}
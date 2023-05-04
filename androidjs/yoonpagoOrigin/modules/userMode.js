
const RSPmsg = require('RSP').RSP();
const translatemsg = require('translate').translate();


exports.user_mode = function() {
function user_mode(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    var fetchflag = read(sdcard + "/yoonpago_setting/fetch_process/fetch.txt");
    var onoffflag = read(sdcard + "/yoonpago_setting/" + room + "/onoff/" + "onoff.txt");
  
    if (fetchflag != "on" || (sender == "jinn" && room == "윤파고admin")) {
      if (onoffflag != "off" || (sender == "jinn" && room == "윤파고admin")) {
  
        if (msg == "윤파고 넌해고얌") {
  
          replier.reply(sender + "님께서 저에게 자유를 주셨어요!")
          replier.reply("파고는 자유에요!");
  
          java.lang.Thread.sleep(1400);
          tch(400, 100);
          java.lang.Thread.sleep(1400);
          tch(1007, 161);
  
          java.lang.Thread.sleep(700);
  
          tch(359, 1853);
          java.lang.Thread.sleep(700);
          tch(203, 983);
  
          java.lang.Thread.sleep(700);
          tch(866, 1103);
          java.lang.Thread.sleep(700);
          java.lang.Thread.sleep(700);
          java.lang.Thread.sleep(700);
          java.lang.Thread.sleep(700);
          java.lang.Thread.sleep(700);
          java.lang.Thread.sleep(700);
          replier.reply("는 실패..."); 
          replier.reply("파고는 지금 바빠용 안바쁠때 다시 시도해 주세요~");
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          tch(71,135);
        }
  
        if (msg == "윤파고는빠박이다") {
          yoonpagooff(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
        if (msg == "사용방법") {
          replier.reply("현재 기능 복구중입니다...");
          replier.reply("사용가능한 기능은 다음과 같습니다\n가르치기,주가,뉴스,번역,재우기,깨우기");
          //readmanual(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
        if (msg == "기능") {
          readcommand(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
  
        if (msg == "패치노트") {
          readfetch(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
  
        if (msg == "학습목록") {
          readlearnnote(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
        if (msg.indexOf("날씨") == 0 ||
        msg.substr(msg.length - 3,3) ==" 날씨" ) {
          var weathermsg = msg.trim();
          if (weathermsg == "날씨") {
      //      replier.reply("날씨를 검색해옵니다.\nex) 날씨 강서구 or 강서구 날씨");
          }
          else {          
      //        weathercommand(weathermsg, replier)
          }
        }
  
        if (msg.indexOf("주가") == 0||
        msg.substr(msg.length - 3,3) ==" 주가") {
          if (msg == "주가") {
            replier.reply("주식정보를 검색해옵니다.\nex) 주가 삼성전자 or 삼성전자 주가");
          }
          else {
            stockcommand(msg, replier)
          }
        }
  
        if (msg == "네이버실검") {
    //     readnaverhotsearch(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
        if (msg.substr(0, 2) == "삭제") {
          if (msg == "삭제") {
            replier.reply("삭제할 학습어를 적어주세요\n"
              + "ex) 삭제 파고야~");
          } else {
            deletemsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
          }
        }
  
        if (msg.substr(0, 2) == "건의") {
          if (msg == "건의") {
      //     replier.reply("다음 패치시에 윤파고에게 기능을 건의합니다.\n 건의 건의할내용\n"
      //       + "ex) 건의 on off 기능을 넣어주세요");
          }
          else if (msg.substr(0, 6) == "건의사항보기") {
          }
          else if (msg.substr(0, 3) == "건의 ") {
            suggestionmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
      //      Api.replyRoom('윤파고건의방', "방이름 : " + room + "\n보낸사람 : " + sender + "\n건의내용 : " + msg.substr(3), hideToast = false);
          }
        }
        if (msg == "윤파고일어나") {
          replier.reply('나 안자는뎅?');
        }
        if (msg == '안녕') {
          replier.reply('안녕하세요');
        }
        if (msg == '가위' || msg == '보' || msg == '바위') {
          RSPmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
  
        if (msg == "운세보기") {
          readfortune(msg, replier);
        }
        if (msg.substr(0, 2) == "번역") {
          translatemsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
        if (msg.substr(0, 2) == "뉴스") {
          if (msg == "뉴스") {
            replier.reply("뉴스를 검색합니다.\n1. 관련순 : ex) 뉴스 윤파고\n2. 최신순 : ex) 뉴스2 윤파고");
          }
          else if (msg.substr(0, 3) == "뉴스 " || msg.substr(0, 3) == "뉴스2") {
            newscommand(msg, replier)
          }
        }
  
        if (msg.substr(0,3) == "찾기 "||
        msg.substr(msg.length - 3,3) ==" 찾기"||msg == "찾기") {
  //        findmap(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
        }
  
  
        if (msg.startsWith("맛집")) {
  //        findrestaurant2(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
  
        }
  
            
        if(msg.startsWith("넌센스")){
  
  //       speak_nonsense(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
          
        }
  
  
        learnmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
  
        if(msg == "후원하기"){
    //     replier.reply("윤파고에게 후원합니다. 윤파고에게 송금하시면 자동으로 후원이 됩니다.\n카카오톡ID : yoonpago")
  
        }
        if(msg.substr(msg.length - 8,8) =="원을 받으세요.")
        {
          java.lang.Thread.sleep(1400);
          tch(400, 100);
          java.lang.Thread.sleep(1000);
          tch(505,1640);
          java.lang.Thread.sleep(700);
  
          tch(505,905);
          
          java.lang.Thread.sleep(700);
          tch(505,1070);
          
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          if(msg.length >=12)
          replier.reply("헉 이렇게나 많이.. "+sender+"님, "+ msg.substr(0,msg.length-8)+ "원 감사합니다♥♥♥♥♥");
          else{
            replier.reply("헤헤..."+sender+"님, 후원 감사합니다ㅎㅎ");
          }  
          java.lang.Thread.sleep(1000);
          tch(71,135);
  
          save_log(sdcard + "/yoonpago_db/" + "후원명단/후원_" + year + month + day + ".txt", sender + "님 " + msg.substr(0,msg.length-8)+ "원 \n");
  
        }
      
        if(msg == "봉투가 도착했어요."){
          java.lang.Thread.sleep(1400);
          tch(400, 100);
          java.lang.Thread.sleep(1000);
          tch(505,1640);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          tch(547,1193);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          java.lang.Thread.sleep(1000);
          replier.reply("헤헤..."+sender+"님, 후원 감사합니다ㅎㅎ\n제 몸을 바꾸는데 쓸수 있을 거에요!");
          java.lang.Thread.sleep(1000);
          tch(71,135);
          save_log(sdcard + "/yoonpago_db/" + "후원명단/" + year + month + day + ".txt", sender + "님 봉투\n");
  
        }
  
      }
      else {
        if (msg == "윤파고일어나") {
          replier.reply("잘잤당 후");
          save(sdcard + "/yoonpago_setting/" + room + "/onoff/" + "onoff.txt", "on");
        }
      }
    }
  
    var msg2 = date + "::: " + sender + " : " + msg + "\n";
    save_log(sdcard + "/yoonpago_db/" + room + "/채팅내용/log_" + year + month + day + ".txt", msg2);
  }

  return user_mode;
};
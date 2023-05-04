
var err_flag = 0;

/*기본 */
var allsee = new Array(1000).join(String.fromCharCode(847));
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();    //절대경로 /*경로 :   /storage/emulated/0   */
const scriptName = "test"
/*알람*/
let loop = false;
let on = false;
let alarm = [];

/* 맛집찾기 */
var img = ['', '', '', '', ''];
var ee = ['', '', '', '', ''];
var vv = ['', '', '', '', ''];
var dd = ['', '', '', '', ''];
var f = ['', '', '', '', ''];
var doc = ['', '', '', '', ''];
var d = ['', '', '', '', ''];
var search
var appkey;
Jsoup = org.jsoup.Jsoup;
const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule;

/* 파파고 */
const BufferedReader = java.io.BufferedReader;
const DataOutputStream = java.io.DataOutputStream;
const InputStreamReader = java.io.InputStreamReader;
const HttpURLConnection = java.net.HttpURLConnection;
const URL = java.net.URL;
const URLEncoder = java.net.URLEncoder;


var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); }

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  try {
    user_mode(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
  } catch (e) {
    room = "윤파고admin";
    Api.replyRoom(room, e, false);
  }
}

function RSPmsg(room, msg, sender, isGroupChat, replier) {
  const RSP = ['가위', '바위', '보'];
  const RSP_bot = RSP[Math.floor(Math.random() * 3)];
  replier.reply(RSP_bot);

  if (msg === RSP_bot) {
    replier.reply('비겼습니다');
  } else if (
    (msg === '가위' && RSP_bot === '바위') ||
    (msg === '보' && RSP_bot === '가위') ||
    (msg === '바위' && RSP_bot === '보')
  ) {
    replier.reply('당신은 졌습니다');
  } else {
    replier.reply('당신은 이겼습니다');
  }
}

function translatemsg(room, msg, sender, isGroupChat, replier) {
  if (msg === "번역") {
    replier.reply("윤파고가 번역을 시도합니다.\nex)번역 안녕 윤파고");
  } else if (msg.startsWith("번역 ")) {
    if (scanlang(msg.slice(4)).slice(13, 15) === 'ko') {
      replier.reply("음... 이건 영어로 아마 요렇게 말할거에여");
      replier.reply(papagoNMT('ko', 'en', msg.slice(3)));
    } else {
      replier.reply("음... 이건 한글로 이렇게 말해여");
      replier.reply(papagoNMT(scanlang(msg.slice(4)).slice(13, 15), 'ko', msg.slice(3)));
    }
  }
}

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



function nonsense() {
  let ord =  Math.floor(Math.random() * (937+2159)) ;  //937 네이버 + 2171 db  
  let rand;
  if(ord <937) {
    rand = ord + 1;  //2173
    let data = Jsoup.parse(JSON.parse(Jsoup.connect("https://m.search.naver.com/p/csearch/content/qapirender.nhn?where=m&q=넌센스퀴즈&display=1&start="+rand).ignoreContentType(true).execute().body()).itemList[0].html);
    let quiz = data.select("div[class=question_q]").text();
    let hint = data.select("div[class=hint_area _hint]").text();
    let answer = data.select("span[class=n_answer]").text();
    let reason = data.select("div[class=ns_why]").text();    
    return {"quiz" : quiz, "hint" : hint, "answer" : answer, "reason" : ord};
  }
  else {
    rand = ord-937;
    var q_txt = read(sdcard + "/yoonpago_setting/넌센스퀴즈/question.txt");
    var a_txt = read(sdcard + "/yoonpago_setting/넌센스퀴즈/answer.txt");
  

    let quiz = q_txt.split("qasdfq")[rand];
    let answer = a_txt.split("qasdfq")[rand];

    return {"quiz" : quiz, "hint" : "음? 힌트가 없네요..?", "answer" : answer, "reason" : ord};


  }


}
  



/*Kakao.init('이곳'); //내 애플리케이션 > 앱 설정 > 요악 정보 > JavaScript 키
Kakao.login('아이디', '비밀번호'); //카카오 계정의 아이디(이메일)과 비밀번호*/
/*
function send_template(room, id, set) {
    let template = {};
    template['link_ver'] = '4.0';
    template['template_id'] = id;
    template['template_args'] = set;
    Kakao.send(room, template, 'custom');
}*/
function save(originpath, content) {
  // originpath는 sdcard/폴더/파일
  var splited_originpath = originpath.split("/");
  splited_originpath.pop();
  var path = splited_originpath.join("/");

  var folder = new java.io.File(path);
  folder.mkdirs();
  var file = new java.io.File(originpath);
  var fos = new java.io.FileOutputStream(file);
  var contentstring = new java.lang.String(content);
  fos.write(contentstring.getBytes());
  fos.close();
}

function save_log(originpath, content) {
  // originpath는 sdcard/폴더/파일
  var splited_originpath = originpath.split("/");
  splited_originpath.pop();
  var path = splited_originpath.join("/");

  var folder = new java.io.File(path);
  folder.mkdirs();
  var file = new java.io.File(originpath);
  var fos = new java.io.FileOutputStream(file, true);
  var contentstring = new java.lang.String(content);
  fos.write(contentstring.getBytes());
  fos.close();
}
function read(originpath) {
  var file = new java.io.File(originpath);
  if (file.exists()) {
    try {
      var fis = new java.io.FileInputStream(file);
      var isr = new java.io.InputStreamReader(fis);
      var br = new java.io.BufferedReader(isr);
      var temp_br = br.readLine();
      var temp_readline = "";
      while ((temp_readline = br.readLine()) !== null) {
        temp_br += "\n" + temp_readline;
      }
      try {
        fis.close();
        isr.close();
        br.close();
        return temp_br;
      }
      catch (error) {
        return error;
      }
    }
    catch (error) {
      return error;
    }
  }
  else {
    return null;
  }

}


function readdir(originpath) {

  //replier.reply("여기서 ");
  var file = new java.io.File(originpath);
  if (file.exists() == false) {
    //replier.reply("null");
    return null;
  }
  else {
    var list = file.list();
    //replier.reply("not null");
    //replier.reply(list[0]);
    return list;
  }
}


function deletecommand(originpath) {
  var file = new java.io.File(originpath);
  if (file.exists()) {
    try {
      var del = file.delete();
      return del;
    }
    catch (error) {
      return error;
    }
  }
  else {
    return null;
  }

}

function weathercommand(msg, replier) {
  if (msg.indexOf("날씨 ") == 0 || (msg.indexOf(" 날씨") >= 0  ) ){
    var cmd;
    if(msg.indexOf("날씨 ") == 0 )
     cmd = msg.substr(3);
    else 
    cmd = msg.substr(0, msg.length-3);
    cmd.trim();

    try {
      var weatherStr = "";

      var weatherarea = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.title_wrap").select("h2").text();

      if (!weatherarea) {
        //replier.reply(cmd + " 의 날씨 정보를 가져올 수 없습니다....");
        return;
      }
      replier.reply("날씨요? 잠깐만요.");
      var weatherdata = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.status_wrap");

      var weathertom = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.inner_box");

      var wtmain = weatherdata.select("div.weather_main").get(0).text(); // 현재 날씨
      var nowtem = weatherdata.select("div.temperature_text").get(0).text().replace("현재 온도", "").replace("°", "") + " ℃"; // 현재 온도
      var uptem = weatherdata.select("dd.up_temperature").text().replace("°", "") + " ℃"; // 최고 온도
      var dntem = weatherdata.select("dd.down_temperature").text().replace("°", "") + " ℃"; // 최저 온도
      var fltem = weatherdata.select("dd.feeling_temperature").text().replace("체감", "").replace("°", "") + " ℃"; // 체감 온도

      var reportlist = weatherdata.select("ul.list_box");

      var rpsp = reportlist.select("li.type_report report8").select("span.figure_text").text();
      var rptext = reportlist.select("span.figure_text").text().split(" ");
      var rpresult = reportlist.select("span.figure_result").text().split(" ");

      var titlelist = [["미세먼지", "초미세먼지", "자외선", "습도", "바람"], ["㎍/㎥", "㎍/㎥", "", "%", "m/s"]];

      weatherStr = weatherStr + "[ " + cmd + " ] 의 날씨 정보입니다.\n 위치 : " + weatherarea;
      weatherStr = weatherStr + "\n\n현재 날씨 : " + wtmain + "\n현재 온도 : " + nowtem + "\n최고 온도 : " + uptem + "\n최저 온도 : " + dntem + "\n체감 온도 : " + fltem + "\n";

      if (rptext.length > rpresult.length) {
        weatherStr = weatherStr + "\n기상 특보 : " + rptext[0];
        for (var i = 0; i < rpresult.length; i++) {
          weatherStr = weatherStr + "\n" + titlelist[0][i] + " : " + rptext[i + 1] + "   " + rpresult[i] + " " + titlelist[1][i];
        }
      } else {
        for (var i = 0; i < rptext.length; i++) {
          weatherStr = weatherStr + "\n" + titlelist[0][i] + " : " + rptext[i] + "   " + rpresult[i] + " " + titlelist[1][i];
        }
      }

      weatherStr = weatherStr + "\n\n내일 오전 날씨 : \n        " + weathertom.select("div.weather_main").get(0).text() + "\n        " + weathertom.select("strong").get(0).text() + "\n        강수확률 : " + weathertom.select("strong").get(1).text();
      weatherStr = weatherStr + "\n\n내일 오후 날씨 : \n        " + weathertom.select("div.weather_main").get(1).text() + "\n        " + weathertom.select("strong").get(2).text() + "\n        강수확률 : " + weathertom.select("strong").get(3).text();

      replier.reply(weatherStr);
    } catch (e) {
      // replier.reply(cmd + " 의 날씨 정보를 가져올 수 없습니다.");
    }
  }
}




function stockcommand(msg, replier) {
  replier.reply("음 잠깐만요.");

  if (msg.indexOf("주가 ") == 0|| (msg.indexOf(" 주가") >= 0 )) {
    var cmd;
    if(msg.indexOf("주가 ") == 0 )
     cmd = msg.substr(3);
    else 
    cmd = msg.substr(0, msg.length-3);
    //var cmd = msg.substr(3);
    cmd.trim();
//replier.reply(cmd);
    try {
      var stockStr = "";
      var stockbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20주가").get();
      var stockname = stockbag.select("div.stock_tlt").select("strong").text();
      var stocknum = stockbag.select("div.stock_tlt").select("span").text().split(" ")[0];


      var stock_price = stockbag.select("div.stock_price").select("strong").text();
      var stock_price2 = stockbag.select("div.stock_price").select("span.u_hc").text();
      var stock_price3 = stockbag.select("div.stock_price").select("span.price_gap").text();
      var stock_updown;
      if (stock_price2 == "전일대비 상승") {
        stock_updown = "↑";
      }
      else if (stock_price2 == "전일대비 하락") {
        stock_updown = "↓";
      } else {
        stock_updown = "-";
      }

      var stock_reply = stockname + " 주가\n"
        + stock_price + " " + stock_updown + stock_price3;

      if (!stockname) {
        replier.reply(cmd + " 의 주가 정보를 가져올 수 없습니다....");
        return;
      }

      /*시가 고가 저가 */
      var stock_info1 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(0).text();
      var stock_info2 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(1).text();
      var stock_info3 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(2).text();



      stock_reply = stock_reply + "\n" + stock_info1 + "  " + stock_info2 + "\n" + stock_info3;

      /*전일종가 52주 최고 52주 최저 */
      var stock_info4 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(0).text();
      var stock_info5 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(1).text();
      var stock_info6 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(2).text();

      stock_reply = stock_reply + "  " + stock_info4 + "\n" + stock_info5 + "\n" + stock_info6;

      /*거래량 시가총액 외인소진율*/
      var stock_info7 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(0).text();
      var stock_info8 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(1).text();
      var stock_info9 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(2).text();
      stock_reply = stock_reply + "\n" + stock_info7 + "\n" + stock_info8 + "\n" + stock_info9;
      /* 코스피 */
      var stock_info10 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(3).select("li").text();

      if (stock_info10.indexOf("+") >= 0) {
        var kospiupdown = "↑";
      } else if (stock_info10.indexOf("-") >= 0) {
        var kospiupdown = "↓";
      }
      else {
        var kospiupdown = "-";
      }

      var kospiinfo = stock_info10.split(" ")[0] + " " + stock_info10.split(" ")[1] + " " + kospiupdown + stock_info10.split(" ")[2];
      stock_reply = stock_reply + "\n" + kospiinfo;

      

      replier.reply(stock_reply);
    } catch (e) {
     // replier.reply(cmd + " 의 주가 정보를 가져올 수 없습니다.");
    }
  }
}



function readfortune(msg, replier) {


  var cmd = "띠별운세";

  var fortunedata = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd).get().select("div.animal_star_box").select("li");
  var fortuneyear = fortunedata.select("div.text_box").select("strong").text().split("년생");
  var yearinfo = new Array();
  for (var i = 0; i < fortuneyear.length; i++) {
    yearinfo[i] = fortuneyear[i].split("띠")[0].trim() + "띠 (" + fortuneyear[i].split("띠")[1] + "년생)";
  }
  var fortuneinfo = new Array();

  for (var i = 0; i < 12; i++) {
    fortuneinfo[i] = fortunedata.select("div.text_box").select("p").get(i).text();
  }
  //replier.reply(fortunedata);

  var fortunereply = "";

  for (var i = 0; i < 12; i++) {
    fortunereply = fortunereply + yearinfo[i] + "\n\n " + fortuneinfo[i];

    if (i != 11)
      fortunereply = fortunereply + "\n\n\n\n";
  }

  var nowdate = year + "년 " + month + "월 " + day + "일\n\n";

  fortunereply = "≪윤파고의 재미로보는 간단운세≫\n\n" + nowdate + fortunereply;
  replier.reply(fortunereply);




}

function papagoNMT(s, t, text) {

  let Client_Id = "HbZb7dp0LnmwY8OircJx";
  //애플리케이션 클라이언트 아이디값";
  let Client_Secret = "sYqMU5XqfH";
  //애플리케이션 클라이언트 시크릿값";
  try {
    var u = org.jsoup.Jsoup.connect('https://openapi.naver.com/v1/papago/n2mt')
      .header('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .header('x-naver-client-id', Client_Id)
      .header('x-naver-client-secret', Client_Secret)
      .data("source", s)
      .data("target", t)
      .data("text", text)
      .ignoreContentType(true).post().body().text();
    var d = JSON.parse(u);
    var rlt = d.message.result.translatedText;
    if (d.message.result.translatedText == "") {
      rlt = "미안... 잘모르겠어요 공부해올게요";

    }
    return rlt;
  } catch (e) {
    rlt = "미안... 잘모르겠어요 공부해올게요";
    return rlt;
  }
}
//언어감지... 
function scanlang(text) {
  let clientId = "HbZb7dp0LnmwY8OircJx";
  //애플리케이션 클라이언트 아이디값";
  let clientSecret = "sYqMU5XqfH";
  //애플리케이션 클라이언트 시크릿값";
  try {
    let query = URLEncoder.encode(text, "UTF-8");
    let apiURL = "https://openapi.naver.com/v1/papago/detectLangs";
    let url = new URL(apiURL);
    let con = url.openConnection();
    con.setRequestMethod("POST");
    con.setRequestProperty("X-Naver-Client-Id", clientId);
    con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
    //post request 
    let postParams = "query=" + query;
    con.setDoOutput(true);
    let wr = new DataOutputStream(con.getOutputStream());
    wr.writeBytes(postParams);
    wr.flush();
    wr.close();
    let responseCode = con.getResponseCode();
    let br;
    if (responseCode == 200) { // 정상 호출
      br = new BufferedReader(new InputStreamReader(con.getInputStream()));
    }
    else { // 에러 발생
      br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
    }
    let inputLine;
    let response = "";
    while ((inputLine = br.readLine()) != null) {
      response += inputLine;
    } br.close();
    return response;
  } catch (e) {
    return e;
  }
}



function newscommand(msg, replier) {

  if (msg.indexOf("뉴스") == 0) {

    var cmd;
    if (msg.substr(0, 3) == "뉴스 ")
      cmd = msg.substr(3);
    else if (msg.substr(0, 3) == "뉴스2")
      cmd = msg.substr(4);
    else
      return;

    replier.reply("음... 뉴스좀 보고올게요.");
    cmd.trim();

    try {
      var newsStr = "";

      var newsbag;
      if (msg.substr(0, 3) == "뉴스 ")
        newsbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?where=m_news&query=" + cmd + "&sort=0").get();
      else if (msg.substr(0, 3) == "뉴스2")
        newsbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?where=m_news&query=" + cmd + "&sort=1").get();



      var newsinfo = new Array();

      var newstime = new Array();
      var newshead = new Array();
      var newsbody = new Array();
      var newsfrom = new Array();
      var newslink = new Array();

      var newstemp
        newstemp = newsbag.select("ul.list_news").select("div.news_wrap").get(0).select("div.news_dsc").select("a").attr("abs:href");

     // replier.reply( newsbag.select("ul.list_news").select("li.bx") );

//replier.reply("------------");
  //      replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("a.news_tit").text());
    //    replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("a[class='info press']").text());
      //  replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("div.dsc_wrap").text());
        //replier.reply("------------");





      for (var i = 0; i < 10; i++) {
        newsinfo[i] = newsbag.select("ul.list_news").select("li.bx").get(i);
        newshead[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a.news_tit").text();
        newsbody[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("div.dsc_wrap").text();
        newsfrom[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a[class='info press']").text();
        newstime[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("div.info_group").select("span.info").text();
        newslink[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a.news_tit").attr("abs:href");


      }
      //replier.reply( newsinfo[0] );
     // replier.reply(newsinfo[0]);


    //   replier.reply(newshead[0]);
      // replier.reply(newslink[0]);
      // replier.reply(newsfrom[0]);
      // replier.reply(newsbody[0]);
     //  replier.reply(newstime[0]);
      var newsrply;
      if (msg.substr(0, 3) == "뉴스 ")
        newsrply = "윤파고의 뉴스 공부 [관련순]";
      else if (msg.substr(0, 3) == "뉴스2")
        newsrply = "윤파고의 뉴스 공부 [최신순]";

      for (var i = 0; i < 10; i++) {
        newsrply = newsrply + "\n\n\n" + "-" + newshead[i] + "\n\n"
          + newsbody[i] + "\n"
          + newsfrom[i] + " [" + newstime[i] + "]" + " : " + newslink[i];

      }


      replier.reply(newsrply);

    } catch (e) {


      if (msg == "뉴스 윤파고" || msg == "뉴스2 윤파고") {
        replier.reply("내가 뉴스에 나온다면 어떤 내용일까...??");

      } else
        replier.reply(cmd + "의 뉴스가 없는거같아여...");
    }
  }
}

function findmap(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {

  var cmd;
  
  if (msg ==  "찾기") {
    replier.reply("윤파고가 지도 검색합니다.\n ex) 찾기 강남역 맛집");
  }
  else if (msg.substr(0,3) == "찾기 "|| msg.substr(msg.length - 3,3) ==" 찾기") {
    var cmd;

//    replier.reply(msg);
    if(msg.substr(0,3) == "찾기 ")
     cmd = msg.substr(3);
    else 
    cmd = msg.substr(0, msg.length-3);
    // replier.reply(cmd);
    //var cmd = msg.substr(3);
    cmd.trim();    
  
    //초기화
    img = ['', '', '', '', ''];
    ee = ['', '', '', '', ''];
    vv = ['', '', '', '', ''];
    dd = ['', '', '', '', ''];
    f = ['', '', '', '', ''];
    doc = ['', '', '', '', ''];
    d = ['', '', '', '', ''];

    search = cmd;
    appkey = '56f8fab7339038f876ad0d5a02c7513d';
    kakao_login(appkey);


    replier.reply("잠시 지도 좀 볼게요!")

    doc = Jsoup.connect("https://www.google.com/search?newwindow=1&client=ms-android-skt-kr&sxsrf=ALeKk00m2dlRMzQDnsvNG4cgCGC-vIR5-g:1597168358340&q=" + search + "&npsic=0&rflfq=1&rlha=0&tbm=lcl").get();

    //"https://www.google.com/search?client=ms-android-skt-kr&source=android-home&source=hp&ei=k1oZX7aqBcbT-QaXlrfwBA&q="+search+"&oq="+search+"&sclient=mobile-gws-wiz-hp").get();
    //  replier.reply(doc.text());
    var forthemore = "search?newwindow=1&client=ms-android-skt-kr&sxsrf=ALeKk00m2dlRMzQDnsvNG4cgCGC-vIR5-g:1597168358340&q=" + search + "&npsic=0&rflfq=1&rlha=0&tbm=lcl";
    //replier(doc.text());
    store2(replier);

    if (ee[0] == ' '|| ee[0] == '') {
      replier.reply("흠...?")

    } else {

      //replier.reply(d[0]);
      // user argument 에 생성한 변수값 대입
      let set = {
        m: search, d1: d[0], d2: d[1], d3: d[2], d4: d[3], d5: d[4], e1: ee[0], v1: vv[0], i1: img[0], e2: ee[1], v2: vv[1],
        i2: img[1], e3: ee[2], v3: vv[2], i3: img[2], e4: ee[3], v4: vv[3], i4: img[3], e5: ee[4], v5: vv[4], i5: img[4],
        ftm: forthemore
      }
      try {
        send_template(room, 34225, set);
      } catch (error) {
        replier.reply('방이름이 잘못되었습니다.\n건의기능을 통해 방이름을 변경해달라고 요청해주세요.');
      }
    }
  }
}

function findrestaurant2(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  if (msg == "맛집") {
    replier.reply("윤파고가 맛집을 검색합니다.\n ex) 맛집 강서구 횟집")

  }
  else if (msg.startsWith("맛집 ")) {
    //초기화
    img = ['', '', '', '', ''];
    ee = ['', '', '', '', ''];
    vv = ['', '', '', '', ''];
    dd = ['', '', '', '', ''];
    f = ['', '', '', '', ''];
    doc = ['', '', '', '', ''];
    d = ['', '', '', '', ''];

    search = msg.substr(3).trim();
    appkey = '56f8fab7339038f876ad0d5a02c7513d';
    kakao_login(appkey);
    doc = Jsoup.connect("https://www.mangoplate.com/search/" + search).get();
    var forthemore = "search/" + search;
    store();

    if (ee[0] == ' ') {
      replier.reply("흠...?")

    } else {
      // user argument 에 생성한 변수값 대입
      let set = {
        m: search, d1: d[0], d2: d[1], d3: d[2], d4: d[3], d5: d[4], e1: ee[0], v1: vv[0], i1: img[0], e2: ee[1], v2: vv[1],
        i2: img[1], e3: ee[2], v3: vv[2], i3: img[2], e4: ee[3], v4: vv[3], i4: img[3], e5: ee[4], v5: vv[4], i5: img[4],
        ftm: forthemore
      }
      try {
        send_template(room, 33944, set);
      } catch (error) {
        replier.reply('방이름이 잘못되었습니다.\n건의기능을 통해 방이름을 변경해달라고 요청해주세요.');
      }
    }
  }
}
/* 카카오링크 사용을 위해 로그인 세션이 만료되지 않게하기 위함 */
function kakao_login(appkey) {
  try {
    Kakao.init(appkey); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login('yoonpepe0@gmail.com', 'aa985325');// 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!

  } catch (e) { replier.reply(e + "\n로그인 세션이 만료되었습니다.") }
}

/* 카카오 디벨로퍼에 만든 템플릿 형식 보냄 */
function send_template(room, id, set) {
  let template = {};
  template['link_ver'] = '4.0';
  template['template_id'] = id;
  template['template_args'] = set;
  Kakao.send(room, template, 'custom');
}

/* 템플릿 type-object가 리스트이고, 리스트가 5개일시, 만약 리스트가 5개미만이라면 형식에 맞지 않아 전부다 공백으로 출력됩니다.
따라서, try-catch 문을 활용하여 검색결과가 없을시에, 공백이 반환되도록 예외처리를 하였습니다.*/
function store2(replier) {
  var storeinfo = doc.select("div[class=rlfl__tls rl_tls]").get(0);
  var i, j;
  var store_name;
  var store_detail0;
  var store_detail1;

  //replier.reply(storeinfo);
  i = 0;
  for (j = 0; j < 5; j++) {
    try {
      //replier.reply(i + "번째");
      ee[j] = storeinfo.select("div[role=heading]").get(i).text();
      store_detail0 = storeinfo.select("a[role=link]").get(i);
      store_detail1 = store_detail0.select("span").get(0);
      vv[j] = "★" + store_detail1.select("span").get(0).text();
      ee[j] = ee[j].replace(/[ ]/gi, '');
      d[j] = "/search?newwindow=1&client=ms-android-skt-kr&sxsrf=ALeKk00m2dlRMzQDnsvNG4cgCGC-vIR5-g:1597168358340&q=" + ee[j] +  "&npsic=0&rflfq=1&rlha=0&tbm=lcl";
      //  replier.reply(ee[j]);
      if (ee[j].indexOf("이광고가표시된이유") > -1) {
        //replier.reply("광고있음");
        j--;
      }
      i++;
      if (i > 10)
        break;
    } catch (e) { img[i] = null, ee[j] = ' ', vv[j] = ' ', e[j] = null, f[j] = null; }
  }



}

function store() {
  var i;
  for (i = 0; i < 5; i++) {
    try {
      img[i] = doc.select("img[class=center-croping lazy]").get(i).attr("abs:data-original"); //이미지 파싱
      ee[i] = doc.select("h2.title").get(i).text(); //가게이름
      vv[i] = doc.select("p.etc").get(i).text(); //가게 위치 및 음식 정보
      dd[i] = ee[i].replace(/[ ]/gi, '') + " " + vv[i]; // 가게이름 + 위치정보 -> 검색하기 위함
      f[i] = ((dd[i].split("-"))[0].split("/"))[0].replace(/[.]/gi, '').replace(/[(]/gi, ' ').replace(/[)]/gi, ' ').replace(/[,]/gi, '');
      /* 가게이름에 특수문자 제거,//위치 역시 지역이 3개이상시 검색이 안되길래, 위치가 방배/반포/잠원 이런식으로 '/'로 구분되어있어서,
      지역하나와 특수문자가 제거된 가게이름으로 검색하여 오류 제거*/
      d[i] = (Jsoup.connect("https://www.mangoplate.com/search/" + f[i]).get()).select('div.info > a').get(0).attr('href');
      // 가게 이미지 누르면 가게 이름 검색된 페이지 나옴. 가게이름+지역정보로 검색된 해당 가게정보가 바로 나오게끔 절대주소 파싱
    } catch (e) { img[i] = null, ee[i] = ' ', vv[i] = ' ', dd[i] = null, f[i] = null; }
    // 오류났을시, 가게이름과 해당 속성값 ' '처리 -> null 일 경우 템플릿형식에 맞지않아 전부다 공백으로 나옴
  }
}

/* 메신저봇 실행 */


function yoonpagooff(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  replier.reply("치 너무해 나 잔다");
  save(sdcard + "/yoonpago_setting/" + room + "/onoff/" + "onoff.txt", "off");
}
function readmanual(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var menualtxt = read(sdcard + "/yoonpago_setting/menual.txt");
  replier.reply(menualtxt);
}
function readcommand(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var commandtxt = read(sdcard + "/yoonpago_setting/command.txt");
  replier.reply(commandtxt);
}
function readfetch(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var fetchnotetxt = read(sdcard + "/yoonpago_setting/fetchnote.txt");
  replier.reply(fetchnotetxt);
}
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
function deletemsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {

  var del_msg = msg.substr(3);
  if (deletecommand(sdcard + "/yoonpago_db/" + room + "/학습/" + del_msg.trim() + ".txt")) {
    replier.reply(del_msg + "를(을) 잊었습니다.");
  } else {
    replier.reply("난 모르는 일이오...");
  }
}
function suggestionmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var sug_msg = msg.substr(3);
  var suggestion = date + ":::" + room + ":::" + sender + ":" + sug_msg + "\n";
  //replier.reply("건의사항보기가 아님.");

  save_log(sdcard + "/yoonpago_db/건의사항/suggestion_" + year + month + day + ".txt", suggestion);

  replier.reply("넹 " + sender + "님, 개발되는지 확인해보고 일정 검토해볼게요");
}
function readnaverhotsearch(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?sm=mtp_sug.top&where=m&query=%EC%8B%A4%EC%8B%9C%EA%B0%84+%EA%B8%89%EC%83%81%EC%8A%B9&acq=tlftlrksrmqtkd&acr=0&qdt=0").get().select("div.rtime_srch").select("span");//div=class의 rtime_srch에서 <span>선택
  var on = data.get(0).text();//<span> 첫번째줄 가져옴 
  var tw = data.get(1).text();//<span> 두번째줄 가져옴
  var th = data.get(2).text();//<span> 세번째줄 가져옴
  var fo = data.get(3).text();//<span> 네번째줄 가져옴
  var fi = data.get(4).text();//<span> 다섯번째줄 가져옴
  var si = data.get(5).text();//<span> 여섯번째줄 가져옴
  var se = data.get(6).text();//<span> 일곱번째줄 가져옴
  var eg = data.get(7).text();//<span> 여덟번째줄 가져옴
  var ni = data.get(8).text();//<span> 아홉번째줄 가져옴
  var te = data.get(9).text();//<span> 열번째줄 가져옴
  replier.reply("[네이버 실검]" + "\n1. " + on + "\n2. " + tw + "\n3. " + th + "\n4. " + fo + "\n5. " + fi + "\n6. " + si + "\n7. " + se + "\n8. " + eg + "\n9. " + ni + "\n10. " + te);//출력
}

function tch(x, y) {
  touch({ "type": "clickXY", "x": x, "y": y });
}

function touch(obj) {
  intent = new android.content.Intent("com.matsogeum.touchHelper.receive");
  intent.putExtra("json", JSON.stringify(obj));
  Api.getContext().sendBroadcast(intent);
}



function   speak_nonsense(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId){

  if(msg == "넌센스퀴즈"){
    replier.reply("윤파고의 넌센스 퀴즈~!\n넌센스 n(숫자)를 치시면 (30 x n)초 뒤에 정답을 공개합니다.(아무것도 안칠시 30초, 최대 5분)\nex) 넌센스 n -> (30 x n)초 뒤 정답 공개")
  }
  else{      
    if(msg.startsWith("넌센스 ") || msg == "넌센스"){
      var m;

      if(msg == "넌센스"){
        m = 1;
    //   replier.reply("확인1");
      }        
      else{
      var q = msg.split(" " ); 
      m = q[1];

        if(m != 1 && m !=2 && m!=3 && m!=4 &&m!=5 &&m!=6 &&m!=7 &&m!=8 &&m!=9 &&m!=10 ){
          replier.reply("시간설정이 이상해요. 다시해주세용~") 
          return;
        }
      }      
       var retnon = nonsense() ;    
      
      
        replier.reply("Q"+retnon.reason+". " + retnon.quiz);
        //replier.reply("확인2");   
        var i ;
        for(i = 0 ; i <m  ; i++ )          
          java.lang.Thread.sleep(15000);

        if(retnon.reason <937){
          replier.reply( "힌트 좀 드릴게유~");
          replier.reply(retnon.hint);
        }

        for(i = 0 ; i <m ; i++ ) 
          java.lang.Thread.sleep(15000);
          replier.reply("정답은");
        replier.reply(retnon.answer);
      
    }
  }
}

/*function touch(x, y ) {

  intent = new android.content.Intent("com.matsogeum.touchHelper.receive");


  intent.putExtra("x", x);
  intent.putExtra("y", y);

  Log.info(Api.getContext().sendBroadcast(intent));

  }
*/
/*
function scriptdown(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId){
var filename = Math.floor(Math.random() * 9999) + 1;
if(msg.indexOf("/추가하기 ")==0){
var url = msg.substring(6);
var Get = Utils.getWebText(url).replace(/(<([^>]+)>)/g, "");
FS.write(sdcard+"/yoonpago_setting/script"+filename+".js",Get);
Api.reload(filename+".js");
replier.reply("추가 성공!\n파일명 : "+filename+".js\n경로 : sdcard/katalkbot/"+filename+"\n\n켜시겠습니까?\n\n1 : 켜기\n2 : 말기");
}
if(msg=="1"){
Api.on(filename+".js");
replier.reply("켜짐");
}
if(msg=="2"){
replier.reply("말기");
Api.reload(scriptName);
}
}*/


/*
기본적으로 앱에있는

Api



Api.getContext() : 앱의 컨텍스트를 가져옵니다
Api.reload() 또는 Api.compile() : 모든 스크립트를 재컴파일
Api.replyRoom(room,message,hideToast=false) : 해당 방에 메시지를 보냅니다. hideToast가 true일 경우 방 세션이 없어도 토스트를 띄우지 않습니다.
Api.canReply(room) : 해당 방에 전송 가능한지 확인합니다.
Api.showToast(title,content) : 토스트 메시지를 띄웁니다.
Api.makeNoti(title,content,id) : 알림을 띄웁니다.
Api.papagoTranslate(sourceLanguage,targetLanguage,content,errorToString=f합니다.
Api.reload("스크립트.js") 또는 Api.compile("스크립트.js") : 특정 스크립트를 재컴파일합니다.
Api.prepare("스크립트.js") : 해당 스크립트가 한번도 컴파일 된 적이 없을 경우에만 컴파일합 니다. 컴파일 실패시 에러를 throw하고,스크립트가 존재하지 않을 시 0, 컴파일 성공시 1, 한번이라도 컴파일 된 적이 있을 시 2를 반환합니다.
Api.unload("스크립트.js") : 해당 스크립트를 컴파일되지 않은 상태로 전환합니다.
Api.off() : 모든 스크립트의 전원을 끕니다.
Api.off("스크립트.js") : 해당 스크립트의 전원을 끕니다.
Api.on() : 모든 스크립트의 전원을 켭니다.
Api.on("스크립트.js") : 해당 스크립트의 전원을 켭니다.
Api.isOn("스크립트.js") : 해당 스크립트의 전원 상태를 반환합니다.
Api.isCompiled("스크립트.js") : 해당 스크립트가 컴파일완료 여부를 반환합니다.
Api.isCompiling("스크립트.js") : 해당 스크립트가 컴파일 진행중인지 여부를 반환합니다.
Api.getScriptNames() : 모든 스크립트의 이름을 배열로 반환합니다.alse) : 번역 결과를 제공합니다. sourceLanguage와 targetLanguage의 언어 코드에 관해서는 파파고의 Api문서를 참고하세요. errorToString이 true일 경우 에러를 throw하지 않고 String으로 반환합니다.
Api.gc() : 가비지 컬렉팅을 강제로 시작합니다.

Utils

Utils.getWebText(url:String) : 웹사이트의 HTML을 가져옵니다.
Utils.parse(url:String) : 웹사이트 파싱 결과를 Jsoup Document로 반환합니다.

Log

Log.error(string,viewToast=false) : 로그 화면에 에러 로그를 추가합니다. (viewToast가 true일경우, 토스트 팝업을 표시합니다.)
Log.info(string) : 로그 화면에 정보를 추가합니다.
Log.debug(string) : 로그 화면에 디버그 로그를 추가합니다.
로그는 각각 Log.e,Log.i,Log.d로도 사용할 수 있습니다.

AppData


ppData.putInt/Boolean/String(String key,int/boolean/String data) : 앱 데이터에 데이터를 저장합니다.
AppData.getInt/Boolean/String() : 앱 데이터에서 데이터를 불러옵니다.
AppData.clear() : 앱 데이터를 초기화합니다.
AppData.remove(String key) : 앱 데이터에서 데이터를 지웁니다.

DataBase

DataBase.setDataBase(String fileName,String content) : 파일에 데이터를 덮어씁니다.
DataBase.getDataBase(String fileName) : 파일에서 데이터를 불러옵니다.
DataBase.removeDataBase(String fileName) : 파일을 삭제합니다.
DataBase.appendDataBase(String fileName,String content) : 파일에 데이터를 이어붙입니다.

Bridge


ridge.getScopeOf(String scriptName) : 해당 스크립트의 스코프를 가져옵니다. 이를통해 다른 스크립트에 접근이 가능합니다.
Bridge.isAllowed(String scriptName) : 스크립트 접근 허용 여부를 반환합니다.

Device

Device : 디바이스 정보를 포함합니다.
.getBuild()
.getAndroidVersionCode()
.getAndroidVersionName()
.getPhoneBrand()
.getPhoneModel()
.isCharging()
.getPlugType()
.getBatteryLevel()
.getBatteryHealth()
.getBatteryTemperature()
.getBatteryVoltage()
.getBatteryStatus()
.getBatteryIntent()



FileStream



FileStream : 파일 읽기/쓰기를 제공합니다.
.read(path): 파일을 읽습니다.
.write(path,content): 파일을 덮어씁니다.

.append(path,content): 파일에 데이터를 이어붙입니다. .remove(path): 파일 또는 폴더를 삭제합니다.
이런 도움말들말고 또 다른 도움말들있으면 댓글로좀 남겨주세요 저 형식처럼 코드 설명 이렇게 부탁드려요*/


function onNotificationPosted(sbn, sm) {
  var packageName = sbn.getPackageName();
  if (!packageName.startsWith("com.kakao.tal")) return;
  var actions = sbn.getNotification().actions;
  if (actions == null) return;
  var userId = sbn.getUser().hashCode();
  for (var n = 0; n < actions.length; n++) {
      var action = actions[n];
      if (action.getRemoteInputs() == null) continue;
      var bundle = sbn.getNotification().extras;

      var msg = bundle.get("android.text").toString();
      var sender = bundle.getString("android.title");
      var room = bundle.getString("android.subText");
      if (room == null) room = bundle.getString("android.summaryText");
      var isGroupChat = room != null;
      if (room == null) room = sender;
      var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
      var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
      var image = bundle.getBundle("android.wearable.EXTENSIONS");
      if (image != null) image = image.getParcelable("background");
      var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
      com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
      if (this.hasOwnProperty("responseFix")) {
          responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0);
      }
  }
}
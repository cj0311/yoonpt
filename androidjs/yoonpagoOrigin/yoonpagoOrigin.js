
var err_flag = 0;

/*기본 */
var allsee = new Array(1000).join(String.fromCharCode(847));
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();    //절대경로 /*경로 :   /storage/emulated/0   */
const scriptName = "yoonpagoOrigin";
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


const user_mode = require('modules/userMode').user_mode();
const weathercommand = require('modules/weathercommand').weathercommand();
const learnmsg = require('modules/learnmsg').learnmsg();
const nonsense = require('modules/nonsense').nonsense();
const save = require('modules/save').save();
const save_log = require('modules/save_log').save_log();
const readdir = require('modules/readdir').readdir();
const read = require('modules/read').read();
const deletecommand = require('modules/deletecommand').deletecommand();
const RSPmsg = require('RSP').RSP();
const translatemsg = require('translate').translate();
const readfortune = require('readfortune').readfortune();
const stockcommand = require('modules/stockcommand').stockcommand();
const findmap = require('modules/findmap').findmap();
const newscommand = require('modules/newscommand').newscommand();
const papagoNMT = require('modules/papagoNMT').papagoNMT();


var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); }


function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  try {
    // Log.debug("responseFix")
    user_mode(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId);
  } catch (e) {
    room = "윤파고admin";
    Api.replyRoom(room, e, false);
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
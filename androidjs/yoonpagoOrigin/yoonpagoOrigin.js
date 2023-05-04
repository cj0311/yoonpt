
var err_flag = 0;

/*기본 */
var allsee = new Array(1000).join(String.fromCharCode(847));
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();    //절대경로 /*경로 :   /storage/emulated/0   */
const scriptName = "yoonpagoOrigin";
/*알람*/
let loop = false;
let on = false;
let alarm = [];

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
const readlearnnote = require('modules/readlearnnote').readlearnnote();
const deletemsg = require('modules/deletemsg').deletemsg();
const speak_nonsense = require('modules/speak_nonsense').speak_nonsense();
const store = require('modules/store').store();
const store2 = require('modules/store2').store2();
const send_template = require('modules/send_template').send_template();
const kakao_login = require('modules/kakao_login').kakao_login();
const findrestaurant2 = require('modules/findrestaurant2').findrestaurant2();
const readnaverhotsearch = require('modules/readnaverhotsearch').readnaverhotsearch();


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
function suggestionmsg(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var sug_msg = msg.substr(3);
  var suggestion = date + ":::" + room + ":::" + sender + ":" + sug_msg + "\n";
  //replier.reply("건의사항보기가 아님.");

  save_log(sdcard + "/yoonpago_db/건의사항/suggestion_" + year + month + day + ".txt", suggestion);

  replier.reply("넹 " + sender + "님, 개발되는지 확인해보고 일정 검토해볼게요");
}

function tch(x, y) {
  touch({ "type": "clickXY", "x": x, "y": y });
}

function touch(obj) {
  intent = new android.content.Intent("com.matsogeum.touchHelper.receive");
  intent.putExtra("json", JSON.stringify(obj));
  Api.getContext().sendBroadcast(intent);
}





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
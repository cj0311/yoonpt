const scriptName = "yoonpagoAdmin";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
importPackage(java.io);
importPackage(java.lang);

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
      if (sender == "jinn" && room == "윤피티admin") {
        if (msg.startsWith("/off ")) {
          var commandLength = "/off ".length;
          var scriptname = msg.substr(commandLength);

          Log.debug("/off ");
          Log.debug(scriptname);
          replier.reply(scriptname + " is off");
          Api.off(scriptname);
          return;

        }

        if (msg.startsWith("/on ")) {
          var commandLength = "/on ".length;
          var scriptname = msg.substr(commandLength);

          Log.debug("/on ");
          Log.debug(scriptname);
          replier.reply(scriptname + " is on");
          Api.on(scriptname);
          return;
        }


        if (msg.startsWith("/reload ")) {
          var commandLength = "/reload ".length;
          var scriptname = msg.substr(commandLength);

          Log.debug("/reload ");
          Log.debug(scriptname);
          replier.reply(scriptname + " is reload");
          Api.reload(scriptname);
          return;
        }

        // var currentDir = new File('.').getCanonicalPath();
        // Log.debug(currentDir);
        // replier.reply(currentDir);


        // var runtime = Runtime.getRuntime();
        // var process = runtime.exec('ls');

        // var input = new BufferedReader(new InputStreamReader(process.getInputStream()));
        // var line;
        // replier.reply(11);
        // while ((line = input.readLine()) !== null) {
        //   replier.reply(line);
        // }

        // replier.reply(22);

        room = "윤피티Debug";
        retunrMsg = "msg [" + sender + "] : " + msg;

        Api.replyRoom(room, retunrMsg, hideToast = false);
      }


    }
    catch (e) {
      room = "윤피티admin";
      Api.replyRoom(room, e, hideToast = false)

    }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) { }

function onResume(activity) { }

function onPause(activity) { }

function onStop(activity) { }

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
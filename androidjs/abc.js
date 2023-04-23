const scriptName = "abc";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (sender == "창진" ){
    replier.reply("room : " + room);
    replier.reply("msg " + msg);
    replier.reply("sender " + sender);
    replier.reply("isGroupChat " + isGroupChat);
    replier.reply("replier " + replier);
    replier.reply("imageDB " + imageDB);
    replier.reply("pakcageName " + packageName);
    //replier.reply("threadId " + threadId);    

 }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}

function onNotificationPosted(sbn, sm) {
  try {
      
      // StatusBarNotification 객체에서 Notification 객체를 가져옵니다.
      const notification = sbn.getNotification();

      // Notification 객체에서 텍스트 관련 정보를 추출하여 객체에 저장합니다.
      const textData = {
          title: notification.extras.getCharSequence("android.title"),
          text: notification.extras.getCharSequence("android.text"),
          subText: notification.extras.getCharSequence("android.subText"),
          summaryText: notification.extras.getCharSequence("android.summaryText"),
          bigText: notification.extras.getCharSequence("android.bigText"),
          infoText: notification.extras.getCharSequence("android.infoText")
      };

      // StatusBarNotification 객체에서 패키지 정보를 추출합니다.
      const packageName = sbn.getPackageName();

      // 텍스트 관련 정보와 패키지 정보를 Log.debug에 출력합니다.
      const textDataLog = ("Notification Text Data:\n" +
                "  Title: " + textData.title + "\n" +
                "  Text: " + textData.text + "\n" +
                "  SubText: " + textData.subText + "\n" +
                "  SummaryText: " + textData.summaryText + "\n" +
                "  BigText: " + textData.bigText + "\n" +
                "  InfoText: " + textData.infoText + "\n" +
                "Package: " + packageName);
      
      if(packageName.startsWith("com.samsung.android.messaging")){
        Api.replyRoom("윤피티_문자메세지", textDataLog, false);
      }
      else if(packageName.startsWith("com.kakao.talk")){
        var actions = sbn.getNotification().actions;
        if (actions == null) return;
        var userId = sbn.getUser().hashCode();
        Log.debug("userId : " + userId);
        //log actions length
        Log.debug("actions length : " + actions.length);
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
      else {Api.replyRoom("윤피티Etc", textDataLog, false);
      
      }  
  } catch (error) {
      Log.debug("Error in onNotificationPosted: " + error.message);
  }
  
  
}




/*
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
}*/
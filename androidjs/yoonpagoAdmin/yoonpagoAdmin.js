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

function handleCommand(room, msg, sender, isGroupChat, replier) {
    if (sender !== "jinn" || room !== "윤피티admin") return false;

    const command = msg.split(' ')[0];
    const scriptname = msg.slice(command.length + 1);

    if (command === "/off" || command === "/on" || command === "/reload") {
        Log.debug(command);
        Log.debug(scriptname);

        if (command === "/off") {
            Api.off(scriptname);
        } else if (command === "/on") {
            Api.on(scriptname);
        } else {
            Api.reload(scriptname);
        }
        replier.reply(scriptname + " is " + command.slice(1));
        return true;
    }
    return false;
}

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if (handleCommand(room, msg, sender, isGroupChat, replier)) return;

        if (sender === "jinn" && room === "윤피티admin") {
            room = "윤피티Debug";
            retunrMsg = "msg [" + sender + "] : " + msg;

            Api.replyRoom(room, retunrMsg, hideToast = false);
        }
    } catch (e) {
        room = "윤피티admin";
        Api.replyRoom(room, e, hideToast = false);
    }
}

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

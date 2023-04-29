const scriptName = "yoonpagoF";

const BufferedReader = java.io.BufferedReader;
const DataOutputStream = java.io.DataOutputStream;
const InputStreamReader = java.io.InputStreamReader;
const HttpURLConnection = java.net.HttpURLConnection;
const URL = java.net.URL;
const URLEncoder = java.net.URLEncoder;
importPackage(java.net);
importPackage(java.io);
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

    if(true){
    try {
        if(msg=="git clone")
            replier.reply(httpGet("http://yoonpt.synology.me:8088/gitclone"));

        if (msg.includes("헷") || msg.startsWith("피티 ") || msg.startsWith("피티야") || msg.startsWith("파고야") || msg.startsWith("윤파고") || msg.startsWith("윤피티")) {
            let gptmsg = msg.replace("피티야", "").replace("파고야", "").replace("윤파고", "").replace("윤피티", "").replace("헷", "").replace("피티 ", "").trim();
            if (gptmsg == "") {
            }
            else {
                var encodedMsg = encodeSpecialChars(gptmsg);
                var encodedRoom = encodeSpecialChars(room);
                var encodedSender = encodeSpecialChars(sender);
                var url = 'http://yoonpt.synology.me:8088/post_message/';

                var data = {
                    "room": encodedRoom,
                    "msg": encodedMsg,
                    "sender": encodedSender
                };
                var response = httpPost(url, data); // JSON 응답
                // JSON 응답에서 필요한 정보 추출
                var result = response.result;
                var details = response.details;
                var timestamp = response.timestamp;

                // 응답 정보를 사용하여 메시지 작성
                //var replyMessage = "Result: " + result + "\nDetails: " + details + "\nTimestamp: " + timestamp;
                var replyMessage = details;

                replier.reply(replyMessage);
            }
        }
    }
        catch (e) {
            room = "윤피티Debug";
            Api.replyRoom(room, e, hideToast = false)
        }
    }
    
}

function httpGet(url) {
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;

    var urlObj = new URL(url);
    var connection = urlObj.openConnection();
    connection.setRequestMethod("GET");
    connection.connect();

    var responseCode = connection.getResponseCode();
    room = "윤피티Debug";
    Api.replyRoom(room, responseCode, hideToast = false)
    var inputStream = connection.getInputStream();
    var reader = new BufferedReader(new InputStreamReader(inputStream));

    var response = "";
    var line;
    while ((line = reader.readLine()) != null) {
        response += line;
    }

    reader.close();
    return response;
}




function httpPost(url, data) {
    try {
        var json = JSON.stringify(data);
        //room = "윤피티Debug";
        //Api.replyRoom(room, json, hideToast = false)

        var urlObj = new URL(url);
        var connection = urlObj.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");

        var outputStream = new DataOutputStream(connection.getOutputStream());
        outputStream.writeBytes(json);
        outputStream.flush();
        outputStream.close();

        var responseCode = connection.getResponseCode();
        //room = "윤피티Debug";
        //Api.replyRoom(room, responseCode, hideToast = false)

        if (responseCode >= 200 && responseCode < 400) {
            var inputStream = connection.getInputStream();
            var reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
            var response = "";
            var line = null;
            while ((line = reader.readLine()) != null) {
                response += line;
            }
            reader.close();
            return JSON.parse(response);
        } else {
            throw new Error('Error: ' + responseCode + ' ' + connection.getResponseMessage());
        }
    } catch (e) {
        room = "윤피티Debug";
        Api.replyRoom(room, 'Error in httpPost: ' + e.message, hideToast = false)
        return ;
    }
}

function encodeSpecialChars(str) {
    return encodeURIComponent(str);
}

function decodeSpecialChars(str) {
    return decodeURIComponent(str);
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
    function replyKakaotalk(packageName, responseFix) {
        var actions = sbn.getNotification().actions;
        if (actions == null) return;
        var userId = sbn.getUser().hashCode();
        //Log.debug("userId : " + userId);
        //log actions length
        //Log.debug("actions length : " + actions.length);
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
    function replyMMS(textDataLog) {
        Api.replyRoom("윤피티_문자메세지", textDataLog, false);
    }
    function replyETC(textDataLog) {
        Api.replyRoom("윤피티_Etc", textDataLog, false);
    }
    function createTextDataLog(textData, packageName) {
        return "Notification Text Data:\n" +
            "  Title: " + textData.title + "\n" +
            "  Text: " + textData.text + "\n" +
            "  SubText: " + textData.subText + "\n" +
            "  SummaryText: " + textData.summaryText + "\n" +
            "  BigText: " + textData.bigText + "\n" +
            "  InfoText: " + textData.infoText + "\n" +
            "Package: " + packageName;
    }

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
        const textDataLog = createTextDataLog(textData, packageName);

        if (packageName.startsWith("com.samsung.android.messaging")) {
            replyMMS(textDataLog)
        }
        else if (packageName.startsWith("com.kakao.talk")) {
            replyKakaotalk(packageName, responseFix)
        }
        else {
            replyETC(textDataLog)

        }
    } catch (error) {
        Log.debug("Error in onNotificationPosted: " + error.message);
    }



}


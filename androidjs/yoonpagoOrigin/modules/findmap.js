
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

exports.findmap = function(){
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
return findmap;
}
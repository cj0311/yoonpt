


exports.findrestaurant2 = function() {
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
return findrestaurant2;
}
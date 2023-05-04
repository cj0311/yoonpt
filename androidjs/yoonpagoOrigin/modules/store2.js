

exports.store2 = function() {
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
  return store2;
}

exports.store = function() {
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
  
  return store;
}
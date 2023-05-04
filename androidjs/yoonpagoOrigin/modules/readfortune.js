
exports.readfortune = function(){
function readfortune(msg, replier) {


  var cmd = "띠별운세";

  var fortunedata = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd).get().select("div.animal_star_box").select("li");
  var fortuneyear = fortunedata.select("div.text_box").select("strong").text().split("년생");
  var yearinfo = new Array();
  for (var i = 0; i < fortuneyear.length; i++) {
    yearinfo[i] = fortuneyear[i].split("띠")[0].trim() + "띠 (" + fortuneyear[i].split("띠")[1] + "년생)";
  }
  var fortuneinfo = new Array();

  for (var i = 0; i < 12; i++) {
    fortuneinfo[i] = fortunedata.select("div.text_box").select("p").get(i).text();
  }
  //replier.reply(fortunedata);

  var fortunereply = "";

  for (var i = 0; i < 12; i++) {
    fortunereply = fortunereply + yearinfo[i] + "\n\n " + fortuneinfo[i];

    if (i != 11)
      fortunereply = fortunereply + "\n\n\n\n";
  }

  var nowdate = year + "년 " + month + "월 " + day + "일\n\n";

  fortunereply = "≪윤파고의 재미로보는 간단운세≫\n\n" + nowdate + fortunereply;
  replier.reply(fortunereply);




}
return readfortune;
}
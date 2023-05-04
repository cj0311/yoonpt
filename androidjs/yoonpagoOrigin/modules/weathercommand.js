
exports.weathercommand = function() {
function weathercommand(msg, replier) {
  if (msg.indexOf("날씨 ") == 0 || (msg.indexOf(" 날씨") >= 0  ) ){
    var cmd;
    if(msg.indexOf("날씨 ") == 0 )
     cmd = msg.substr(3);
    else 
    cmd = msg.substr(0, msg.length-3);
    cmd.trim();

    try {
      var weatherStr = "";

      var weatherarea = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.title_wrap").select("h2").text();

      if (!weatherarea) {
        //replier.reply(cmd + " 의 날씨 정보를 가져올 수 없습니다....");
        return;
      }
      replier.reply("날씨요? 잠깐만요.");
      var weatherdata = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.status_wrap");

      var weathertom = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20날씨").get().select("div.inner_box");

      var wtmain = weatherdata.select("div.weather_main").get(0).text(); // 현재 날씨
      var nowtem = weatherdata.select("div.temperature_text").get(0).text().replace("현재 온도", "").replace("°", "") + " ℃"; // 현재 온도
      var uptem = weatherdata.select("dd.up_temperature").text().replace("°", "") + " ℃"; // 최고 온도
      var dntem = weatherdata.select("dd.down_temperature").text().replace("°", "") + " ℃"; // 최저 온도
      var fltem = weatherdata.select("dd.feeling_temperature").text().replace("체감", "").replace("°", "") + " ℃"; // 체감 온도

      var reportlist = weatherdata.select("ul.list_box");

      var rpsp = reportlist.select("li.type_report report8").select("span.figure_text").text();
      var rptext = reportlist.select("span.figure_text").text().split(" ");
      var rpresult = reportlist.select("span.figure_result").text().split(" ");

      var titlelist = [["미세먼지", "초미세먼지", "자외선", "습도", "바람"], ["㎍/㎥", "㎍/㎥", "", "%", "m/s"]];

      weatherStr = weatherStr + "[ " + cmd + " ] 의 날씨 정보입니다.\n 위치 : " + weatherarea;
      weatherStr = weatherStr + "\n\n현재 날씨 : " + wtmain + "\n현재 온도 : " + nowtem + "\n최고 온도 : " + uptem + "\n최저 온도 : " + dntem + "\n체감 온도 : " + fltem + "\n";

      if (rptext.length > rpresult.length) {
        weatherStr = weatherStr + "\n기상 특보 : " + rptext[0];
        for (var i = 0; i < rpresult.length; i++) {
          weatherStr = weatherStr + "\n" + titlelist[0][i] + " : " + rptext[i + 1] + "   " + rpresult[i] + " " + titlelist[1][i];
        }
      } else {
        for (var i = 0; i < rptext.length; i++) {
          weatherStr = weatherStr + "\n" + titlelist[0][i] + " : " + rptext[i] + "   " + rpresult[i] + " " + titlelist[1][i];
        }
      }

      weatherStr = weatherStr + "\n\n내일 오전 날씨 : \n        " + weathertom.select("div.weather_main").get(0).text() + "\n        " + weathertom.select("strong").get(0).text() + "\n        강수확률 : " + weathertom.select("strong").get(1).text();
      weatherStr = weatherStr + "\n\n내일 오후 날씨 : \n        " + weathertom.select("div.weather_main").get(1).text() + "\n        " + weathertom.select("strong").get(2).text() + "\n        강수확률 : " + weathertom.select("strong").get(3).text();

      replier.reply(weatherStr);
    } catch (e) {
      // replier.reply(cmd + " 의 날씨 정보를 가져올 수 없습니다.");
    }
  }
}
return weathercommand;
}
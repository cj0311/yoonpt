

exports.newscommand = function(){
function newscommand(msg, replier) {

    if (msg.indexOf("뉴스") == 0) {
  
      var cmd;
      if (msg.substr(0, 3) == "뉴스 ")
        cmd = msg.substr(3);
      else if (msg.substr(0, 3) == "뉴스2")
        cmd = msg.substr(4);
      else
        return;
  
      replier.reply("음... 뉴스좀 보고올게요.");
      cmd.trim();
  
      try {
        var newsStr = "";
  
        var newsbag;
        if (msg.substr(0, 3) == "뉴스 ")
          newsbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?where=m_news&query=" + cmd + "&sort=0").get();
        else if (msg.substr(0, 3) == "뉴스2")
          newsbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?where=m_news&query=" + cmd + "&sort=1").get();
  
  
  
        var newsinfo = new Array();
  
        var newstime = new Array();
        var newshead = new Array();
        var newsbody = new Array();
        var newsfrom = new Array();
        var newslink = new Array();
  
        var newstemp
          newstemp = newsbag.select("ul.list_news").select("div.news_wrap").get(0).select("div.news_dsc").select("a").attr("abs:href");
  
       // replier.reply( newsbag.select("ul.list_news").select("li.bx") );
  
  //replier.reply("------------");
    //      replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("a.news_tit").text());
      //    replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("a[class='info press']").text());
        //  replier.reply(newsbag.select("ul.list_news").select("li.bx").get(0).select("div.dsc_wrap").text());
          //replier.reply("------------");
  
  
  
  
  
        for (var i = 0; i < 10; i++) {
          newsinfo[i] = newsbag.select("ul.list_news").select("li.bx").get(i);
          newshead[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a.news_tit").text();
          newsbody[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("div.dsc_wrap").text();
          newsfrom[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a[class='info press']").text();
          newstime[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("div.info_group").select("span.info").text();
          newslink[i] = newsbag.select("ul.list_news").select("li.bx").get(i).select("a.news_tit").attr("abs:href");
  
  
        }
        //replier.reply( newsinfo[0] );
       // replier.reply(newsinfo[0]);
  
  
      //   replier.reply(newshead[0]);
        // replier.reply(newslink[0]);
        // replier.reply(newsfrom[0]);
        // replier.reply(newsbody[0]);
       //  replier.reply(newstime[0]);
        var newsrply;
        if (msg.substr(0, 3) == "뉴스 ")
          newsrply = "윤파고의 뉴스 공부 [관련순]";
        else if (msg.substr(0, 3) == "뉴스2")
          newsrply = "윤파고의 뉴스 공부 [최신순]";
  
        for (var i = 0; i < 10; i++) {
          newsrply = newsrply + "\n\n\n" + "-" + newshead[i] + "\n\n"
            + newsbody[i] + "\n"
            + newsfrom[i] + " [" + newstime[i] + "]" + " : " + newslink[i];
  
        }
  
  
        replier.reply(newsrply);
  
      } catch (e) {
  
  
        if (msg == "뉴스 윤파고" || msg == "뉴스2 윤파고") {
          replier.reply("내가 뉴스에 나온다면 어떤 내용일까...??");
  
        } else
          replier.reply(cmd + "의 뉴스가 없는거같아여...");
      }
    }
  }
  return newscommand;
}
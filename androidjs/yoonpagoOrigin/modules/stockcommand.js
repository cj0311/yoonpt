
exports.stockcommand = function() {

function stockcommand(msg, replier) {
    replier.reply("음 잠깐만요.");
  
    if (msg.indexOf("주가 ") == 0|| (msg.indexOf(" 주가") >= 0 )) {
      var cmd;
      if(msg.indexOf("주가 ") == 0 )
       cmd = msg.substr(3);
      else 
      cmd = msg.substr(0, msg.length-3);
      //var cmd = msg.substr(3);
      cmd.trim();
  //replier.reply(cmd);
      try {
        var stockStr = "";
        var stockbag = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + cmd + "%20주가").get();
        var stockname = stockbag.select("div.stock_tlt").select("strong").text();
        var stocknum = stockbag.select("div.stock_tlt").select("span").text().split(" ")[0];
  
  
        var stock_price = stockbag.select("div.stock_price").select("strong").text();
        var stock_price2 = stockbag.select("div.stock_price").select("span.u_hc").text();
        var stock_price3 = stockbag.select("div.stock_price").select("span.price_gap").text();
        var stock_updown;
        if (stock_price2 == "전일대비 상승") {
          stock_updown = "↑";
        }
        else if (stock_price2 == "전일대비 하락") {
          stock_updown = "↓";
        } else {
          stock_updown = "-";
        }
  
        var stock_reply = stockname + " 주가\n"
          + stock_price + " " + stock_updown + stock_price3;
  
        if (!stockname) {
          replier.reply(cmd + " 의 주가 정보를 가져올 수 없습니다....");
          return;
        }
  
        /*시가 고가 저가 */
        var stock_info1 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(0).text();
        var stock_info2 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(1).text();
        var stock_info3 = stockbag.select("div.stock_info").select("div.detail").select("ul").select("li").get(2).text();
  
  
  
        stock_reply = stock_reply + "\n" + stock_info1 + "  " + stock_info2 + "\n" + stock_info3;
  
        /*전일종가 52주 최고 52주 최저 */
        var stock_info4 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(0).text();
        var stock_info5 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(1).text();
        var stock_info6 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(1).select("li").get(2).text();
  
        stock_reply = stock_reply + "  " + stock_info4 + "\n" + stock_info5 + "\n" + stock_info6;
  
        /*거래량 시가총액 외인소진율*/
        var stock_info7 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(0).text();
        var stock_info8 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(1).text();
        var stock_info9 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(2).select("li").get(2).text();
        stock_reply = stock_reply + "\n" + stock_info7 + "\n" + stock_info8 + "\n" + stock_info9;
        /* 코스피 */
        var stock_info10 = stockbag.select("div.stock_info").select("div.detail").select("ul").get(3).select("li").text();
  
        if (stock_info10.indexOf("+") >= 0) {
          var kospiupdown = "↑";
        } else if (stock_info10.indexOf("-") >= 0) {
          var kospiupdown = "↓";
        }
        else {
          var kospiupdown = "-";
        }
  
        var kospiinfo = stock_info10.split(" ")[0] + " " + stock_info10.split(" ")[1] + " " + kospiupdown + stock_info10.split(" ")[2];
        stock_reply = stock_reply + "\n" + kospiinfo;
  
        
  
        replier.reply(stock_reply);
      } catch (e) {
       // replier.reply(cmd + " 의 주가 정보를 가져올 수 없습니다.");
      }
    }
  }
  return stockcommand;
}
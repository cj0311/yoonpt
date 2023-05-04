

exports.papagoNMT = function () {
function papagoNMT(s, t, text) {

    let Client_Id = "HbZb7dp0LnmwY8OircJx";
    //애플리케이션 클라이언트 아이디값";
    let Client_Secret = "sYqMU5XqfH";
    //애플리케이션 클라이언트 시크릿값";
    try {
      var u = org.jsoup.Jsoup.connect('https://openapi.naver.com/v1/papago/n2mt')
        .header('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .header('x-naver-client-id', Client_Id)
        .header('x-naver-client-secret', Client_Secret)
        .data("source", s)
        .data("target", t)
        .data("text", text)
        .ignoreContentType(true).post().body().text();
      var d = JSON.parse(u);
      var rlt = d.message.result.translatedText;
      if (d.message.result.translatedText == "") {
        rlt = "미안... 잘모르겠어요 공부해올게요";
  
      }
      return rlt;
    } catch (e) {
      rlt = "미안... 잘모르겠어요 공부해올게요";
      return rlt;
    }
  }
  //언어감지... 
  function scanlang(text) {
    let clientId = "HbZb7dp0LnmwY8OircJx";
    //애플리케이션 클라이언트 아이디값";
    let clientSecret = "sYqMU5XqfH";
    //애플리케이션 클라이언트 시크릿값";
    try {
      let query = URLEncoder.encode(text, "UTF-8");
      let apiURL = "https://openapi.naver.com/v1/papago/detectLangs";
      let url = new URL(apiURL);
      let con = url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("X-Naver-Client-Id", clientId);
      con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
      //post request 
      let postParams = "query=" + query;
      con.setDoOutput(true);
      let wr = new DataOutputStream(con.getOutputStream());
      wr.writeBytes(postParams);
      wr.flush();
      wr.close();
      let responseCode = con.getResponseCode();
      let br;
      if (responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      }
      else { // 에러 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      let inputLine;
      let response = "";
      while ((inputLine = br.readLine()) != null) {
        response += inputLine;
      } br.close();
      return response;
    } catch (e) {
      return e;
    }
  }
  return papagoNMT;
}
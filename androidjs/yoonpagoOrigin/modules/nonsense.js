


exports.nonsense = function() {
function nonsense() {
  let ord =  Math.floor(Math.random() * (937+2159)) ;  //937 네이버 + 2171 db  
  let rand;
  if(ord <937) {
    rand = ord + 1;  //2173
    let data = Jsoup.parse(JSON.parse(Jsoup.connect("https://m.search.naver.com/p/csearch/content/qapirender.nhn?where=m&q=넌센스퀴즈&display=1&start="+rand).ignoreContentType(true).execute().body()).itemList[0].html);
    let quiz = data.select("div[class=question_q]").text();
    let hint = data.select("div[class=hint_area _hint]").text();
    let answer = data.select("span[class=n_answer]").text();
    let reason = data.select("div[class=ns_why]").text();    
    return {"quiz" : quiz, "hint" : hint, "answer" : answer, "reason" : ord};
  }
  else {
    rand = ord-937;
    var q_txt = read(sdcard + "/yoonpago_setting/넌센스퀴즈/question.txt");
    var a_txt = read(sdcard + "/yoonpago_setting/넌센스퀴즈/answer.txt");
  

    let quiz = q_txt.split("qasdfq")[rand];
    let answer = a_txt.split("qasdfq")[rand];

    return {"quiz" : quiz, "hint" : "음? 힌트가 없네요..?", "answer" : answer, "reason" : ord};


  }


}
  return nonsense;
}
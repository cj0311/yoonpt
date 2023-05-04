exports.readnaverhotsearch = function(){
function readnaverhotsearch(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
  var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?sm=mtp_sug.top&where=m&query=%EC%8B%A4%EC%8B%9C%EA%B0%84+%EA%B8%89%EC%83%81%EC%8A%B9&acq=tlftlrksrmqtkd&acr=0&qdt=0").get().select("div.rtime_srch").select("span");//div=class의 rtime_srch에서 <span>선택
  var on = data.get(0).text();//<span> 첫번째줄 가져옴 
  var tw = data.get(1).text();//<span> 두번째줄 가져옴
  var th = data.get(2).text();//<span> 세번째줄 가져옴
  var fo = data.get(3).text();//<span> 네번째줄 가져옴
  var fi = data.get(4).text();//<span> 다섯번째줄 가져옴
  var si = data.get(5).text();//<span> 여섯번째줄 가져옴
  var se = data.get(6).text();//<span> 일곱번째줄 가져옴
  var eg = data.get(7).text();//<span> 여덟번째줄 가져옴
  var ni = data.get(8).text();//<span> 아홉번째줄 가져옴
  var te = data.get(9).text();//<span> 열번째줄 가져옴
  replier.reply("[네이버 실검]" + "\n1. " + on + "\n2. " + tw + "\n3. " + th + "\n4. " + fo + "\n5. " + fi + "\n6. " + si + "\n7. " + se + "\n8. " + eg + "\n9. " + ni + "\n10. " + te);//출력
}
return readnaverhotsearch;
}
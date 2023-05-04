

exports.kakao_login = function() {
/* 카카오링크 사용을 위해 로그인 세션이 만료되지 않게하기 위함 */
function kakao_login(appkey) {
    try {
      Kakao.init(appkey); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
      Kakao.login('yoonpepe0@gmail.com', 'aa985325');// 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
  
    } catch (e) { replier.reply(e + "\n로그인 세션이 만료되었습니다.") }
  }
  return  kakao_login;
}
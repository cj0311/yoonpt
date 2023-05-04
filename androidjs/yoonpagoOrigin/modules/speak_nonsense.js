
exports.speak_nonsense = function() {
function   speak_nonsense(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId){

    if(msg == "넌센스퀴즈"){
      replier.reply("윤파고의 넌센스 퀴즈~!\n넌센스 n(숫자)를 치시면 (30 x n)초 뒤에 정답을 공개합니다.(아무것도 안칠시 30초, 최대 5분)\nex) 넌센스 n -> (30 x n)초 뒤 정답 공개")
    }
    else{      
      if(msg.startsWith("넌센스 ") || msg == "넌센스"){
        var m;
  
        if(msg == "넌센스"){
          m = 1;
      //   replier.reply("확인1");
        }        
        else{
        var q = msg.split(" " ); 
        m = q[1];
  
          if(m != 1 && m !=2 && m!=3 && m!=4 &&m!=5 &&m!=6 &&m!=7 &&m!=8 &&m!=9 &&m!=10 ){
            replier.reply("시간설정이 이상해요. 다시해주세용~") 
            return;
          }
        }      
         var retnon = nonsense() ;    
        
        
          replier.reply("Q"+retnon.reason+". " + retnon.quiz);
          //replier.reply("확인2");   
          var i ;
          for(i = 0 ; i <m  ; i++ )          
            java.lang.Thread.sleep(15000);
  
          if(retnon.reason <937){
            replier.reply( "힌트 좀 드릴게유~");
            replier.reply(retnon.hint);
          }
  
          for(i = 0 ; i <m ; i++ ) 
            java.lang.Thread.sleep(15000);
            replier.reply("정답은");
          replier.reply(retnon.answer);
        
      }
    }
  }
  return speak_nonsense;
}

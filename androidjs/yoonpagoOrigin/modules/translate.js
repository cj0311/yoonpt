

exports.translate = function() {
  function translatemsg(room, msg, sender, isGroupChat, replier) {
      if (msg === "번역") {
        replier.reply("윤파고가 번역을 시도합니다.\nex)번역 안녕 윤파고");
      } else if (msg.startsWith("번역 ")) {
        if (scanlang(msg.slice(4)).slice(13, 15) === 'ko') {
          replier.reply("음... 이건 영어로 아마 요렇게 말할거에여");
          replier.reply(papagoNMT('ko', 'en', msg.slice(3)));
        } else {
          replier.reply("음... 이건 한글로 이렇게 말해여");
          replier.reply(papagoNMT(scanlang(msg.slice(4)).slice(13, 15), 'ko', msg.slice(3)));
        }
      }
    }
    return translatemsg;
  };
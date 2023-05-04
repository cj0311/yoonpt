

exports.RSP = function() {
  function RSPmsg(room, msg, sender, isGroupChat, replier) {    
    const RSP = ['가위', '바위', '보'];
    const RSP_bot = RSP[Math.floor(Math.random() * 3)];
    replier.reply(RSP_bot);

    if (msg === RSP_bot) {
      replier.reply('비겼습니다');
    } else if (
      (msg === '가위' && RSP_bot === '바위') ||
      (msg === '보' && RSP_bot === '가위') ||
      (msg === '바위' && RSP_bot === '보')
    ) {
      replier.reply('당신은 졌습니다');
    } else {
      replier.reply('당신은 이겼습니다');
    }
  }
  return RSPmsg;
};
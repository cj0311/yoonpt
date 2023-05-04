
exports.readdir = function() {
function readdir(originpath) {

  //replier.reply("여기서 ");
  var file = new java.io.File(originpath);
  if (file.exists() == false) {
    //replier.reply("null");
    return null;
  }
  else {
    var list = file.list();
    //replier.reply("not null");
    //replier.reply(list[0]);
    return list;
  }
}
return readdir;
}
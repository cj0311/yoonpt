exports.save_log = function() {

function save_log(originpath, content) {
    // originpath는 sdcard/폴더/파일
    var splited_originpath = originpath.split("/");
    splited_originpath.pop();
    var path = splited_originpath.join("/");
  
    var folder = new java.io.File(path);
    folder.mkdirs();
    var file = new java.io.File(originpath);
    var fos = new java.io.FileOutputStream(file, true);
    var contentstring = new java.lang.String(content);
    fos.write(contentstring.getBytes());
    fos.close();
  }
  return save_log;
}
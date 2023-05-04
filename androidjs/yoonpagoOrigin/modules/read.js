exports.read = function() {
function read(originpath) {
    var file = new java.io.File(originpath);
    if (file.exists()) {
      try {
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var temp_br = br.readLine();
        var temp_readline = "";
        while ((temp_readline = br.readLine()) !== null) {
          temp_br += "\n" + temp_readline;
        }
        try {
          fis.close();
          isr.close();
          br.close();
          return temp_br;
        }
        catch (error) {
          return error;
        }
      }
      catch (error) {
        return error;
      }
    }
    else {
      return null;
    }
  
  }
  return read;
}
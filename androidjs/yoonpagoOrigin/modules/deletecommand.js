

exports.deletecommand = function() {
function deletecommand(originPath) {
  const file = new java.io.File(originPath);

  if (file.exists()) {
    try {
      const del = file.delete();
      return del;
    } catch (error) {
      return error;
    }
  } else {
    return null;
  }
}
return deletecommand;
}

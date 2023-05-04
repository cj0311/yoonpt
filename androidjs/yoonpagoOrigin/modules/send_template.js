
exports.send_template = function() {
/* 카카오 디벨로퍼에 만든 템플릿 형식 보냄 */
function send_template(room, id, set) {
    let template = {};
    template['link_ver'] = '4.0';
    template['template_id'] = id;
    template['template_args'] = set;
    Kakao.send(room, template, 'custom');
  }
  return send_template;
}
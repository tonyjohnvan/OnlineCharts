(function(exports){
  var $modal = $('#exportModal'),
      clipboard, obj = {}, url;
  url = location.href;
  obj.urlBase = url.substring(0, url.lastIndexOf("/") + 1);
  obj.type = 'quantilus';
  obj.id = location.pathname.split('/').pop();
  $('#copyBtn')[0].addEventListener('mouseleave', function(e) {
    e.currentTarget.setAttribute('class', 'btn btn-primary');
    e.currentTarget.removeAttribute('aria-label');
  });
  function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn btn-primary tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
  }

  $modal.on('show.bs.modal', function (e) {
    html2canvas(document.querySelector('.exportable'), {
      onrendered: function(canvas) {
        obj.image = canvas.toDataURL();
        $('#copyBtn').attr('data-clipboard-text', JSON.stringify(obj));
        clipboard = new Clipboard('#copyBtn');
        clipboard.on('success', function(e) {
          e.clearSelection();

          showTooltip(e.trigger, 'Copied!');
        });
      }
    });
  });

  $modal.on('hide.bs.modal', function (e) {
    clipboard.destroy();
    obj.image = '';
    $('#copyBtn').attr('data-clipboard-text', '');
  });
})(window);
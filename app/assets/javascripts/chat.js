$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<p>
                  <strong>
                    <a href=/users/${message.user_id}>${message.user_name}</a>
                    ：
                  </strong>
                  ${message.content}
                </p>`
    return html;
  }
    $('#msg_form').on('submit', function(e){
      e.preventDefault();
      console.log(this)
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html)
      $('.textbox').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
  })


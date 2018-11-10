$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var picture = message.image === null ? "" : `<img src= "${message.image}">`;

    var html =
    `
    <div class="message" data-id="${message.id}">
      <div class="line">
        <div class="line__uppername">
          ${message.user_name}
        </div>
        <div class="line__date">
          ${message.created_at}
        </div>
        <br>
        <div class="line__centermessage">
            ${message.content}
            ${picture}
        </div>
      </div>
    </div>    `

    return html;

  }
    var interval = setInterval(function() {
        var message_id = $('.message:last').data('id');
        $.ajax({
          url: location.href,
          type: 'GET',
          data: { id: message_id },
          dataType: 'json'
        })
        .done(function(data){
          if (data.length !== 0) {
            var html = '';
            data.forEach(function(message) {
              html = buildHTML(message);
              $('.messages').append(html)
            });
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        });
    }, 5000 );

    $('.form_submit').on('submit', function(e){
      e.preventDefault();
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
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val("");
      $('.hidden').val("");
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(){
      alert('入力してください');
    })
  })
});


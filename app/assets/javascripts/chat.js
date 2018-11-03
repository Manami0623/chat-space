$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var picture = message.image === null ? "" : `<img src= "${message.image}">`;

    var html =
    `
    <div class="message" >
    <div id =data-id:#{message.id}>
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
      // if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
        var message_id = $('.message:last').data('id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
        $.ajax({ //ajax通信で以下のことを行う
          url: location.href, //urlは現在のページを指定
          type: 'GET', //メソッドを指定
          data://railsに引き渡すデータは
            { id: message_id }, //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
          dataType: 'json' //データはjson形式
        })
        .done(function(data){
          console.log(data);
          if (data.length !== 0) {
            var html = '';
            data.forEach(function(message) {
              html = buildHTML(message);
              $('.messages').append(html)
              $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
            });
          }
        });
      // } else {
      //   clearInterval(interval);
      // }
    }, 5000 );

    $('#msg_form').on('submit', function(e){
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
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(){
      alert('入力してください');
    })
  })
});


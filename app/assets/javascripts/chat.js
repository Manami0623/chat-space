$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html =`
    <div class="message">
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
        </div>
      </div>
    </div>    `


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
      $('.messages').append(html)
      $('.form__message').val("");
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(){
      alert('error');
    })
  })
});


$(document).on('turbolinks:load', function() {

$(function() {

var search_list = $("#user-search-result");

function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                  ${user.name}
                 </p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"
                 data-user-name="${user.name}">追加</a>
               </div>`
    search_list.append(html);
}

function appendNoUser(message) {
  var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                  ${message}
                 </p>
               </div>`
    search_list.append(html);
}

function addUser(name,id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value="${id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    $('.chat-group-form__member').append(html);
}


  $(".user-search-field ").on("keyup", function() {
    var input = $(this).val();
    search_list.empty();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-field").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("一致する名前はありません");
      }
    })
      .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });

   $('#group_name').on('click', '.user-search-field', function(e) {
    e.preventDefault();
    var id = $(this).data('userId');
    var name = $(this).data('userName');
    var insertHTML = buildMemberHTML(id, name);
    $('#group_name').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  $(document).on('click', '.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    addUser(name,id);
    $(this).parent().remove();
  });


  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });

});
});


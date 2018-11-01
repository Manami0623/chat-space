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

function appendNoUser(user) {

}

function addUser(name,id){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"
                  ${name}
                 </p>
                 <a class="user-search-remove chat-group-user__btn chat-group-user__btn--add" data-user-id=${id}
                 data-user-name="${name}">削除</a>
                 </div>`
    search_list.append(html);
}


  $(".user-search-field ").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
      $("#user-search-field").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendUser("一致する名前はありません");
      }
    })
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
    console.log();
    addUser(name,id);
  });

  // メンバーの削除
  $(document).on('click', '.user-search-remove', function() {
    var id = $(this).data('user-id');
    $(`#group_name-${id}`).remove();
  });

});



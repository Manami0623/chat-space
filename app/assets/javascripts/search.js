$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    });
    .done(function(names) {
     $("#user-search-field").empty();
     if (names.length !== 0) {
       names.forEach(function(names){
         appendGroup(names);
       });
     }
     else {
       appendNoGroup("一致する名前はありません");
     }
   })
  });
});



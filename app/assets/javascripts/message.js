$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__screen__box">
        <div class="main-chat__screen__box__name">
          <div class="main-chat__screen__box__name__logo">
            ${message.user_name}
          </div>
          <div class="main-chat__screen__box__number">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__screen__message">
          <p class="lower-message__content">
           ${message.content}
          </p>
        <img src=${message.image} >
      </div>`
     return html;
    }
    else {
     var html =
     `<div class="main-chat__screen__box">
        <div class="main-chat__screen__box__name">
          <div class="main-chat__screen__box__name__logo">
            ${message.user_name}
          </div>
          <div class="main-chat__screen__box__number">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__screen__message">
          <p class="lower-message__content">
            ${message.content}
          </p>
      </div>`
    return html;
   };
 
  }
$('#new_message').on('submit', function(e){
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
    $('.main-chat__screen').append(html);
    $('.main-chat__screen').animate({ scrollTop: $('.main-chat__screen')[0].scrollHeight});
    // $('form')[0].reset();
  }) 
  .always(function(data){
    $('.main-chat__footer__submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});
$(function(){ 

  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__screen__box" data-message-id=${message.id}>
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
    
    }
    else {
     var html =
     `<div class="main-chat__screen__box" data-message-id=${message.id}>
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
    };
    return html;
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
    $('form')[0].reset();
    $('.main-chat__screen').animate({ scrollTop: $('.main-chat__screen')[0].scrollHeight});
  }) 
  .always(function(data){
    $('.main-chat__footer__submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
})


var reloadMessages = function() {
  last_message_id = $('.main-chat__screen__box:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__screen').append(insertHTML);
      $('.main-chat__screen').animate({ scrollTop: $('.main-chat__screen')[0].scrollHeight});
    }
  })
  
  .fail(function() {
    alert('error');
  });
};


if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});
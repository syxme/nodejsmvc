$( document ).ready(function() {

  $('.download').click(function(){
  	window.location.href = '/download/'+$('#filename').val();
  });
  $('.add').click(function(){

    $.post('/api/add',{mail:$('#mail').val(),phone:$('#phone').val()},function(e){
      console.log(e);
      $(".alert").css("display","block");
      setTimeout('$(".alert").css("display","none");', 1000);
    });
  });
  $('.recover').click(function(){

    $.post('/api/recover',{mail:$('#mailre').val()},function(e){
      $(".alert").css("display","block");
      setTimeout('$(".alert").css("display","none");', 1000);
    });
  });

 
});
$( document ).ready(function() {
 


// relatedTarget
// delegateTarget
  $(".menu-item").onclick(function(){
    
  });
 $('#myModal').on('show.bs.modal', function (event) {

  var button = $(event.relatedTarget).eq(0); 
  console.log(button);
  console.log("FAF");
  var id = button.data('id') 

  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + id)
  modal.find('.modal-body input').val(id)
})
});
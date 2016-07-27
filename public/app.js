$( document ).ready(function() {


	$(".menu-item").click(function(e){
		var target = $(e.currentTarget);
		
		var id = target.data('id');
		var name = target.data('name');
		var link = target.data('link');

		
		var modal = $(".modal");
		modal.find('.modal-title').text('New message to ' + name)
		modal.find('.modal-body input').val(id);

		$('#myModal').modal('show');
		e.stopPropagation();
	});

});
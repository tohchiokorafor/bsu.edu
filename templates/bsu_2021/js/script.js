$(document).on('click','.year4sel',function(){
//	console.log('year click');
	var list=$('.blog_year_list');
	var list2=$('.blog_months_list');
	list2.removeClass('active');

	if(list.hasClass('active')){
		list.removeClass('active');
	}else{
		list.addClass('active');
	}
});

$(document).on('click','.mounth4sel',function(){
//	console.log('manth click');
	var list=$('.blog_months_list');
	var list2=$('.blog_year_list');
	list2.removeClass('active');

	if(list.hasClass('active')){
		list.removeClass('active');
	}else{
		list.addClass('active');
	}
});



$(document).on('click','.section-nav__item',function(){
	$(this)
/*			.addClass('active').siblings().removeClass('active')*/
		.parents('.tabs_block').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
/*		console.log($(this).parents('.tabs_block'));*/
	
});



// Start my modal script
function prepareModal(modal_id) {
	$(modal_id).prepend('<div class="top"><a class="close"/> </a></div>'); // Добавляем в блок кнопку закрытия
	$(modal_id).insertBefore('#mask'); // переносим блок в футер	
}

function openModal(modal_id) {
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	$('#mask').css({'width':maskWidth,'height':maskHeight});
	$('#mask').fadeTo("medium",0.8); 
	$('#mask').fadeIn(1);
	centrModal(modal_id);
	$(modal_id).fadeIn(200); 
	$(modal_id).css("display", "block");
	$(modal_id).css("width", $(modal_id).width());

}
$(document).on('click','.modal_window .top .close',function(){
	$('.modal_window').fadeOut(200);
	$('#mask').fadeOut(200);
}); 

$(document).on('click','#mask',function(){
//$('#mask').click(function () {
	$(this).hide();
	$('.modal_window').hide();
});  
function centrModal(modalId){
	console.log(modalId);
	var winH = $(window).height();
	var winW = $(window).width();
	$(modalId).css('top',  winH/2-$(modalId).height()/2);
	$(modalId).css('left', winW/2-$(modalId).width()/2);				
}


$(document).ready(function(){

// Скрипт моих модальных окон
	$('.modal_window').each(function(i){
//		prepareModal($(this).getAttribute('id'));
		prepareModal('#'+$(this).attr('id'));
	});
	$('.open_modal').click(function(e) {
			e.preventDefault();
			var mw_id = '#'+$(this).data('modalid');
			openModal(mw_id);
	//		console.log('to: '+mw_id);
	});
// Конец скрипта модальных окон
});
// End my Modal Script
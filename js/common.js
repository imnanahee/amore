
// 질의답변 qna
$(document).on('click', '.qna .icon i', function() {
    var qna = $(this).parent().siblings('.query, .answer');
    qna.toggleClass('on');
    if (qna.hasClass('on')) $(this).attr('class', 'fa-light fa-chevrons-up');
    else $(this).attr('class', 'fa-light fa-chevrons-down');
});

// 관리자 - 수강생 상세 정보 닫기
$(document).on('click', '.detail_modal_popup .close', function() {
    $('.detail_modal_popup').remove();
    $('html').removeClass('class_on_html');
})


$(document).on('click', '.select_tab_box li', function(e) {
    var boxTit = $(this).children('a');
    var titSiblings = boxTit.parent().siblings();
    boxTit.addClass('on');
    titSiblings.children('a').removeClass('on');
    $('.select_tab_box li').each(function() {
        boxTit.next().show();
        titSiblings.children('div').hide();
    })
    e.preventDefault();
})


$(document).on('click', '.course_list .item', function(e) {
    var title = $(this).parents('.info_box').siblings().children().find('.goods_sub_title');
    var text = $(this).children('.item_tit').text();
    
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    title.text(text);
    
    $('.course_list .item').each(function() {
        var icon = $(this).children('.icon').find('i');
        if ($(this).hasClass('active')) icon.attr('class', 'fas fa-check-circle');
        else icon.attr('class', 'fal fa-check-circle');
    })
    
    e.preventDefault();
})
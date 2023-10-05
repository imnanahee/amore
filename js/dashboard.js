function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var currentQuizIndex = 0;
var selectedAnswers = [];
function loadQuiz() {
    var prevBtn = $('.quiz .prev_btn');
    var nextBtn = $('.quiz .next_btn');
    var sendBtn = $('.submit_wrap')
    $.ajax({
        url: 'quiz_list.html',
        type: 'GET',
        dataType: 'HTML'
    }).done(function(html) {
        var quizConts = $(html).find('.quiz_cont');
        var result = quizConts[currentQuizIndex];
        currentQuizIndex++;
        $('.quiz_page').addClass('on');
        $('.quiz_cont').remove();
        $('.layout_my_tit').after(result);

        if (currentQuizIndex > 1) prevBtn.removeClass('none')
        else prevBtn.addClass('none')
        
        if (currentQuizIndex > 4) {
            nextBtn.addClass('none')
            sendBtn.removeClass('nonSend')
        } else {
            nextBtn.removeClass('none')
            sendBtn.addClass('nonSend')
        }

        var answer = selectedAnswers[currentQuizIndex - 1];
        if (answer) $('input[name="answer"]').filter('[value="' + answer + '"]').prop('checked', true);
        else $('input[name="answer"]').prop('checked', false);
        // console.log(selectedAnswers)
    })
}

function startOff() {
    var start = $('.quiz_wrap .start');
    var quizWrap = $('.quiz_wrap .quiz_page');
    var done = $('.quiz_result');

    start.removeClass('on')
    quizWrap.removeClass('on')
    done.addClass('on')
}

$(function() {
    loadQuiz()

    $(document).on('click', '.answer input[name=answer]', function() {
        selectedAnswers[currentQuizIndex - 1] = $(this).val(); // 선택한 정답 저장
        console.log(selectedAnswers)
    }) 

    $(document).on('click', '.quiz .next_btn', function() {
        var answer = $(this).parent().siblings('.quiz_cont').children().find('input:checked');
        if (answer.length > 0) {
            loadQuiz();
        } else {
            alert('정답을 선택해주세요.');
        }
    });
    
    $(document).on('click', '.quiz .prev_btn', function() {
        if (currentQuizIndex > 1) {
            currentQuizIndex -= 2
            loadQuiz()
        }
    })

    $(document).on('click', '.submit_wrap input', function() {
        if (selectedAnswers.length >= 5) {
            if (confirm('제출하시겠습니까?')) {
                localStorage.setItem('isSubmitted', true)
                alert('제출되었습니다.')
                location.reload()
            } else {
                return
            }
        } else {
            alert('문제를 모두 풀어주세요.')
        }
    })

    $(document).on('ready', function() {
        // $('.start').addClass('on');
        var isSubmitted = localStorage.getItem('isSubmitted')
        if (isSubmitted === null) {
            console.log('submitted')
        } else {
            console.log('Nosubmitted')
        }
    })

    $('.manager .student_list .list').on('click',function(){
        var serial = $(this).find('.num').data('serial');
        var goods_serial = $(this).find('.num').data('goods_serial');
        var url = '/ajax/getDashBoardPopup?serial='+serial+'&goods_serial='+goods_serial;
        $.ajax({
            url: url ,
            type: 'GET',
            dataType: 'HTML'
        }).done(function(html){
            $('body').append(html);
        });
        // $('html').addClass('class_on_html');
    });

    $('.manager .qna_list .list').on('click', function() {
        var list = $(this).parent().siblings();
        $(this).next().toggle();
        list.children('.ask_answer').hide();
    })

    $('#header #user_turn_select').on('change',function(){
        var data = $(this).find("option:selected").data("turn");
        setCookie('dashBoardTurn',data,7);
        location.reload();
    })


    // $(document).on('click','.manager .lecture_list p', function() {
    //     var g = $(this).data('g');
    //     var url ='/dashboard/dashboard_qna?g='+g;
    //     $.ajax({
    //         url: url ,
    //         type: 'GET',
    //         dataType: 'HTML'
    //     }).done(function(html){
    //         data = $(html).find('.manager_inner')[0];
    //         $('.manager').empty().append(data);
    //     });

    //     $(this).addClass('active');
    //     $(this).siblings('p').removeClass('active');
    // });
})


// $(function(){

//     $('.manager .student_list .list').on('click',function(){
//         var serial = $(this).find('.num').data('serial');
//         var goods_serial = $(this).find('.num').data('goods_serial');
//         var url = '/ajax/getDashBoardPopup?serial='+serial+'&goods_serial='+goods_serial;
//         $.ajax({
//             url: url ,
//             type: 'GET',
//             dataType: 'HTML'
//         }).done(function(html){
//             $('body').append(html);
//         });
//         $('html').addClass('class_on_html');



//     });


//     $(document).on('click','.manager .qna_list .list', function() {
//         var list = $(this).parent().siblings();
//         $(this).next().toggle();
//         list.children('.ask_answer').hide();
//     })

//     $(document).on('click','.manager .lecture_list p', function() {
//         var g = $(this).data('g');
//         var url ='/dashboard/dashboard_qna?g='+g;
//         $.ajax({
//             url: url ,
//             type: 'GET',
//             dataType: 'HTML'
//         }).done(function(html){
//             data = $(html).find('.manager_inner')[0];
//             $('.manager').empty().append(data);
//         });

//         $(this).addClass('active');
//         $(this).siblings('p').removeClass('active');
//     });


//     $('#header #user_turn_select').on('change',function(){
//         var data = $(this).find("option:selected").data("turn");
//         setCookie('dashBoardTurn',data,7);
//         location.reload();
//     })

// });


// const nextBtn = document.querySelector('.quiz .next_btn')
// const prevBtn = document.querySelector('.quiz .prev_btn')
// let currentQuizIndex = 0

// function loadQuiz() {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', 'quiz_list.html', true)
//     xhr.onload = () => {
//         const tempDiv = document.createElement('div')
//         tempDiv.innerHTML = xhr.responseText
//         const quizCont = document.querySelector('.quiz_cont')
//         quizCont && quizCont.remove()

//         const quizConts = tempDiv.querySelectorAll('.quiz_cont')

//         document.querySelector('.layout_my_tit').after(quizConts[currentQuizIndex])
        
//         prevBtn.classList.toggle('none', currentQuizIndex <= 0)
//         nextBtn.classList.toggle('none', currentQuizIndex >= quizConts.length - 1)

//         currentQuizIndex++
//     }
//     xhr.send()
// }

// function quizDivLength() {
//     loadQuiz()
//     if (currentQuizIndex >= 15) {
//         nextBtn.classList.add('none')
//     }
// }

// nextBtn.addEventListener('click', quizDivLength)

// prevBtn.addEventListener('click', () => {
//     if (currentQuizIndex > 1) {
//         currentQuizIndex -= 2
//         quizDivLength()
//     }
// })

// loadQuiz()
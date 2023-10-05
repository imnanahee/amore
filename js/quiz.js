document.addEventListener('DOMContentLoaded', () => {
    // 퀴즈 문제 ajax로 가져오기
    const nextBtn = document.querySelector('.quiz .next_btn');
    const prevBtn = document.querySelector('.quiz .prev_btn');
    const sendBtn = document.querySelector('.submit_wrap');
    let currentQuizIndex = 0;
    let selectedAnswers = [];

    function loadQuiz() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'quiz_list.html', true);
        xhr.onload = () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = xhr.responseText;
            const quizConts = tempDiv.querySelectorAll('.quiz_cont');
            const inputRadio = tempDiv.querySelectorAll('.answer input[name=answer]');
            const result = quizConts[currentQuizIndex];
            document.querySelector('.quiz_page').classList.add('on');

            currentQuizIndex++;
            document.querySelector('.quiz_cont').remove();
            document.querySelector('.layout_my_tit').after(result);

            if (currentQuizIndex > 1) prevBtn.classList.remove('none');
            else prevBtn.classList.add('none');
            
            if (currentQuizIndex > 4) {
                nextBtn.classList.add('none');
                sendBtn.classList.remove('nonSend');
            } else {
                nextBtn.classList.remove('none');
                sendBtn.classList.add('nonSend');
            }

            const answer = selectedAnswers[currentQuizIndex - 1];
            const answerInputs = document.querySelectorAll('input[name=answer]');
            answerInputs.forEach(function (input) {
                if (input.value === answer) input.checked = true;
                else input.checked = false;
            });

            for (let i = 0; i < inputRadio.length; i++) {
                inputRadio[i].addEventListener('click', () => {
                    selectedAnswers[currentQuizIndex - 1] = inputRadio[i].value;
                    console.log(selectedAnswers);
                });
            }
        }
        xhr.send();
    }

    function startOff() {
        const start = document.querySelector('.start');
        const quizWrap = document.querySelector('.quiz_page');
        const done = document.querySelector('.quiz_result');

        start.classList.remove('on');
        quizWrap.classList.remove('on');
        done.classList.add('on');
    }


    nextBtn.addEventListener('click', () => {
        const answer = document.querySelectorAll('input[name=answer]:checked');
        if (answer.length > 0) loadQuiz();
        else alert('정답을 선택해주세요.');
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentQuizIndex > 1) {
            currentQuizIndex -= 2;
            loadQuiz();
        }
    });

    sendBtn.addEventListener('click', () => {
        if (selectedAnswers.length >= 5) {
            if (confirm('제출하시겠습니까?')) {
                localStorage.setItem('isSubmitted', true);
                alert('제출되었습니다.');
                location.reload();
            } else {
                return false
            }
        } else alert('문제를 모두 풀어주세요.');
    });

    const quizStartBtn = document.querySelector('#quizStartBtn');
    quizStartBtn.addEventListener('click', () => {
        const start = document.querySelector('.start');
        if (start.classList.contains('on')) {
            document.querySelector('body').style.overflowY = 'scroll';
            start.classList.remove('on');
        }
    });

    const isSubmitted = localStorage.getItem('isSubmitted');
    if (isSubmitted === null) loadQuiz();
    else startOff();

})
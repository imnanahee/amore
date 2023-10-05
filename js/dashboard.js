document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.manager .qna_list .list');
    // 클릭 이벤트 리스너 추가
    lists.forEach(function (list) {
        list.addEventListener('click', function () {
            const parent = this.parentElement;
            const siblings = parent.children;
            const nextElement = this.nextElementSibling;
    
            // 다음 요소 토글
            if (nextElement.style.display === 'none' || nextElement.style.display === '') {
                nextElement.style.display = 'block';
            } else {
                nextElement.style.display = 'none';
            }
    
            // 형제 요소들 숨김
            for (const i = 0; i < siblings.length; i++) {
                if (siblings[i] !== this) {
                    const child = siblings[i].querySelector('.ask_answer');
                    if (child) {
                        child.style.display = 'none';
                    }
                }
            }
        });
    });
});
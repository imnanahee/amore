window.addEventListener('DOMContentLoaded', () => {
    const allElements = document.getElementsByTagName('*');
    let logoutButtonAdded = false;

    Array.prototype.forEach.call(allElements, function(el) {
        const includePath = el.dataset.includePath;
        if (includePath) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;

                    // 로그아웃 버튼 클릭 시 실행
                    if (!logoutButtonAdded) {
                        const logoutButton = document.getElementById('logoutButton');
                        logoutButton.addEventListener('click', () => {
                            alert('로그아웃 되었습니다.');
                            window.location.href = 'login.html'
                        });
                        logoutButtonAdded = true;
                    }
                }
            }
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    })
});
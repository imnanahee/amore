document.addEventListener('DOMContentLoaded', () => {
    // 세션 스토리지에서 사용자 닉네임 읽어오기
    const userName = sessionStorage.getItem('userName');

    // 헤더에 사용자 닉네임 표시
    const headerUserName = document.querySelector('.nickName strong');
    if (headerUserName) {
        headerUserName.textContent = userName;
    }
});
// 사용자 정보를 저장할 가상 데이터베이스
const users = [
    { userId: 'user', password: 'pw1234', userName: '사용자' },
    { userId: 'master', password: 'pw1234', userName: '관리자' }
];

// 로그인 폼 요소 가져오기
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

// 로그인 폼 제출 시 실행되는 함수
const currentPageId = document.body.id;
if (currentPageId === 'loginPage') {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 기본 동작 방지
    
        const userIdInput = document.getElementById('userId').value;
        const passwordInput = document.getElementById('password').value;
    
        // 사용자 인증
        const authenticatedUser = users.find(user => user.userId === userIdInput && user.password === passwordInput);
    
        if (authenticatedUser) {
            // 인증 성공 시
            sessionStorage.setItem('userName', authenticatedUser.userName);
            if (authenticatedUser.userId === 'user') {
                window.location.href = 'lecture_list.html';
            } else if (authenticatedUser.userId === 'master') {
                window.location.href = 'dashboard.html';
            }
        } else {
            alert('ID 또는 비밀번호가 잘못되었습니다.');
        }
    });
} else {
    // 로그아웃 버튼 클릭 시 실행되는 함수
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem('userName');
        alert('로그아웃 되었습니다.');
        window.location.href = 'index.html'
    });

}
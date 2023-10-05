document.addEventListener('DOMContentLoaded', () => {
    // item 클래스 추가 이벤트
    const items = document.querySelectorAll('.item');
    items.forEach(index => {
        index.addEventListener('click', (e) => {
            items.forEach(index => {
                const icon = index.querySelector('.icon');
                const itemTit = index.querySelector('.item_tit').innerText;
                index.classList.toggle('active', index === e.currentTarget);
                if (index.classList.contains('active')) {
                    const goodsTit = document.querySelector('.goods_sub_title');
                    goodsTit.innerText = itemTit;
                }
                if (icon !== null) {
                    icon.classList.toggle('fas', index === e.currentTarget);
                    icon.classList.toggle('fal', index !== e.currentTarget);
                }
            });
        })
    })

    // 탭메뉴 클릭 이벤트
    const menu = document.querySelectorAll('.select_tab_box li');
    menu.forEach(index => {
        index.addEventListener('click', () => {
            menu.forEach(item => {
                item.querySelector('a').classList.remove('on');
                item.querySelector('div').classList.remove('block');
            })
            index.querySelector('a').classList.add('on');
            index.querySelector('div').classList.add('block');
        })
    });
});
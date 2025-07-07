document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const hasDropdownLinks = document.querySelectorAll('.main-nav .has-dropdown > a');
    const MOBILE_BREAKPOINT = 767; // モバイルとPCの切り替えブレイクポイント

    // モバイルメニューのトグル機能
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('is-active');
            mobileMenuToggle.classList.toggle('is-active'); // ハンバーガーメニューのアニメーション用
            document.body.classList.toggle('no-scroll'); // モバイルメニュー表示時にスクロール禁止
        });
    }

    // ドロップダウンメニューの開閉機能 (PCとモバイルで挙動が異なる可能性)
    hasDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // モバイルメニューが開いている、かつモバイルブレイクポイント以下の場合のみe.preventDefault()とactive-dropdownを適用
            if (mainNav.classList.contains('is-active') && window.innerWidth <= MOBILE_BREAKPOINT) {
                e.preventDefault(); // リンクへの遷移を一時的に停止
                const parentLi = this.closest('.has-dropdown');
                // 他のドロップダウンを閉じる（任意）
                hasDropdownLinks.forEach(otherLink => {
                    const otherParentLi = otherLink.closest('.has-dropdown');
                    if (otherParentLi !== parentLi && otherParentLi.classList.contains('active-dropdown')) {
                        otherParentLi.classList.remove('active-dropdown');
                    }
                });
                parentLi.classList.toggle('active-dropdown');
            } else if (window.innerWidth > MOBILE_BREAKPOINT) {
                // PC版の挙動（通常はホバーで開くため、クリックでは何もしないか、あるいはトップレベルリンクへの遷移を許可）
                // ここで `e.preventDefault()` がないことを確認
                // PCではホバーで開くため、aタグのデフォルトのリンク遷移を許可
                // もしPCでクリックでドロップダウンを開きたい場合は、ここに追加ロジックが必要
            }
        });
    });

    // ページトップボタンの表示/非表示 (もし元々あれば)
    const pageTopBtn = document.getElementById('page-top');
    if (pageTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) { // 200pxスクロールしたら表示
                pageTopBtn.classList.add('is-visible');
            } else {
                pageTopBtn.classList.remove('is-visible');
            }
        });

        pageTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ウィンドウのリサイズ時にもモバイルメニューの状態をリセット
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                mainNav.classList.remove('is-active');
                mobileMenuToggle.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
                // PCに戻ったときに開いているドロップダウンを閉じる
                document.querySelectorAll('.has-dropdown.active-dropdown').forEach(item => {
                    item.classList.remove('active-dropdown');
                });
            }
        }, 250); // リサイズ終了後少し待って実行
    });
});

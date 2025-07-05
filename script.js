// script.js

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const hasDropdownItems = document.querySelectorAll('.main-nav .has-dropdown > a');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
            // モバイルメニューが開いたらスクロールをロック
            if (mainNav.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // ドロップダウンメニューのモバイルでの開閉
    // デスクトップではCSSの:hoverで、モバイルではクリックで開閉を切り替える
    hasDropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // モバイルメニューが開いている時のみ作動
            if (mainNav.classList.contains('open') && window.innerWidth <= 1024) { // @media (max-width: 1024px) に合わせる
                e.preventDefault(); // リンクへの遷移を一旦止める
                const dropdown = this.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    // 他のドロップダウンを閉じる
                    document.querySelectorAll('.main-nav .dropdown.active').forEach(openDropdown => {
                        if (openDropdown !== dropdown) {
                            openDropdown.classList.remove('active');
                            openDropdown.style.display = 'none';
                        }
                    });

                    // クリックしたドロップダウンを開閉
                    dropdown.classList.toggle('active');
                    if (dropdown.classList.contains('active')) {
                        dropdown.style.display = 'flex'; // flex-direction: column; のためflexにする
                    } else {
                        dropdown.style.display = 'none';
                    }
                }
            }
        });
    });

    // 画面サイズ変更時にモバイルメニューの状態をリセット
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            mainNav.classList.remove('open');
            mobileMenuToggle.classList.remove('open');
            document.body.style.overflow = ''; // スクロールロック解除
            // デスクトップサイズに戻ったらドロップダウンを非表示にし、activeクラスを削除
            document.querySelectorAll('.main-nav .dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.style.display = ''; // CSSで制御に戻す
            });
        }
    });
});

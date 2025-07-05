document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの開閉
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('open');
        });

        // ドロップダウンメニューの制御 (モバイル時のみ)
        const hasDropdowns = document.querySelectorAll('.main-nav .has-dropdown > a');
        hasDropdowns.forEach(link => {
            link.addEventListener('click', function(e) {
                // モバイルメニューが開いている場合のみ処理
                if (mainNav.classList.contains('open') && window.innerWidth <= 1024) {
                    e.preventDefault(); // リンクへの遷移を一時的に停止
                    const dropdown = this.nextElementSibling;
                    if (dropdown && dropdown.classList.contains('dropdown')) {
                        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
                    }
                }
            });
        });

        // 画面サイズが変更されたらモバイルメニューをリセット
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                mainNav.classList.remove('open');
                mobileMenuToggle.classList.remove('open');
                // ドロップダウンメニューもリセット
                document.querySelectorAll('.main-nav .dropdown').forEach(dropdown => {
                    dropdown.style.display = ''; // CSSのデフォルトに戻す
                });
            }
        });
    }

    // ヒーロースライドショー
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    let currentImageIndex = 0;

    function showNextImage() {
        if (slideshowImages.length === 0) return; // 画像がない場合は何もしない

        // 現在表示されている画像を非表示にする
        slideshowImages[currentImageIndex].classList.remove('active');

        // 次の画像へインデックスを進める (最後の画像なら最初に戻る)
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;

        // 次の画像を表示する
        slideshowImages[currentImageIndex].classList.add('active');
    }

    // 最初の画像をすぐに表示
    if (slideshowImages.length > 0) {
        slideshowImages[currentImageIndex].classList.add('active');
    }

    // 画像が1枚だけの場合はsetIntervalを実行しない
    if (slideshowImages.length > 1) {
        setInterval(showNextImage, 5000); // 5000ミリ秒 = 5秒
    }
});

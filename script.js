document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの開閉
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body; // body要素を取得

    // CSSのモバイルブレイクポイントと一致させる
    const MOBILE_BREAKPOINT = 767;  

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('is-active');
            mobileMenuToggle.classList.toggle('open');
            body.classList.toggle('no-scroll'); // bodyにno-scrollクラスをトグル
        });

        // ドロップダウンメニューの制御はHTMLから削除されたため、このブロックは完全に削除
        // 以前コメントアウトしていた部分も完全に削除します。

        // 画面サイズがモバイルブレイクポイントより大きくなったらモバイルメニューをリセット
        window.addEventListener('resize', function() {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                mainNav.classList.remove('is-active');
                mobileMenuToggle.classList.remove('open');
                body.classList.remove('no-scroll'); // no-scrollクラスを削除
                // ドロップダウンメニューのリセットも不要になったため削除
            }
        });

        // メニュー外をタップしたときにメニューを閉じる処理
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainNav.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInsideMenu && mainNav.classList.contains('is-active') && window.innerWidth <= MOBILE_BREAKPOINT) {
                mainNav.classList.remove('is-active');
                mobileMenuToggle.classList.remove('open');
                body.classList.remove('no-scroll'); // no-scrollクラスを削除
                // ドロップダウンメニューのリセットも不要になったため削除
            }
        });
    }

    // ヒーロースライドショー
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    let currentImageIndex = 0;

    function showNextImage() {
        if (slideshowImages.length === 0) return;

        slideshowImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        slideshowImages[currentImageIndex].classList.add('active');
    }

    if (slideshowImages.length > 0) {
        slideshowImages[currentImageIndex].classList.add('active');
    }

    if (slideshowImages.length > 1) {
        setInterval(showNextImage, 5000);
    }

    // ここからページトップスクロール機能を追加
    const pageTopBtn = document.getElementById('page-top');

    // ボタンが存在する場合のみ処理を有効にする
    if (pageTopBtn) {
        // スクロールイベントでボタンの表示・非表示を切り替える
        window.addEventListener('scroll', function() {
            // スクロール量が200pxを超えたらボタンを表示
            if (window.scrollY > 200) {
                pageTopBtn.style.display = 'flex'; // CSSで指定したflexを適用して中央揃えを維持
            } else {
                pageTopBtn.style.display = 'none';
            }
        });

        // ボタンクリックでページトップへスムーズスクロール
        pageTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // デフォルトのリンク動作（#へのジャンプ）を無効化
            window.scrollTo({
                top: 0,         // ページの最上部へ
                behavior: 'smooth' // スムーズにスクロール
            });
        });
    }
});

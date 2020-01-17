nag_inject = (function () {


    /**
     * 加载下页内容
     */
    function quickBrowseBlink() {
        if (location.pathname == '/read.php' || location.pathname == '/thread.php') {
            scrollNext();
            hotKey();
        }

    }

    /**
     * 滚动下一页
     */
    function scrollNext() {
        document.onscroll = (function () {
            let scrollH = document.scrollingElement.scrollTop;  //滚动高度
            let windowHeight = document.documentElement.clientHeight;  //内容高度
            let contentH = document.scrollingElement.scrollHeight; //滚动内容高度
            if (contentH === windowHeight + scrollH) {
                commonui.pageBtn.continueNext();
            }
        });
    }

    /**
     * 快捷键翻页 <- 左翻  右翻 ->
     * @constructor
     */
    function hotKey() {
        document.onkeydown = (function (e) {
            let currentPage = document.querySelector("#pagebbtm .invert").parentNode;
            if ("ArrowLeft" === e.key) {
                location.href = currentPage.previousSibling.firstChild.href;
            }
            if ("ArrowRight" === e.key) {
                location.href = currentPage.nextSibling.firstChild.href;
            }
        });
    }


    /**
     * 初始化方法
     */
    function init() {
        quickBrowseBlink();
    }

    return {
        init: function () {
            return init();
        }
    }
})();

nag_inject.init();

hotKey = (function () {

    /**
     * 加载下页内容
     */
    function quickBrowseBind() {
        if (location.pathname == '/read.php' || location.pathname == '/thread.php') {
            scrollNext();
            keyDown();
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
    function keyDown() {
        document.onkeydown = (function (event) {
            hotKey.keyboardEvent = event;
            if (event.key.indexOf("Arrow") != -1) {
                return this.arrow.event();
            }
            if (event.altKey) {
                return altKey(event);
            }
        });
    }


    /**
     * alt + 字母 组合键
     * @param event
     */
    function altKey(event) {
        switch (event.key) {
            case "g":
            case "G":
                let jumpBtn = document.getElementsByName("topage").item(0);
                __NUKE.fireEvent(jumpBtn, 'click');
                break;
            case "F":
            case "f":
                
                break;
        }
    }

    /**
     * 初始化方法
     */
    function init() {
        quickBrowseBind();
    }

    return {
        init: init,
        keyboardEvent: null
    }
})();


hotKey.init();

hotKey.arrow = (function () {
    /**
     * 方向键
     * @type {Node & ParentNode}
     */
    const Arrow = {
        get currentPage (){
            return document.querySelector("#pagebtop .invert").parentNode;
        },
        get ArrowLeft(){
            return this.currentPage.previousSibling;
        },
        get ArrowRight() {
            return this.currentPage.nextSibling;
        }
    }

    /**
     * 方向键
     * @param event
     */
    function arrowKey() {
        if (Arrow[hotKey.keyboardEvent.key]) {
            location.href = Arrow[event.key].firstChild.href;
        }
    }

    return {
        event:arrowKey
    }
})();
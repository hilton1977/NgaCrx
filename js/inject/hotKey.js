hotKey = (function () {

    /**
     * Api
     * @type {{ArrowLeft: *, currentPage: *, ArrowRight: *}}
     */
    const api = {
        get currentPage() {
            return document.querySelector("#pagebtop .invert").parentNode;
        },
        get ArrowLeft() {
            return this.currentPage.previousSibling;
        },
        get ArrowRight() {
            return this.currentPage.nextSibling;
        }
    };

    /**
     * 左右翻页
     * @param code
     */
    function turnPage(code) {
        let newUrl = api[code];
        if (newUrl != null) {
            location.href = newUrl.firstChild.href;
        }
    }


    /**
     * 快捷键绑定
     */
    function quickBrowseBind() {
        if (location.pathname == '/read.php' || location.pathname == '/thread.php') {
            scrollNext();
            hotKey.keyboard.keyEvent();
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
     * 初始化方法
     */
    function init() {
        quickBrowseBind();
    }

    return {
        init: init,
        turnPage: function (code) {
            return turnPage(code);
        }
    }
})();


hotKey.keyboard = (function () {
    /**
     * 方向键
     * @param event
     */
    function arrowKey() {
        hotKey.turnPage(eventKey());
    }

    /**
     * 获取按下按键 Key
     * @returns {*}
     */
    function eventKey() {
        return hotKey.keyboard.keyboardEvent.key;
    }

    /**
     * 快捷键翻页 <- 左翻  右翻 ->
     * @constructor
     */
    function keyEvent() {
        document.onkeydown = (function (event) {
            hotKey.keyboard.keyboardEvent = event;
            if (event.key.indexOf("Arrow") != -1) {
                arrowKey();
            }
            if (event.shiftKey) {
                shiftKey();
            }
        });
    }

    /**
     * shift + 字母 组合键
     * @param event
     */
    function shiftKey() {
        switch (eventKey()) {
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

    return {
        keyEvent: keyEvent,
        keyboardEvent: null
    }
})();


hotKey.mouse = (function () {

    /**
     * 鼠标手势
     */
    function mouseEvent() {
        document.onmousedown = (function (event) {
            console.log("按下鼠标");
        });

        document.onmouseup = (function (event) {
            console.log("放开鼠标");
        })
    }

    return {
        initLocation: null
    }
})();

hotKey.init();

hotKey = (function () {
    /**
     * Api
     * @type {{ArrowLeft: *, currentPage: *, ArrowRight: *}}
     */
    const api = {
        get currentPage() {
            return document.querySelector("#pagebtop .invert").parentNode;
        },
        /**
         * 翻页功能
         * @returns {ActiveX.IXMLDOMNode | Node | (() => (Node | null))}
         * @constructor
         */
        get ArrowLeft() {
            if(this.currentPage.textContent.trim()!="1"){
                return this.currentPage.previousSibling;
            }
        },
        /**
         * 翻页功能
         * @returns {Node | (() => (Node | null)) | ActiveX.IXMLDOMNode}
         * @constructor
         */
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
     * 滚动加载下一页
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
     * 快捷键绑定
     */
    function quickBrowseBind() {
        if (location.pathname == '/read.php' || location.pathname == '/thread.php') {
            scrollNext();
            hotKey.mouse.event();
            hotKey.keyboard.event();
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
     *
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
        event: keyEvent,
        keyboardEvent: null
    }
})();






hotKey.mouse = (function () {

    /**
     * 鼠标手势
     * @constructor
     */
    function mouseEvent() {


        document.onmousedown = (function (e) {
            if(e.button ==1){
                this.initX = e.clientX;
            }
        });

        document.onmouseup = (function (e) {
            if(e.button ==1 ){
                console.log(e.clientX, this.initX);
                if(this.initX - e.clientX >10){
                    hotKey.turnPage("ArrowLeft");
                }
                if(e.clientX - this.initX >10){
                    hotKey.turnPage("ArrowRight");
                }
            }
        });

        document.onmousemove = function (e) {

        }
    }

    return {
        event:mouseEvent
    }
})();

hotKey.init();

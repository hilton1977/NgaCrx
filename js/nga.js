nga = (function () {

    /**
     * 主题 版面默认隐藏
     * 添加提示和动画
     */
    function topics() {
        let tip = "<a class='showMore' showId ='#toppedtopic' >[公告]</a>",
            subTip = "<a class='showMore' showId ='#sub_forums'>[子版面]</a>";
        let tipArray = [tip, subTip];
        tipArray.forEach(function (value) {
            $("#toptopics >div> h3").append(value);
            $(".showMore").toggle(function () {
                display($($(this).attr("showId")), true);
            }, function () {
                display($($(this).attr("showId")), false);
            });
        });

        function display(data, status) {
            data.css("cssText", status ? "display:block !important" : "display:none !important");
        }

    }


    /**
     * 简化头像
     */
    function simplifyAv() {
        $(".posterinfo").each(function () {
            if ($(this).has("img").length === 1) {
                $(this).find("div:first").
                append("<a href='javascript:void' class='small_colored_text_btn stxt block_txt_c0 vertmod'>头像</a>");
            }
        })
    }

    /**
     * 注入 Nga 功能脚本
     */
    function injectJs(path) {
        let temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        temp.src = chrome.extension.getURL(path);
        document.head.appendChild(temp);
    }

    /**
     * 添加返回顶部标示
     */
    function addReturnTop() {
        let returnTop = document.createElement('img');
        returnTop.setAttribute("id", "returnTop");
        returnTop.src = chrome.extension.getURL("img/top.png");
        document.body.appendChild(returnTop);
        $(returnTop).on("click", () => {
            document.scrollingElement.scrollTop = 0;
        })
    }

    /**
     * 初始化
     */
    function init() {
        addReturnTop();
        topics();
        simplifyAv();
        injectJs('js/inject/hotKey.js');
    }

    return {
        init: init
    }

})();

nga.init();

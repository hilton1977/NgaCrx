nga = (function () {
    /**
     * 简化栏目名字
     */
    function simplifyAD() {
        $(".c3>a").each(function () {
            $(this).html($(this).text());
        });
        $(".c4>span").each(function () {
            $(this).html($(this).text());
        });
    }

    /**
     * 主题 版面默认隐藏
     * 添加提示和动画
     */
    function topics() {
        let tip = "<a class='showMore' showId ='#toppedtopic' >[公告]</a>",
            subTip = "<a class='showMore' showId ='#sub_forums'>[子版面]</a>";
        $("#toptopics >div> h3").append(tip).append(subTip);
        $(".showMore").toggle(function () {
            this.display($(this).attr("showId"),true);
        },function () {
            this.display($(this).attr("showId"),false);
        });

        function display(data,status) {
            $(id).css("cssText", status?"display:block !important":"display:none !important");
        }
    }

    /**
     * 简化头像
     */
    function simplifyAv() {
        $(".posterinfo").each(function () {
            if ($(this).has("img").length === 1) {
                $(this).find("div:first").append("<a href='javascript:void' class='small_colored_text_btn stxt block_txt_c0 vertmod'>头像</a>");
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
        let temp = document.createElement('img');
        temp.setAttribute("id", "returnTop");
        temp.src = chrome.extension.getURL("img/top.png");
        document.body.appendChild(temp);
        $("#returnTop").on("click", () => {
            document.scrollingElement.scrollTop = 0;
        })
    }

    addReturnTop();
    simplifyAD();
    topics();
    simplifyAv();
    injectJs('js/inject/hotKey.js');
})();

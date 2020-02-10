nga = (function () {
        chrome.contextMenus.create({
            title: '使用度娘搜索：%s', // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            onclick: function (params) {
                // 注意不能使用location.href，因为location是属于background的window对象
                chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
            }
        });



})();

chromeTool = (function () {
    let chromeNotifications = chrome.notifications;

    /**
     * 定时任务 延迟时长
     * @param triggerTime
     * @returns {number}
     */
    function getTimeOut(triggerTime) {
        let now = new Date();
        let triggerDateStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + triggerTime;
        return new Date(triggerDateStr) - now;
    }

    /**
     * 消息通知
     * @param message 通知内容
     * @param triggerTime 触发时间
     * @param interval 周期
     */
    function notice(message, triggerTime, interval) {
        let timeOut = triggerTime ? getTimeOut(triggerTime) : 0;
        if (timeOut < 0) {
            return;
        }
        let opt = {
            type: 'image',
            iconUrl: 'img/icon.png',
            title: '定时提醒',
            imageUrl: 'img/eat2.jpg',
            message: '\r\n' + message,
            contextMessage: '真香警告',
            eventTime: Date.now() + 3000
        };
        let intervalId = -1;
        let timeoutId = setTimeout(() => {
            if (interval) {
                intervalId = setInterval(() => {
                    chromeNotifications.create(null, opt);
                }, interval);
            } else {
                chromeNotifications.create(null, opt);
            }
        }, timeOut);
    }

    return {
        noticeMsg: function (message, triggerTime, interval) {
            return notice(message, triggerTime, interval)
        },
        checkVersion: function () {

        },
    }
})();


// chrome.notifications.onClicked.addListener(function(notificationId){
//     alert(notificationId);
// })
//
//
// // web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
// chrome.webRequest.onBeforeSendHeaders.addListener(details => {
//         details.requestHeaders.push({name: "set-Cookie", value: "widget_session=abc123; SameSite=None; Secure"});
//         console.log(details.requestHeaders);
//         details.requestHeaders.some(function (header,index) {
//             if (header.name == 'Cookie') {
//                 details.requestHeaders.splice(index,1);
//                 return true;
//             }
//             return false;
//         });
//         return {requestHeaders:details.requestHeaders}
//     },
//     {urls: ["http://bus.2500.tv/*"]},
//     ["blocking","requestHeaders","extraHeaders"]);

(function () {
})();

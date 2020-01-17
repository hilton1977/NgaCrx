szbus = (function () {
    const busRunStatusUrl = "http://bus.2500.tv/api_line_status.php";
    const busLineUrl = "http://bus.2500.tv/line.php?line=";
    const busStationUrl = "http://bus.2500.tv/lineInfo.php?lineID=";

    /**
     * 线路实体
     * @param lineId 线路id
     * @param lineName 线路名称
     * @param description 线路描述
     */
    function lineInfo(lineId, lineName, description) {
        let lineInfo = {};
        lineInfo.id = lineId;
        lineInfo.value = lineName + " " + description;
        return lineInfo;
    }

    /**
     * 站点实体
     * @param stationId 站点id
     * @param stationName 站点名称
     */
    function stationInfo(stationId, stationName) {
        let stationInfo = {};
        stationInfo.id = stationId;
        stationInfo.value = stationName;
        return stationInfo;
    }


    /**
     * 根据公交线id 搜索站点信息
     * @param lineId 线路id
     * @param callback 回调
     */
    function searchStation(lineId, callback) {
        $.get(busStationUrl + lineId, function (data) {
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(data, "text/html");
            let stationList = [];
            htmlDoc.querySelectorAll(".ldItem").forEach(item => {
                let stationId = $(item).attr("id");
                let stationName = $(item).find("dd").text();
                stationList.push(stationInfo(stationId, stationName));
            });
            callback(stationList);
        });
    }


    /**
     * 根据线路名搜索公交车线路
     * @param lineName 公车线路名称
     * @param callback 回调
     */
    function searchLine(lineName, callback) {
        $.get(busLineUrl + lineName, function (data) {
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(data, "text/html");
            let lineList = [];
            htmlDoc.querySelectorAll(".stationList").forEach(item => {
                let lineId = $(item).find("a").attr("lineid");
                let lineName = $(item).find("a>p>b").text();
                let description = $(item).find("a>p").eq(1).text();
                lineList.push(lineInfo(lineId, lineName, description));
            });
            callback(lineList);
        });
    }

    /**
     * 根据站点信息搜索公交车最近3辆车情况
     * @returns {[]} 最近车辆到站数
     */
    function busRunStatus(search, callback) {
        let matchArray = [];
        if(search.lineId == undefined || search.stationId == undefined){
            return matchArray;
        }
        $.ajax({
            type: "POST",
            url: busRunStatusUrl,
            data: {lineID: search.lineId},
            dataType: "json",
            success: function (busInfo) {
                if (busInfo.status !== 1) {
                    return;
                }
                let compStationId = search.stationId, matchIndex = 0;
                busInfo.data.some(function (data, index) {
                    if (compStationId == data.ID) {
                        matchIndex = index;
                        return true;
                    }
                    return false;
                });
                for (let i = matchIndex; i > 0; i--) {
                    if (busInfo.data[i].BusInfo !== "" && matchArray.length < 3) {
                        matchArray.push(matchIndex - i);
                    }
                }
                callback(matchArray);
            }
        });
    }

    return {
        busRunStatus: function (search, callback) {
            return busRunStatus(search, callback);
        },
        searchLine: function (lineName, callback) {
            return searchLine(lineName, callback);
        },
        searchStation: function (lineId, callback) {
            return searchStation(lineId, callback);
        }
    }
})();

taskCenter = (function () {
    const taskList = [];

    function TaskInfo(timeOutId, triggerTime, intervalId, interval) {
        this.timeOutId = timeOutId;
        this.triggerTime = triggerTime;
        this.intervalId = intervalId;
        this.interval = interval;
    }


    return {
        list: function () {

        },
        pushTask: function () {

        }
    }
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

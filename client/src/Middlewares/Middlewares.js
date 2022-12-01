export function getCurrentDevice() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}

export function getCurrentUser(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function getLanguage(key) {
    return getCurrentUser(key).language;
}
export function getObjectLocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function timeConverter(time, string) {
    let t = new Date(time);
    let stringconerted = "";
    let DAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const timeObj = {
        d: t.getDate(),
        D: DAY[t.getDay()],
        m: MONTH[t.getMonth()],
        y: t.getFullYear(),
        h: t.getHours(),
        i: t.getMinutes(),
        s: t.getSeconds(),
        S: t.getMilliseconds(),
    }
    for (let i = 0; i < string.length; i++) {
        let check = false;
        for (let key in timeObj) {
            if (key === string[i]) {
                stringconerted += timeObj[key];
                check = true;
                break;
            }
        }
        (check === false) && (stringconerted += string[i]);
    }
    return stringconerted;
}

export function hasLoggedIn() {
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    if(user)
        return true
    else
        return false
}
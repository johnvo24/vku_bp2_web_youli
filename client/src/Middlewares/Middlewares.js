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
    return getCurrentUser(key) ? getCurrentUser(key).language : 1;
}
export function getObjectLocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function timeConverter(time, string) {
    let t = new Date(time);
    let stringconerted = "";
    let DAY = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let MONTH = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const timeObj = {
        d: (t.getDate() < 10) ? `0${t.getDate()}` : t.getDate(),
        D: DAY[t.getDay()],
        m: MONTH[t.getMonth()],
        y: t.getFullYear(),
        h: (t.getHours() < 10) ? `0${t.getHours()}` : t.getHours(),
        i: (t.getMinutes() < 10) ? `0${t.getMinutes()}` : t.getMinutes(),
        s: (t.getSeconds() < 10) ? `0${t.getSeconds()}` : t.getSeconds(),
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
export const timeToPxConvrter = (time) => {
    let t = new Date("1/1/1 "+ time);
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();

    let px = (h*60*60 + m*60 + s)/100;
    return px;
}

export function hasLoggedIn() {
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    if(user)
        return true
    else
        return false
}
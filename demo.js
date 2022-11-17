function timeConverter(time, string) {
    let t = new Date(time);
    let stringconerted = "";
    let DAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const timeObj = {
        d: t.getDate(),
        D: DAY[t.getDay()],
        m: t.getMonth(),
        y: t.getFullYear(),
        h: t.getHours(),
        i: t.getMinutes(),
        s: t.getSeconds(),
        S: t.getMilliseconds(),
    }
    for(let i = 0; i < string.length; i++) {
        let check = false;
        for(key in timeObj) {
            if(key === string[i]) {
                stringconerted += timeObj[key];
                check = true;
                break;
            }
        }
        (check === false) && (stringconerted += string[i]);
    }
    return stringconerted;
}

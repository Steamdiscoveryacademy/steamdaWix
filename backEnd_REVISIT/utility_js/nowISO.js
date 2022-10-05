let timezoneOffset = 0;
let tzAbbrv = 'ZZUULLUU';
// timezoneOffset = -4;
// tzAbbrv = 'EDT';
// ø <AS IF ZULU>
timezoneOffset += 5;
// ø </AS IF ZULU>
let dateOverload = {};
//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
// ø <Happy Birthday>
dateOverload = { year: 1960, monthIndex: 2, day: 11, hours: 6, minutes: 34, seconds: 37, milliseconds: 0 };
// ø </Happy Birthday>
dateOverload.year = 2020;
dateOverload.monthIndex = 2;
dateOverload.day = 1;
// dateOverload.hours = 1;
// dateOverload.minutes = 34;
// dateOverload.seconds = 045;
// dateOverload.milliseconds = 0;
console.warn('dateOverload: ');
console.warn(dateOverload);


if (dateOverload.year > 1959) {
    let testISO = nowISO(timezoneOffset, tzAbbrv, dateOverload);
    console.warn('testISO: ' + testISO);
} else {
    let testNowISO = nowISO(timezoneOffset, tzAbbrv);
    console.warn('testNowISO: ' + testNowISO);
}


// ø <---------- <nowISO() utililty.jsw>  ---------->
export function nowISO(timezoneOffset = '0', tz = 'ZULU', dateOverloadParamObject = {}) {
    let logSteps = 'STEPSs\n====='
    //NOTE: WILL NOT WORK AROUND MIDNIGHT NEW YEAR'S EVE
    //, milliseconds = true){
    //timezoneOffset is negative for North America
    // let getTZoffset = local.getItem('timezoneOffset');
    // timezoneOffset = tz === '0' ? getTZoffset : timezoneOffset;
    // let getTZabbrv = local.getItem('tzAbbrv');
    // tz = tz === 'ET' ? getTZabbrv : tz;
    let overload = typeof dateOverloadParamObject.year === 'number' ? true : false;////?
    let now = new Date();////?
    if (overload) {
        now = new Date(dateOverloadParamObject.year, dateOverloadParamObject.monthIndex, dateOverloadParamObject.day, dateOverloadParamObject.hours, dateOverloadParamObject.minutes, dateOverloadParamObject.seconds, dateOverloadParamObject.milliseconds);
    }
    // let now = overload === false? nowParam : nowOverload;
    // let now = new Date(1960,2,11,23,59,59);
    let hours = now.getHours() + Number(timezoneOffset);
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let monthLast = now.getMonth();
    logSteps += '\nmonthLast: ' + monthLast;
    let dayLast = 31;
    // <!!!>
    dayLast = monthLast === 2 ? 28 : dayLast;
    dayLast = monthLast === 2 && year % 4 === 0 ? 29 : dayLast;
    dayLast = [9, 4, 6, 11].includes(monthLast) ? 30 : dayLast;
    logSteps += '\ndayLast: ' + dayLast;
    // </!!!>
    let dayRollover = hours < 0 ? 1 : 0;
    day = day - dayRollover;
    let monthRollover = day < 1 ? 1 : 0;
    month = month - monthRollover;
    let yearRollover = month < 1 ? 1 : 0
    year = year - yearRollover;
    day = monthRollover === 1 ? dayLast : day;
    let yyyymmddhhiiss = now.getFullYear().toString();
    yyyymmddhhiiss += ('00' + (now.getMonth() + 1).toString()).substr(-2);
    yyyymmddhhiiss += ('00' + now.getDate().toString()).substr(-2);
    // yyyymmddhhiiss += ('00' + now.getHours().toString()).substr(-2);
    yyyymmddhhiiss += ('00' + hours.toString()).substr(-2);
    yyyymmddhhiiss += ('00' + now.getMinutes().toString()).substr(-2);
    yyyymmddhhiiss += ('00' + now.getSeconds().toString()).substr(-2);
    yyyymmddhhiiss += '.' + ('000' + now.getMilliseconds().toString()).substr(-3);
    // if (milliseconds) {
    //     yyyymmddhhiiss += '.' + ('000' + now.getMilliseconds().toString()).substr(-3);
    // }
    yyyymmddhhiiss += ' [' + tz + ']';
    console.warn('logSteps: ' + logSteps);
    return yyyymmddhhiiss;
    // return 'Hours: ' + hours;
}
// ø <---------- </nowISO() utililty.jsw> ---------->

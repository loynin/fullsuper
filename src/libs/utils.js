import moment from 'moment';

export const millisecondsToHoursAndMinutes = (durationInMilliseconds) => {
    var milliseconds = parseInt((durationInMilliseconds%1000)/100)
        , seconds = parseInt((durationInMilliseconds/1000)%60)
        , minutes = parseInt((durationInMilliseconds/(1000*60))%60)
        , hours = parseInt((durationInMilliseconds/(1000*60*60))%24);
    // hours = (hours < 10) ? "0" + hours : hours;
    // minutes = (minutes < 10) ? "0" + minutes : minutes;
    // seconds = (seconds < 10) ? "0" + seconds : seconds;
    const str_hours = hours !== 0 ? hours + 'h' : '';
    const str_minutes = minutes !== 0 ? minutes + 'm' : '';
    return str_hours + ' ' + str_minutes;
}

export const millisecondsOfHoursAndMinutesFromDate = ( momentObject = moment()) => {
    const mshours = momentObject.hours() * 60 * 60 * 1000;
    const msminutes = momentObject.minutes() * 60 * 1000;
    const msseconds = momentObject.seconds() * 1000;
    return mshours + msminutes + msseconds + momentObject.milliseconds();

}

export const todayTimeFromMilliseconds = (millisecondsTime = 0) => {
    const beginingOfToday = moment().startOf('day').valueOf();
    return beginingOfToday + millisecondsTime;
}

export const RRuleInputDate = (momentObject = moment()) => {
    const str = momentObject.format('YYYYMMDDTHHmmss');
    return str;
}

export const RRuleFREQ = (RRuleFreq = 0 ) => {
    if (RRuleFreq === 0) {
        return 'YEARLY';
    } else if (RRuleFreq === 1) {
        return 'MONTHLY';
    } else if (RRuleFreq === 2) {
        return 'WEEKLY';
    } else if (RRuleFreq === 3) {
        return 'DAILY';
    } else {
        return;
    }
}
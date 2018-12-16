console.log ('rrule try is running');

import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';

//const rule = RRule.fromString('DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5');
//console.log(rule.all());

//console.log(moment().format('dd'));

// Create a rule:
// const rule = new RRule({
//   freq: RRule.WEEKLY,
//   interval: 5,
//   byweekday: [RRule.MO, RRule.FR],
//   dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
//   until: new Date(Date.UTC(2012, 12, 31))
// })

// const daily = new RRule({
//     freq: RRule.DAILY,
//     interval: 3,
//     byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
//     dtstart: new Date(),
//     until: new Date('2018-12-30')
// })

// const myevent = rule.between(new Date(Date.UTC(2012, 7, 1)), new Date(Date.UTC(2012, 8, 1)));

// console.log(daily.all());

// console.log(myevent);
// console.log(rule.toText());

//Event:
// var mytask = {
//     title: this.state.title,
//     description: this.state.description,
//     start_date: this.state.data_date,
//     endDate:
//     start_time: this.state.data_time,
//     duration: this.state.duration,
//     recuring_id: this.state.recurrence,
//     user_id: this.state.userid,
// };

//users
//   -userid
//      -tasks
//            -taskid
                    // sumarry: this.state.title,
                    // description: this.state.description,
                    // startDate: this.state.data_date,
                    // startTime: this.state.data_time,
                    // duration: this.state.duration,
                    // endDate:
                    // recurrence: {
                    //          freq: RRule.WEEKLY,
                    //          interval: 0,
                    //          byweekday: [RRule.MO, RRule.FR],
                    //      }
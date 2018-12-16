import uuid from 'uuid';
import moment from 'moment';
import database from '../firebase/firebase';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { RRuleInputDate, RRuleFREQ } from '../libs/utils';

export const addTask = ( task ) => ({
    type: 'ADD_TASK',
    task
});

export const startAddTask = (taskData = {}) => {
    return (dispatch, getState) => {
        const {
			title = '',
            startDate = moment().valueOf(),
            startTime = moment().valueOf(),
            endTime = moment().valueOf(),
            endDate = moment().valueOf(),
            isRecurrence = false,
            freq = RRule.YEARLY,
            byDay = [1].join(),
            interval = 1,
            freqId = 0,
            note = ''
        } = taskData;
        const task = {
            title,
            startDate,
            startTime,
            endTime,
            endDate,
            isRecurrence,
            freq,
            byDay,
            interval,
            freqId,
            note
        };

        database.ref('tasks').push(task).then((ref) => {
            dispatch(addTask({
                id: ref.key,
                ...task
            }));
        });
    }
};

export const editTask = (id, task) => ({
    type: 'EDIT_TASK',
    id,
    task
})

export const startEditTask = (id, task) => {
    return (dispatch, getStore) => {
        database.ref(`tasks/${id}`).update(task).then(() => {
            dispatch(editTask(id, task));
        });
    }
}

export const removeTask = ( { id } = {} ) => ({
    type: 'REMOVE_TASK',
    id
});

export const startRemoveTask = ( {id} = {} ) => {
    return (dispatch) => {
        database.ref(`tasks/${id}`).remove().then(() => {
            dispatch(removeTask({id}));
        })
       
    }
}

export const setTasks = (tasks) => ({
    type : 'SET_TASK',
    tasks
});

export const setMoreTasks = (tasks) => ({
    type: 'SET_MORE_TASKS',
    tasks
})

// export const startSetTasks = () => {
//     return (dispatch, getState) => {
//         return database.ref('tasks')
//             .once('value')
//             .then((snapshot) => {
//                 const tasks = [];
//                 snapshot.forEach((childSnapshot) => {
//                     tasks.push({
//                         id: childSnapshot.key,
//                         ...childSnapshot.val()
//                     });
//                 });
//                 dispatch(setTasks(tasks));
//             });
//     };
// };

const todayStart = moment().startOf('day').valueOf();
const todayEnd = moment().endOf('day').valueOf();

const gettaskbydate = (dispatch) => {
    return database.ref('tasks')
    .orderByChild('startDate')
    .startAt(todayStart)
    .endAt(todayEnd)
    .once('value')
    .then((snapshot) => {
        let tasks =[];
        snapshot.forEach((childSnapshot) => {
            if (!childSnapshot.val().isRecurrence){
                tasks.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            }
            
        });
        //console.log(tasks);
        dispatch(setTasks(tasks));
    })
}
const gettasksbyrecurrence = (dispatch) => {
    let tasks = [];
     return database.ref('tasks')
    .orderByChild('isRecurrence')
    .equalTo(true)
    .once('value')
    .then((snapshot) => {
        
        console.log('from recurrence tasks',snapshot.val() );
        
        // let somedate = new Date();
        // const rule1 = new RRule({
        //     freq: 2,
        //     interval: 1,
        //     byweekday: [0],
        //     dtstart: new Date(),
        //     until: somedate.setDate(somedate.getDate() + 7)
        // });
       
    //    const rule1 = RRule.fromString(`DTSTART:${RRuleInputDate(moment().utc())}\nRRULE:FREQ=WEEKLY;BYDAY=TH;INTERVAL=1;UNTIL=${RRuleInputDate(moment().add(7,'d').utc())}`);

    //     console.log('tostring' ,rule1.toString());
    //     console.log('rule1', rule1.all());


        snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            const dayofweek = `${task.byDay}`;
            console.log('dayofweek', dayofweek);
                console.log(`DTSTART:${RRuleInputDate(moment(task.startDate))}\n
                RRULE:FREQ=${RRuleFREQ(task.freq)};BYDAY=${dayofweek};INTERVAL=${task.interval};UNTIL=${RRuleInputDate(moment())}
               `);
                
           //Rule for Daily and weekly
           let rule = undefined;
           if (task.freq === 3 || task.freq === 2) {
                rule = RRule.fromString(
                    `DTSTART:${RRuleInputDate(moment())}\n
                    RRULE:FREQ=${RRuleFREQ(task.freq)};BYDAY=${dayofweek};INTERVAL=${task.interval};UNTIL=${RRuleInputDate(moment())}
                    `
                );
                

            } else if (task.freq === 1 ){
                rule = RRule.fromString(
                    `DTSTART:${RRuleInputDate(moment(task.startDate))}\nRRULE:FREQ=${RRuleFREQ(task.freq)};COUNT=1`
                    );
            } else if (task.freq === 0){
                rule = RRule.fromString(
                    `DTSTART:${RRuleInputDate(moment(task.startDate))}\nRRULE:FREQ=${RRuleFREQ(task.freq)};COUNT=5`
                    );
            } else {
                console.log('else nothing');
            }
            const rules = rule.all();
            
            if (rules.length > 0) {
                console.log('create from rule',childSnapshot.key,  rules);
                const isMatch = rules.find((recurrence) => {
                    const startPix = moment(task.startDate).startOf('day').valueOf();
                    const recurrencePix = moment(recurrence).startOf('day').valueOf();
                    const todayPix = moment().startOf('day').valueOf();
                    // console.log(recurrencePix);
                    // console.log(todayPix);
                    // console.log(startPix);
                    return recurrencePix === todayPix && todayPix >= startPix;
                });
                if (isMatch) {
                    tasks.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                }
            }
            //console.log(tasks);
           // callback(tasks);
            //return tasks;
        })
    })
    .finally (() => {
        dispatch(setMoreTasks(tasks));

    })
}

export const startSetTasks = () => {
        return (dispatch, getState) => {
            gettasksbyrecurrence(dispatch);
            return gettaskbydate(dispatch);
    };
}           
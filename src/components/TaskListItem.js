import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {millisecondsToHoursAndMinutes, RRuleFREQ} from '../libs/utils';

const TaskListItem = (props)  => (
    //to={`/edit/${props.id}`}
    <div onClick={() => props.onClick(props.task)}>
        <div>
            <h3>{props.task.title}</h3>
            <div>Today is: {moment().format('MM/DD/YYYY HH:mm - ddd')}</div>
            <div>Start Date: {moment(props.task.startDate).format('MM/DD/YYYY hh:mm - ddd')}</div>
            <div>End Date: {moment(props.task.endDate).format('MM/DD/YYYY hh:mm -dd')}</div>
            <div>Start Time: {moment(props.task.startTime).utc().format('MM/DD/YYYY hh:mm A')}</div>
            <div>End Time: {moment(props.task.endTime).utc().format('MM/DD/YYYY hh:mm A')}</div>
            <div>Duration: {millisecondsToHoursAndMinutes(props.task.endTime - props.task.startTime)}</div>
            <div>Recurrence: {props.task.isRecurrence.toString()}</div>
            <div>RecurrenceType: {RRuleFREQ(props.task.freq)}</div>

        </div>
        <Link to={`/edit/${props.task.id}`}>Edit</Link>
        <hr></hr>
    </div>
);
export default TaskListItem;
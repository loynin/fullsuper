import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import uuid from 'uuid';
import RRule from 'rrule';
import TimeRange from 'react-time-range';
import { millisecondsOfHoursAndMinutesFromDate,
		 todayTimeFromMilliseconds
} from '../libs/utils';
//users
//   -userid
//      -tasks
//            /-taskid
                    /// title: this.state.title,
                    /// note: this.state.description,
                    // startDate: this.state.data_date,
                    // startTime: this.state.data_time,
                    // duration: this.state.duration,
                    // endDate:
                    // recurrence: {
                    //          freq: RRule.WEEKLY,
                    //          interval: 0,
                    //          byweekday: [RRule.MO, RRule.FR],
					//      }
					
export default class TaskForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: this.props.task ? this.props.task.id : uuid(),
			title: this.props.task ? this.props.task.title : '',
			note: this.props.task ? this.props.task.note : '',
			startDate: this.props.task ? moment(this.props.task.startDate) : moment(),
			endDate: this.props.task ? moment(this.props.task.endDate) : moment(),
			startTime: this.props.task ? moment(this.props.task.startTime) : millisecondsOfHoursAndMinutesFromDate(moment()),
			endTime: this.props.task ? moment(this.props.task.endTime) : millisecondsOfHoursAndMinutesFromDate(moment().add(10,'minutes')),
			isRecurrence: this.props.task ? this.props.task.isRecurrence : false,
			freq: this.props.task ? this.props.task.freq : 0,
			byDay: this.props.task ? this.props.task.byDay : [RRule.MO].join(),
			interval: this.props.task ? this.props.task.interval : 1,
			freqId: this.props.task ? this.props.task.freqId : 0,
			calendarFocused: false,
			endCalendarFocused: false,
			error: '',
		}
	}
	

	onTitleChange = (e) => {
		const title = e.target.value;
		this.setState(() => {
			return ({
				title
			})
		
		})
	}

	onStartDateChange = (startDate) => {
        this.setState(() => {
            return ({ startDate })
		})
		console.log('Start Date', startDate.toString())
	}

	onStartTimeChange = (time) => {
		this.setState(() => {
			return ({startTime: millisecondsOfHoursAndMinutesFromDate(moment(time.startTime))})
		})
	}

	onEndTimeChange = (time) => {
		this.setState(() => {
			return ({endTime: millisecondsOfHoursAndMinutesFromDate(moment(time.endTime))})
		})
	}

	onEndDateChange = (endDate) => {
        this.setState(() => {
            return ({ endDate })
		})
    }

	onRecurrenceChange = (e) => {
		const recurrenceId = parseInt(e.target.value);
		console.log(e.target.value);
		if (recurrenceId === 4) {
			this.setState(() => {
				return ({
					isRecurrence: false,
					freq: 5,
					interval: 1,
					byDay: [RRule.MO].join(),
					freqId: recurrenceId
				})
			})
		}
		if (recurrenceId === 3) {
			this.setState(() => {
				return ({
					isRecurrence: true,
					freq: RRule.DAILY,
					interval: 1,
					byDay: [RRule.MO,RRule.TU,RRule.WE,RRule.TH,RRule.FR,RRule.SA,RRule.SU].join(),
					feqId: recurrenceId
				})
			})
			console.log(RRule.MO);
		}
		if (recurrenceId === 2) {
			this.setState(() => {
				return ({
					isRecurrence: true,
					freq: RRule.WEEKLY,
					interval: 1,
					byDay: [this.state.startDate.format('dd').toUpperCase()].join(),
					feqId: recurrenceId
				})
			})
		}
		if (recurrenceId === 1) {
			this.setState(() => {
				return ({
					isRecurrence: true,
					freq: RRule.MONTHLY,
					interval: 1,
					byDay: [this.state.startDate.format('dd').toUpperCase()].join(),
					feqId: recurrenceId
				})
			})
		}
		if (recurrenceId === 0) {
			this.setState(() => {
				return ({
					isRecurrence: true,
					freq: RRule.YEARLY,
					interval: 1,
					byDay: [this.state.startDate.format('dd').toUpperCase()].join(),
					feqId: recurrenceId
				})
			})
		}
	}

	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => {
			return ({ note })
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.title){
			this.setState(() => ({error: 'Please enter title and duration'}));	
		} else {
			this.setState(() => ({error: ''}));
			const task = {
				title: this.state.title,
				startDate: this.state.startDate.valueOf(),
				startTime: this.state.startTime.valueOf(),
				endTime: this.state.endTime.valueOf(),
				endDate: this.state.endDate.valueOf(),
				isRecurrence: this.state.isRecurrence,
				freq: this.state.freq,
				byDay: this.state.byDay,
				interval: this.state.interval,
				freqId: this.state.freqId,
				note: this.state.note,
			};
			console.log(task);
			this.props.onSubmit(task);
		}
		
	}
	onFocusChange = ({focused}) => {
        this.setState (() => {
            return ({ calendarFocused: focused})
        })
    }

	onEndFocusChange = ({focused}) => {
        this.setState (() => {
            return ({ endCalendarFocused: focused})
        })
    }
	

	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
				<div>
					<input 
						type="text"
						placeholder="Add title"
						value={this.state.title}
						onChange = {this.onTitleChange}
					/>
				</div>
				<div>
						<SingleDatePicker 
		                    date = {this.state.startDate}
		                    onDateChange = {this.onStartDateChange}
		                    focused = {this.state.calendarFocused}
		                    onFocusChange = {this.onFocusChange}
		                    numberOfMonths ={1}
		                    isOutsideRange = {() => false}
                		/>
					</div>
					<div>

						<TimeRange
							startMoment={todayTimeFromMilliseconds(this.state.startTime)}
							endMoment={todayTimeFromMilliseconds(this.state.endTime)}
							onChange={this.returnFunction}
							onStartTimeChange={this.onStartTimeChange}
							onEndTimeChange={this.onEndTimeChange}
							minuteIncrement={1}
						/>
					</div>
					<div>
						<SingleDatePicker 
		                    date = {this.state.endDate}
							onDateChange = {this.onEndDateChange}
							focused = {this.state.endCalendarFocused}
		                    onFocusChange = {this.onEndFocusChange}
		                    numberOfMonths ={1}
		                    isOutsideRange = {() => false}
                		/>
					</div>
					
					<div>
					<label>
						Recurrence:
						<select value={this.state.recurrenceId} onChange = {this.onRecurrenceChange}>
							<option value="4">No Repeat</option>
							<option value="3">Everyday </option>
							<option value="2">Weekly</option>
							<option value="1">Monthly</option>
							<option value="0">Yearly</option>
						</select>	
												
					</label>
					</div>
					<div>
					<label>
						Note:
						<textarea 
							placeholder="Enter Task Note"
							value={this.state.note}
							onChange = {this.onNoteChange}
						>
						</textarea>
					</label>
					</div>
					<button type="submit">Save Task</button>
				</form>
				<button onClick={this.testClick}>Test</button>

			</div>
			);
	}
}



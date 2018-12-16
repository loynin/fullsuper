import React from 'react';
import { connect } from 'react-redux';
import TaskListItem from './TaskListItem';
import CountDown from './CountDown';
import ClockTime from './ClockTime';
import moment from 'moment';
import {millisecondsOfHoursAndMinutesFromDate} from '../libs/utils';


class TaskList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            endTime: moment(),
            startTime: moment(),
            currentTask: undefined,
            currentIndex: 0,
            triggerIndex : 0,
        }
        this.itemClick = this.itemClick.bind();
        this.onCountEnd = this.onCountEnd.bind();
    }

    itemClick = (index, task) => {
        //console.log(task);
        const duration = task.endTime - task.startTime;
        const newtask = {
            ...task,
            endTime: moment().valueOf() + duration
        }
        this.setState({
            currentTask: newtask,
            currentIndex: index,
            triggerIndex: index
        })
    }

    onCountEnd = () => {
        this.setState(() => {
            return {
                triggerIndex : this.state.currentIndex + 1
               
            }
        })
        console.log('count is end');
    }

    startTimer = setInterval(() => {
        const timenow = millisecondsOfHoursAndMinutesFromDate(moment());
        //console.log(moment(timenow).utc().format('MM/DD/YYYY hh:mm:ss A'));
        if (this.state.currentIndex != this.state.triggerIndex) {
            this.setState(() => {
                return {
                    currentIndex: this.state.triggerIndex
                }
            })
            if (this.state.triggerIndex < this.props.tasks.length) {
                this.itemClick(this.state.triggerIndex, this.props.tasks[this.state.triggerIndex]);
            } else {
                this.setState({
                    currentTask: undefined
                })
            }
        }
    }, 1000);
    
    componentWillUnmount() {
        clearInterval(this.startTimer);
    }

    render() {
        return (
            <div>
                <ClockTime/>
                <CountDown task={this.state.currentTask} onCountEnd={this.onCountEnd}/>
                {
                    this.props.tasks.map((task, index ) => {
                        const newTask = {
                            ...task,
                            index
                        }
                        return (
                            <TaskListItem
                                onClick={this.itemClick.bind(this, index)}
                                task = {task}
                                key = {task.id}
                            />
                        )
                    })
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // return {
    //     tasks: state.tasks
    // }

    return {
        tasks: state.tasks.sort((a, b) => {
            return b.startTime < a.startTime ? 1 : -1;
        })
    }
};

const ConnectedTaskList = connect(mapStateToProps)(TaskList);
export default ConnectedTaskList;
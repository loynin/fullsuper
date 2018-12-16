import React , {Component} from 'react';
import moment from 'moment';

export default class CountDown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime: moment().valueOf(),
            endTime:  moment().endOf('days').valueOf(),
            timenow : moment().format('hh:mm:ss'),
            counterTitle: 'Remaining Day'
        }
        this.getRestOfDay = this.getRestOfDay.bind(this);
    }

    counting = setInterval(() => {
        const remainTime = this.getRestOfDay()
        if (remainTime < 0 ){
            this.props.onCountEnd();
            this.setState({
                endTime: moment().endOf('days').valueOf(),
                counterTitle: 'Remaining Day'
            })
        }
        this.setState({
            timenow: this.msToTime(remainTime)
        })

        
    }, 1000); 

    msToTime = (duration) => {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    }
    
    getRestOfDay(){
        const endOfDay = this.props.task ? this.props.task.endTime : this.state.endTime;
        const now = moment().valueOf();
        const restOfDay = endOfDay - now;
        //console.log('now', now, 'endOfDay', endOfDay, 'now < endofday', now < endOfDay);
        return restOfDay;
    };
    

    componentWillUnmount() {
        clearInterval(this.counting);
    }


    render() {
        return (
            <div className="button">
                <p>{this.props.task ? this.props.task.title : this.state.counterTitle}</p>
                <p>{this.state.timenow.toString()}</p>
            </div>
            
        );
    }
}
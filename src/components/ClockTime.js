import React , {Component} from 'react';
import moment from 'moment';

export default class ClockTime extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timenow : moment()
        }
    }

    getTime =   setInterval(() => {
            this.setState({
            timenow: moment()
            })
    }, 1000);
    
    componentWillUnmount(){
        clearInterval(this.getTime);
    }

    render() {
        return (
            <div className="button">
                <p>Time Now</p>
                <p>{this.state.timenow.format('hh:mm:ss')}</p>
            </div>
            
        );
    }
}
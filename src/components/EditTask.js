import React from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';
import { startEditTask, startRemoveTask } from '../actions/tasks';

const EditTask = (props) => (
	<div>
		<h1>Edit Task</h1>
        <TaskForm 
            task={props.task}
            onSubmit={(task) => {
                console.log(task);
                props.dispatch(startEditTask(props.task.id, task));
		    }}
            />

            <button
                className="button-remove"
                onClick={() => {
                props.dispatch(startRemoveTask({id: props.task.id }))
                    props.history.push('/');
                }}
            >Remove Task</button>

	</div>
	
);

const mapStateToProps = (state, props) => {
    return {
        task: state.tasks.find((task) => task.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(EditTask);
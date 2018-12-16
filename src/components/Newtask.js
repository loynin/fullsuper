import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import TaskForm from './TaskForm';
import { startAddTask } from '../actions/tasks';

const Newtask = (props) => (
	<div>
		<h1>Create New Task</h1>
		<TaskForm onSubmit={(task) => {
			props.dispatch(startAddTask(task));
		}}/>
	</div>
);

export default connect()(Newtask);
//Tasks reducer

const tasksReducerDefaultState = [];

const tasksReducer = ( state = tasksReducerDefaultState, action ) => {
    switch (action.type){
        case 'ADD_TASK':
            return [
                ...state,
                action.task
            ];
        case 'EDIT_TASK':
            return state.map((task) => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        ...action.task
                    }
                } else {
                    return task;
                }
            });
        case 'REMOVE_TASK':
            return state.filter(({id}) => id !== action.id);
        case 'SET_TASK':
            return action.tasks;
        case 'SET_MORE_TASKS':
            return [
                ...state,
                ...action.tasks
            ]
        default:
            return state;
    }
};

export default tasksReducer;
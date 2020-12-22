import React from 'react';
export type TodoListHeaderType = {
    title: string
}
function TodoListHeader(props: TodoListHeaderType) {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <input/>
                <button>+</button>
            </div>
        </div>
    );
}

export default TodoListHeader;

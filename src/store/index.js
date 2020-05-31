import {createStore} from 'redux';
import update from 'immutability-helper';
import * as t from '../common/actions';

const initialState = {
    instances: [],
};

function reducer(state = initialState, action) {
    const {instances} = state;
    switch (action.type) {
        //添加模块的
        case t.ADD_COMPONENT:
            const {payload: obj} = action;
            return {
                ...state,
                instances: update(instances, {$push: [obj]}),
            };
        case t.SORT:
            const { dragIndex, hoverIndex } = action.payload;
            const dragCard = instances[dragIndex];
            debugger
            const res = update(state, {
                instances: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            });
            debugger
            return res;
        default:
            return state;
    }


}


let store = createStore(reducer);

export default store;

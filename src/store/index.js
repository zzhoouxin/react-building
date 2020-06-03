import {createStore} from 'redux';
import update from 'immutability-helper';
import * as t from '../common/actions';
import {removeComponent, findInstance, updateProps} from '../common/util';

const initialState = {
    instances: [],
};

function reducer(state = initialState, action) {
    const {instances} = state;
    let temp = [...instances];
    switch (action.type) {
        //添加模块的
        case t.ADD_COMPONENT:
            const {payload: obj} = action;
            return {
                ...state,
                instances: update(instances, {$push: [obj]}),
            };
        case t.SORT:
            const {dragIndex, hoverIndex} = action.payload;
            const dragCard = instances[dragIndex];
            const res = update(state, {
                instances: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            });

            return res;
        case t.REMOVE_COMPONENT:
            let _uuid = action.payload.uuid;
            temp = [...instances];
            removeComponent(_uuid, temp);
            return {
                ...state,
                instances: temp,
            };
        case t.APPEND_COMPONENT:
            const {parent, remove} = action.payload;
            const child = {...action.payload.item};
            // 找到 parent
            temp = [...state.instances];
            const parentInstance = findInstance(parent, temp);
            console.log(parent, instances, parentInstance);
            if (remove) {
                removeComponent(child.uuid, temp);
            }
            if (parentInstance) {
                parentInstance.children = parentInstance.children || [];
                parentInstance.children.push(child);
            }
            return {
                ...state,
                instances: temp,
            };
        case t.UPDATE_COMPONENT:
            const {item, values} = action.payload;
            let {uuid} = item;
            // 递归寻找 uuid 对应的那个实例对象并更新 fieldProps 和 props
            updateProps(uuid, [...instances], values);
            return {
                ...state,
                instances,
            };
        default:
            return state;
    }


}


let store = createStore(reducer);

export default store;

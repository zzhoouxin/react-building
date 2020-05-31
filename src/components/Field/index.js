import React from 'react';
import {Form} from 'antd';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import {ItemTypes} from '../../common/constants';
import store from '../../store';
import {
    UPDATE_COMPONENT,
    SORT,
    APPEND_COMPONENT,
} from '../../common/actions';
const {Item: FormItem} = Form;


class Field extends React.Component {


    render() {

        const { item, form, connectDragSource,connectDropTarget, connectDragPreview ,isDragging} = this.props;
        const opacity = isDragging ? 0 : 1;//透明度
        const {
            Component,
            props,
            children = [],
            field,
            mergedProps,
        } = item;
        const {getFieldDecorator} = form;
        let instanceCom = <Component/>;
        if (field) {
            const {
                id,
                label,
                rules,
                initialValue,
                labelCol,
                wrapperCol,
            } = field;
            instanceCom = (
                <FormItem label={label} labelCol={labelCol} wrapperCol={wrapperCol}>
                    {getFieldDecorator(id, {
                        rules,
                        initialValue,
                    })(instanceCom)}
                </FormItem>
            );
        }
        let content = (
            <div style={{opacity}}>
                {connectDragSource(
                    <div>
                        {instanceCom}
                    </div>)
                }
            </div>
        );
        return connectDragPreview(connectDropTarget(content));

    }
}


/**
 * 目标拖拽时候出发的事件 -- 有拖动中和拖动结束
 * @type {{drop(*, *, *): (undefined), hover(*, *, *=): (undefined)}}
 */
const fieldTarget = {
    //目标拖拽出发
    hover(props, monitor, component) {

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        console.log(dragIndex, hoverIndex);
        // Don't replace items with themselves
        if (dragIndex === undefined || hoverIndex === undefined) {
            return;
        }
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        // props.moveCard(dragIndex, hoverIndex);
        store.dispatch({
            type: SORT,
            payload: {
                dragIndex,
                hoverIndex,
            },
        });
        monitor.getItem().index = hoverIndex;
    },
    //结束后出发的东西
    drop(props, monitor, component) {
        console.log("2222222")

    },
};
/**
 * 拖拽地方--可以会去到props值  这个就是渲染的每个item props 就是Component各个属性
 * @type {{beginDrag(*): {item: *, index: *, id: *}}}
 */
const fieldSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            item: props.item,
        };
    },
};

/**
 * 注册一些方法到对应的组件上--比如拖拽包括的属性
 */
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    };
}

function dropConnect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true}),
    };
}

const WrappedField = DropTarget(ItemTypes.FIELD, fieldTarget, dropConnect)(
    DragSource(ItemTypes.FIELD, fieldSource, collect)(Form.create()(Field)),
);
export default WrappedField

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../common/constants';

class Item extends React.Component {
  render() {
    const {
      key,
      item,
      handleClick,
      connectDragSource,
    } = this.props;
    return connectDragSource(
      <li
        key={key}
        className="sidebar__component"
      >
        {item.label}
      </li>
    );
  }
}

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    console.log("props.item====>",props.item)
    return {
      item: props.item,
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

Item.PropType = {
  item: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(ItemTypes.FIELD, cardSource, collect)(Item);

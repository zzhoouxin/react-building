/**
 * @file 提供实例对象的组件
 * @author wuya
 */
import React, { Component } from 'react';
import * as lib from './lib';
import './index.css';
import Item from './DragSource';


class Source extends Component {

    render() {
        const items = Object.keys(lib.optimize).map((key, i) => {
            const item = lib.optimize[key].default();
            return (
                <Item
                    key={i}
                    item={item}
                />
            );
        });
        return (
            <div className="sidebar">
                <ul className="sidebar__components">
                    {items}
                </ul>
            </div>
        );
    }
}

export default Source;

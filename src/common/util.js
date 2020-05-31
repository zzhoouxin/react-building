/**
 * 移除指定组件
 * @param {number} uuid - 组件 id
 * @param {Array|Object} instances
 */
export function removeComponent(uuid, instances) {
    for (let i = 0, l = instances.length; i < l; i += 1) {
        const instance = instances[i];
        if (instance.uuid === uuid) {
            const index = instances.indexOf(instance);
            instances.splice(index, 1);
            break;
        }
        if (instance.children && instance.children.length) {
            removeComponent(uuid, instance.children);
        }
    }
}



export function findInstance(uuid, instances) {
    let res = null;
    for (let i = 0, l = instances.length; i < l; i += 1) {
        const instance = instances[i];
        console.log(instance, uuid);
        if (instance.uuid === uuid) {
            res = instance;
            break;
        }
        if (instance.children) {
            res = findInstance(uuid, instance.children);
        }
    }
    return res;
}

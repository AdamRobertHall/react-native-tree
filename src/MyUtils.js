export default class MyUtils {
    /**
     * 数组转key:true 格式对象
     * @param {*} array 
     * @param {*} obj 
     */
    static arrayToObj(array) {
        let obj = {};
        if (array && array.length > 0) {
            array.map(item => obj[item] = true);
        }
        return obj;
    }

    /**
     * @param  {Array} treeData
     * @param  {function (treeNode)} operation
     */
    static traverseTree(treeData, operation, parent) {
        if (!(treeData instanceof Array)) {
            console.error("treeData必须为数组");
            return;
        }
        if (!(operation instanceof Function)) {
            console.error("operation必须为函数");
            return;
        }
        treeData.map(node => {
            operation(node, parent);
            node && node.children && node.children.length > 0 && MyUtils.traverseTree(node.children, operation, node);
        })
    }

    /**
     * 建立子父关系
     * @param  {} parentNode
     * @param  {} selected
     * @param  {} selectedKeys
     * @param  {} selectedNodes
     */
    static parentSelect(parentNode, selected, selectedKeys, selectedNodes) {
        if (parentNode) {
            let siblingNum = 0;
            let siblingAllSelectedNum = 0;
            parentNode.children.map(item => {
                if (selected[item.key] === true) { 
                    siblingNum++;
                    siblingAllSelectedNum++;
                }
                if (selected[item.key] === null) { 
                    siblingNum++;
                }   
            });

            if (siblingNum === 0) {
                selected[parentNode.key] = false;
                selectedKeys = selectedKeys.filter(key => key !== parentNode.key);
                selectedNodes = selectedNodes.filter(item => item.key !== parentNode.key);
            } else if (siblingAllSelectedNum === parentNode.children.length) {
                selected[parentNode.key] = true;
                selectedKeys.push(parentNode.key);
                selectedNodes.push(parentNode);
            } else {
                selected[parentNode.key] = null;
                selectedKeys = selectedKeys.filter(key => key !== parentNode.key);
                selectedNodes = selectedNodes.filter(item => item.key !== parentNode.key);
            }
            MyUtils.parentSelect(parentNode.parentNode, selected, selectedKeys, selectedNodes);
        } 
    }
    /**
     * 深拷贝对象
     * @param  {} obj
     */
    static assign(obj) {
        let ret = {};
        for (let key in obj) {
            let value = obj[key];
            if (value instanceof Array) {
                ret[key] = value.map(item => MyUtils.assign(item))
            } else {
                ret[key] = value;
            }
        }
        return ret;
    }
};
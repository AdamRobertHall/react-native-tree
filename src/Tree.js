import React, { PropTypes } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyUtils from './MyUtils'

const ScreenHeight = Dimensions.get('window').height;
class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {},       // 所有节点 key:value 键值对 value为true时展开，否则收起
            selected: {},       // 所有节点 key:value 键值对 value为true时选中，否则不选
            expandedKeys: [],   // 所有展开节点 key 数组
            selectedKeys: [],   // 所有选中节点 key 数组
            selectedNodes: [],  // 所有选中节点数组
        }
    }

    componentWillMount() {
        let {checkable, checkStrictly, expandedKeys, selectedKeys, defaultSelectedKeys, defaultExpandedKeys,
             defaultExpandAll, defaultExpandRoot, treeData} = this.props;
        let tempExpandedKeys = [];
        let expanded = {};
        let selected = {};
        
        // 默认展开根节点
        if (defaultExpandRoot) {
            if(treeData && treeData.length === 1) {
                tempExpandedKeys = [treeData[0].key];
                expanded[treeData[0].key] = true;
            }
        }

        // 默认展开所有节点
        if (defaultExpandAll) {
            tempExpandedKeys = [];
            MyUtils.traverseTree(treeData, (node) => {
                tempExpandedKeys.push(node.key);
                expanded[node.key] = true;
            });
        }

        // 受控或默认展开和选择的节点
        if (expandedKeys || defaultExpandedKeys) {
            expanded = MyUtils.arrayToObj(expandedKeys || defaultExpandedKeys);
        }

        if (selectedKeys || defaultSelectedKeys) {
            selected = MyUtils.arrayToObj(selectedKeys || defaultSelectedKeys);
        }
        let selectedNodes = [];
        MyUtils.traverseTree(treeData, (node, parent) => {
            node.parentNode = parent;
            if (selectedKeys && selectedKeys.indexOf(node.key) !== -1) {
                selectedNodes.push(node);
                if (checkable && !checkStrictly) {
                    MyUtils.parentSelect(parent, selected, [], []);
                }
            }
        }, null);

        this.setState({
            expanded: expanded,
            selected: selected,
            expandedKeys: expandedKeys || defaultExpandedKeys || tempExpandedKeys,
            selectedKeys: selectedKeys || defaultSelectedKeys || [],
            selectedNodes: selectedNodes || []
        })
    }
    
    /**
     * expandedKeys （受控）展开指定的树节点
     * selectedKeys （受控）选中指定的树节点
     * @param {{expandedKeys, selectedKeys}} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        let {checkable, checkStrictly, treeData, expandedKeys, selectedKeys} = nextProps;
        let selected = {};
        let expanded = {};
        
        if (this.props.selectedKeys !== selectedKeys) {
            selected = MyUtils.arrayToObj(selectedKeys);
            let selectedNodes = [];
            MyUtils.traverseTree(treeData, (node, parent) => {
                node.parentNode = parent;
                if (selectedKeys.indexOf(node.key) !== -1) {
                    selectedNodes.push(node);
                    if (checkable && !checkStrictly) {
                        MyUtils.parentSelect(parent, selected, [], []);
                    }
                }
            }, null);

            this.setState({
                selected: selected,
                selectedKeys: selectedKeys,
                selectedNodes: selectedNodes
            })
        }
        if (this.props.expandedKey !== expandedKeys) {
            expanded = MyUtils.arrayToObj(expandedKeys);    
            this.setState({
                expanded: expanded,
                expandedKeys: expandedKeys,
            })
        }
    }
    
    /**
     * 选择节点事件触发
     * @param {TreeNode} node 
     */
    onSelect(node) {
        let {selectedKeys, selected, expanded, selectedNodes} = this.state;
        const {onSelect, multiple, checkable, checkStrictly} = this.props;
        let isSelected = selected[node.key];
        selected[node.key] = !isSelected;
        // 父子节点关联关系
        let selectNode = (node, isSelect) => {
            if (!!!node || !!!node.children || node.children.length === 0) {
                return;
            }

            if (!expanded[node.key]) {
                return;
            }

            let childNum = 0;
            let childSelectAllNum = 0;
            // 过滤掉禁用节点
            let children = node.children.filter(item => !!!item.disabled);
            // 计算子节点选中数量
            let childrenKeys = children.map(item => {
                if (selected[item.key] === true) {
                    childNum++;
                    childSelectAllNum++;
                }
                if (selected[item.key] === null) {
                    childNum++;
                }
                return item.key;
            });
            children.map(item => {
                selected[item.key] = isSelect;

                // 如果子节点有子节点并处于展开状态，则递归选中
                if (expanded[item.key]) {
                    selectNode(item, isSelect);
                } 
            });
            if (childSelectAllNum === children.length && !isSelect) {  // 当全部选中时且选择的根节点为选中状态
                selectedKeys = selectedKeys.filter(key => -1 === childrenKeys.indexOf(key));
                selectedNodes = selectedNodes.filter(item => -1 === childrenKeys.indexOf(item.key));
            } else if (childNum === 0) {  // 当全没选中时

                selectedKeys = selectedKeys.concat(childrenKeys);
                selectedNodes = selectedNodes.concat(children);
            } else {  // 当部分选中时

                childrenKeys.map(item => {
                    if (selectedKeys.indexOf(item) === -1) {
                        selectedKeys.push(item);
                    }
                });
                children.map(item => {
                    if (selectedKeys.indexOf(item) === -1) {
                        selectedNodes.push(item);
                    }
                });
            }
        }
        
        // 多选父子节点不建立关联关系
        let multipleSelect = () => {
            if (isSelected) {
                selectedKeys = selectedKeys.filter(key => key !== node.key);
                selectedNodes = selectedNodes.filter(item => item.key !== node.key);
            } else {
                selectedKeys.push(node.key);
                selectedNodes.push(node);
            }
        }
        // 单选
        let singleSelect = () => {
            selectedKeys = [node.key];
            selected = {};
            selected[node.key] = true;
            selectedNodes = [node];
        }
        /**
         * 1. 如果定义checkable则建立父子节点关联关系
         * 2. 如果定义checkStrictly则取消父子节点关联关系
         * 3. 如果定义multiple则多选
         */ 

        if (checkable) {
            if (checkStrictly) {
                if (multiple) {
                    multipleSelect();
                } else {
                    singleSelect();
                }
            } else {
                // 先递归处理子节点
                selectNode(node, !isSelected);

                // 然后回溯到根节点
                MyUtils.parentSelect(node.parentNode, selected, selectedKeys, selectedNodes);
                // 最后处理当前节点
                if (!isSelected) {
                    selectedKeys.push(node.key);
                    selectedNodes.push(node);
                } else {
                    selectedKeys = selectedKeys.filter(key => key !== node.key);
                    selectedNodes = selectedNodes.filter(item => item.key !== node.key);
                }
            }
        } else {
            if (multiple) {
                multipleSelect();
            } else {
                singleSelect();
            }
        }

        this.setState({
            selectedKeys: selectedKeys,
            selected: selected,
            selectedNodes: selectedNodes
        })
        
        onSelect && onSelect(selectedKeys, {
            selected: !isSelected, 
            selectedNodes: selectedNodes, 
            node: node
        }); 
    }
    
    /**
     * 点击展开或收起图标时触发
     * @param {TreeNode} node 
     */
    onExpand(node) {
        const {checkable, checkStrictly} = this.props;
        let {expandedKeys, expanded, selected, selectedKeys, selectedNodes} = this.state;
        const {key, children} = node;
        const {onExpand} = this.props;
        let isExpanded = expanded[key];
        expanded[key] = !isExpanded;
        
        if (isExpanded) {
            expandedKeys = expandedKeys.filter(expandedKey => expandedKey !== key);
        } else {
            expandedKeys.push(key);
        }

        if (selected[key] === true && checkable && !checkStrictly) {
            // 过滤掉禁用节点
            let children = node.children.filter(item => !!!item.disabled);
            children.map(item => {
                if (isExpanded) {
                    selected[item.key] = false;
                    selectedKeys = selectedKeys.filter(selectedKey => selectedKey !== item.key);
                    selectedNodes = selectedNodes.filter(selectedNode => selectedNode.key !== item.key);
                } else {
                    selected[item.key] = true;
                    selectedKeys.push(item.key);
                    selectedNodes.push(item);
                }
            });
        }
        
        this.setState({
            expandedKeys: expandedKeys,
            expanded: expanded,
            selectedKeys: selectedKeys,
            selected: selected,
            selectedNodes: selectedNodes
        })
        onExpand && onExpand(expandedKeys, {
            expanded: !isExpanded, 
            node: node
        }); 
    }
    
    /**
     * 渲染树节点图标和文字
     * @param {TreeNode} node 
     */
    renderItem(node) {
        const {checkable, checkStrictly,nodeStyle} = this.props;
        let {expanded, selected} = this.state;
        let {expandedKeys, selectedKeys, showLine, iconSize, expandIconSize} = this.props;
        const {key, children, icon, label, disabled} = node;

        iconSize = iconSize || 15;
        expandIconSize = expandIconSize || 11;
        let expandIconColor = '#333'
        const hasChildren = children && children.length > 0;
        let expandIcon = expanded[key] ? 'caret-down' : 'caret-right';
        
        if (showLine) {
            expandIconColor = '#888'
            expandIcon = expanded[key] ? 'minus-square-o' : 'plus-square-o';
        }

        let selectIcon = selected[key] ? 'check-square' : 'square-o';
        
        // 父子节点有关联，如果传入父节点key，则子节点自动选中, 反之亦然

        if (checkable && !checkStrictly) {
            if (selected[key] === false || selected[key] === undefined) {
                selectIcon = 'square-o';     // 子节点全不选
            } else if (selected[key] === true) {
                selectIcon = 'check-square'  // 子节点全选
            } else {
                selectIcon = 'minus-square'  // 子节点部分选中
            }
        }
        let selectColor = '#108EE9';
        let textStyle = {};
        if (disabled) {
            selectColor = '#D0D0D0';
            textStyle.color = '#D0D0D0';
        }
        
        textStyle.marginLeft = 2;
        if (selected[key]) {
            textStyle.backgroundColor = '#D2EAFB'
        }

        let textNode;
        if (typeof label === 'string') {
            textNode = <Text style={[textStyle, nodeStyle]}>{label} </Text>
        } else {
            textNode = <View>{label}</View>
        }
        let styles = this.props.styles || defaultStyles;
        return (
            <View style={styles.item}>
                {hasChildren && 
                <Icon 
                    onPress={this.onExpand.bind(this, node)} 
                    style={[styles.icon, {color: expandIconColor}]} 
                    size={expandIconSize} 
                    name={expandIcon} 
                />}
                {checkable && 
                <Icon 
                    onPress={disabled ? ()=>{} : this.onSelect.bind(this, node)} 
                    style={[styles.icon, {color: selectColor}]} 
                    size={iconSize} 
                    name={selectIcon} 
                />}
                {icon && 
                <Icon 
                    style={styles.icon} 
                    size={iconSize} 
                    name={icon} 
                />}
                <TouchableOpacity
                    onPress={this.onSelect.bind(this, node)}
                >
                    {textNode}
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * 渲染树节点
     * 单个根节点使用此入口
     * 和renderTree递归
     * @param {TreeNode} node 
     * @param {TreeNode} parentNode 父节点
     */
    renderNode(node, parentNode) {
        let styles = this.props.styles || defaultStyles;
        const {expanded} = this.state
        const {renderItem, showLine} = this.props
        const hasChildren = node.children && node.children.length > 0
        let childrenStyle = styles.children;
        if (showLine) {
            childrenStyle = styles.leftLine;
        }
        node.parentNode = parentNode;
        return (
            <View key={node.key} style={styles.node} >
                {this.renderItem(node)}
                {hasChildren && 
                <View style={childrenStyle}>
                    {expanded[node.key] && this.renderTree(node.children, node)}
                </View>
                }
            </View>
        )
    }

    /**
     * 渲染树节点
     * 多个根节点使用此入口
     * 和renderNode递归
     * @param {Array<TreeNode>} data 
     * @param {TreeNode} parentNode 父节点
     */
    renderTree(data, parentNode) {
        let nodes = [];
        for (let i = 0; i < data.length; i++) {
            nodes.push(this.renderNode(data[i], parentNode))
        }
        return nodes
    }

    render() {
        let styles = this.props.styles || defaultStyles;
        return <ScrollView style={this.props.treeStyle || styles.tree}>
            {this.renderTree(this.props.treeData || [], null)}
        </ScrollView>
    }
}
const iconWidth = 20;
const lineMarginLeft = 4;
const defaultStyles = {
    tree: {
        padding: 10,
        height: ScreenHeight - 90,
    },
    node: {
        paddingTop: 10
    },
    item: {
        flexDirection: 'row',
    },
    children: {
        paddingLeft: iconWidth,
    },
    icon: {
        width: iconWidth,
        alignSelf: 'center'
    },
    leftLine: {
        marginLeft: lineMarginLeft,
        paddingLeft: iconWidth - lineMarginLeft - 1,
        borderLeftWidth: 1,
        borderLeftColor: '#d9d9d9',
        borderStyle: 'solid',
    }
}
Tree.propTypes = {
	treeData: PropTypes.array.isRequired,
};
export default Tree
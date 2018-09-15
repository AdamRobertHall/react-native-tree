const Modal = require('rc-dialog/lib/Modal')
import Icon from 'react-native-vector-icons/FontAwesome';
import Tree from './Tree'
import React, { Component } from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
import MyUtils from './MyUtils'
export default class TreeSelect extends Component {
    constructor() {
        super();
        this.state = {
            valueText: "",
            visible: false,
            info: {},
            valueInfo: {},
            selectedKeys: [],
            expandedKeys: [],
            value: [],
        }
    }
    componentWillMount() {
        this.setState({selectedKeys: this.props.value || this.props.defaultValue || []});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({selectedKeys: nextProps.value});
        } 
    }
    onDismiss() {
        let nodes = this.state.valueInfo.selectedNodes || [];
        let str = this.nodes2Str(nodes);
        this.setState({valueText: str, visible: false, selectedKeys: this.state.value, info: this.state.valueInfo});
        this.props.onDismiss && this.props.onDismiss();
    }

    nodes2Str(nodes) {
        let str = "";
        for (let i in nodes || []) {
            let node = nodes[i];
            if (i < nodes.length - 1) {
                str += node.label + ", ";
            } else {
                str += node.label;
            }
        }
        return str;
    }
    
    onOk() {
        let nodes = this.state.info.selectedNodes || [];
        let str = this.nodes2Str(nodes);
        this.setState({
            valueText: str, 
            visible: false, 
            value: this.state.selectedKeys.map(item=>item), 
            valueInfo: MyUtils.assign(this.state.info)
        })
        this.props.onChange && this.props.onChange(this.state.selectedKeys, this.state.info);
    }
    onChange(selectedKeys, info) {
        this.setState({info: info, selectedKeys: selectedKeys});
    }
    render() {
        const dismissText = this.props.dismissText || '取消';
        const okText = this.props.okText || '确定'
        let styles = this.props.styles || defaultStyles;
        let containerStyle = styles.container;
        let valueStyle = styles.value;
        let valueWapperStyle = styles.valueWapper;
        let iconStyle = styles.icon;
        const {checkable, checkStrictly, multiple, treeStyle, treeStyles, nodeStyle, showLine, iconSize, expandIconSize} = this.props;
        return (
            <View style={containerStyle}>
                <View style={valueWapperStyle}>
                    <View style={valueStyle}>
                        {this.props.renderValueText ? this.props.renderValueText(this.state.info.selectedNodes || []) :
                        <Text>
                            {this.state.valueText}
                        </Text>
                        }
                    </View>
                    <View style={iconStyle}>
                        <Icon
                            onPress={()=>{
                                this.setState({visible: true, selectedKeys: this.state.value.map(item=>item), info: MyUtils.assign(this.state.valueInfo)})
                            }}
                            name='angle-right'
                            size={this.props.rightIconSize || 30}
                        />
                    </View>
                </View>
                <Modal
                    animationType='slide-up'
                    wrapStyle={styles.modal}
                    visible={this.state.visible}
                    onClose={this.onDismiss.bind(this)}
                >
                    <View style={styles.header}>
                        <TouchableHighlight
                            onPress={this.onDismiss.bind(this)}
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{dismissText}</Text>
                        </TouchableHighlight>
                        <View
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                        <TouchableHighlight
                            onPress={this.onOk.bind(this)}
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{okText}</Text>
                        </TouchableHighlight>
                    </View>
                    <Tree
                        treeData={this.props.treeData}
                        checkable={checkable}
                        checkStrictly={checkStrictly}
                        showLine={showLine}
                        iconSize={iconSize}
                        expandIconSize={expandIconSize}
                        multiple={multiple}
                        treeStyle={treeStyle}
                        onSelect={this.onChange.bind(this)}
                        expandedKeys={this.state.expandedKeys}
                        selectedKeys={this.state.selectedKeys}
                        onExpand={expandedKeys=>this.setState({expandedKeys:expandedKeys})}
                        nodeStyle={nodeStyle}
                        styles={treeStyles}
                    />
                </Modal>
            </View>
        )
    }
}

const defaultStyles = {
    container: {
        flex: 1
    },
    value: {
        flex: 1, 
        borderColor: 'black', 
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: 4,
    },
    icon: {
        paddingLeft: 8,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 2,
    },
    valueWapper: {
        flexDirection: 'row',
    },
    modal: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'
    },
    headerItem: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        color: '#0ae',
        fontSize: 18,
        textAlign: 'center'
    }
}
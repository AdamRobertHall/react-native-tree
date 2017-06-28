//import {TreeSelect} from 'react-native-tree';
import TreeSelect from './TreeSelect'
const {treeData} = require('./treeData');
export default class TestTreeSelect extends React.Component {
    render () {
        return <View style={{flex:1, marginTop: 80}}>
            <View style={styles.container}>
                <View style={{height: 80}}>
                    <Text style={{fontSize: 16}}>将Tree选择的节点显示出来，支持多选</Text>
                </View>
                <View style={styles.other}>
                    <View style={styles.wapperTree}>
                        <View style={styles.treeSelect}>
                            <TreeSelect 
                                styles={defautStyles} 
                                treeData={treeData} 
                                checkable 
                                multiple
                                renderValueText={(nodes) => {
                                    let str = "";
                                    for (let i in nodes) {
                                        let node = nodes[i];
                                        if (i < nodes.length - 1) {
                                            str += node.label + "/";
                                        } else {
                                            str += node.label;
                                        }
                                    }
                                    return <Text style={{color: '#0ae'}}>{str}</Text>
                                }}
                            />
                        </View>
                        <View style={styles.text}>
                            <Text style={{fontSize: 20, color: 'red'}}>点向右箭头</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.other}>
                    <Text style={{fontSize: 16}}>其他组件</Text>
                </View>
            </View>
        </View>
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    other: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    wapperTree: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
  
    },
    treeSelect: {
        flex: 1,
        flexDirection: 'row',
        margin: 8,
    },
    text: {
        marginRight: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    }
}

const defautStyles = {
    container: {
        flex: 1, 
        height: 10,
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
import {Tree} from 'react-native-tree';
export default class TestTree extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedKeys: [],
            expandedKeys: [],
        }
    }
    render() {
        let menu = <View style={{backgroundColor: '#F5F5F9'}}>
            <Tree
                showLine
                defaultExpandAll
                defaultSelectedKeys = {this.state.selectedKeys}
                defaultExpandedKeys = {this.state.expandedKeys}
                onSelect={value => this.setState({selectedKeys: value}) }
                onExpand={value => this.setState({expandedKeys: value}) }
                treeData={treeData}
            />
        </View>
        return (<View style={{flex: 1, marginTop: 50}}>                   
            <SideMenu
                menu={this.state.isOpen && menu}
                isOpen={this.state.isOpen}
                openMenuOffset={ScreenWidth / 5 * 4}
                onChange={(isOpen) => {this.setState({isOpen: isOpen})}}
            >
                <View style={styles.flexRow}>
                    <View style={styles.content}>
                        <Icon
                            onPress={() => {this.setState({isOpen:!this.state.isOpen})}}
                            name="navicon" 
                            size={22}  
                        />
                    </View>  
                    <View style={{width: ScreenWidth - 40}}>                  
                        <Text style={{fontSize: 18}}>点击菜单图标</Text>                    
                    </View>  
                </View>        
            </SideMenu> 
        </View>)
    }
}

const styles = {
    content: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        marginTop: 10,
        flexDirection: 'row'
    },
}

const treeData = [
    {
        key: 'food',
        label: '食品',
        children: [
            {
                key: 'mainfood',
                label: '主食',
                children: [
                    {
                        key: 'noodle',
                        label: '面',
                    },
                    {
                        key: 'rice',
                        label: '米饭',
                    },
                    {
                        key: 'chaocai',
                        label: '炒菜',
                        children: [
                            {
                                key: 'chuan',
                                label: '川菜',
                            },
                            {
                                key: 'xiang',
                                label: '湘菜',
                            },
                            {
                                key: 'yue',
                                label: '粤菜',
                            }
                        ]
                    }
                ]
            }, 
            {
                key: 'fruit',
                label: '水果',
                children: [
                    {
                        key: 'apple',
                        label: '苹果',
                    },
                    {
                        key: 'xigua',
                        label: '西瓜',
                    },
                    {
                        key: 'putao',
                        label: '葡萄',
                        children: [
                            {
                                key: 'hutai',
                                label: '沪太8号',
                            },
                            {
                                disabled: true,
                                key: 'hutai9',
                                label: '沪太9号',
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
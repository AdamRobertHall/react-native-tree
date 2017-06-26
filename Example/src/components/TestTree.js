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
            <ScrollView style={styles.tree}>
                <Tree
                    showLine
                    defaultExpandRoot
                    defaultSelectedKeys = {this.state.selectedKeys}
                    defaultExpandedKeys = {this.state.expandedKeys}
                    onSelect={value = this.setState({selectedKeys: value}) }
                    onExpand={value = this.setState({expandedKeys: value}) }
                    treeData={[]}
                />
             </ScrollView>
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
                    <TouchableOpacity onPress={() => {this.setState({isOpen:!this.state.isOpen})}}
                    >
                        <Icon name="navicon" size={22}  />
                    </TouchableOpacity>
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
    tree: {
        padding: 10,
        height: ScreenHeight - 90,
    },
    content: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFEFF4'
    }
}
import {Tree} from 'react-native-tree';
const {treeData} = require('./treeData');
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


import TestTree from './components/TestTree'
import TestTreeSelect from './components/TestTreeSelect'

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'black' :'white'}}>{this.props.title}</Text>
        );
    }
}
export default class ExampleRouter extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router hideNavBar={false}>
                <Scene key="Tabbar"
                    tabs={true}
                    initial={true}
                    tabBarStyle={{ backgroundColor: '#11ADF0' }}
                    tabBarSelectedItemStyle={{ backgroundColor: '#01A7F1' }}
                    default="tree"
                >
                    <Scene
                        key="tree"
                        title="Tree"
                        component={TestTree}
                        icon={TabIcon}
                        iconName="Tree"
                    />
                    <Scene
                        key="tree_select"
                        title="TreeSelect"
                        icon={TabIcon}
                        iconName="TreeSelect"
                        component={TestTreeSelect}
                    />
                </Scene> 
            </Router>
        )
    }
}
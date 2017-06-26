import TestTree from './components/TestTree'
import TestTreeSelect from './components/TestTreeSelect'
class ExampleRouter extends Component {
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
                        hideNavBar
                        component={TestTree}
                    />
                    <Scene
                        key="tree_select"
                        hideNavBar
                        component={testTreeSelect}
                    />
                </Scene>

                
            </Router>
        )
    }
}

export default ExampleRouter;
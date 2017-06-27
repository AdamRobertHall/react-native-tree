import TreeSelect from './TreeSelect';
const {treeData} = require('./treeData');
export default class TestTreeSelect extends React.Component {
    render () {
        return <View style={{flex:1, marginTop: 80}}>
            <TreeSelect treeData={treeData} checkable multiple/>
        </View>
    }
}
---
category: Components
type: Data Display
title: Tree
subtitle: 树形控件
---

## 何时使用

组织架构、分类、国家地区等等，都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|treeData | 创建树的数据 | TreeNode[] | [] |
|multiple | 支持点选多个节点（节点本身） | boolean | false |
|checkable | 节点前添加 Checkbox 复选框 | boolean | false |
|checkStrictly | 父子节点选中状态不再关联 | boolean | false | 
|defaultExpandAll | 默认展开所有树节点 | boolean | false |
|defaultExpandRoot | 默认树根节点 | boolean | false |
|defaultExpandedKeys | 默认展开指定的树节点 | string[] | [] |
|expandedKeys | （受控）展开指定的树节点 | string[] | [] |
|defaultSelectedKeys | 默认选中的树节点 | string[] | [] |
|selectedKeys | （受控）选中的树节点（注意：checkable为true时，父子节点有关联，如果传入父节点key，则子节点自动选中 | string[] | [] |
|onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | - |
|onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node}) | - |
|showLine | 是否展示连接线 | boolean | false | 
|expandIconSize | 展开收起图标大小 | number | 11 | 
|iconSize | 复选框和文本前自定义图标大小 | number | 15 | 
|treeStyle | 组件最外层由ScrollView包裹，请传入该组件的style | StyleSheet | { padding: 10,height: ScreenHeight - 90} | 

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|disabled | 禁止选中 | boolean | false |
|label | 标题 | string\|ReactNode | '---' |
|key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | string | 内部计算出的节点位置 |
|icon | 文本前自定义图标 | string | null |
|children | 树节点的子节点 | TreeNode[] | null |

## 注意

树节点可以有很多，但在设置`checkable`时，将会花费更多的计算时间，因此我们缓存了一些计算结果（`this.treeNodesStates`）来复用，避免多次重复计算，以此提高性能。但这也带来了一些限制，当你异步加载树节点时，你需要这样渲染树：

## 使用
```jsx
<Tree treeData={[]}/>
```

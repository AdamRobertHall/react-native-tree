---
category: Components
type: Data Display
title: TreeSelect
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
|onChange | 点击确定触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node}) | - |
|showLine | 是否展示连接线 | boolean | false | 
|expandIconSize | 展开收起图标大小 | number | 11 | 
|iconSize | 复选框和文本前自定义图标大小 | number | 15 | 
|treeStyle | 组件最外层由ScrollView包裹，请传入该组件的style | StyleSheet | { padding: 10,height: ScreenHeight - 90} | 
|iconSize | 复选框和文本前自定义图标大小 | number | 15 | 
|dismissText | 取消 | string | 取消 | 
|okText | 确定 | string | 确定 | 
|title | 确定取消中间的标题 | string | null | 
|inputIconSize | input右边的图表大小 | number | 25 | 
|inputStyles | 输入框的Style | StyleSheet | null | 

## 使用
```jsx
<Tree treeData={[]}/>
```

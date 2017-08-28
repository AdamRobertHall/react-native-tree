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
|checkStrictly | 父子节点选中状态不再关联 | boolean | false | 
|defaultValue | 默认选中值 | string[] | [] |
|value | (受控)选中值 | string[] | [] |
|onChange | 点击确定触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node}) | - |
|showLine | 是否展示连接线 | boolean | false | 
|expandIconSize | 展开收起图标大小 | number | 11 | 
|iconSize | 复选框和文本前自定义图标大小 | number | 15 | 
|dismissText | 取消 | string | 取消 | 
|okText | 确定 | string | 确定 | 
|title | 确定取消中间的标题 | string | null | 
|rightIconSize | 向右的图标大小 | number | 25 | 
|styles | 自定义组件的界面样式 | {key:StyleSheet} | defaultStyles | 

## 使用
```jsx
<TreeSelect treeData={[]}/>
```

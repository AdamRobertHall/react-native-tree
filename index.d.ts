// typings for react-native-router-flux@3.26.16
// created by bang88 (https://github.com/bang88)

import * as React from 'react';
import * as ReactNative from 'react-native';


declare namespace RNTREE {
  export interface TreeNode {
    key?: string,
    label?: string | React.ReactNode,
    children: Array<TreeNode>,
    icon?: string,
    disabled?: boolean
  }
  export interface ExpandInfo {
    expanded?: boolean, 
    node?: TreeNode
  }
  export interface SelectInfo {
    selected?: boolean, 
    node?: TreeNode
  }
  export interface TreeProps {
    treeData?: Array<TreeNode>,
    multiple?: boolean,
    checkable?: boolean,
    defaultExpandAll?: boolean,
    defaultExpandRoot?: boolean,
    defaultExpandedKeys?: Array<string>,
    expandedKeys?: Array<string>,
    defaultSelectedKeys?: Array<string>,
    selectedKeys?: Array<string>,
    checkStrictly?: boolean,
    onExpand?: (expandedKeys?: Array<string>, info?: ExpandInfo) => {}
    onSelect?: (selectedKeys?: Array<string>, info?: SelectInfo) => {}
    showLine?: boolean,
    expandIconSize?: number,
    iconSize?: number
  }

  /**
   * Tree
   */
  export class Tree extends React.Component<TreeProps, {}> {

  }

}

export = RNTREE;

import React, { PropTypes, Component } from 'react'
import { Router, Scene, TabBar, Actions } from 'react-native-router-flux'
import {
  AppRegistry, Text, View, ScrollView, TouchableHighlight, TouchableOpacity
} from 'react-native'

const SideMenu = require('react-native-side-menu');
import Icon from 'react-native-vector-icons/FontAwesome';

global.Icon = Icon;
global.SideMenu = SideMenu;
global.React = React;
global.PropTypes = PropTypes;
global.Component = Component;
global.Router = Router;
global.Scene = Scene;
global.TabBar = TabBar;
global.Actions = Actions;
global.AppRegistry = AppRegistry;
global.Text = Text;
global.View = View;
global.ScrollView = ScrollView;
global.TouchableHighlight = TouchableHighlight;
global.TouchableOpacity = TouchableOpacity;
let Dimensions = require('Dimensions');
global.ScreenWidth = Dimensions.get('window').width;
global.ScreenHeight = Dimensions.get('window').height;
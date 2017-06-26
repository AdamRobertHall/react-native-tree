// 导入全局变量
import './globals' 
// 路由
import Router from './router';

export default function TreeExample(platform) {
    // 将平台设为全局变量
    global.PLATFORM = platform;
    AppRegistry.registerComponent('TreeExample', () => Router);
}
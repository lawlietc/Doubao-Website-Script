# 豆包功能加强脚本 (Doubao Website Script)

## 项目介绍

这是一个为豆包网页版开发的功能加强脚本，旨在提升用户体验，提供更便捷的操作方式和更舒适的界面环境。

## 功能特性

### 1. 快捷键定位输入框
- 按下 `Alt+1` 快速定位到豆包输入框，方便快速开始输入

### 2. 自动深色模式
- 脚本会自动检测系统主题设置，并相应地切换豆包网页的主题
- 可通过油猴菜单命令开启/关闭此功能

### 3. 侧边栏显示/隐藏切换
- 点击侧边栏顶部的关闭按钮可以隐藏整个侧边栏和左侧导航区域
- 再次点击关闭按钮位置可以显示侧边栏和左侧导航区域
- 侧边栏的显示/隐藏状态会被保存，刷新页面后会保持上一次的状态
- 隐藏侧边栏后，鼠标经过不会自动显示侧边栏

### 4. 推荐内容隐藏
- 自动隐藏页面上的推荐内容区域（包括加载动画）
- 可通过油猴菜单命令开启/关闭此功能

## 安装方法

1. 安装油猴浏览器扩展（Tampermonkey）
2. 点击脚本文件 `Doubao-Website-Script.user.js`，然后点击「安装」按钮
3. 刷新豆包网页，脚本即可生效

## 使用说明

### 快捷键
- `Alt+1`: 快速定位到豆包输入框

### 菜单命令
- 油猴菜单中有「启用深色模式」和「禁用深色模式」选项，可用于控制自动深色模式功能
- 油猴菜单中有「显示推荐内容」和「隐藏推荐内容」选项，可用于控制推荐内容隐藏功能

### 侧边栏控制
- 点击侧边栏顶部的关闭按钮可以隐藏/显示侧边栏
- 隐藏后，鼠标经过侧边栏区域不会自动显示

## 技术实现

- 使用 Tampermonkey 油猴扩展平台开发
- 通过 CSS 注入和 JavaScript 事件监听实现功能
- 利用 MutationObserver 监控 DOM 变化，确保功能在页面更新后仍然有效

## 版本历史

- v2.0: 新增推荐内容隐藏功能，包括加载动画区域
- v1.9: 修复侧边栏鼠标悬停问题，优化CSS规则和JavaScript逻辑
- v1.8: 初始版本，包含快捷键、自动深色模式和侧边栏控制功能

## 注意事项

- 脚本使用了属性选择器和部分匹配来避免网页更新后随机字符导致的功能失效
- 如果遇到功能异常，请尝试刷新页面或检查脚本是否为最新版本
- 脚本仅在豆包网页版生效

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个脚本！

## 许可证

MIT License

---

# Doubao Website Script

## Project Introduction

This is an enhancement script for the Doubao web version, designed to improve user experience, provide more convenient operation methods and a more comfortable interface environment.

## Features

### 1. Keyboard Shortcut for Input Focus
- Press `Alt+1` to quickly focus on Doubao input box for fast input

### 2. Auto Dark Mode
- The script automatically detects system theme settings and switches Doubao's theme accordingly
- Can be enabled/disabled via Tampermonkey menu command

### 3. Sidebar Show/Hide Toggle
- Click the close button at the top of the sidebar to hide the entire sidebar and left navigation area
- Click the close button position again to show the sidebar and left navigation area
- The sidebar's show/hide state is saved, and will remain the same after page refresh
- When the sidebar is hidden, it won't automatically show when mouse passes by

### 4. Recommendations Hide
- Automatically hides recommendation content areas (including loading animations)
- Can be enabled/disabled via Tampermonkey menu command

## Installation

1. Install Tampermonkey browser extension
2. Click on the script file `Doubao-Website-Script.user.js` and then click the "Install" button
3. Refresh the Doubao webpage for the script to take effect

## Usage

### Keyboard Shortcuts
- `Alt+1`: Quickly focus on Doubao input box

### Menu Commands
- There are "Enable Dark Mode" and "Disable Dark Mode" options in the Tampermonkey menu to control the auto dark mode feature
- There are "Show Recommendations" and "Hide Recommendations" options in the Tampermonkey menu to control the recommendations hide feature

### Sidebar Control
- Click the close button at the top of the sidebar to hide/show the sidebar
- When hidden, the sidebar won't automatically show when mouse passes by

## Technical Implementation

- Developed using Tampermonkey extension platform
- Implemented through CSS injection and JavaScript event listening
- Using MutationObserver to monitor DOM changes, ensuring functionality remains effective after page updates

## Version History

- v2.0: Added recommendations hide feature, including loading animation area
- v1.9: Fixed sidebar mouse hover issue, optimized CSS rules and JavaScript logic
- v1.8: Initial version, including keyboard shortcuts, auto dark mode and sidebar control features

## Notes

- The script uses attribute selectors and partial matching to avoid functionality failure caused by random characters after webpage updates
- If you encounter functionality issues, please try refreshing the page or checking if the script is the latest version
- The script only works on Doubao web version

## Contribution

Welcome to submit Issues and Pull Requests to improve this script!

## License

MIT License

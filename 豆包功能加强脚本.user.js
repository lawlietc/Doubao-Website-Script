// ==UserScript==
// @name         豆包功能加强脚本
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  为豆包网页添加快捷键定位输入框、自动深色模式和侧边栏显示/隐藏切换功能
// @author       AI Assistant & alikia2x
// @match        https://*.doubao.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @license MIT
// ==/UserScript==

/*
 * 使用说明：
 *
 * 1. 快捷键功能：
 *    - 按下 Alt+1 快速定位到豆包输入框
 *
 * 2. 自动深色模式：
 *    - 脚本会自动检测系统主题设置，并相应地切换豆包网页的主题
 *    - 可通过油猴菜单命令开启/关闭此功能
 *
 * 3. 侧边栏显示/隐藏切换：
 *    - 点击侧边栏顶部的关闭按钮可以隐藏整个侧边栏和左侧导航区域
 *    - 再次点击关闭按钮位置可以显示侧边栏和左侧导航区域
 *    - 侧边栏的显示/隐藏状态会被保存，刷新页面后会保持上一次的状态
 *
 * 注意事项：
 * - 脚本使用了属性选择器和部分匹配来避免网页更新后随机字符导致的功能失效
 * - 如果遇到功能异常，请尝试刷新页面或检查脚本是否为最新版本
 */

(function() {
    'use strict';

    // 获取深色模式开关状态，默认为启用
    let darkModeEnabled = GM_getValue('darkModeEnabled', true);



    // 功能2: 自动深色模式
    function initAutoDarkMode() {
        let darkModeInterval;

        function detectColorScheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }

        function setDataTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }

        function startDarkMode() {
            // 初始设置主题
            setDataTheme(detectColorScheme());

            // 定期检查系统主题变化
            darkModeInterval = setInterval(() => setDataTheme(detectColorScheme()), 16);

            // 监听系统主题变化
            if (window.matchMedia) {
                const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                if (colorSchemeQuery.addEventListener) {
                    colorSchemeQuery.addEventListener('change', (e) => {
                        setDataTheme(e.matches ? 'dark' : 'light');
                    });
                } else if (colorSchemeQuery.addListener) {
                    // 兼容旧版浏览器
                    colorSchemeQuery.addListener((e) => {
                        setDataTheme(e.matches ? 'dark' : 'light');
                    });
                }
            }
        }

        function stopDarkMode() {
            // 清除定时器
            if (darkModeInterval) {
                clearInterval(darkModeInterval);
            }

            // 恢复浅色模式
            setDataTheme('light');
        }

        // 根据开关状态启动或停止深色模式
        if (darkModeEnabled) {
            startDarkMode();
        } else {
            stopDarkMode();
        }

        // 返回控制函数，以便菜单命令可以调用
        return {
            start: startDarkMode,
            stop: stopDarkMode
        };
    }

    // 功能1: 快捷键定位输入框
    function initInputFocusShortcut() {
        // 添加键盘事件监听
        document.addEventListener('keydown', function(event) {
            // 检查是否按下了 Alt+1 组合键
            if (event.altKey && event.key === '1') {
                event.preventDefault(); // 阻止默认行为

                // 定位输入框 - 使用 data-testid="chat_input_input" 属性
                const inputElement = document.querySelector('textarea[data-testid="chat_input_input"]');

                if (inputElement) {
                    // 聚焦到输入框
                    inputElement.focus();

                    // 可选：添加一个视觉反馈，如短暂高亮
                    inputElement.style.transition = 'box-shadow 0.3s';
                    inputElement.style.boxShadow = '0 0 5px rgba(66, 153, 225, 0.5)';

                    // 0.5秒后移除高亮效果
                    setTimeout(() => {
                        inputElement.style.boxShadow = '';
                    }, 500);
                } else {
                    console.log('未找到豆包输入框');
                }
            }
        });
    }



    // 功能3: 侧边栏显示/隐藏切换
    function initSidebarToggle() {
        console.log('豆包侧边栏 - 彻底修复版脚本已加载');

        const styleId = 'doubao-sidebar-ultimate-fix';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                /* 只在隐藏状态下禁用悬停 */
                .left-side-U7A0kz:not(.left-side__expand-OIQFEm):hover,
                .left-side-U7A0kz:not(.left-side__expand-OIQFEm):hover * {
                    pointer-events: none !important;
                }
                /* 隐藏状态下彻底隐藏侧边栏 */
                .left-side-U7A0kz:not(.left-side__expand-OIQFEm) #flow_chat_sidebar {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                /* 禁用侧边栏的hover效果 */
                #flow_chat_sidebar.-translate-x-full:hover {
                    transform: translateX(-100%) !important;
                    opacity: 0 !important;
                }
            `;
            document.head.appendChild(style);
            console.log('CSS 规则已注入');
        }

        function initSidebar() {
            const SIDEBAR_ELEMENT = document.querySelector('#flow_chat_sidebar');
            const TOGGLE_BUTTON = document.querySelector('[data-testid="siderbar_closed_status_btn"]');
            const LEFT_SIDE_CONTAINER = document.querySelector('.left-side-U7A0kz');
            
            if (!SIDEBAR_ELEMENT) {
                console.log('侧边栏元素未找到，500ms后重试');
                setTimeout(initSidebar, 500);
                return;
            }

            let isHidden = false;
            let allowExpand = false;

            function hideSidebar() {
                if (!isHidden) {
                    isHidden = true;
                    if (LEFT_SIDE_CONTAINER) {
                        LEFT_SIDE_CONTAINER.classList.remove('left-side__expand-OIQFEm');
                    }
                    console.log('侧边栏已隐藏');
                }
            }

            function showSidebar() {
                if (isHidden) {
                    isHidden = false;
                    if (LEFT_SIDE_CONTAINER) {
                        LEFT_SIDE_CONTAINER.classList.add('left-side__expand-OIQFEm');
                    }
                    console.log('侧边栏已显示');
                }
            }

            if (TOGGLE_BUTTON) {
                TOGGLE_BUTTON.addEventListener('click', function(e) {
                    allowExpand = true;
                    setTimeout(function() { allowExpand = false; }, 500);
                    if (isHidden) {
                        showSidebar();
                    } else {
                        hideSidebar();
                    }
                }, true);
                console.log('切换按钮监听已设置');
            }

            if (LEFT_SIDE_CONTAINER) {
                LEFT_SIDE_CONTAINER.addEventListener('mouseenter', function(e) {
                    if (isHidden && !allowExpand) {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('阻止悬停展开');
                    }
                }, true);
                
                LEFT_SIDE_CONTAINER.addEventListener('mouseover', function(e) {
                    if (isHidden && !allowExpand) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }, true);
            }

            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        if (isHidden && !allowExpand) {
                            if (LEFT_SIDE_CONTAINER && LEFT_SIDE_CONTAINER.classList.contains('left-side__expand-OIQFEm')) {
                                setTimeout(function() {
                                    if (isHidden && !allowExpand) {
                                        hideSidebar();
                                    }
                                }, 10);
                            }
                        }
                    }
                });
            });

            observer.observe(LEFT_SIDE_CONTAINER || SIDEBAR_ELEMENT, {
                attributes: true,
                attributeFilter: ['class']
            });

            window.toggleSidebar = function() {
                allowExpand = true;
                setTimeout(function() { allowExpand = false; }, 500);
                if (isHidden) {
                    showSidebar();
                } else {
                    hideSidebar();
                }
            };

            window.collapseSidebar = hideSidebar;
            window.expandSidebar = showSidebar;

            console.log('脚本已就绪！');
        }

        initSidebar();

        return {
            toggle: function() {
                if (window.toggleSidebar) window.toggleSidebar();
            }
        };
    }

    // 注册菜单命令
    function registerMenuCommands() {
        // 深色模式开关菜单项
        GM_registerMenuCommand(
            darkModeEnabled ? "禁用深色模式" : "启用深色模式",
            function() {
                darkModeEnabled = !darkModeEnabled;
                GM_setValue('darkModeEnabled', darkModeEnabled);
                // 重新初始化深色模式
                initAutoDarkMode();
            }
        );


    }

    // 主初始化函数
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initInputFocusShortcut();
                initAutoDarkMode();
                initSidebarToggle();
                registerMenuCommands();
            });
        } else {
            // DOM已经加载完成，直接初始化
            initInputFocusShortcut();
            initAutoDarkMode();
            initSidebarToggle();
            registerMenuCommands();
        }
    }

    // 执行初始化
    init();
})();
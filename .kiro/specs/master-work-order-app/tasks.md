# Implementation Plan

- [x] 1. 项目初始化与基础配置




  - [ ] 1.1 配置 Vant Weapp 组件库
    - 安装 @vant/weapp 组件库
    - 在 app.json 中注册全局组件（van-button, van-field, van-tabs, van-cell, van-tag, van-steps, van-uploader, van-dialog, van-toast, van-empty, van-nav-bar）

    - 配置全局样式变量（主色调 #1989fa，背景色 #f7f8fa）
    - _Requirements: 7.1, 7.2_
  - [ ] 1.2 创建页面路由结构
    - 创建 pages/login、pages/workbench、pages/detail 三个页面目录

    - 在 app.json 中配置页面路由和 tabBar（如需要）
    - 配置页面导航栏样式
    - _Requirements: 1.1, 2.1, 3.1_
  - [ ] 1.3 创建全局样式文件
    - 在 app.wxss 中定义全局样式变量和通用样式类

    - 定义卡片样式（12px圆角、阴影）
    - 定义状态色变量（橙色、蓝色、绿色、红色）
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 2. 数据层与服务层实现
  - [x] 2.1 创建数据模型和常量定义

    - 在 utils/constants.js 中定义 OrderStatus 枚举和存储键常量
    - 定义状态到UI的映射配置（颜色、按钮文字）
    - _Requirements: 2.4, 2.5, 2.6, 2.7, 2.8_
  - [ ]* 2.2 编写属性测试：状态到UI映射一致性
    - **Property 5: 状态到 UI 映射一致性**
    - **Validates: Requirements 2.4, 2.5, 2.6, 2.7, 2.8, 7.3**
  - [x] 2.3 实现 StorageService 存储服务

    - 在 services/storageService.js 中实现 set、get、remove 方法
    - 封装 wx.setStorageSync 和 wx.getStorageSync
    - 实现 JSON 序列化和反序列化
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - [ ]* 2.4 编写属性测试：JSON 序列化 Round-Trip
    - **Property 13: 工单数据 JSON 序列化 Round-Trip**
    - **Validates: Requirements 8.3, 8.4**
  - [ ] 2.5 实现 OrderService 工单服务
    - 在 services/orderService.js 中实现工单 CRUD 操作
    - 实现 getOrdersByStatus 按状态过滤工单
    - 实现 getOrderById 获取工单详情
    - 实现 updateOrderStatus 更新工单状态（含状态流转验证）

    - 实现 submitCompletion 提交完工信息
    - _Requirements: 2.2, 4.2, 4.3, 4.4, 5.5_
  - [ ]* 2.6 编写属性测试：Tab 切换与工单过滤一致性
    - **Property 3: Tab 切换与工单过滤一致性**
    - **Validates: Requirements 2.2**
  - [ ]* 2.7 编写属性测试：状态流转合法性
    - **Property 8: 状态流转合法性**
    - **Validates: Requirements 4.2, 4.3, 4.4**
  - [x] 2.8 实现 AuthService 认证服务

    - 在 services/authService.js 中实现登录相关方法
    - 实现 validatePhone 手机号格式验证
    - 实现 sendVerificationCode 发送验证码（模拟）
    - 实现 login 登录验证
    - 实现 isLoggedIn 检查登录状态
    - _Requirements: 1.2, 1.4, 1.6_
  - [ ]* 2.9 编写属性测试：手机号格式验证
    - **Property 1: 手机号格式验证**

    - **Validates: Requirements 1.6**
  - [ ] 2.10 创建 Mock 数据
    - 在 data/mockOrders.js 中创建模拟工单数据
    - 包含各种状态的工单样本
    - _Requirements: 2.3, 3.3_


- [ ] 3. Checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. 登录页实现
  - [x] 4.1 实现登录页 UI 结构

    - 创建 pages/login/login.wxml 页面结构
    - 添加 Logo 和"师傅端"标题区域
    - 添加 van-field 手机号输入框（type="tel"）
    - 添加 van-field 验证码输入框和获取验证码按钮
    - 添加底部悬浮登录按钮（van-button block type="primary"）
    - _Requirements: 1.1_
  - [x] 4.2 实现登录页样式



    - 创建 pages/login/login.wxss 样式文件
    - 实现 Logo 居中和标题样式
    - 实现表单区域样式
    - 实现底部按钮悬浮样式

    - _Requirements: 7.1, 7.2_
  - [ ] 4.3 实现登录页逻辑
    - 创建 pages/login/login.js 页面逻辑
    - 实现手机号和验证码双向绑定
    - 实现获取验证码按钮点击和60秒倒计时

    - 实现登录按钮点击和表单验证
    - 实现登录成功后跳转至工作台
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6_
  - [ ]* 4.4 编写属性测试：倒计时状态一致性
    - **Property 2: 倒计时状态一致性**
    - **Validates: Requirements 1.2, 1.3**

- [x] 5. 工作台页面实现

  - [ ] 5.1 实现工作台 UI 结构
    - 创建 pages/workbench/workbench.wxml 页面结构
    - 添加 van-nav-bar 顶部导航栏
    - 添加 van-tabs 吸顶 Tab 栏（5个标签）
    - 添加工单列表容器和 van-empty 空状态组件

    - _Requirements: 2.1, 2.9_
  - [ ] 5.2 实现工单卡片组件
    - 创建工单卡片模板（可复用）
    - 显示工单号、客户地址（加粗）、预约时间
    - 显示 van-tag 状态标签（根据状态显示不同颜色）
    - 显示操作按钮（根据状态显示不同按钮）
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_
  - [ ]* 5.3 编写属性测试：工单卡片信息完整性
    - **Property 4: 工单卡片信息完整性**

    - **Validates: Requirements 2.3**
  - [ ] 5.4 实现工作台样式
    - 创建 pages/workbench/workbench.wxss 样式文件
    - 实现 Tab 栏吸顶样式
    - 实现工单卡片样式（圆角、阴影、间距）
    - 实现状态标签颜色样式
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ] 5.5 实现工作台逻辑
    - 创建 pages/workbench/workbench.js 页面逻辑
    - 实现 Tab 切换事件处理
    - 实现工单列表加载和状态过滤
    - 实现工单卡片点击跳转详情页

    - 实现操作按钮点击（接单、开始实施等）
    - 实现确认弹窗和 Toast 提示
    - _Requirements: 2.2, 4.1, 4.2, 4.3, 7.4_

- [ ] 6. 工单详情页实现
  - [ ] 6.1 实现详情页 UI 结构
    - 创建 pages/detail/detail.wxml 页面结构

    - 添加 van-nav-bar 顶部导航栏（带返回按钮）
    - 添加返工提示条（红色背景，条件显示）
    - 添加 van-steps 状态步骤条
    - 添加客户信息、安装要求、设备清单三个信息卡片

    - _Requirements: 3.2, 3.3, 3.4_
  - [ ]* 6.2 编写属性测试：工单详情信息分组完整性
    - **Property 6: 工单详情信息分组完整性**
    - **Validates: Requirements 3.3**
  - [x]* 6.3 编写属性测试：返工状态整改意见显示

    - **Property 7: 返工状态整改意见显示**
    - **Validates: Requirements 3.4, 6.1**
  - [ ] 6.4 实现实施汇报表单
    - 添加 van-field 安装备注输入框（type="textarea"）
    - 添加 van-uploader 照片上传组件（max-count=9）
    - 条件显示：仅在实施中状态显示
    - _Requirements: 5.1, 5.2_
  - [ ]* 6.5 编写属性测试：照片上传数量限制
    - **Property 10: 照片上传数量限制**
    - **Validates: Requirements 5.2**
  - [ ] 6.6 实现底部操作栏
    - 添加固定底部操作栏
    - 根据工单状态显示不同操作按钮
    - 实现"确认完工"按钮
    - _Requirements: 3.5, 5.4_
  - [ ] 6.7 实现详情页样式
    - 创建 pages/detail/detail.wxss 样式文件

    - 实现返工提示条样式（红色背景）
    - 实现信息卡片样式
    - 实现底部操作栏固定样式
    - _Requirements: 7.1, 7.2_
  - [ ] 6.8 实现详情页逻辑
    - 创建 pages/detail/detail.js 页面逻辑

    - 实现工单详情加载
    - 实现步骤条状态计算
    - 实现照片上传、删除、预览功能
    - 实现备注输入绑定
    - 实现操作按钮点击和状态更新
    - 实现完工提交验证（至少一张照片）
    - 实现完工成功后返回工作台
    - _Requirements: 3.1, 5.3, 5.4, 5.5, 5.6, 5.7, 6.2_
  - [x]* 6.9 编写属性测试：完工提交数据完整性

    - **Property 11: 完工提交数据完整性**
    - **Validates: Requirements 5.5, 6.3**
  - [ ]* 6.10 编写属性测试：返工处理照片清空
    - **Property 12: 返工处理照片清空**
    - **Validates: Requirements 6.2**


- [ ] 7. 状态持久化与恢复
  - [ ] 7.1 实现状态变更持久化
    - 在 OrderService 中状态变更后自动保存到本地存储
    - 实现工单列表的增量更新
    - _Requirements: 8.1_
  - [ ]* 7.2 编写属性测试：状态变更持久化一致性
    - **Property 14: 状态变更持久化一致性**
    - **Validates: Requirements 8.1**
  - [ ] 7.3 实现应用启动数据恢复
    - 在 app.js onLaunch 中恢复登录状态
    - 在工作台 onLoad 中恢复工单数据
    - 实现未登录时跳转登录页
    - _Requirements: 8.2_
  - [ ]* 7.4 编写属性测试：数据恢复一致性
    - **Property 15: 数据恢复一致性**
    - **Validates: Requirements 8.2**

- [ ] 8. 错误处理与边界情况
  - [ ] 8.1 实现全局错误处理
    - 实现网络请求错误的统一 Toast 提示
    - 实现状态更新失败时的状态回滚
    - _Requirements: 4.5_
  - [ ]* 8.2 编写属性测试：状态更新失败时状态不变性
    - **Property 9: 状态更新失败时状态不变性**
    - **Validates: Requirements 4.5**
  - [x] 8.3 实现输入验证错误处理

    - 实现手机号格式错误提示
    - 实现验证码为空提示
    - 实现完工时无照片提示
    - _Requirements: 1.5, 1.6, 5.6_

- [ ] 9. Final Checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.

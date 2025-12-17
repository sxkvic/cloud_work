# Requirements Document

## Introduction

本文档定义了"师傅工单小程序"（Master Work Order App）的功能需求。该小程序面向安装师傅，提供工单接收、任务执行、进度汇报等核心功能。采用原生微信小程序框架开发，使用 Vant Weapp 组件库实现现代化、商务风的 UI 设计。

## Glossary

- **工单 (Work Order)**: 系统分配给师傅的安装任务单据，包含客户信息、安装要求、设备清单等
- **师傅 (Master)**: 使用本小程序的安装服务人员
- **工作台 (Workbench)**: 师傅登录后的主界面，展示所有工单列表
- **实施 (Implementation)**: 师傅在现场执行安装任务的过程
- **返工 (Rework)**: 工单因质量问题被退回，需要师傅重新处理
- **完工 (Completed)**: 工单安装任务已完成并提交审核
- **Vant Weapp**: 微信小程序端的 Vant 组件库

## Requirements

### Requirement 1: 用户登录

**User Story:** 作为安装师傅，我希望通过手机号和验证码登录系统，以便安全地访问我的工单任务。

#### Acceptance Criteria

1. WHEN 师傅打开小程序 THEN 登录页 SHALL 显示 App Logo、"师傅端"标题、手机号输入框、验证码输入框和登录按钮
2. WHEN 师傅输入手机号并点击获取验证码按钮 THEN 登录页 SHALL 发送验证码请求并启动60秒倒计时
3. WHEN 倒计时进行中 THEN 登录页 SHALL 禁用验证码按钮并显示剩余秒数
4. WHEN 师傅输入有效的手机号和验证码并点击登录 THEN 登录页 SHALL 验证凭据并跳转至工作台页面
5. WHEN 师傅输入无效凭据 THEN 登录页 SHALL 显示错误提示 Toast 并保持在当前页面
6. IF 手机号格式不正确 THEN 登录页 SHALL 显示格式错误提示并阻止验证码发送

### Requirement 2: 工作台工单列表

**User Story:** 作为安装师傅，我希望在工作台查看不同状态的工单列表，以便快速了解和管理我的任务。

#### Acceptance Criteria

1. WHEN 师傅进入工作台 THEN 工作台 SHALL 显示包含五个标签的吸顶 Tab 栏：待接单、接单中、实施中、已完工、需返工
2. WHEN 师傅切换 Tab 标签 THEN 工作台 SHALL 加载并显示对应状态的工单列表
3. WHEN 工单列表加载完成 THEN 工作台 SHALL 以卡片形式展示每个工单的工单号、客户地址、预约时间和状态标签
4. WHEN 工单状态为"待接单" THEN 工单卡片 SHALL 显示橙色状态标签和"立即接单"按钮
5. WHEN 工单状态为"接单中" THEN 工单卡片 SHALL 显示蓝色状态标签和"开始实施"按钮
6. WHEN 工单状态为"实施中" THEN 工单卡片 SHALL 显示蓝色状态标签和"继续实施"按钮
7. WHEN 工单状态为"已完工" THEN 工单卡片 SHALL 显示绿色状态标签
8. WHEN 工单状态为"需返工" THEN 工单卡片 SHALL 显示红色状态标签和"处理返工"按钮
9. WHEN 某状态下无工单 THEN 工作台 SHALL 显示空状态占位图和提示文字

### Requirement 3: 工单详情查看

**User Story:** 作为安装师傅，我希望查看工单的详细信息，以便了解客户需求和安装要求。

#### Acceptance Criteria

1. WHEN 师傅点击工单卡片 THEN 工单详情页 SHALL 导航至详情页面并加载工单完整信息
2. WHEN 工单详情页加载完成 THEN 工单详情页 SHALL 在顶部显示状态步骤条，展示工单当前流转状态
3. WHEN 工单详情页加载完成 THEN 工单详情页 SHALL 分组展示客户信息（姓名、电话、地址）、安装要求和设备清单
4. WHEN 工单状态为"需返工" THEN 工单详情页 SHALL 在顶部显示红色背景的整改意见提示条
5. WHEN 工单详情页加载完成 THEN 工单详情页 SHALL 在底部显示固定操作栏，根据工单状态显示相应操作按钮

### Requirement 4: 工单状态流转

**User Story:** 作为安装师傅，我希望通过操作按钮推进工单状态，以便记录任务进度。

#### Acceptance Criteria

1. WHEN 师傅点击"立即接单"按钮 THEN 系统 SHALL 显示确认弹窗询问是否接单
2. WHEN 师傅确认接单 THEN 系统 SHALL 将工单状态从"待接单"更新为"接单中"并显示成功 Toast
3. WHEN 师傅点击"开始实施"按钮 THEN 系统 SHALL 将工单状态从"接单中"更新为"实施中"并显示成功 Toast
4. WHEN 师傅点击"处理返工"按钮 THEN 系统 SHALL 将工单状态从"需返工"更新为"实施中"并显示成功 Toast
5. IF 状态更新请求失败 THEN 系统 SHALL 显示错误 Toast 并保持工单原状态

### Requirement 5: 实施汇报与完工提交

**User Story:** 作为安装师傅，我希望在实施过程中上传照片和备注，以便记录安装过程并提交完工。

#### Acceptance Criteria

1. WHEN 工单状态为"实施中"且师傅进入详情页 THEN 工单详情页 SHALL 显示实施汇报表单，包含安装备注输入框和照片上传区域
2. WHEN 师傅使用照片上传组件 THEN 照片上传组件 SHALL 限制最多上传9张照片
3. WHEN 师傅点击已上传的照片 THEN 照片上传组件 SHALL 支持全屏预览该照片
4. WHEN 师傅填写备注并上传照片后点击"确认完工" THEN 系统 SHALL 显示确认弹窗询问是否提交完工
5. WHEN 师傅确认提交完工 THEN 系统 SHALL 将工单状态更新为"已完工"、保存照片和备注数据、并显示成功 Toast
6. IF 完工提交时照片数量为零 THEN 系统 SHALL 显示提示要求至少上传一张照片
7. WHEN 完工提交成功 THEN 系统 SHALL 自动返回工作台页面

### Requirement 6: 返工处理

**User Story:** 作为安装师傅，我希望查看返工原因并重新提交整改结果，以便完成返工任务。

#### Acceptance Criteria

1. WHEN 师傅查看状态为"需返工"的工单详情 THEN 工单详情页 SHALL 在顶部醒目位置显示红色背景的整改意见内容
2. WHEN 师傅点击"处理返工"进入实施状态 THEN 工单详情页 SHALL 清空之前的照片记录并允许重新上传
3. WHEN 师傅完成返工整改并提交 THEN 系统 SHALL 将工单状态更新为"已完工"并保存新的照片和备注

### Requirement 7: UI/UX 设计规范

**User Story:** 作为安装师傅，我希望使用界面美观、操作简便的小程序，以便高效完成工作。

#### Acceptance Criteria

1. WHILE 小程序运行 THEN 所有页面 SHALL 使用科技蓝(#1989fa)作为主色调、浅灰(#f7f8fa)作为背景色
2. WHILE 小程序运行 THEN 所有卡片组件 SHALL 使用12px圆角和适度阴影
3. WHEN 显示工单状态标签 THEN 状态标签 SHALL 使用对应状态色：待接单(橙色)、进行中(蓝色)、完工(绿色)、返工(红色)
4. WHEN 师傅执行关键操作（接单、开始实施、确认完工） THEN 系统 SHALL 显示确认弹窗或 Toast 提示
5. WHILE 小程序运行 THEN 所有可点击区域 SHALL 保证足够的触控面积（最小44px x 44px）

### Requirement 8: 数据持久化与状态管理

**User Story:** 作为安装师傅，我希望工单数据能够正确保存和同步，以便随时查看最新状态。

#### Acceptance Criteria

1. WHEN 工单状态发生变更 THEN 系统 SHALL 将变更同步保存至本地存储
2. WHEN 师傅重新打开小程序 THEN 系统 SHALL 从本地存储恢复工单数据和登录状态
3. WHEN 工单数据序列化存储 THEN 系统 SHALL 使用 JSON 格式编码工单对象
4. WHEN 从存储读取工单数据 THEN 系统 SHALL 正确解析 JSON 并还原为工单对象

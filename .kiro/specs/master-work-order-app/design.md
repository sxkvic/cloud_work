# Design Document: 师傅工单小程序 (Master Work Order App)

## Overview

师傅工单小程序是一款面向安装服务人员的移动端工具，用于接收、执行和汇报安装任务。本设计采用原生微信小程序框架，结合 Vant Weapp 组件库，实现现代化、商务风的用户界面。

核心设计目标：
- **流程清晰**：工单状态流转一目了然
- **操作极简**：关键操作一键完成
- **UI精美**：科技蓝主色调，卡片式布局，圆角阴影设计

## Architecture

### 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    微信小程序框架                         │
├─────────────────────────────────────────────────────────┤
│  Pages Layer (页面层)                                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│  │  Login  │ │Workbench│ │ Detail  │                   │
│  │  登录页  │ │  工作台  │ │ 详情页  │                   │
│  └─────────┘ └─────────┘ └─────────┘                   │
├─────────────────────────────────────────────────────────┤
│  Components Layer (组件层)                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │OrderCard │ │StepBar   │ │PhotoUpload│ │ActionBar │   │
│  │ 工单卡片  │ │ 步骤条   │ │ 照片上传  │ │ 操作栏   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│  Services Layer (服务层)                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ OrderService │ │ AuthService  │ │StorageService│    │
│  │   工单服务    │ │   认证服务   │ │   存储服务   │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
├─────────────────────────────────────────────────────────┤
│  Data Layer (数据层)                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │              wx.setStorageSync / getStorageSync   │  │
│  │                    本地存储 (JSON)                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 页面路由结构

```
pages/
├── login/              # 登录页
│   ├── login.js
│   ├── login.json
│   ├── login.wxml
│   └── login.wxss
├── workbench/          # 工作台
│   ├── workbench.js
│   ├── workbench.json
│   ├── workbench.wxml
│   └── workbench.wxss
└── detail/             # 工单详情
    ├── detail.js
    ├── detail.json
    ├── detail.wxml
    └── detail.wxss
```

## Components and Interfaces

### 1. 登录页 (Login Page)

**组件结构：**
```
Login Page
├── Logo & Title Section
│   └── App Logo + "师傅端" 标题
├── Form Section
│   ├── van-field (手机号输入, type="tel")
│   └── van-field (验证码输入) + van-button (获取验证码)
└── Action Section
    └── van-button (登录按钮, block, type="primary")
```

**接口定义：**
```javascript
// 登录页数据
Page({
  data: {
    phone: '',           // 手机号
    code: '',            // 验证码
    countdown: 0,        // 倒计时秒数
    loading: false       // 登录加载状态
  },
  
  // 方法
  onPhoneChange(e),      // 手机号变更
  onCodeChange(e),       // 验证码变更
  sendCode(),            // 发送验证码
  login()                // 登录
})
```

### 2. 工作台页面 (Workbench Page)

**组件结构：**
```
Workbench Page
├── van-nav-bar (顶部导航栏)
├── van-tabs (吸顶Tab栏, sticky)
│   ├── Tab: 待接单 (pending)
│   ├── Tab: 接单中 (accepted)
│   ├── Tab: 实施中 (implementing)
│   ├── Tab: 已完工 (completed)
│   └── Tab: 需返工 (rework)
└── Order List
    ├── OrderCard (工单卡片组件) × N
    └── van-empty (空状态)
```

**接口定义：**
```javascript
// 工作台数据
Page({
  data: {
    activeTab: 0,        // 当前激活的Tab索引
    orders: [],          // 当前Tab的工单列表
    loading: false       // 加载状态
  },
  
  // 方法
  onTabChange(e),        // Tab切换
  loadOrders(status),    // 加载指定状态的工单
  onOrderClick(e),       // 点击工单卡片
  onActionClick(e)       // 点击操作按钮
})
```

### 3. 工单详情页 (Detail Page)

**组件结构：**
```
Detail Page
├── van-nav-bar (顶部导航栏, 带返回按钮)
├── Rework Notice (返工提示条, 仅返工状态显示)
├── van-steps (状态步骤条)
├── Info Sections
│   ├── Customer Info Card (客户信息卡片)
│   ├── Task List Card (安装要求卡片)
│   └── Equipment Card (设备清单卡片)
├── Implementation Form (实施表单, 仅实施中显示)
│   ├── van-field (备注输入, type="textarea")
│   └── van-uploader (照片上传)
└── van-action-bar (底部操作栏)
    └── van-button (操作按钮, 根据状态变化)
```

**接口定义：**
```javascript
// 详情页数据
Page({
  data: {
    order: null,         // 工单详情对象
    currentStep: 0,      // 当前步骤索引
    remark: '',          // 安装备注
    photos: [],          // 上传的照片列表
    loading: false       // 加载状态
  },
  
  // 方法
  loadOrder(orderId),    // 加载工单详情
  onRemarkChange(e),     // 备注变更
  onPhotoUpload(e),      // 照片上传
  onPhotoDelete(e),      // 删除照片
  onPhotoPreview(e),     // 预览照片
  onActionClick()        // 执行操作
})
```

### 4. 服务层接口

```javascript
// services/orderService.js
const OrderService = {
  // 获取工单列表
  getOrdersByStatus(status): Order[],
  
  // 获取工单详情
  getOrderById(orderId): Order,
  
  // 更新工单状态
  updateOrderStatus(orderId, newStatus): boolean,
  
  // 提交完工信息
  submitCompletion(orderId, remark, photos): boolean
}

// services/authService.js
const AuthService = {
  // 发送验证码
  sendVerificationCode(phone): boolean,
  
  // 登录验证
  login(phone, code): boolean,
  
  // 检查登录状态
  isLoggedIn(): boolean,
  
  // 登出
  logout(): void
}

// services/storageService.js
const StorageService = {
  // 保存数据
  set(key, value): void,
  
  // 读取数据
  get(key): any,
  
  // 删除数据
  remove(key): void
}
```

## Data Models

### 工单状态枚举

```javascript
const OrderStatus = {
  PENDING: 'pending',           // 待接单
  ACCEPTED: 'accepted',         // 接单中
  IMPLEMENTING: 'implementing', // 实施中
  COMPLETED: 'completed',       // 已完工
  REWORK: 'rework'              // 需返工
}
```

### 工单数据模型

```javascript
/**
 * 工单对象
 * @typedef {Object} Order
 */
const Order = {
  orderId: 'WO20231027001',     // 工单号 (唯一标识)
  status: 'pending',            // 工单状态
  customer: {
    name: '张先生',              // 客户姓名
    phone: '138****0000',       // 客户电话 (脱敏)
    address: '上海市浦东新区...101室'  // 客户地址
  },
  appointmentTime: '2023-10-28 09:00', // 预约时间
  tasks: ['安装空调挂机', '打孔', '高空作业'], // 安装任务列表
  equipment: [                  // 设备清单
    { name: '空调挂机', model: 'XX-001', sn: 'SN123456' }
  ],
  reworkReason: '',             // 返工原因 (仅返工状态有值)
  remark: '',                   // 安装备注
  photos: [],                   // 上传的照片URL列表
  createdAt: '2023-10-27 10:00', // 创建时间
  updatedAt: '2023-10-27 10:00'  // 更新时间
}
```

### 用户数据模型

```javascript
/**
 * 用户对象
 * @typedef {Object} User
 */
const User = {
  phone: '13800000000',         // 手机号
  name: '李师傅',               // 姓名
  token: 'xxx',                 // 登录令牌
  loginTime: '2023-10-27 08:00' // 登录时间
}
```

### 状态流转规则

```
┌─────────┐    接单     ┌─────────┐   开始实施   ┌────────────┐
│ pending │ ─────────> │ accepted│ ──────────> │implementing│
│ 待接单   │            │ 接单中   │              │   实施中    │
└─────────┘            └─────────┘              └────────────┘
                                                      │
                                                      │ 确认完工
                                                      ▼
                       ┌─────────┐              ┌────────────┐
                       │ rework  │ <─────────── │ completed  │
                       │ 需返工   │   审核不通过  │   已完工    │
                       └─────────┘              └────────────┘
                            │
                            │ 处理返工
                            ▼
                       ┌────────────┐
                       │implementing│
                       │   实施中    │
                       └────────────┘
```

### 本地存储结构

```javascript
// Storage Keys
const STORAGE_KEYS = {
  USER: 'master_user',           // 用户信息
  ORDERS: 'master_orders',       // 工单列表
  LOGIN_STATUS: 'master_logged'  // 登录状态
}

// 存储格式示例
{
  "master_user": {
    "phone": "13800000000",
    "name": "李师傅",
    "token": "xxx"
  },
  "master_orders": [
    { "orderId": "WO001", "status": "pending", ... },
    { "orderId": "WO002", "status": "implementing", ... }
  ],
  "master_logged": true
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: 手机号格式验证

*For any* 字符串输入作为手机号，验证函数应当仅对符合中国大陆手机号格式（11位数字，以1开头）的输入返回 true，对其他所有输入返回 false。

**Validates: Requirements 1.6**

### Property 2: 倒计时状态一致性

*For any* 倒计时秒数 n（0 < n ≤ 60），当倒计时进行中时，验证码按钮应当处于禁用状态，且显示的剩余秒数应等于 n。

**Validates: Requirements 1.2, 1.3**

### Property 3: Tab 切换与工单过滤一致性

*For any* 工单列表和任意状态 Tab，切换到该 Tab 后显示的工单列表应当仅包含该状态的工单，且包含所有该状态的工单。

**Validates: Requirements 2.2**

### Property 4: 工单卡片信息完整性

*For any* 工单对象，其对应的卡片渲染结果应当包含工单号、客户地址、预约时间和状态标签这四个必要字段。

**Validates: Requirements 2.3**

### Property 5: 状态到 UI 映射一致性

*For any* 工单状态，其对应的状态标签颜色和操作按钮应当符合以下映射规则：
- pending → 橙色标签 + "立即接单"按钮
- accepted → 蓝色标签 + "开始实施"按钮
- implementing → 蓝色标签 + "继续实施"按钮
- completed → 绿色标签 + 无操作按钮
- rework → 红色标签 + "处理返工"按钮

**Validates: Requirements 2.4, 2.5, 2.6, 2.7, 2.8, 7.3**

### Property 6: 工单详情信息分组完整性

*For any* 工单对象，其详情页应当正确展示客户信息（姓名、电话、地址）、安装要求列表和设备清单三个信息分组。

**Validates: Requirements 3.3**

### Property 7: 返工状态整改意见显示

*For any* 状态为"需返工"的工单，其详情页顶部应当显示红色背景的整改意见提示条，且提示条内容应等于工单的 reworkReason 字段。

**Validates: Requirements 3.4, 6.1**

### Property 8: 状态流转合法性

*For any* 工单状态变更操作，系统应当仅允许以下合法的状态流转：
- pending → accepted（接单）
- accepted → implementing（开始实施）
- implementing → completed（确认完工）
- rework → implementing（处理返工）

其他任何状态流转应当被拒绝。

**Validates: Requirements 4.2, 4.3, 4.4**

### Property 9: 状态更新失败时状态不变性

*For any* 工单，当状态更新操作失败时，工单的状态应当保持原值不变。

**Validates: Requirements 4.5**

### Property 10: 照片上传数量限制

*For any* 照片上传操作，当已上传照片数量达到9张时，系统应当阻止继续上传新照片。

**Validates: Requirements 5.2**

### Property 11: 完工提交数据完整性

*For any* 完工提交操作，当提交成功时，工单状态应当更新为"已完工"，且工单的 remark 和 photos 字段应当保存提交的备注和照片数据。

**Validates: Requirements 5.5, 6.3**

### Property 12: 返工处理照片清空

*For any* 状态为"需返工"的工单，当师傅点击"处理返工"进入实施状态时，工单的 photos 字段应当被清空为空数组。

**Validates: Requirements 6.2**

### Property 13: 工单数据 JSON 序列化 Round-Trip

*For any* 有效的工单对象，将其序列化为 JSON 字符串后再反序列化，应当得到与原对象等价的工单对象。

**Validates: Requirements 8.3, 8.4**

### Property 14: 状态变更持久化一致性

*For any* 工单状态变更操作，变更后本地存储中的工单数据应当反映最新的状态值。

**Validates: Requirements 8.1**

### Property 15: 数据恢复一致性

*For any* 保存到本地存储的工单数据和登录状态，重新打开小程序后从存储恢复的数据应当与保存时的数据一致。

**Validates: Requirements 8.2**

## Error Handling

### 网络错误处理

| 场景 | 处理方式 |
|------|----------|
| 验证码发送失败 | 显示 Toast "验证码发送失败，请重试"，按钮恢复可点击状态 |
| 登录请求失败 | 显示 Toast "登录失败，请检查网络"，保持在登录页 |
| 工单列表加载失败 | 显示错误占位图，提供"重新加载"按钮 |
| 状态更新失败 | 显示 Toast "操作失败，请重试"，保持原状态 |
| 照片上传失败 | 显示 Toast "照片上传失败"，移除失败的照片项 |

### 输入验证错误

| 场景 | 处理方式 |
|------|----------|
| 手机号格式错误 | 显示 Toast "请输入正确的手机号" |
| 验证码为空 | 显示 Toast "请输入验证码" |
| 完工时无照片 | 显示 Toast "请至少上传一张照片" |

### 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 工单列表为空 | 显示空状态占位图和提示文字 |
| 本地存储读取失败 | 使用默认空数据，不影响正常使用 |
| 照片数量达到上限 | 隐藏上传按钮，显示"已达上限"提示 |

## Testing Strategy

### 测试框架选择

- **单元测试**: 使用 miniprogram-simulate 进行组件单元测试
- **属性测试**: 使用 fast-check 进行属性基测试 (Property-Based Testing)

### 单元测试覆盖

1. **工具函数测试**
   - 手机号格式验证函数
   - 状态到UI映射函数
   - 日期格式化函数

2. **服务层测试**
   - OrderService 的 CRUD 操作
   - AuthService 的登录验证逻辑
   - StorageService 的存取操作

3. **组件测试**
   - 工单卡片组件渲染
   - 照片上传组件行为
   - 状态步骤条组件

### 属性基测试 (Property-Based Testing)

使用 fast-check 库实现以下属性测试：

1. **Property 1**: 手机号格式验证 - 生成随机字符串测试验证函数
2. **Property 3**: Tab 过滤一致性 - 生成随机工单列表测试过滤逻辑
3. **Property 4**: 卡片信息完整性 - 生成随机工单测试渲染结果
4. **Property 5**: 状态UI映射 - 遍历所有状态测试映射函数
5. **Property 8**: 状态流转合法性 - 生成随机状态转换测试验证逻辑
6. **Property 10**: 照片数量限制 - 生成随机照片列表测试上传限制
7. **Property 13**: JSON Round-Trip - 生成随机工单对象测试序列化

### 测试文件结构

```
tests/
├── unit/
│   ├── utils.test.js           # 工具函数测试
│   ├── orderService.test.js    # 工单服务测试
│   ├── authService.test.js     # 认证服务测试
│   └── storageService.test.js  # 存储服务测试
├── property/
│   ├── phoneValidation.property.test.js    # Property 1
│   ├── orderFilter.property.test.js        # Property 3
│   ├── orderCard.property.test.js          # Property 4
│   ├── statusMapping.property.test.js      # Property 5
│   ├── statusTransition.property.test.js   # Property 8
│   ├── photoLimit.property.test.js         # Property 10
│   └── jsonRoundTrip.property.test.js      # Property 13
└── integration/
    └── workflow.test.js        # 工作流集成测试
```

### 测试配置要求

- 每个属性测试运行最少 100 次迭代
- 每个属性测试必须注释引用对应的设计文档属性编号
- 测试注释格式: `**Feature: master-work-order-app, Property {number}: {property_text}**`

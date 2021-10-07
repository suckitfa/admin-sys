# admin-sys

## 启动项目
```shell
# 安装依赖
yarn install
```

```shell
# 启动开发模式
yarn serve
```

### 打包编译
```
yarn build
```



### 1. 管理系统的页面设计

| 序号 | 页面形式  | 页面能力                                                  |
| ---- | --------- | --------------------------------------------------------- |
| 1    | 登入页    | 只有用户名和密码的输入                                    |
| 2    | 列表+表单 | 单页可以完成某类服务的增删改查                            |
| 3    | 列表页    | 只有列表展示，提供删除，和查找服务，配合4的单页完成增和改 |
| 4    | 表单页    | 只有表单页编辑内容，可提供新增，修改等能力给页面3         |



### 2. 组件和路由设计

| 页面路由           | 页面内容   | 页面对应的组件 | 页面的组成                         |
| ------------------ | ---------- | -------------- | ---------------------------------- |
| /login             | 登录页     | Login          | 表单，包含username和password       |
| /home              | 应用首页   | Home           | 左侧menu,右侧 router-view          |
| /home/service      | 服务信息页 | Service        | Home的子路由组件，包含列表和表单   |
| /home/product      | 产品容器页 | Product        | Home的子路由组件，包括 router-view |
| /home/product/list | 产品信息页 | ProductList    | Product的子路由组件，包含列表      |
| /home/product/edit | 产品编辑页 | ProductEdit    | Product子路由组件，包含表单        |

### 项目的目录结构

```js
├─dist                      // 编译之后的项目文件
├─src                       // 开发目录
│  ├─assets                 // 静态资源
│     ├─less                // 公共less
│     ├─img                 // 图片资源
│  ├─components             // **放这里是组件**
│  ├─pages                  // **放这里是页面** 根据路由结构划分
│  ├─utils                  // 工具库
│  ├─App.vue                // 启动页面，最外层容器组件
│  ├─main.js                // 入口脚本
├─babel.config.js          // babel 配置文件
├─vue.config.js            // vue 自定义配置，与 webpack 配置相关
├─package.json             // 项目配置
├─README.md                // 项目说明
```

### 不理解之处

```js
 // globalData = {...globalData, [key]: value }
export function setGlobalData(key, value) {
    // 传入键值对
    if (key === undefined || value === undefined) {
        return;
    }
    globalData = {...globalData, [key]: value }
    return globalData;
}
```

### 理解：element-ui组件：el-dialog :visible.sync

> 我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

```js
<el-dialog title="新增" :visible.sync="dialogFormVisible">
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 点击取消的时候，设置弹窗不可见 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
```

- ``visible``用来表示dialog的显示和关闭

```js
<el-dialog :visible="dialogFormVisible" > </el-dialog> 
这种写法等价于，v-bind:visible="dialogFormVisible" , 是双向绑定的。
在vue中， 父级向儿子传值prop，只能是单向的，儿子不应该改变父亲传入的值。而加 .sync相当于给儿子，触发发事件通知父级改变该值。
详细见： https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
```



### 插槽

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
>
> 这里使用MyButton组件为例子

1. 普通插槽

```html
<slot></slot>
// slot标签内部放入默认值
<template>
    <button type="submit">
        <slot>确认</slot>
    </button>
</template>
```

2. 具名插槽

> 组件内部放入多个插槽,使用名字进行区分

```jsx
// 定义插槽
<slot name="header"></slot>
// 一个不带 name 的 <slot> 出口会带有隐含的名字“default”。
  
// 使用插槽,使用v-slot指令提供与定义好的插槽对应的名字
<template v-slot:header>
</template>
```

3. 作用域插槽

> 只要出现多个插槽，请始终为*所有的*插槽使用完整的基于

```html
<template>
    <span>
        <!-- 定义好插槽prop，  -->
        <slot v-bind:user="user">{{user.firstName}}</slot>
    </span>
</template>

<script>
export default {
    data() {
        return {
            user:{
                lastName:"Tang",
                firstName:"Bob"
            }
        }
    }
}
</script>
```

```js
<template>
  <div id="app">
    <!-- 作用域插槽的使用 -->
    <current-user v-slot:default="slotProps"> 
      {{slotProps.user.lastName}}
    </current-user>
    <!-- 解构插槽 -->
    <current-user v-slot="{user}">
      {{user.lastName}}
    </current-user>
    <!-- 具名插槽的缩写. default是默认名 -->
    <current-user #default="{user}">
      {{user.lastName}}
    </current-user>
  </div>
</template>

<script>
import CurrentUser from './components/mybutton/CurrentUser.vue'
export default {
  name: 'App',
  components: {
    CurrentUser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```


<template>
  <el-menu
    :collapse="isMenuCollapse"
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <template v-for="menu in menus">
      <!-- 遍历生成父菜单选项 -->
      <el-submenu
        v-if="menu.subMenus && menu.subMenus.length"
        :index="menu.index"
        :key="menu.index"
      >
        <!-- 使用插槽, slot的作用就是占位符 -->
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.text}}</span>
        </template>
        <el-menu-item-group>
          <!-- router-link默认会被渲染成a标签 -->
          <router-link
            tag="div"
            v-for="subMenu in menu.subMenus"
            :key="subMenu.index"
            :to="{ name: subMenu.routerName }"
          >
            <el-menu-item :index="subMenu.index">{{
              subMenu.text
            }}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 只有单个父菜单的时候，也要给这个父菜单添加路由，同样的 to 指向要去的地方 -->
      <router-link
        v-else
        :index="menu.index"
        :key="menu.index"
        tag="div"
        :to="{ name: menu.routerName }"
      >
        <!-- 没子菜单的时候，就用 el-menu-item，也要绑个序号 index -->
        <el-menu-item>
          <!-- 绑个父菜单的 icon -->
          <i :class="menu.icon"></i>
          <!-- 再绑个父菜单的名称 text -->
          <span slot="title">{{ menu.text }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>
<script>
// 菜单配置项
const menus = [
  {
    text: "服务管理",
    icon: "el-icon-setting",
    subMenus: [
      {
        text: "服务信息",
        routerName: "Service",
      },
    ],
  },
  {
    text: "产品管理",
    icon: "el-icon-menu",
    subMenus: [
      { text: "产品信息", routerName: "ProductList" },
      { text: "新增", routerName: "ProductAdd" },
    ],
  },
  {
    text: "日志信息",
    icon: "el-icon-message",
    routerName: "", // 日志信息这里为空，则不会进行跳转
  },
].map((x, i) => {
  // 添加 index，可用于默认展开 default-openeds 属性，
  //   和激活状态 default-active 属性的设置
  // 给菜单项添加index
  return {
    ...x,
    subMenus: (x.subMenus || []).map((y, j) => {
      return { ...y, index: `${i}-${j}` };
    }),
    index: `${i}`,
  };
});
export default {
  data() {
    return {
      menus,
      activeIndex: "",
    };
  },
  watch: {
    // 获取路由的状态，设置el-menu的default-active
    '$route' (to) {
      let activeIndex;
      // 遍历menus列表，匹配路由名称
      this.menus.forEach((x) => {
        if (x.routerName === to.name) {
          activeIndex = x.index;
        } else {
          const subMenuItem = x.subMenus.find((y) => y.routerName === to.name);
          if (subMenuItem) {
            activeIndex = subMenuItem.index;
          }
        }
      });
      this.activeIndex = activeIndex;
    },
  },
    //通过属性传参
  props: {
    isMenuCollapse: Boolean,
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
</style>
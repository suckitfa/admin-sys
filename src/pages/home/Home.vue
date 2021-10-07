<template>
  <el-container style="border: 1px solid #eee; min-height: 100%">
    <!-- 左边菜单 -->
    <el-aside style="background-color: #545c64; width: auto">
      <Menu :isMenuCollapse="isMenuCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <!-- 按钮切换左侧菜单是否折起 -->
        <el-button
          @click="toggleMenuCollapse"
          style="font-size: 24px; padding: 5px 8px"
        >
          <!-- 切换图标 -->
          <i
            :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            style="font-size: 24px; padding: 5px 8px"
          />
        </el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"
            ><span>欢迎你回来,{{ username }}</span></i
          >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item width="100" @click.native="logout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 子路由界面 -->
        <!-- /home/serveice -->
        <!-- /home/product/list -->
        <!-- /home/product/edit/:id -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { clearGlobalData, getGlobalData } from "../../utils/globalData";
import Menu from "../../components/Menu.vue";
export default {
  data() {
    return {
      isMenuCollapse: false, // 是否收起左边菜单
      username: getGlobalData("username") || "",
    };
  },
  methods: {
    toggleMenuCollapse() {
      this.isMenuCollapse = !this.isMenuCollapse;
    },
    logout() {
      // 清空用户信息
      clearGlobalData("username");
      this.$router.push({ name: "Login" });
    },
  },
  // 注册子组件
  components: {
    Menu,
  },
};
</script>
<style>
body {
  margin: 0;
}
.el-header {
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-size: 12px;
  background: #ededed;
}
</style>
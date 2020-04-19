<template>
  <el-container class="home" direction="vertical">
    <!--顶部导航和个人信息显示-->
    <div>
      <Topmenu></Topmenu>
      <Showmsg></Showmsg>
    </div>

    <!--页面主体区域-->
    <el-container>
      <!--左侧导航-->
      <el-aside>
        <el-menu default-active="/sche" class="el-menu-vertical-demo" router>
          <el-menu-item index="/sche">
            <i class="el-icon-date"></i>
            <span slot="title">课程表</span>
          </el-menu-item>
          <el-menu-item index="/course">
            <i class="el-icon-document"></i>
            <span slot="title">所有课程</span>
          </el-menu-item>
          <el-menu-item index="/homework">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">我的作业</span>
          </el-menu-item>
          <el-menu-item index="/selfmsg">
            <i class="el-icon-setting"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧显示区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Topmenu from "../components/Topmenu";
import Showmsg from "../components/Showmsg";

export default {
  components: {
    Topmenu,
    Showmsg
  }
};
</script>

<style scoped>
.el-aside {
  height: 20em;
  width: 15em;
}

.el-menu-vertical-demo {
margin-left: 3em;
margin-top: 3em;
width: 12em;

}
</style>
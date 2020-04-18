<template>
  <div class="menu">
    <el-col style="margin-left:5em;margin-top:2em;width:12em;">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="showSche()">
          <i class="el-icon-date"></i>
          <span slot="title">课程表</span>
        </el-menu-item>
        <el-menu-item index="2" @click="showCourse()">
          <i class="el-icon-document"></i>
          <span slot="title">所有课程</span>
        </el-menu-item>
        <el-menu-item index="3" @click="showHK()">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">我的作业</span>
        </el-menu-item>
        <el-menu-item index="4" @click="showSelf()">
          <i class="el-icon-setting"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import Msg from "./Msg.js";
export default {
  data() {
    return {};
  },
  methods: {
    showSche:function() {
      Msg.$emit("val", "1");
    },
    showCourse:function() {
      Msg.$emit("val", "2");
    },
    showHK:function() {
      Msg.$emit("val", "3");
    },
    showSelf:function() {
      Msg.$emit("val", "4");
    }
  }
};
</script>

<style scoped>
.menu {
  width: 20em;
  height: 50px;
}
</style>
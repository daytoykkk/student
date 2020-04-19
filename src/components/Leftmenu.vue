<template>
  <div class="menu">
    <el-col style="margin-left:5em;margin-top:2em;width:12em;">
      
    
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
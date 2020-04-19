<template>
  <div>
    <Topmenu></Topmenu>
    <!--作业详情-->
    <el-card class="box-card">
      <div slot="header" class="clearfix main-title">
        <div class="hk-title">
          <span>作业详情</span>
          <p class="p-ddl">
            <i class="el-icon-time"></i>
            截止时间: {{ddl}}
          </p>
        </div>
      </div>
      <div class="text item">{{hkdata}}</div>
    </el-card>

    <!--上传区域-->
    <el-card class="box-card">
        <p style="font-size:1.5em;">作业提交</p>
<p>上传文字 <i class="el-icon-tickets"></i></p>
<el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 3}"
  placeholder="请输入内容"
  v-model="textarea"
  resize="none"
  style="width:70%"
  >
</el-input>

        <p>上传文件 <i class="el-icon-folder-opened"></i></p>
      <el-upload
        class="upload-demo"
        drag
        action=""
        multiple
        accept=".jpg,.png"
        :limit="3"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb，图片不超过3张</div>
      </el-upload>
      <br><br>
      <center><el-button type="primary" icon="el-icon-edit">提交作业</el-button></center>
    </el-card>
  </div>
</template>

<script>
import Topmenu from "./Topmenu";
export default {
  data() {
    return {
      hkdata:
        "防疫思政直播课作业二：请同学们谈谈观后感，特别是结合第一题，谈一下自己还能做些什么？",
      ddl: "2020-4-19",
      textarea:""
    };
  },
  components: {
    Topmenu
  }
};
</script>

<style scoped>
.text {
  font-size: 1em;
}

.item {
  margin-bottom: 2em;
}
.main-title {
  display: flex;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 80%;
  margin-left: 10%;
  margin-top: 2em;
}
.box-card span {
  font-size: 1.5em;
}
.p-ddl {
  font-size: 0.9em;
  color: #777993;
}
.el-upload{
    border: 1px solid red;
    width: 80%;
    margin-left:10%;
}
i{
    color: #0084ff;
}
</style>
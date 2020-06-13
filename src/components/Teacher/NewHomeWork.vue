<template>
  <div>
    <div class="main">
      <h2>高等数学</h2>
      <hr style="color:rgba(100, 110, 245, 0.541)" />
      <label style="margin-left:2em">标题：</label>
      <el-input
        placeholder="请输入标题，最多20字"
        prefix-icon="el-icon-edit"
        oninput="if(value.length>20)value=value.slice(0,20)"
        v-model="title"
        style="width:35em;margin-left:1em;margin-top:2em;"
      ></el-input>
      <br />
      <label>截止日期：</label>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        style="margin-left:1em;margin-top:2em;"
      ></el-date-picker>
      <br />

      <div>
        <label for="neirong" style="display:inline-block;margin-top:2em;">题目描述：</label>
        <textarea id="neirong" class="text" :rows="10" placeholder="请输入内容" v-model="text"></textarea>
      </div>

      <el-upload
        :action="string"
        ref="fileEle"
        :on-change="fileChange"
        :on-remove="fileChange"
        :file-list="files"
        :auto-upload="false"
        style="width:40%"
      >
        <label style="display:inline-block;">上传文件：</label>
        <el-button style="margin-top:2em;margin-left:1em;" type="warning" plain>点击上传</el-button>
      </el-upload>

      <br />
      <div class="some-btn">
        <el-button style="margin-right:1em;" type="info" plain @click="sendHk()">发布作业</el-button>
        <el-button style="margin-left:1em;" type="info" plain @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 2em;
  border: 2px solid #99b2e8;
  box-shadow: 0 2px 12px 0 rgba(100, 110, 245, 0.541);
  border-radius: 1em;
  width: 66%;
  margin-left: 17%;
  padding-right: 3em;
  padding-bottom: 10em;
  padding-left: 3em;
}
.text {
  border: 2px solid hsl(138, 11%, 64%);
  border-radius: 5px;
  width: 80%;
  margin-left: 1em;
  margin-top: 2em;
  padding: 0.5em;
  font-size: 1.2em;
  vertical-align: top;
  overflow-y: auto;
  overflow-x: hidden;
  resize: none;
}
.text:focus {
  border: 3px solid rgb(142, 168, 224);
  border-radius: 5px;
  box-shadow: 0 3px 8px 0 rgba(129, 189, 239, 0.541);
}
.some-btn {
  text-align: center;
  margin-top: 4em;
}
</style>

<style>
.el-input {
  border: 2px solid hsl(138, 11%, 64%);
  border-radius: 5px;
}
.el-input:focus-within {
  border: 2px solid rgb(142, 168, 224);
  border-radius: 5px;
  box-shadow: 0 3px 8px 0 rgba(129, 189, 239, 0.541);
}
</style>

<script>
export default {
  data() {
    return {
      title: "",
      date: "",
      text: "",
      string: "1",
      files: []
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/teachercourse" });
    },
    fileChange(file,fileList) {
        let that=this;
      this.files=new Array();
      let n=fileList.length;
      for(let i=0;i<n;i++){
          that.files.push(fileList[i])
      }
    },
    sendHk() {
      let form = new FormData();
      console.log("发布" + this.files);
      //form.append('',this.files);
    }
  }
};
</script>
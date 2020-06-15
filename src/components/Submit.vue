<template>
  <div>
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
        :action="string"
        ref="fileEle"
        :on-change="fileChange"
        :on-remove="fileChange"
        :file-list="files"
        :auto-upload="false"
        drag
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
      <center><el-button type="primary" icon="el-icon-edit" @click="sendHk()">提交作业</el-button></center>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hkdata:
        "防疫思政直播课作业二：请同学们谈谈观后感，特别是结合第一题，谈一下自己还能做些什么？",
      ddl: "2020-4-19",
      textarea:"",
        TeacherName:"dalao",
      HomeWorkK:"高等数学",
     HomeWorkName:"求导",
      time:"",
      string:"123",
      files:[]
    };
  },
  methods:{
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
      let that = this;
      let date = new Date();
      that.date=date;
     
     if(that.files.length==1){
       form.append("filename",that.files[0].name)
     }else{
       let len=that.files.length;
       let name="";
       for(let i=0;i<len;i++){
         name+=that.files[i].name + ";"
       }
       form.append("filename",name)
     }

     form.append("time",date);
     form.append("TeacherName",that.teacherName);
     form.append("HomeWorkName",that.title);
     form.append("HomeWorkK",that.courseName);
    let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          };

          this.$axios
            .post("/consumer/UpLoad/",form, config)
            .then(res=>{
              console.log(res.data)
            })
            .catch(error=>{
              console.log(error)
            })

      let config1 = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      let form1=new FormData();
      if(that.files.length==1){
       form1.append("file",that.files[0])
     }else{
       let len=that.files.length;
       for(let i=0;i<len;i++){
         form1.append("file",that.files[i])
       }
     }
       this.$axios
            .post("/consumer/UpLoadFile/",form1, config1)
            .then(res=>{
              console.log(res.data)
            })
            .catch(error=>{
              console.log(error)
            })
    }
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
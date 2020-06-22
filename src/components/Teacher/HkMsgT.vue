<template>
  <div>
    <div>
      <img
        src="../../assets/back.png"
        @click="tohk()"
        style="float:left;margin-left:8%;width:2em;padding-right:5px;cursor:pointer;"
        title="返回作业列表"
      />
      <el-card class="box-card">
        <div slot="header" class="clearfix main-title">
          <div class="hk-title">
            <span>{{title}}</span>
            <span style="font-size:1em;color:#c9c9cb">{{coursename}}</span>
            <p class="p-ddl">
              <i class="el-icon-time"></i>
              截止时间: {{ddl}}
            </p>
          </div>
          <el-button type="primary" icon="el-icon-edit">上传答案</el-button>
        </div>
        <div class="text item">{{hkdata}}</div>
         <div class="item">
          作业文件：
          <el-button style="margin-left:0" @click="downFile(teacherFileName)" title="点击下载" type="text">{{teacherFileName}}</el-button>
        </div>
      </el-card>
    </div>

    <p style="font-size:1.4em;margin-left:10%;margin-top:3em;">作业提交情况</p>
    <el-table :data="tableData" style="width: 80%;margin-left:10%;" empty-text="暂无提交学生">
      <el-table-column prop="number" label="学号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="homework" label="作业（点击下载）">
        <template slot-scope="scope">
          <el-button style="margin-left:0;" type="text" @click="downFile(scope.row.homework)">{{scope.row.homework}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="提交时间" width="180"></el-table-column>
      <el-table-column prop="comment" label="评语及评分" width="150">
        <template slot-scope="scope">
          <el-button style="margin-left:0;" type="text" @click="scope.row.isComment = true">输入评语及评语</el-button>
          <el-dialog title="评语及评分" :visible.sync="scope.row.isComment">
            <span style="valign:top;line-height:93px;">评语：</span>
            <el-input
              type="textarea"
              placeholder="请输入评语"
              v-model="scope.row.comment"
              maxlength="30"
              show-word-limit
              style="width:80%"
              :autosize="{maxRows:3,minRows:3}"
            >
            </el-input><br><br>
               <label>评分：</label>
            <el-input v-model="scope.row.score"></el-input>
            <el-button @click="handleEdit(scope.row.name, scope.row.score,scope.$index,scope.row.comment)">确定</el-button>
          </el-dialog>
        </template>
      </el-table-column>
     
      <el-table-column
        prop="isP"
        label="批改情况"
        width="100"
        :filters="[{ text: '未批改', value: '未批改' },{ text: '已批改', value: '已批改' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isP === '未批改' ? 'danger' : 'success'"
            disable-transitions
          >{{scope.row.isP}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      hkdata: "",
      ddl: "",
      coursename: "",
      tableData: [],
      teacherFileName: ""
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      let hkname = localStorage.getItem("HomeWorkName");
      let coursename = localStorage.getItem("HomeWorkK");
      that.teacherFileName=localStorage.getItem("pI")
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      let form = new FormData();
      form.append("PK", coursename);
      form.append("PL", hkname);

      //作业信息
      this.$axios
        .post("/consumer/FindHomeWorkOne/", form, config)
        .then(res => {
          let data = new Object();
          data = res.data.H;
          that.coursename = data[0].pK;
          that.title = data[0].pL;
          let oldDate = new Date(data[0].pTime);
          that.ddl =
            oldDate.getFullYear() +
            "-" +
            (oldDate.getMonth() + 1) +
            "-" +
            oldDate.getDate();
          that.hkdata = data[0].pneiron;
        })
        .catch(error => {
          console.log(error);
        });

      //提交情况
      let form1 = new FormData();
      form1.append("HomeWorkName", hkname);
      form1.append("HomeWorkK", coursename);
      this.$axios
        .post("/consumer/getHome/", form1, config)
        .then(res => {
          console.log(res.data);
          let data = new Object();
          data = res.data.HomeWork;
          let len = data.length;
          let pigai="未批改"
          for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].homeWorkTime);
            let newDate =
              oldDate.getFullYear() +
              "-" +
              (oldDate.getMonth() + 1) +
              "-" +
              oldDate.getDate();
              if(data[i].homePL=="无"&&data[i].homeWorkP=="0"){
                    pigai="未批改"
              }else{
                pigai="已批改"
              }
            let hk = {
              number: data[i].homeWorkS,
              time: newDate,
              name: data[i].homeWorkT,
              score: data[i].homeWorkP,
              isP: pigai,
              comment: data[i].homePL,
              isComment: false, //是否显示有评语的对话框,
              homework:data[i].homeWorkI
            };
            that.tableData.push(hk);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(name, score, index, comment) {
      let that = this;
      if (score == "") {
        that.$message({
          type: "error",
          message: "分数不能为空噢！"
        });
        return;
      }
      console.log(that.tableData[index])
      let form = new FormData();
      form.append("HomeWorkP", score);
      form.append("HomeWorkS", that.tableData[index].number);
      form.append("HomePL", comment);
      this.$axios
        .post("/consumer/PHomeWorkOne/", form, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data == "OK") {
            that.$message({
              type:"success",
              message:"评分成功"
            })
            that.tableData[index].isP = "已批改";
            that.tableData[index].isComment=false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    tohk() {
      this.$router.push({ path: "/teacherhk" });
    },
    downFile(name){
      let that = this;
      let form = new FormData();
      form.append("fileName", name);
      that.$axios
        .post("/consumer/downFile/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: 'blob'
        })
       .then(res=>{
         console.log(res.data)
      const blob = new Blob([res.data])
      let url = window.URL.createObjectURL(blob)

      //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
      let link = document.createElement('a')
      link.href = url
      link.style.display = 'none'
      //res.headers.fileName 取出后台返回下载的文件名
      const downlaodFileName =name
      console.log(res.headers)
      link.setAttribute('download',downlaodFileName)
      link.click()
      window.URL.revokeObjectURL(url)
    })
        .catch(error => {
          console.log(error);
        });
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
.el-button {
  height: 3.5em;
  margin-left: 75%;
  margin-top: 1em;
}
</style>


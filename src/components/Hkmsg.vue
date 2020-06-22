<template>
  <div>
    <!--作业详情-->
    <div>
      <img
        src="../assets/back.png"
        @click="tohk()"
        style="float:left;margin-left:8%;width:2em;padding-right:5px;cursor:pointer;"
        title="返回作业列表"
      />
      <el-card class="box-card">
        <div slot="header" class="clearfix main-title">
          <div class="hk-title">
            <span>{{hkname}}</span>
            <p class="p-ddl">
              <i class="el-icon-time"></i>
              截止时间: {{ddl}}
            </p>
          </div>
          <el-button
            type="primary"
            icon="el-icon-edit"
            :disabled="isSubmit"
            @click="toSubmithk()"
          >提交作业</el-button>
        </div>
        <div class="text item">作业描述：{{hkdata}}</div>
        <div class="item">
          作业文件：
          <el-button style="margin-left:0" @click="download(teacherFileName)" title="点击下载" type="text">{{teacherFileName}}</el-button>
        </div>
      </el-card>
    </div>

    <!--提交情况-->
    <el-card class="box-card">
      <el-table :data="hks" style="width: 100%" empty-text="暂无作业，请及时提交作业">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="filename" label="提交内容" width="500"></el-table-column>
        <el-table-column prop="ddl" label="提交时间" width="150"></el-table-column>
        <el-table-column
          prop="tag"
          label="批改状态"
          width="180"
          :filters="[{ text: '已批改', value: '已批改' }, { text: '未批改', value: '未批改' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '未批改' ? 'danger' : 'success'"
              style="font-size:1em"
              disable-transitions
            >{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="downfile" label="我的提交">
          <template slot-scope="scope">
            <el-button
              @click="download(scope.row.filename)"
              style="margin-left:0"
              type="text"
            >点击下载我的作业</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--作业答案-->
    <el-card v-if="isSubmit==true" class="box-card">
      <div slot="header" class="clearfix">
        <span>教师评语</span>
      </div>
      <div>
        <p>
          我的分数：
          <span style="color:red">{{score}}</span>
        </p>
        <p>教师评语: {{comment}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmit: true,
      hkdata: "",
      ddl: "",
      hkname: "",
      hks: [],
      filename: "",
      score: "",
      comment: "",
      teacherFileName: ""
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      let homework = JSON.parse(localStorage.getItem("hkmsgS"));
      that.ddl = homework.ddl;
      that.teacherFileName=homework.pI
      let dateline = new Date(that.ddl);
      let today = new Date();

      that.hkname = homework.name;
      that.hkdata = homework.comment;
      let form = new FormData();
      form.append("HomeWorKName", that.hkname);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios
        .post("/consumer/getStudentHomeWork/", form, config)
        .then(res => {
          console.log(res.data);
          let data = new Object();
          data = res.data.YourHomeWork;
          let len = data.length;
          if (len == 0) {
            that.isSubmit = false;
            if (today > dateline) {
              //过期不能交
              that.isSubmit = true;
            }
            return;
          } else {
            that.isSubmit = true;
          }

          for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].homeWorkTime);
            let hk = {
              tag: data[i].homePL == "无" ? "未批改" : "已批改",
              ddl:
                oldDate.getFullYear() +
                "-" +
                (oldDate.getMonth() + 1) +
                "-" +
                oldDate.getDate(),
              filename: data[i].homeWorkI
            };
            that.score = data[i].homeWorkP;
            that.comment = data[i].homePL;
            that.hks.push(hk);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    toSubmithk() {
      this.$router.push({ path: "/submit" });
    },
    download(name) {
      let that = this;
      let form = new FormData();
      form.append("fileName", name);
      that.$axios
        .post("/consumer/downFile/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: "blob"
        })
        .then(res => {
          console.log(res.data);
          const blob = new Blob([res.data]);
          let url = window.URL.createObjectURL(blob);

          let link = document.createElement("a");
          link.href = url;
          link.style.display = "none";
         
          const downlaodFileName = name;
          console.log(res.headers);
          link.setAttribute("download", downlaodFileName);
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.log(error);
        });
    },
    tohk() {
      this.$router.push({ path: "/hktable" });
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
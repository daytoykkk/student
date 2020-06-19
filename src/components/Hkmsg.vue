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
        <el-button type="primary" icon="el-icon-edit" @click="toSubmithk()">提交作业</el-button>
      </div>
      <div class="text item">{{hkdata}}</div>
    </el-card>

    <!--提交情况-->
    <el-card class="box-card">
      <el-table :data="hks" style="width: 100%" empty-text="暂无作业，请及时提交作业">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="filename" label="提交内容" width="800"></el-table-column>
        <el-table-column prop="ddl" label="截止时间" width="150" sortable></el-table-column>
        <el-table-column
          prop="tag"
          label="提交状态"
          width="180"
          :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]"
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
      </el-table>
    </el-card>

    <!--作业答案-->
    <el-card v-if="isSubmit=='已提交'" class="box-card">
      <div slot="header" class="clearfix">
        <span>作业答案</span>
        <el-button style="float: right; padding: 3px 0" type="text">一键复制</el-button>
      </div>
      <div>
        <p>在疫情期间，我们应该要听从党和国家的安排，积极做好个人疫情防控工作；同时也要尽己所能，在疫情期间多多劝说他人不吃野味，不聚众搞宴席，严格听从国家对疫情防控工作的安排。</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmit: "",
      hkdata:
        "防疫思政直播课作业二：请同学们谈谈观后感，特别是结合第一题，谈一下自己还能做些什么？",
      ddl: "2020-4-19",
      hkname:"",
      hks:[]
    };
  },
  mounted() {
    this.getIsSubmit();
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      let hkname = localStorage.getItem("HomeWorkName");
      let form = new FormData();
      form.append("HomeWorKName", hkname);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios
        .post("/consumer/getStudentHomeWork/", form, config)
        .then(res => {
          console.log(res.data);
          let data=new Object();
          data=res.data.YourHomeWork;
          let len = data.length;
          for(let i=0;i<len;i++){
            let oldDate = new Date(data[i].homeWorkTime);
            let hk ={
              tag:data[i].homeWorkP,
              ddl: oldDate.getFullYear() +
                "-" +
                (oldDate.getMonth() + 1) +
                "-" +
                oldDate.getDate(),
                filename:data[i].homeWorkI
            }
            that.hks.push(hk)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getIsSubmit() {
      this.isSubmit = localStorage.getItem("isSubmit");
    },
     filterTag(value, row) {
      return row.tag === value;
    },
    toSubmithk() {
      this.$router.push({ path: "/submit" });
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
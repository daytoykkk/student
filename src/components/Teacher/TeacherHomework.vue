<template>
  <div>
    <el-table :data="homework" style="width: 100%" height="310" empty-text="暂无作业">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="500" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column sortable prop="ddl" label="截止日期" width="180"></el-table-column>
      <el-table-column sortable prop="finishNumber" label="提交人数" width="120"></el-table-column>
      <el-table-column label="操作">
       <template slot-scope="scope">
          <el-button size="mini" @click="toHomeWork(scope.row)">查看详情</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-button
      type="warning"
      plain
      style="margin-top:20px;margin-left:38%;cursor:pointer;"
      @click="posthk()"
    >发布作业</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homework: []
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    posthk() {
      this.$router.push({ path: "/newhomework" });
    },
    toHomeWork(data) {
      localStorage.setItem("HomeWorkName",data.title);
      localStorage.setItem("HomeWorkK",data.courseName);
      this.$router.push({ path: "/teacherhkmsg" });
    },
    getMsg() {
      let that = this;

      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      let form = new FormData();
      form.append("PK", "高等数学");
      this.$axios
        .post("/consumer/FindHomeWork/", form, config)
        .then(res => {
          let data = new Object();
          data = res.data.H;
          let len = data.length;
          for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].pTime);
            let newDate =
              oldDate.getFullYear() +
              "-" +
              (oldDate.getMonth() + 1) +
              "-" +
              oldDate.getDate();
            let hk = {
              title: data[i].pL,
              ddl: newDate,
              finishNumber: data[i].pT,
              Id: data[i].pId,
              courseName: data[i].pK
            };
            that.homework.push(hk);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<template>
  <div>
    <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
      <template v-for="(course,index) in courses">
        <el-tab-pane :label="course.coursename" :name="JSON.stringify(index)" :key="index">
          <el-table :data="tableData" style="width: 100%" empty-text="暂无作业">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="作业名称" width="300"></el-table-column>
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
                  :type="scope.row.tag === '未提交' ? 'danger' : 'success'"
                  disable-transitions
                >{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="作业评分" width="180"></el-table-column>
            <el-table-column prop="more" label="查看详情">
              <template slot-scope="scope">
                <el-button @click="toHkmsg(scope.row.name)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courses: [],
      tableData: [],
      activeName: "0"
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      this.$axios("/consumer/getStudentK/")
        .then(res => {
          let data = new Object();
          data = res.data.AllKe2;
          let len = data.length;
          for (let i = 0; i < len; i++) {
            let course = {
              coursename: data[i].kN
            };
            that.courses.push(course);
          }

          if (len != 0) {
            let form = new FormData();
            form.append("Ke", that.courses[0].coursename);
            that.tableData = [];
            this.$axios
              .post("/consumer/getStudentKOne/", form, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              })
              .then(res => {
                let data = new Object();

                data = res.data.AllHomeWork2;
                let len = data.length;
                for (let i = 0; i < len; i++) {
                  let oldDate = new Date(data[i].pTime);
                  let hk = {
                    name: data[i].pL,
                    ddl:
                      oldDate.getFullYear() +
                      "-" +
                      (oldDate.getMonth() + 1) +
                      "-" +
                      oldDate.getDate(),
                    tag: data[i].pK,
                    score: data[i].pT,
                    more: ""
                  };
                  that.tableData.push(hk);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    toHkmsg(name) {
      localStorage.setItem("HomeWorkName", name);
      this.$router.push({ path: "/hkmsg" });
    },
    handleClick(tab, event) {
      let that = this;
      let form = new FormData();
      form.append("Ke", tab.label);
      that.tableData = [];
      this.$axios
        .post("/consumer/getStudentKOne/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          console.log(res.data);
          let data = new Object();

          data = res.data.AllHomeWork2;
          let len = data.length;
          for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].pTime);
            let hk = {
              name: data[i].pL,
              ddl:
                oldDate.getFullYear() +
                "-" +
                (oldDate.getMonth() + 1) +
                "-" +
                oldDate.getDate(),
              tag: data[i].pK,
              score: data[i].pT,
              more: ""
            };
            that.tableData.push(hk);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
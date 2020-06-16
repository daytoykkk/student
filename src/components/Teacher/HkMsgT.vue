<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix main-title">
        <div class="hk-title">
          <span>作业详情</span>
          <p class="p-ddl">
            <i class="el-icon-time"></i>
            截止时间: {{ddl}}
          </p>
        </div>
        <el-button type="primary" icon="el-icon-edit">上传答案</el-button>
      </div>
      <div class="text item">{{hkdata}}</div>
    </el-card>

    <p style="font-size:1.4em;margin-left:10%;margin-top:3em;">作业提交情况</p>
    <el-table :data="tableData" style="width: 80%;margin-left:10%;">
      <el-table-column prop="number" label="学号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="homework" label="作业"></el-table-column>
      <el-table-column prop="score" label="评分">
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.score"
            @blur="handleEdit(scope.$index, scope.row.score)"
            style="width:8em;"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hkdata:
        "防疫思政直播课作业二：请同学们谈谈观后感，特别是结合第一题，谈一下自己还能做些什么？",
      ddl: "2020-4-19",
      tableData: [
        {
          number: "2020053001",
          name: "张三",
          homework: "上海市普陀区金沙江路 1518 弄",
          score: "10"
        },
        {
          number: "2020053002",
          name: "里斯",
          homework: "上海市普陀区金沙江路 1518 弄",
          score: ""
        },
        {
          number: "2020053003",
          name: "蟹壳",
          homework: "上海市普陀区金沙江路 1518 弄",
          score: ""
        },
        {
          number: "2020053004",
          name: "喻言",
          homework: "上海市普陀区金沙江路 1518 弄",
          score: ""
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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


<template>
  <div>
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
    <el-button @click="getMsg()">作业</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted(){
        this.getHk()
  },
  methods: {
      getHk(){
        let that=this;
        that.tableData=JSON.parse(localStorage.getItem("AllHk"));
      },
    filterTag(value, row) {
      return row.tag === value;
    },
    toHkmsg(name) {
      localStorage.setItem("HomeWorkName", name);
      this.$router.push({ path: "/hkmsg" });
    }
  }
};
</script>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%" empty-text="暂无作业">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="作业名称" width="300"></el-table-column>
      <el-table-column prop="ddl" label="截止时间" width="150" sortable></el-table-column>
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
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="作业评分" width="180"></el-table-column>
      <el-table-column prop="more" label="查看详情">
        <template slot-scope="scope">
          <el-button @click="toHkmsg(scope.$index)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    toHkmsg(index) {
      let that=this;
      localStorage.setItem("hkmsgS", JSON.stringify(that.tableData[index]));
     
      setTimeout(function(){
        that.$router.push({ path: "/hkmsg" });
      },500)
    }
  }
};
</script>
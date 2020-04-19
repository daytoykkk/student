<template>
<div>
     <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" router>
         <el-menu-item v-for="(course,index) in courses" :key="index" index="/hktable">
         {{course.name}}
         </el-menu-item>
          
     </el-menu>

     <div>
         <router-view></router-view>
     </div>
</div>
     
</template>
<script>
  export default {
    data() {
      return {
        courses:[
            {
                name:"数学"
            },
            {
                name:"英语"
            },
            {
                name:"C++"
            }
        ],
        path:'/hktable'
      };
    },
    methods: {
      
    }
  };
</script>
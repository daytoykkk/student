<template>
  <div id="app" style="width:100%;">
    <Topmenu></Topmenu>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import Topmenu from "./components/Topmenu";
export default {
  components: {
    Topmenu
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      console.log("加载");
      this.isRouterAlive = false;
      let job = localStorage.getItem("LoginJob");
      if (job == "") {
        this.$router.push({ path: "/" });
      } else if (job == "S") {
        this.$router.push({ path: "/home" });
      } else if (job == "T") {
        this.$router.push({ path: "/teacher" });
      }
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  created: function() {
    let job = localStorage.getItem("LoginJob");
    if (job == "") {
      this.$router.push({ path: "/" });
    } else if (job == "S") {
      this.$router.push({ path: "/home" });
    } else if (job == "T") {
      this.$router.push({ path: "/teacher" });
    }
  }
};
</script>

<style scoped>
</style>

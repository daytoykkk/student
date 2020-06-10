<template>
  <div class="main">
    <div class="up">
      <div class="upup">
        <img src="../../assets/upbook.png" />
      </div>
      <p>上传资料</p>
    </div>
    <div class="up" style="margin-left: 40px;">
      <div class="upup">
        <img src="../../assets/zhibo.png" />
      </div>
      <p>直播间</p>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}
.up{
    text-align: center;
}
.upup {
  border: 2px solid #7683ae;
  border-radius: 20px;
  width: 250px;
  height: 160px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}
.upup img {
  width: 100px;
  height: auto;
  margin-top: 30px;
}
.upup img:hover {
  filter: alpha(Opacity=80);
  -moz-opacity: 0.7;
  opacity: 0.7;
}
p {
  font-size: 1.2em;
}
</style>
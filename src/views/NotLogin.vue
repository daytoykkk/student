<template>
  <div class="all">
    <div class="rabit" style="margin-left:5em;margin-top:2em;width:150px;height:330px;"></div>

    <div class="main">
      登陆以解锁更多信息
      <center>
        <div class="logo" style="height:100px;display:flex;margin-top:200px">
          <div class="logop" style="width:95px;height:95px"></div>
          <p>Vanilla sirloin</p>
        </div>
        <hr />
      </center>
    </div>
    <div class="pkq" style="width:180px;height:90px;margin-top:500px;margin-left:250px"></div>
  </div>
</template>

<style scoped>
.all {
  display: flex;
  background: url("../assets/bk.png") no-repeat;
}
.rabit {
  background: url("../assets/rabit.png") no-repeat;
  -webkit-background-size:100% 100%;
}
.logop {
  background: url("../assets/logo.png") no-repeat;
  -webkit-background-size:100% 100%;
}
.pkq {
  background: url("../assets/pkq.png") no-repeat;
  -webkit-background-size:100% 100%;
}
.main {
  width: 20%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border: 2px solid #99b2e8;
  border-radius: 20px;
  margin-top: 80px;
  margin-left: 25.5%;
  box-shadow: 0 2px 12px 0 rgba(100, 110, 245, 0.541);
  background: #f5f8f8;
}
#logo {
  width: 100px;
  height: 100px;
  margin-left: 3em;
}
p {
  font-size: 1.2em;
  margin-top: -1em;
}
hr {
  border: 0;
  height: 3px;
  background-image: linear-gradient(
    to right,
    rgba(144, 204, 221, 0.1),
    rgba(118, 131, 174, 0.3),
    rgba(144, 204, 221, 0.1)
  );
}
</style>
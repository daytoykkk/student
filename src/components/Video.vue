<template>
  <div class="mainDialog">
    <div id="daoSelf">
      <p style="margin-left:2em">群聊</p>
    </div>

    <!--对话框-->
    <div id="chatShow" ref="chatShow">
      <div class="msg" v-for="(i,index) in list" :key="index">
        <!--左边-->
        <div class="user-msg-left" v-if="i.user_id!=userId">
          <div class="left-tx">
            <img :src="i.user_icon" />
          </div>
          <div class="left-msg">
            <p style="margin-bottom:-0.1em;">{{i.user_name}}</p>
            <div class="lll">{{i.msg}}</div>
          </div>
        </div>

        <!--右边-->
        <div class="user-msg-right" v-else>
          <div class="right-msg">
            <p style="margin-bottom:-0.1em;float:right;margin-right:0.5em;">{{i.user_name}}</p>
           <br>
            <div class="rrr">{{i.msg}}</div>
          </div>

          <div class="left-tx">
            <img :src="i.user_icon" />
          </div>
        </div>
      </div>
    </div>

    <!--发送框-->
    <div id="chatSend" style="border-top:1px solid cadetblue;">
      <div id="fasong">
        <textarea
          style="position:relative;z-index:100;width:98%"
          ref="sendMsg"
          v-model="contentText"
          @keyup.enter="sendText()"
          cols="123"
          rows="4"
          placeholder="Type your message..."
        ></textarea>
      </div>

      <a href="#" @click="sendText();">
        <img src="../assets/send.png" style="margin-top:10%;width:1.2em;height:1.2em;" />
      </a>
      <a href="#" @click="tolast();">
        <img src="../assets/tuichu.png" style="margin-top:10%;width:1.2em;height:1.2em;" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.mainDialog {
  border: 2px solid cadetblue;
  border-radius: 20px;
  width: 70%;
  margin-left: 15%;
}
#daoSelf {
  display: flex;
  border-bottom: 1px solid cadetblue;
}
#chatShow {
  height: 29em;
  overflow-y: auto;
  padding-left: 2em;
  padding-right: 2em;
}
.left-tx {
  align-content: center;
}
.left-tx p {
  color: #babfc4;
  font-size: 1em;
}
.left-tx img {
  height: 3em;
  width: 3em;
  border-radius: 50%;
}
.left-msg {
  padding: 0.5em;
  margin-top: -1.5em;
}
.left-img {
  background-color: rgb(238, 238, 238);
  border-radius: 0.5em;
  padding: 0.5em;
  margin-left: 0.7em;
}
.left-img img {
  height: 8em;
  width: auto;
}
.right-msg {
  padding: 0.5em;
  margin-top: -1.5em;
}
.rrr {
  float:right;
  color: white;
  font-size: 1.2em;
  background-color: #2683f5;
  border: none;
  resize: none;
  border-radius: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2em;
  max-width: 20em;
}
.lll {
  font-size: 1.2em;
  background-color: rgb(238, 238, 238);
  border: none;
  resize: none;
  border-radius: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2em;
  max-width: 20em;
}
.right-img {
  background-color: #2683f5;
  border-radius: 0.5em;
  padding: 0.5em;
  margin-right: 0.7em;
}
.right-img img {
  height: 8em;
  width: auto;
}
.user-msg-left {
  display: flex;
  margin-top: 1.5em;
}
.user-msg-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5em;
}
#chatSend {
  height: 7em;
  display: flex;
}
#chatSend a {
  font-size: 1.8em;
  margin-left: 2%;
  margin-top: 4%;
}
#fasong {
  width: 85%;
}
#fasong textarea {
  font-size: 1.5em;
  outline: none;
  resize: none;
  border: none;
}
</style>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      ws: null,
      userId: "",
      list: [],
      contentText: "",
      job: ""
    };
  },
  mounted() {
    this.getUserMsg();
    this.initWebSocket();
    this.getMsg();
  },
  methods: {
    getUserMsg() {
      this.job = sessionStorage.getItem("LoginJob");
      this.userId = localStorage.getItem("id");
    },
    scrollBottom() {
      let el = this.$refs["chatShow"];
      el.scrollTop = el.scrollHeight;
    },
    sendText() {
      let _this = this;
      if (!_this.contentText || _this.contentText == "\n") {
        alert("不能发空消息！");
        return;
      }
      let form = new FormData();
      form.append("LiaoN", _this.contentText);
      if (_this.job == "T") {
        this.$axios
          .post("/consumer/setTeacherL/", form, {
            "Content-Type": "application/x-www-form-urlencoded"
          })
          .then(res => {
            console.log(res.data);
            let xinxi = new Object();
            xinxi = res.data.T;
            _this.userId = xinxi.teacherId;
            _this.$refs["sendMsg"].focus();
            let params = {
              msg: _this.contentText,
              user_id: _this.userId,
              user_name: xinxi.teacherName,
              job: _this.job,
              user_icon:
                "http://111.230.173.74:7001/consumer/showEInvoiceP" +
                "?Name=" +
                xinxi.teacherFace
            };
            _this.ws.send(JSON.stringify(params));
            _this.contentText = "";
            console.log(params);
            setTimeout(() => {
              _this.scrollBottom();
            }, 100);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$axios
          .post("/consumer/setStudentL/", form, {
            "Content-Type": "application/x-www-form-urlencoded"
          })
          .then(res => {
            let xinxi = new Object();
            xinxi = res.data.S;
            _this.userId = xinxi.studentId;
            _this.$refs["sendMsg"].focus();
            let params = {
              msg: _this.contentText,
              user_id: _this.userId,
              user_name: xinxi.studentName,
              job: _this.job,
              user_icon:
                "http://111.230.173.74:7001/consumer/showEInvoiceP" +
                "?Name=" +
                xinxi.studentFace
            };
            _this.ws.send(JSON.stringify(params));
            _this.contentText = "";
            console.log(params);
            setTimeout(() => {
              _this.scrollBottom();
            }, 100);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    initWebSocket: function() {
      let _this = this;
      var ws = new WebSocket("ws://111.230.173.74:7004/websocket/test");
      _this.ws = ws;

      ws.onopen = function(e) {
        console.log("服务器连接成功");
      };
      window.onbeforeunload = function(event) {
        alert("您确定离开该网页吗？");
        console.log("关闭WebSocket连接！");
        let send_msg = {
          msg: this.contentText,
          type: 0,
          is_online: 0
        };
        _this.contentText = "";
        ws.send(JSON.stringify(send_msg));
      };
      ws.onerror = function() {
        this.reload();
      };
      ws.onmessage = function(e) {
        let res = eval("(" + e.data + ")");
        console.log(res);
        _this.list.push({
          user_icon: res.user_icon,
          msg: res.msg,
          user_name: res.user_name,
          user_id: res.user_id
        });

        setTimeout(() => {
          _this.scrollBottom();
        }, 100);
      };
    },
    getMsg() {
      let that = this;
      this.$axios
        .get("/consumer/getL/")
        .then(res => {
          console.log(res.data);
          let Msg = new Object();
          Msg = res.data.Liao;
          console.log(Msg);
          let len = Msg.length;
          for (let i = 0; i < len; i++) {
            let form = new FormData();
            form.append("Id", Msg[i].liaoP);

            if (Msg[i].liaoT == "T") {
              this.$axios
                .post("/consumer/getTeacherL/", form, {
                  "Content-Type": "application/x-www-form-urlencoded"
                })
                .then(res => {
                  let xinxi = new Object();
                  xinxi = res.data.TeacherName;
                  that.list.push({
                    user_icon:
                      "http://111.230.173.74:7001/consumer/showEInvoiceP" +
                      "?Name=" +
                      xinxi.teacherFace,
                    msg: Msg[i].liaoN,
                    user_name: xinxi.teacherName,
                    user_id: xinxi.teacherId
                  });
                });
            } else {
              this.$axios
                .post("/consumer/getStudentL/", form, {
                  "Content-Type": "application/x-www-form-urlencoded"
                })
                .then(res => {
                  let xinxi = new Object();
                  xinxi = res.data.StudentName;
                  that.list.push({
                    user_icon:
                      "http://111.230.173.74:7001/consumer/showEInvoiceP" +
                      "?Name=" +
                      xinxi.studentFace,
                    msg: Msg[i].liaoN,
                    user_name: xinxi.studentName,
                    user_id: xinxi.studentId
                  });
                });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });

      setTimeout(() => {
        this.scrollBottom();
      }, 300);
    },
    tolast(){
      history.back(-1);
    }
  }
};
</script>
<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="3">
          <div class="grid-content" style="border-right: 1px solid snow">
            <span>成绩管理系统v1.0.0</span>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content">
            <el-col :span="8">
              <div  @click="logout" class="grid-content" style="text-align: left;padding-left: 10px;font-size: 14px">当前登陆的用户: <span class="username">{{nickname}}</span><img src="@/assets/icon/退出.svg" alt="退出" id="quit"></div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
              <div>当前时间：{{vueTime}}</div>
            </el-col>
          </div>
        </el-col>

      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="3">
          <div style="height: 700px;background-color: rgb(77, 80, 85);margin-left: -20px;margin-top: -20px">
            <el-aside style="width: 100%;">
              <el-menu
                  default-active="2-1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  text-color="white"
                  :router="false"
                  background-color="rgb(77, 80, 85)"
                  active-text-color="#ffd04b">
                <el-menu-item index="1" @click.native="analysis">
                  <i class="el-icon-location"></i>
                  <span>学生数据分析</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>学生信息管理</span>
                  </template>
                  <el-menu-item index="2-1" @click.native="student">
                    <i class="el-icon-user"></i>
                    <span slot="title">全部学生</span>
                  </el-menu-item>
                  <el-menu-item index="2-2" @click.native="_class">
                    <i class="el-icon-s-management"></i>
                    <span slot="title">班级管理</span>
                  </el-menu-item>
                  <el-menu-item index="2-3" @click.native="courseraGo">
                    <i class="el-icon-document"></i>
                    <span slot="title">课程管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="3" @click.native="score">
                  <i class="el-icon-delete"></i>
                  <span slot="title">已删除学生</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
          </div>
        </el-col>
        <el-col :span="21">
          <el-main>
              <router-view></router-view>
          </el-main>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Student from "@/views/allStudent/student";
import {getMultiplicationClassname} from "@/network/classroom";

export default {
  name: "index",
  created() {
    let temp = []
    let tempDict = {}
  },
  components: {Student},
  activated() {
    if (this.$store.state.classList.length === 0){
      let temp = []
      let tempDict = {}
      this.options = this.$store.state.classList
      console.log(this.$store.state.showClass)
      getMultiplicationClassname().then(res => {
        res.forEach((ele, index, array)=> {
          tempDict["value"] = ele["c_name"]
          tempDict["id"] = ele["id"]
          temp.push(tempDict)
          tempDict = {}
        })
      })
      this.$store.commit("mutaUpdateClassList", temp)
    }

    if (sessionStorage.username === "" || sessionStorage.username === undefined || sessionStorage.username === 'undefined'){
      this.$router.push("/login")
    }
    this.nickname = sessionStorage.nickname
  },

  mounted() {
    // window.addEventListener('keydown', function (e){
    //   if (e.keyCode === 17){
    //     alert("我们不建议缩放网页,当前大小呈现的效果是最好的,请松开您宝贵的Ctrl键")
    //   }
    // })
    if (sessionStorage.username === "" || sessionStorage.username === undefined || sessionStorage.username === 'undefined'){
      this.$router.push("/login")
    }
    this.nickname = sessionStorage.nickname
    this.nowTime()
    setInterval(() => {
      this.nowTime()
    }, 1000)
  },
  data(){
    return{
      vueTime: "",
      nickname: ""
    }
  },
  methods:{
    logout(){
      sessionStorage.clear()
      location.reload()
    },
    score(){
      this.$router.push("score")
    },
    courseraGo(){
      this.$router.push("coursera")
    },
    _class(){
      this.$router.push("_class")
    },
    student(){
      this.$router.push("student")
    },
    // 数据分析页
    analysis(){
      // alert("前往数据分析页")
      this.$router.push("analysis")
    },
    nowTime(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let min = date.getMinutes()
      let seconds = date.getSeconds()
      seconds = seconds >= 10?seconds:'0' + seconds
      hour = hour >= 10?hour:'0' + hour
      this.vueTime =  year + "年 " + month + "月 " + day + "日 " + hour + ":" + min + ":" + seconds
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{

  }
}
</script>

<style scoped>
.el-container{
  height: 100vh;
  overflow: hidden;
  padding: 0;
}
.el-header, .el-footer {
  background-color: rgb(77, 80, 85);
  box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, .6);
  color: white;
  text-align: center;
  line-height: 60px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-main{
  max-height: 100vh;
  /*height: 60px;*/
  overflow: hidden;
}
.username{
  color: #e7be64;
}
.el-aside{

}
#quit{
  position: relative;
  margin-left: 10px;
  height: 18px;
  top: 3px;
}
#quit:hover{
  cursor: pointer;
}
*::-webkit-scrollbar { /*滚动条整体样式*/
  width: 5px!important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}

*::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ebebeb;
}

*::-webkit-scrollbar-track { /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  border-radius: 10px;
  background: #fff;
}
</style>
<template>
  <div id="app">
    <transition name="el-zoom-in-top">
      <div class="form-control" v-show="is_login" style="transition: .2s all ease-out">
        <el-form ref="ruleForm" label-width="80px" :rules="rules" :model="loginForm">
          <h2>成绩管理系统登陆</h2>
          <el-row style="margin-top: 30px">
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入管理员账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"
                          placeholder="请输入管理员密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button style="width: 30%;position: relative;left: 16px" @click="loginRequest">
                登陆
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span style="display: block;position: relative;top: 10px;font-size: 14px" id="goRegister"
                    @click="triggerForm('register')">没有账号?去注册</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div class="form-control register" style="transition: .2s all ease-in" v-show="is_register">
        <el-form :rules="rules" :model="registerForm" ref="register" label-width="60px">
          <h2>管理员注册</h2>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="registerForm.username" placeholder="请输入管理员账号" @blur="checkUsername"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入管理员密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="昵称">
                <el-input type="text" v-model="registerForm.nickname" placeholder="昵称" @blur="checkNickname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="性别" prop="gender">
                <el-input type="text" v-model="registerForm.gender" placeholder="性别" @blur="checkGender"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="电话" prop="mobile">
                <el-input type="text" v-model="registerForm.mobile" placeholder="电话" @blur="checkPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="content"></div>
            </el-col>
            <el-col :span="14">
              <el-form-item label="邮箱">
                <el-input type="text" v-model="registerForm.email" placeholder="邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button style="width: 30%;" @click="registerRequest">注册</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="24">
              <span @click="triggerForm('')" style="font-size: 14px" id="goLogin">已有账号?登陆</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {login, register} from "@/network/login"
import {checkMobile} from "@/network/check"
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      is_login: true,
      is_register:false,
      loginForm: {
        username: "",
        password: ""
      },
      registerForm: {
        username: "",
        nickname: "",
        password: "",
        gender: "",
        mobile: "",
        email: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 6, max: 6, message: '长度必须是 6 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 12, message: '长度介于4-12之间', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: "性别不能为空", trigger: "blur"}
        ],
        mobile: [
          {required: true, message: "手机号不能为空", trigger: "blur"},
          {min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur"}
        ]
      }
    }
  },
  methods:{
    checkPhone(){
      checkMobile(this.registerForm.mobile, 1).then(res => {
        if (res === "exists"){
          this.registerForm.mobile = ""
          this.$message({
            message: "该手机已被注册",
            type: "error"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkNickname(){
      checkMobile(this.registerForm.nickname, 2).then(res => {
        if (res === "exists"){
          this.registerForm.nickname = ""
          this.$message({
            message: "这个名字已经被注册啦",
            type: "error"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkUsername(){
      checkMobile(this.registerForm.username, 3).then(res => {
        if (res === "exists"){
          this.registerForm.username = ""
          this.$message({
            message: "此账号已被注册",
            type: "error"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loginRequest(){
      // axios.post("http://127.0.0.1:8000/authorizations/", {
      //   "username": "admins",
      //   "password": "admins"
      // }).then(res => {
      //   console.log(res.data)
      //   sessionStorage.token = res.data["token"]
      //   sessionStorage.username = res.data["username"]
      //   this.$router.push("/")
      // })
      login(this.loginForm).then(res => {
        if (res !== "error"){
          console.log(res.message === "success")
          sessionStorage.setItem("username", res.username)
          console.log(res.username)
          sessionStorage.setItem("nickname", res.nickname)
          sessionStorage.setItem("token", res.token)
          console.log(res)
          this.$router.push("/")
        }else {
          this.$message({
            message: "账号或密码错误",
            type: "error"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    registerRequest(){
      console.log(this.registerForm)
      register(this.registerForm).then(res => {
        if (res !== "failed"){
          this.$message({
            message: "注册成功,为您切换至登陆页面",
            duration: 2400,
            type: "success"
          })
          console.log(res)
          document.getElementById("goLogin").click()
          return
        }
        this.$message({
          message: "注册失败,请检查输入",
          type: "error",
          duration: 2400
        })
      }).catch(err => {
        console.log(err)
      })
    },
    triggerForm(options){
      if (options === "register"){
        this.is_register = true
        this.is_login = false
      }else {
        this.is_register = false
        this.is_login = true
      }
    },
    checkGender(){
      if (this.registerForm.gender === ""){
        return
      }
      if (this.registerForm.gender !== "男" && this.registerForm.gender !== "女"){
        this.$message({
          message:"请输入有效的性别！",
          type: "warning"
        })
        this.registerForm.gender = ""
      }
    },
  }
}
</script>

<style scoped>
#app {
  background-image: url("./background/classroom.png");
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.form-control {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 290px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, .4);
  box-shadow: 0 15px 24px rgba(0, 0, 0, .6);
  /*box-shadow: 0 15px 24px rgba(255, 255, 255, .6);*/
}

.content {
  width: 1px;
  height: 1px;
}

#goRegister {
  transition: .4s color ease-in;
}

#goRegister:hover {
  color: deepskyblue;
}

.register {
  height: 540px;
}
#goLogin{
  transition: .4s color ease-in;
}
#goLogin:hover{
  color: deepskyblue;
}
</style>
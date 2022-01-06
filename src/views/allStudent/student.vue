<template>
  <transition name="el-fade-in-linear">

  <div v-show="show" style="transition: .6s all linear;">
    <el-dialog
        :title="operationTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="入学日期">
          <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
          style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idCart"></el-input>
        </el-form-item>
        <el-form-item label="学生性别">
          <el-input v-model="form.gender" @blur="checkGender" placeholder="男/女"></el-input>
        </el-form-item>
          <el-form-item
              label="年龄"
              prop="age"
              :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          >
            <el-input type="age" v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="学生班级">
          <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form._class"
              :fetch-suggestions="querySearch"
              placeholder="请选择班级"
              style="width: 100%;"
              @blur="checkClass"
              @select="handleSelect">
            <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="学生住址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyCommit()">确 定</el-button>
  </span>
    </el-dialog>
    <el-row>
      <el-col :span="2">
        <div class="grid-content">
          <el-button type="primary" @click="processOperation('add')">添加学生</el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="success" round @click="saveStudentData('student')">导出为excel</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">

        </div>
      </el-col>
      <el-col :span="4">
        <el-input
            size="medium"
            placeholder="请输入学生姓名"
            suffix-icon="el-icon-search"
            v-model="input">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" :loading="false" size="medium" @click.native="searchStudent">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
          :data="tableData"
          border
          height="600"
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%">
        <el-table-column
            prop="join_school"
            sortable
            fixed
            label="入学日期"
            width="210">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="80">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="70">
        </el-table-column>
        <el-table-column
            sortable
            prop="belong_class"
            label="班级"
            width="160">
        </el-table-column>
        <el-table-column
            sortable
            prop="idCart"
            label="身份证号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="家庭住址"
            width="320">
          <template slot-scope="scope"><div @click="processMessage(scope.row)">{{scope.row.address}}</div></template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="234"
        >
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="processOperation('modify', scope.row.id)">修改</el-button>
            <el-popconfirm
                title="确定删除该学生么？"
                @confirm="deleteStudent(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="small" style="margin-left: 5px">删除</el-button>
            </el-popconfirm>
            <el-button size="small" style="margin-left: 5px" @click="showScore(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          layout="prev, pager, next"
          @current-change="handlerCurrentChange"
          :total="pageTotalCount * 10" style="position: fixed;bottom: 35px;left: 50%;transform: translateX(-30%)">
      </el-pagination>
    </el-row>
    <el-drawer
        title="详情信息"
        :size="'100%'"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleCloseDraw">
      <div id="drawerMain">
        <el-upload
            class="upload-demo"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :action="API.BASE_SERVER_URL + 'headers/' + studentId + '/'">
          <div id="upload">
          </div>
        </el-upload>
        <el-avatar shape="square" :size="180" :src="squareUrl" style="position: absolute;left: 100px" @click.native="uploadHeader"></el-avatar>
        <div id="message">
          <div>姓名: <span class="innerMessage">{{studentMessage.name}}</span></div>
          <div>性别: <span class="innerMessage">{{studentMessage.gender}}</span></div>
          <div>班级: <span class="innerMessage" style="width: 300px">{{studentMessage.belong_class}}</span></div>
          <div>学号: <span class="innerMessage">{{studentMessage.id}}</span></div>
          <div>身份证号: <span class="innerMessage">{{studentMessage.idCart}}</span></div>
        </div>
        <div id="score">
          <table cellspacing="0">
            <thead>
            <tr>
              <th>
                课程名
              </th>
              <th>
                成绩
              </th>
              <th>
                是否合格
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in studentMessage.belong_student">
              <td>
                {{item.coursera_id}}
              </td>
              <td>
                {{item.grade}}
              </td>
              <td>
                {{is_qualified(item.is_qualified)}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="echarts" ref="myecharts"></div>
        <div id="echarts2" ref="myecharts2"></div>
      </div>
    </el-drawer>
  </div>
  </transition>
</template>

<script>
import {getStudent, getStudentMessage, deleteStudent, modifyStudent} from "@/network/student"
import {getMultiplicationClassname} from "@/network/classroom";
import {saveData, search} from "@/network/analysis";
import * as echarts from "echarts"
export default {
  name: "student",
  created() {
    getStudent(this.currentPage, this.pageSize).then(res => {
      this.tableData = res.data
      this.pageTotalCount = res.allCount
      console.log(res.data)
      this.tableData.forEach(ele => {
        let time = ele["join_school"].split("T")
        ele["join_school"] = time[0] + " " + time[1].replace("Z", "")
            console.log(ele["join_school"])
      })
    })
  },
  mounted() {
    this.show = true
    let temp = []
    let tempDict = {}
    getMultiplicationClassname().then(res => {
      res.forEach(ele => {
        tempDict["value"] = ele["c_name"]
        temp.push(tempDict)
        tempDict = {}
      })
    })
    this.restaurants = temp;
    // this.$store.dispatch("updateClassList", this.restaurants)
    console.log("data is ", this.restaurants)
  },
  activated() {

  },
  data(){
    return{
      lineData: [],
      studentMessage:"",
      studentId:"",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      drawerData:{},
      drawer: false,
      direction: 'rtl',
      pageSize:8,
      currentPage:1,
      pageTotalCount:"",
      tableData:"",
      restaurants: [],
      state: '',
      operationTitle:"",
      tips:"",
      form:{
        date:"",
        name:"",
        gender:"",
        age:"",
        _class:"",
        address:"",
        id:"",
        opType:"",
        idCart: ""
      },
      dialogVisible:false,
      show:false,
      input:"",
      echartsData:[],
      lineScore: []
    }
  },
  methods:{
    searchStudent(){
      if (this.input === ""){
        getStudent(this.currentPage, this.pageSize).then(res => {
          this.tableData = res.data
          this.pageTotalCount = res.allCount
          console.log(res.data)
          this.tableData.forEach(ele => {
            let time = ele["join_school"].split("T")
            ele["join_school"] = time[0] + " " + time[1].replace("Z", "")
            console.log(ele["join_school"])
          })
        })
      }
      else {
        search(this.input).then(res => {
          this.tableData = res
          this.pageTotalCount = res.allCount
          console.log(res)
          this.tableData.forEach(ele => {
            let time = ele["join_school"].split("T")
            ele["join_school"] = time[0] + " " + time[1].replace("Z", "")
            console.log(ele["join_school"])
          })
        })
      }
    },
    saveStudentData(flag){
      saveData(flag).then(res => {
        var downloadElement = document.createElement('a')
        downloadElement.href = this.API.BASE_SERVER_URL + res
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
      })
    },
    modifyCommit(){
      modifyStudent(this.form).then(res => {
        if (res === "success"){
          this.dialogVisible = false
          this.$message({
            message: this.tips,
            type:"success"
          })
          location.reload()
        }else {
          this.dialogVisible = false
          this.$message({
            message: "修改失败",
            type:"error"
          })
        }
      })
    },
    lineDrawer(){
      let MyEcharts = echarts.init(document.getElementById("echarts2"))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['条形呈现', '折现呈现']
        },
        xAxis: [
          {
            type: 'category',
            data: this.lineData,
            boundaryGap:true,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          },

        ],
        series: [
          {
            name: '条形呈现',
            type: 'bar',
            data: this.lineScore,
            label: {
              show: true
            },
          },
          {
            name: '折现呈现',
            type: 'line',
            data: this.lineScore,
            markPoint:{
              data: [
                {
                  type: "max",
                  name: "折现呈现",
                },
                {
                  type: "min",
                  name: "折现呈现"
                }
              ]
            },
            markLine:{
              data:[
                {
                  type: "average",
                  name: "平均总分"
                }
              ]
            },
            label: {
              show: true
            },
          },

        ],
        dataZoom: [
          {
            "show": true,
            "type": "slider",
            "realtime": true,
            "start": 20,
            "end": 80,
            "orient": "horizontal",
            "zoomLock": false,
            "filterMode": "filter"
          }
        ]

      };
      MyEcharts.setOption(option)
    },
    echartsDrawer(){
      let Myecharts = echarts.init(this.$refs.myecharts)
      Myecharts.setOption({
        title:{
          text:"偏科情况"
        },
        series:[
          {
            type: "pie",
            data:this.echartsData,
            roseType: 'area'
          }
        ]
      })
    },
    uploadHeader(){
      document.getElementById("upload").click()
    },
    uploadSuccess(response, file, filelist){
      this.squareUrl = this.API.BASE_SERVER_URL + response
      sessionStorage.setItem("path", response)
      this.$message({
        message:"上传成功",
        type:"success",
        duration:1000
      })
    },
    showScore(id){
      this.lineData = []
      this.lineScore = []
      this.echartsData = []
      this.studentId = id
      this.drawer = true
      let tempData = {}
      getStudentMessage(id).then(res => {
        res.belong_student.forEach(ele => {
          tempData["value"] = ele["grade"]
          tempData["name"] = ele["coursera_id"]
          this.lineScore.push(parseInt(ele["grade"]))
          this.lineData.push(ele["coursera_id"])
          this.echartsData.push(tempData)
          tempData = {}
        })
        console.log("this", this.echartsData)

        if (res.header !== null){
          let header = res.header.split("/").reduce((pre, next) => {
            if (next !== "studentManagementSystem"){
              return pre + next + "/"
            }
            return ""
          }, "")
          this.squareUrl = this.API.BASE_SERVER_URL + header
        }else {
          this.squareUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        }
        this.studentMessage = res
        console.log(res)

        this.lineDrawer()
        this.echartsDrawer()
      }).catch(err => {
        this.$notify({
          message: "发生错误" + err,
          type: "error"
        })
      })

    },
    handleCloseDraw(done) {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      done()
    },
    handlerCurrentChange(val){
      this.currentPage = val
      getStudent(this.currentPage, this.pageSize, sessionStorage.token).then(res => {
        this.tableData = res.data
        this.pageTotalCount = res.allCount
        this.tableData.forEach(ele => {
          let time = ele["join_school"].split("T")
          ele["join_school"] = time[0] + " " + time[1].replace("Z", "")
          console.log(ele["join_school"])
        })
      })
    },
    deleteStudent(data){
      deleteStudent(data).then(res => {
        if (res === "success"){
          this.$message({
            message: "删除成功",
            type: "success"
          })
          location.reload()
        }else {
          this.$message({
            message: res.error,
            type: "error"
          })
        }
      }).catch(err => {
        this.$message({
          message: err,
          type: "success"
        })
      })
      console.log(data)
    },
    checkClass(){

    },
    handleSelect(item) {

    },
    handleIconClick(ev) {
      console.log(ev);
    },
    processOperation(operation, id){
      this.tips = "添加成功"
      if (operation === "add"){
        this.form.opType = "add"
        this.operationTitle = "添加学生到系统中"
        this.dialogVisible = true
      }
      if (operation === "modify"){
        this.tips = "修改成功"
        this.form.opType = "modify"
        getStudentMessage(id).then(res => {
          if (res){
            this.form.name = res.name
            this.form.age = res.age
            this.form.date = res.join_school
            this.form.gender = res.gender
            this.form.address = res.address
            this.form._class = res.belong_class
            this.form.id = res.id
            this.form.idCart = res.idCart
          }else {
            this.$message({
              message: "参数错误",
              type:"error"
            })
          }
        }).catch(err => {
          this.$message({
            message: "错误!" + err,
            type: "error"
          })
        })
        // get student message provide modify
        this.operationTitle = "修改学生信息"
        this.dialogVisible = true
      }
    },
    checkGender(){
      if (this.form.gender === ""){
        return
      }
      if (this.form.gender !== "男" && this.form.gender !== "女"){
        this.$message({
          message:"请输入有效的性别！",
          type: "warning"
        })
        this.form.gender = ""
      }
    },
    processMessage(message){
      console.log(message)
    },
    handleClose(done){
      this.$confirm('确认取消？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    is_qualified(data){
      if (data){
        return "是"
      }
      return "否"
    }
  }
}
</script>

<style scoped>
*::-webkit-scrollbar { /*滚动条整体样式*/
  width: 0px!important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0!important;
}
.grid-content{
  /*background-color: deepskyblue;*/
  position: relative;
  min-height: 1px;
  top: -10px;
}
#drawerMain{
  position: relative;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  /*box-shadow: 0 15px 24px rgba(0, 0, 0, .6);*/
  border-radius: 20px;
  width: 95%;
  height: 95%;
}
#message{
  position: relative;
  width: 300px;
  height: 180px;
  left: 284px;
  /*background-color: deepskyblue;*/
}
#message{
  color: gray;
  width: 500px;
  box-sizing: border-box;
  text-align: left;
  margin-left: 10px;
}
#message>div{
  width: 100%;
}
#message>div:not(:first-child){
  position: relative;
  margin-top: 20px;
}
#score{
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .6);
  position: relative;
  border-radius: 10px;
  top: 30px;
  left: 100px;
  width: 480px;
  height: 400px;
  overflow: scroll;
  /*background-color: deepskyblue;*/
}
#score>table{
  width: 100%;
  /*border: 1px solid gray;*/
}
table{
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px;
}
thead{
  text-align: center;
}
td{
  height: 45px;
  line-height: 45px;
}
.innerMessage{
  color: deepskyblue;
  display: inline-block;
  width: 100px;
}
#echarts{
  z-index: 100;
  width: 600px;
  height: 200px;
  /*background-color: deepskyblue;*/
  position: relative;
  top: -590px;
  left: 800px;
}
#echarts2{
  z-index: 101;
  width: 600px;
  height: 400px;
  /*background-color: deepskyblue;*/
  position: relative;
  top: -520px;
  left: 780px;
}
</style>
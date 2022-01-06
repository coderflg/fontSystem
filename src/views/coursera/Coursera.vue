<template>
  <el-container>
    <el-dialog
        :title="operationTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="课程名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-select v-model="form.classType" placeholder="请选择" style="width: 100%;">
            <el-option
                v-for="item in restaurants"
                :key="item.value"
                :label="item.value"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程讲师">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-select v-model="form.belong" placeholder="请选择" style="width: 100%;">
            <el-option
                v-for="item in typeList"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程学分">
          <el-input v-model="form.credit"></el-input>
        </el-form-item>
        <el-form-item label="必修/选修">
          <el-select v-model="form.compulsory" placeholder="请选择" style="width: 100%;">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.describe">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyCommit">确 定</el-button>
  </span>
    </el-dialog>
    <el-main style="margin-left: -10px">
      <el-row>
        <el-col :span="1">
          <div class="grid-content">
            <el-button @click="addCoursera('add')">添加课程</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              prop="coursera_name"
              label="课程名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="probelong"
              label="课程类型"
              width="160">
          </el-table-column>
          <el-table-column
              prop="coursera_teacher"
              label="课程讲师"
              width="120">
          </el-table-column>
          <el-table-column
              prop="be_prs"
              label="课程所属专业"
              width="120">
          </el-table-column>
          <el-table-column
              prop="is_compulsory"
              label="必修/选修"
              width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.is_compulsory">必修</div>
              <div v-else>选修</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="credit"
              label="课程学分"
              width="60">
          </el-table-column>
          <el-table-column
              prop="coursera_comment"
              label="课程描述"
          >

          </el-table-column>
          <el-table-column
              label="课程资料"
              width="160">
            <el-button size="small" @click="$message('暂时还没有资料哦')">下载</el-button>
          </el-table-column>
          <el-table-column
              label="操作"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="addCoursera('modify', scope.row.id)">修改</el-button>

              <el-popconfirm
                  title="确定删除该学生么？"
                  @confirm="deleteCoursera(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="small" style="margin-left: 5px">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handlerChange"
            layout="prev, pager, next"
            :total="totalPage * 10" style="margin-top: 10px;margin-left: -240px">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {
  getCoursera,
  addCoursera,
  getCourseraName,
  getOne,
  courseraManagerGetAllType,
  DeleteCoursera
} from "@/network/coursera";

export default {
  name: "Coursera",
  created() {

    courseraManagerGetAllType().then(res => {
      console.log("数据是", res)
      let temp = {}
      res.forEach(ele => {
        temp["value"] = ele["id"]
        temp["label"] = ele["department"]
        this.typeList.push(temp)
        temp = {}
      })
      console.log(this.typeList)
    })
    getCourseraName().then(res => {
      let temp = {}
      res.forEach(ele => {
        temp["value"] = ele["pro_name"]
        this.restaurants.push(temp)
        temp = {}
      })
    })
    getCoursera(this.currentPage, this.pageSize).then(res => {
      this.totalPage = res.pageCount
      this.tableData = res.data
      console.log(res.data)
    })
  },
  methods: {
    deleteCoursera(id){
      DeleteCoursera(id).then(res => {
        if (res === "success"){
          this.$message({
            message: "删除成功",
            type: "success"
          })
          location.reload()
        }
      })
    },
    modifyCommit() {
      console.log("data is ", this.form)
      addCoursera(this.form).then(res => {
        console.log(res)
        if (res === "addSuccess") {
          this.$message({
            message: "添加成功",
            type: "success"
          })
          location.reload()
          // return
        }
        if (res.flag === "modifySuccess") {
          this.$message({
            message: "修改成功",
            type: "success"
          })
          location.reload()
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {

    },
    handleIconClick(ev) {
      console.log(ev);
    },
    is_compulsory(flag) {
      console.log("data", flag)
      if (flag) {
        this.form.compulsory = "必修"

      } else {
        this.form.compulsory = "选修"
      }
    },
    addCoursera(operation, id) {
      if (operation === "add") {
        // this.form = {}
        this.form["opTy"] = "add"
        this.operationTitle = "添加课程"
        this.dialogVisible = true
      }
      if (operation === 'modify') {
        // this.form = {}
        this.form["opTy"] = "modify"
        this.opTy = "modify"
        this.operationTitle = "修改课程信息"
        this.dialogVisible = true
        getOne(id).then(res => {
          console.log(res)
          this.form["name"] = res.coursera_name
          this.form["classType"] = res["probelong"]
          this.form["teacher"] = res["coursera_teacher"]
          this.form["belong"] = res["be_prs"]
          this.form["describe"] = res["coursera_comment"]
          this.form["id"] = res["id"]
          this.form["credit"] = res["credit"]
          this.form["compulsory"] = res["is_compulsory"]
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认取消？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handlerChange(val) {
      this.currentPage = val
      getCoursera(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data
      })
    }
  },
  data() {
    return {
      typeList: [],
      options: [{
        value: true,
        label: '必修'
      },
        {
          value: false,
          label: "选修"
        }],
      restaurants: [],
      form: {
        id: "1",
        classType: "",
        name: "",
        teacher: "",
        belong: "",
        credit: "",
        opTy: "",
        describe: "",
        compulsory: ""
      },
      operationTitle: "",
      dialogVisible: false,
      currentPage: 1,
      pageSize: 7,
      totalPage: "",
      tableData: ""
    }
  }
}
</script>

<style scoped>
.grid-content {
  /*background-color: deepskyblue;*/
  position: relative;
  min-height: 1px;
  top: -10px;
}
</style>
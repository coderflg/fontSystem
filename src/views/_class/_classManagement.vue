<template>
  <el-container>
    <el-dialog
        :title="operationTitle"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <el-form label-position="left" label-width="130px" :model="form">
        <el-form-item label="班级名称">
          <el-input v-model="form.c_name"></el-input>
        </el-form-item>
        <el-form-item label="辅导员名称">
          <el-input v-model="form.manager"></el-input>
        </el-form-item>
        <!--          <el-input v-model="form.class_The_sorting"></el-input>-->
        <el-form-item label="班级所属分院">
          <el-select v-model="form.class_The_sorting" placeholder="请选择" style="width: 100%;">
            <el-option
                v-for="item in typeList"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级评级">
          <el-input v-model="form.Class_rating"></el-input>
        </el-form-item>
        <el-form-item label="新建日期" v-show="showDate">
          <el-date-picker
              v-model="form.created"
              type="date"
              placeholder="选择日期"
              style="width: 100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyCommit()">确 定</el-button>
  </span>
    </el-dialog>
    <el-main style="margin-left: -10px">
      <el-row>
        <el-col :span="2">
          <div class="grid-content">
            <el-button size="small" @click="createClass">添加班级</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <el-button type="success" size="small" @click="saveClassData('classroom')">导出所有为excel</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              prop="c_name"
              label="班级名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="manager"
              label="辅导员名称"
              width="160">
          </el-table-column>
          <el-table-column
              prop="count"
              label="班级人数"
              width="80">
          </el-table-column>
          <el-table-column
              prop="class_The_sorting"
              label="班级所属分院"
              width="160">
          </el-table-column>
          <el-table-column
              prop="Class_rating"
              label="班级评级"
              width="160">
          </el-table-column>
          <el-table-column
              prop="created"
              label="班级创建时间"
              sortable
              width="200"
          >

          </el-table-column>
          <el-table-column
              label="操作"
          >
            <template slot-scope="scope">

              <el-button type="warning" size="small" @click="modifyClass(scope.row.id)">修改</el-button>

              <el-popconfirm
                  title="确定删除这个班级么"
                  @confirm="deleteClass(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="small" style="margin-left: 5px">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handlerCurrentChange"
            style="position: relative;left: -425px;top: 20px"
            :total="pageTotal * 10">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {getClassroom, addClassroom, getOne, getSorting} from "@/network/classroom"
import {saveData} from "@/network/analysis";

export default {
  created() {
    getClassroom(this.currentPage, this.pageSize).then(res => {
      this.tableData = res.data
      this.tableData.forEach(ele => {
        let times = ele["created"].split("T")
        ele["count"] = ele["belong"].length
        ele["created"] = times[0] + "     " + times[1].replace("Z", "")
      })
      let temp = {}
      getSorting().then(res => {
        res.forEach(ele => {
          temp["label"] = ele["sortingName"]
          this.typeList.push(temp)
          temp = {}
        })
      })
      this.pageTotal = res.count
      console.log(this.tableData)
    }).catch(err => {
      this.$notify({
        message: JSON.stringify(err),
        type: "error"
      })
    })


  },
  name: "_classManagement",
  data() {
    return {
      typeList: [],
      showDate: false,
      form: {
        c_name: "",
        manager: "",
        Class_rating: "",
        class_The_sorting: "",
        created: "",
        op: "",
        id: "1"
      },
      dialogVisible: false,
      operationTitle: "",
      currentPage: 1,
      pageSize: 7,
      pageTotal: "",
      tableData: ""
    }
  },
  methods: {
    saveClassData(flag){
      saveData(flag).then(res => {
        var downloadElement = document.createElement('a')
        downloadElement.href = this.API.BASE_SERVER_URL + res
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement)
      })
    },
    deleteClass(id) {
      getOne(id, 'delete').then(res => {
        if (res === "success") {
          this.$message({
            message: "删除成功",
            type: "success"
          })
          setTimeout(() => {
            location.reload()
          }, 200)
        }
      })
    },
    modifyClass(id) {
      this.showDate = false
      this.operationTitle = "修改班级信息"
      this.form.id = id
      this.form.op = "modify"
      getOne(id, 'get').then(res => {
        for (let i in this.form) {
          this.form[i] = res[i]
        }
      })
      this.dialogVisible = true
    },
    modifyCommit() {
      addClassroom(this.form).then(res => {
        if (res === "success") {
          this.$message({
            message: "成功",
            type: "success"
          })
          location.reload()
        } else {
          this.$message({
            message: "失败",
            type: "error"
          })
        }
      })
    },
    createClass() {
      this.showDate = true;
      this.form.op = "add"
      this.operationTitle = "新建班级"
      // for (let item in this.form) {
      //   if (this.form[item] !== "id"){
      //     this.form[item] = ""
      //   }
      // }
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认取消？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handlerCurrentChange(val) {
      this.currentPage = val
      getClassroom(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data
        this.tableData.forEach(ele => {
          let times = ele["created"].split("T")
          ele["count"] = ele["belong"].length
          ele["created"] = times[0] + "     " + times[1].replace("Z", "")
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.grid-content {
  position: relative;
  min-height: 1px;
  top: -10px;
}
</style>
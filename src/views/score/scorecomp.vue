<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col span="1">
          <el-popconfirm
              title="是否确定？此操作不可逆"
              @confirm="deleteSelect"
          >
            <el-button slot="reference" type="danger" size="normal" style="margin-left: 5px;top: -10px;position: relative">删除选中</el-button>
          </el-popconfirm>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
              @selection-change="handleSelectionChange"
              height="600"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%;">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="入学日期"
                width="200"
                prop="join_school">
            </el-table-column>
            <el-table-column
                label="姓名"
                width="100"
                prop="name">
            </el-table-column>
            <el-table-column
                label="性别"
                width="100"
                prop="gender">
            </el-table-column>
            <el-table-column
                label="年龄"
                width="100"
                prop="age">
            </el-table-column>
            <el-table-column
                label="住址"
                width="300"
                prop="address">
            </el-table-column>
            <el-table-column
                label="班级"
                width="160"
                prop="belong_class">
            </el-table-column>
            <el-table-column
                align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleBack(scope.row.id)">找回</el-button>
                <el-popconfirm
                    title="是否确定？此操作不可逆"
                    @confirm="handleDelete(scope.$index, scope.row, scope.row.id)"
                >
                  <el-button slot="reference" type="danger" size="mini" style="margin-left: 5px">彻底删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {getDeleteStudent, ThoroughlyDelete, deleteSelection, BackStudent,} from "@/network/student";

export default {
  name: "scorecomp",
  created() {
    getDeleteStudent().then(res => {
      this.tableData = res
    })
  },
  methods: {
    deleteSelect(){
      if (this.multipleSelection.length === 0){
        this.$message({
          message: "您没有选中任何学生",
          type: "warning"
        })
        return;
      }
      deleteSelection(this.multipleSelection).then(res => {
        if (res === "success"){
          this.$message({
            message: "删除成功",
            type: "success"
          })
          location.reload()
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    handleBack(id) {
      BackStudent(id).then(res => {
        if (res === "success"){
          this.$message({
            message: "找回成功",
            type: "success"
          })
          location.reload()
        }else {
          this.$message({
            message: "找回失败!",
            type: "error"
          })
        }
      }).catch(err => {
        this.$message({
          message: err + "错误!",
          type: "error"
        })
      })
    },
    handleDelete(index, row, id) {
      ThoroughlyDelete(id).then(res => {
        if (res === "success"){
          this.$message({
            message: "删除成功",
            type: "success"
          })
          location.reload()
        }else {
          this.$message({
            message: "删除失败"
          })
        }
      }).catch(err => {
        this.$message({
          message: err + "错误!",
          type: "error"
        })
      })
      console.log(index, row);
    }
  },
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      search: ''
    }
  },
}
</script>

<style scoped>
.grid-content{
  /*background-color: deepskyblue;*/
  position: relative;
  min-height: 1px;
  top: -10px;
}
</style>
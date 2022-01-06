<template>
  <el-container>
    <div style="position: relative;width: 80vw;height: 85vh;top: -120px">
      <div ref="bar" id="bar"></div>
      <div ref="pie" id="pie"></div>
      <div ref="gauge" id="gauge"></div>
      <div id="qualified">班级合格率</div>
    </div>
    <div id="select">
      <el-select @change="loadClass" v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

  </el-container>

</template>

<script>

import * as echarts from "echarts"
import {getCurrentClass} from "@/network/analysis";
import {getMultiplicationClassname} from "@/network/classroom";

export default {
  name: "data-analysis",
  created() {
    let temp = []
    let temp2 = []
    if (this.$store.state.classList.length === 0) {
      let tempDict = {}
      getMultiplicationClassname().then(res => {
        res.forEach((ele, index, array) => {
          tempDict["value"] = ele["c_name"]
          tempDict["id"] = ele["id"]
          temp.push(tempDict)
          tempDict = {}
        })
        this.value = this.options[0]["value"]
        getCurrentClass(this.value).then(res => {
          this.qualified = res.qualified
          this.rate = res.rate
          this.showScore = res.score
          this.coursera = res.courseraName
          this.studentName = res.studentName
          console.log(this.coursera)
          setTimeout(() => {
            this.drawBar()
            this.drawPie()
            this.drawGauge()
          }, 1200)
        })
      })

      this.options = temp
    } else {
      this.options = this.$store.state.classList
      this.value = this.options[0]["value"]
      getCurrentClass(this.value).then(res => {
        this.coursera = res.courseraName
        this.showScore = res.score
        this.rate = res.rate
        this.qualified = res.qualified
        this.studentName = res.studentName
        console.log(this.coursera)
        setTimeout(() => {
          this.drawBar()
          this.drawPie()
          this.drawGauge()
        }, 1200)
      })

    }

  },
  mounted() {
    // let echarts = require('echarts')
  },
  data() {
    return {
      rate:[],
      // 课程类别
      coursera: [],
      studentName: [],
      showScore: [],
      qualified:"",
      options: [],
      value: ""
    }
  },
  methods: {
    loadClass(val) {
      let temp2 = []
      getCurrentClass(val).then(res => {
        this.coursera = res.courseraName
        this.qualified = res.qualified
        this.showScore = res.score
        this.rate = res.rate
        this.studentName = res.studentName
        console.log(this.showScore)
        this.drawBar()
        this.drawPie()
        this.drawGauge()
      })
    },
    drawBar() {
      // let MyEcharts = this.$echarts.init(this.$refs.main)
      let MyEcharts = echarts.init(this.$refs.bar)
      let options = {
        title: {
          text: "班级前五名",
          textStyle: {
            color: "#2b2b2b",
            fontStyle: "normal",
            fontSize: 12
          }
        },

        xAxis: {
          type: "category",
          data: this.studentName,
          boundaryGap: true
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        tooltip: {
          trigger: "item",
          // triggerOn: "click" // 默认mouseover
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
            dataZoom: {},
            magicType: {
              type: ["bar", "line"]
            }
          }
        },
        legend: {
          data: this.coursera
        },
        series: [
          {
            type: "bar",
            name: this.coursera[0],
            data: this.showScore['s0'],
            label: {
              show: true
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[0] + "最高分",
                },
                {
                  type: "min",
                  name: this.coursera[0] + "最低分"
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[0] + "平均分"
                }
              ]
            },
            // 标记区间
            // markArea:{
            //     data:[
            //         [
            //             {
            //                 xAxis: "张三"
            //             },
            //             {
            //                 xAxis: "王五"
            //             }
            //         ],
            //         [
            //             {
            //                 xAxis: "小明"
            //             },
            //             {
            //                 xAxis: "二妞"
            //             }
            //         ]
            //     ]
            // },
            // 折线图的平滑效果
            smooth: true
          },
          {
            type: "bar",
            name: this.coursera[1],
            data: this.showScore['s1'],
            label: {
              show: true
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[1] + "最高分",
                },
                {
                  type: "min",
                  name: this.coursera[1] + "最低分"
                }
              ]
            },
            smooth: true,
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[1] + "平均分"
                }
              ]
            }
          },
          {
            type: "bar",
            name: this.coursera[2],
            data: this.showScore['s2'],
            label: {
              show: true,
              rotate: 45,
              position: "top"
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[2] + "最高分"
                },
                {
                  type: "min",
                  name: this.coursera[2] + "最低分"
                }
              ]
            },
            smooth: true,
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[2] + "平均分"
                }
              ]
            }
          },
          {
            type: "bar",
            name: this.coursera[3],
            data: this.showScore['s3'],
            label: {
              show: true,
              rotate: 45,
              position: "top"
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[3] + "最高分"
                },
                {
                  type: "min",
                  name: this.coursera[3] + "最低分"
                }
              ]
            },
            smooth: true,
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[3] + "平均分"
                }
              ]
            }
          },
          {
            type: "bar",
            name: this.coursera[4],
            data: this.showScore['s4'],
            label: {
              show: true,
              rotate: 45,
              position: "top"
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[4] + "最高分"
                },
                {
                  type: "min",
                  name: this.coursera[4] + "最低分"
                }
              ]
            },
            smooth: true,
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[4] + "平均分"
                }
              ]
            }
          },
          {
            type: "bar",
            name: this.coursera[5],
            data: this.showScore['s5'],
            label: {
              show: true,
              rotate: 45,
              position: "top"
            },
            markPoint: {
              data: [
                {
                  type: "max",
                  name: this.coursera[5] + "最高分"
                },
                {
                  type: "min",
                  name: this.coursera[5] + "最低分"
                }
              ]
            },
            smooth: true,
            markLine: {
              data: [
                {
                  type: "average",
                  name: this.coursera[5] + "平均分"
                }
              ]
            }
          },
        ]
      }
      MyEcharts.setOption(options)
    },
    drawPie() {
      let MyEcharts = echarts.init(this.$refs.pie)
      let options = {
        title: {
          text: "班级成绩分析"
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: this.rate[0],
                name: this.coursera[0]
              },
              {
                value: this.rate[1],
                name: this.coursera[1]
              },
              {
                value: this.rate[2],
                name: this.coursera[2]
              },
              {
                value: this.rate[3],
                name: this.coursera[3]
              },
              {
                value: this.rate[4],
                name: this.coursera[4]
              }
            ],
            roseType: 'area'
          }
        ]
      };
      MyEcharts.setOption(options)
    },
    drawGauge() {
      let MyEcharts = echarts.init(this.$refs.gauge)
      let option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 20,
              distance: -60,
              formatter: function (value) {
                if (value === 0.875) {
                  return 'A';
                } else if (value === 0.625) {
                  return 'B';
                } else if (value === 0.375) {
                  return 'C';
                } else if (value === 0.125) {
                  return 'D';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 30,
              text: "合格率"
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '%';
              },
              color: 'auto'
            },
            data: [
              {
                value: this.qualified,
              }
            ]
          }
        ]
      };
      MyEcharts.setOption(option)
      /*MyEcharts.setOption({*/
      /*  title: {*/
      /*   text: "考试及格率"*/
      /* },*/
      //   series: [
      //     {
      //       type: "gauge",
      //       data: [
      //         {
      //           value: this.qualified * 100
      //         }
      //       ],
      //       min: 0,
      //       max: 100
      //     }
      //   ]
      // })
    }
  }
}
</script>

<style scoped>
#bar {
  position: relative;
  /*left: -320px;*/
  top: 215px;
  width: 800px;
  height: 550px;
}

#pie {
  position: relative;
  top: -400px;
  left: 880px;
  width: 400px;
  height: 300px;
}

#gauge {
  width: 350px;
  height: 350px;
  position: relative;
  top: -340px;
  left: 860px;
}

#select {
  width: 140px;
  height: 34px;
  top: 20px;
  position: absolute;
}
#qualified{
  display: block;
  z-index: 999;
  width: 120px;
  height: 35px;
  position: relative;
  /*right: 300px;*/
  font-size: 24px;
  margin-left: 820px;
  margin-top: -700px;
}
</style>
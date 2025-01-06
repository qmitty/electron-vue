<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="level">
          level
        </el-checkbox>
        <el-checkbox label="introduction">
          introduction
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="assess" width="180" />
      <el-table-column v-for="assess in formThead" :key="assess" :label="assess">
        <template slot-scope="scope">
          {{ scope.row[assess] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const defaultFormThead = ['level']

export default {
  data() {
    return {
      data: [], // 用于填充 level 列的数据
      tableData: [], // 用于存储表格数据
      key: 1, // table key
      formTheadOptions: ['level', 'introduction'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲
    },
    // 监听 levelkey 的变化以更新 tableData
    levelkey() {
      this.updateTableData()
    }
  },
  mounted() {
    // 测试：在这里设置 levelkey 值,设为 29158
    this.levelkey = '29158'
    this.data = ['C', 'A', 'A', 'A', 'C', 'B', '-', '-', '-', '-', 'A', 'A', 'A'] // 示例数据
    
    // 监听 CSV 数据    ---------------------------------------------------1.1
    //window.electronAPI.onCSVData((event, data) => {
    //  this.data = data.remaining
    //})

    // 细项介绍15416的
    this.introduction = ['该项为总等级', '无法识别为条码，则等级较低。', '因磨损等混入白线，则等级会降低。', '整体对比度不佳，则等级会降低。', '整体的条刻印较浅，则等级会降低。', '部分条较细或背景污脏，则等级会降低。', '部分条较细或背景污脏，则等级会降低。', '留白宽度不符合规范，则等级降低。', '条或空格粗细不一，则等级会降低。', '条或空格处存在缺陷或污脏，则等级会降低。', '使用较多的错误订正能力，则等级降低。', '刻印时出现渗色等，则等级降低。', '刻印时出现渗色等，则等级降低。']
    // 初始化表格数据
    this.updateTableData()
  },
  methods: {
    updateTableData() {
      if (this.levelkey === '15415') {
        this.tableData = [
          { name: 'ALL', level: this.data[0], introduction: this.introduction[0] },
          { name: 'DEC', level: this.data[1], introduction: this.introduction[1] },
          { name: 'SC', level: this.data[2], introduction: this.introduction[2] },
          { name: 'MOD', level: this.data[3], introduction: this.introduction[3] },
          { name: 'RM', level: this.data[4], introduction: this.introduction[4] },
          { name: 'FPD', level: this.data[5], introduction: this.introduction[5] },
          { name: 'FID', level: this.data[6], introduction: this.introduction[6] },
          { name: 'VID', level: this.data[7], introduction: this.introduction[7] },
          { name: 'AN', level: this.data[8], introduction: this.introduction[8] },
          { name: 'GN', level: this.data[9], introduction: this.introduction[9] },
          { name: 'UEC', level: this.data[10], introduction: this.introduction[10] },
          { name: 'PGH', level: this.data[11], introduction: this.introduction[11] },
          { name: 'PGV', level: this.data[12], introduction: this.introduction[12] }
        ]
      } else if (this.levelkey === '29158') {
        this.tableData = [
          { name: 'ALL', level: this.data[0], introduction: this.introduction[0] },
          { name: 'DEC', level: this.data[1], introduction: this.introduction[1] },
          { name: 'CC', level: this.data[2], introduction: this.introduction[2] },
          { name: 'CM', level: this.data[3], introduction: this.introduction[3] },
          { name: 'RM', level: this.data[4], introduction: this.introduction[4] },
          { name: 'FPD', level: this.data[5], introduction: this.introduction[5] },
          { name: 'FID', level: this.data[6], introduction: this.introduction[6] },
          { name: 'VID', level: this.data[7], introduction: this.introduction[7] },
          { name: 'AN', level: this.data[8], introduction: this.introduction[8] },
          { name: 'GN', level: this.data[9], introduction: this.introduction[9] },
          { name: 'UEC', level: this.data[10], introduction: this.introduction[10] },
          { name: 'PGH', level: this.data[11], introduction: this.introduction[11] },
          { name: 'PGV', level: this.data[12], introduction: this.introduction[12] }
        ]
      } else if (this.levelkey === '15416') {
        this.tableData = [
          { name: 'ALL', level: this.data[0], introduction: this.introduction[0] },
          { name: 'DEC', level: this.data[1], introduction: this.introduction[1] },
          { name: 'EDGE', level: this.data[2], introduction: this.introduction[2] },
          { name: 'SC', level: this.data[3], introduction: this.introduction[3] },
          { name: 'MINR', level: this.data[4], introduction: this.introduction[4] },
          { name: 'MINE', level: this.data[5], introduction: this.introduction[5] },
          { name: 'MOD', level: this.data[6], introduction: this.introduction[6] },
          { name: 'QZ', level: this.data[7], introduction: this.introduction[7] },
          { name: 'DCD', level: this.data[8], introduction: this.introduction[8] },
          { name: 'DEF', level: this.data[9], introduction: this.introduction[9] }
        ]
      } else {
        // 默认情况下，使用29158的内容
        this.tableData = [
          { name: 'ALL', level: this.data[0], introduction: this.introduction[0] },
          { name: 'DEC', level: this.data[1], introduction: this.introduction[1] },
          { name: 'CC', level: this.data[2], introduction: this.introduction[2] },
          { name: 'CM', level: this.data[3], introduction: this.introduction[3] },
          { name: 'RM', level: this.data[4], introduction: this.introduction[4] },
          { name: 'FPD', level: this.data[5], introduction: this.introduction[5] },
          { name: 'FID', level: this.data[6], introduction: this.introduction[6] },
          { name: 'VID', level: this.data[7], introduction: this.introduction[7] },
          { name: 'AN', level: this.data[8], introduction: this.introduction[8] },
          { name: 'GN', level: this.data[9], introduction: this.introduction[9] },
          { name: 'UEC', level: this.data[10], introduction: this.introduction[10] },
          { name: 'PGH', level: this.data[11], introduction: this.introduction[11] },
          { name: 'PGV', level: this.data[12], introduction: this.introduction[12] }
        ]
      }
    }
  }
}
</script>

<template>
  <div class="components-container">
    <aside><strong>SplitPane</strong> If you've used
      <a href="https://codepen.io/" target="_blank"> codepen</a>,
      <a href="https://jsfiddle.net/" target="_blank"> jsfiddle </a>will not be unfamiliar.
      <a href="https://github.com/PanJiaChen/vue-split-pane" target="_blank"> Github repository</a>
    </aside>
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container">
          <img :src="imageSrc" alt="条码图片" class="image"> <!-- 显示图片 -->
        </div>
      </template>

      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <table>
                <thead>
                  <tr>
                    <th>左列</th>
                    <th>右列</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td>{{ leftColumnData[index] }}</td>
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  data() {
    return {
      imageSrc: '', // 这里将存储通过 Electron 获取的图片路径
      key: '15415', // 假设这是获取的 key 值
      data: [] // 右列数据来源的数组
    }
  },
  computed: {
    leftColumnData() {
    // 根据 key 值返回左列的固定内容
      if (this.key === '15415') {
        return [
          'ALL', 'DEC', 'SC', 'MOD', 'RM',
          'FPD', 'FID', 'VID', 'AN', 'GN',
          'UEC', 'PGH', 'PGV'
        ] // 15415 的 13 行固定内容
      } else if (this.key === '29158') {
        return [
          'ALL', 'DEC', 'CC', 'CM', 'RM',
          'FPD', 'FID', 'VID', 'AN', 'GN',
          'UEC', 'PGH', 'PGV'
        ] // 29158 的 13 行固定内容
      }
      // 默认返回 29158 的内容
      return [
        'ALL', 'DEC', 'CC', 'CM', 'RM',
        'FPD', 'FID', 'VID', 'AN', 'GN',
        'UEC', 'PGH', 'PGV'
      ]
    },
    tableData() {
      // 右列数据来源
      return this.data // 假设 data 数组已经填充
    }
  },
  mounted() {
    // 以后：这里可以通过 Electron 获取图片路径并赋值给 imageSrc
    this.imageSrc = 'path/to/your/image.jpg' // 替换为实际的图片路径
    // 这里可以填充右列等级 data 数组
    this.data = ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7', '数据8', '数据9', '数据10', '数据11', '数据12', '数据13'] // 示例数据
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    max-width: 100%; /* 确保图片自适应 */
    height: auto;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
    overflow: auto; /* 允许滚动 */
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

/*  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }
*/

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>

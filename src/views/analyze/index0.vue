<template>
  <div class="components-container">
    <aside><strong>Analyze</strong> If you've used
      <a href="https://keyenceautoid/" target="_blank"> SRX</a>, Web Tool is Available.
    </aside>
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container">
          <fixed-thead />
        </div>
      </template>

      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <img :src="imageSrc" alt="条码图片" class="image" v-if="imageSrc">
              <div v-else class="no-image">No image available</div>
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">
              <table>
                <thead>
                  <tr>
                    <th class="left-column">Reading</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td class="left-column">{{ leftColumnData[index] }}</td>
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import FixedThead from './components/FixedThead'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane, FixedThead },
  data() {
    return {
      //imageSrc: require('@/assets/10_E_01.jpg'),
      imageSrc: '',
      data: [] // 右列数据来源的数组
    }
  },
  computed: {
    leftColumnData() {
    // 返回左列的固定内容
      return [
        'Data', 'Symbology identifier', 'Parameter bank'
      ]
    },
    tableData() {
      // 右列数据来源
      return this.data // 假设 data 数组已经填充
    }
  },
  async mounted() {
    // 获取最新图片
    await this.loadLatestImage()

    // 监听新图片事件
    window.electronAPI.onNewImage((event, data) => {
      this.updateImage(data.path)
    })
  },
  beforeDestroy() {
    // 清理监听器
    ipcRenderer.removeAllListeners('new-image')
  },
  methods: {
    //
    async loadLatestImage() {
      try {
        const imagePath = await window.electronAPI.getLatestImage()
        if (imagePath) {
          this.updateImage(imagePath)
        }
      } catch (error) {
        console.error('Error loading latest image:', error)
      }
    },
    updateImage(imagePath) {
      // 使用 file:// 协议显示本地图片
      //this.imageSrc = `file://${imagePath}`
      this.imageSrc = `file:///${imagePath.replace(/\\/g, '/')}`
      console.log('Final image src:', this.imageSrc) // 添加日志
      
      // 这里可以根据图片更新其他数据
      this.data = ['1234567', 'DM', '2']
    },
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

  .top-container {
    background-color: #FFFFFF;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    max-width: 100%; /* 确保图片自适应 */
    height: auto;
    display: block;
  }

  .no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 16px;
  }

  .left-container {
    background-color: #FFFFFF;
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

  .left-column {
  background-color: #1890ff; /* 设置左列背景颜色409EFF 0E7AC0 */
  color: white; /* 可选：设置文本颜色以提高可读性 */
  width: 37%;
  }

  .right-container {
    background-color: #FFFFFF;
    height: 200px;
  }

  .bottom-container {
    width: 100%;
    background-color: #FFFFFF;
    height: 100%;
    overflow: auto; /* 允许滚动 */
  }
</style>

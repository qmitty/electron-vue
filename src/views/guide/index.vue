<template>
  <div class="app-container">
    <aside>
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      {{ $t('guide.button') }}
    </el-button>

    <!-- 添加路径选择输入框------1.2 -->
    <div>
      <input v-model="pdfPath" placeholder="请输入PDF保存路径" />
      <el-button @click="setPdfPath">设置路径</el-button>
    </div>

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'
import { ipcRenderer } from 'electron'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null,
      pdfPath: '' // 用于存储用户输入的路径---1.2
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    setPdfPath() {
      window.electronAPI.send('set-pdf-path', this.pdfPath); // 发送路径到主进程---1.2
    }
  }
}
</script>

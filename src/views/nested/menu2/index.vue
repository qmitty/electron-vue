<template>
  <div class="document-reader">
    <el-row>
      <el-col :span="24" class="header">
        <el-tabs
          v-model="activeTab"
          type="card"
          class="tabs"
          @tab-click="handleTabClick"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="content">
        <el-tabs v-model="activeTab" class="content-tabs">
          <el-tab-pane label="15415" name="1">
            <h2>ISO/IEC 15415</h2>
            <p>由国际标准化组织（<a href="https://www.iso.org/home.html" target="_blank">International Organization for Standardization</a>）制定的二维码刻印品质评估规格。</p>
            <p>主要用于评估<strong>标签上印刷的二维码</strong>。</p>
            <div class="barcode-list">
              <p class="barcode-title">条码种类：</p>
              <div class="barcode-item">·QR</div>
              <div class="barcode-item">·DataMatrix</div>
              <div class="barcode-item">·PDF417</div>
            </div>
            <div class="image-container">
              <img src="@/assets/ISOexample/15415example.png" alt="ISO 15415 示例">
            </div>
          </el-tab-pane>
          <el-tab-pane label="29158" name="2">
            <h2>ISO/IEC TR 29158（AIM DPM-1-2006）</h2>
            <p>由国际自动识别制造商协会（<a href="https://www.aimglobal.org" target="_blank">Automatic Identification Manufacturers</a>）制定的直接零件刻印二维码刻印品质评估规格。以 ISO/IEC15415 作为基础。</p>
            <p>2011 年国际标准化组织也将之标准化。</p>
            <p>主要用于评估<strong>DPM二维码</strong>。</p>
            <div class="barcode-list">
              <p class="barcode-title">条码种类：</p>
              <div class="barcode-item">·QR</div>
              <div class="barcode-item">·DataMatrix</div>
            </div>
            <div class="image-container">
              <img src="@/assets/ISOexample/29158example.png" alt="ISO 29158 示例">
            </div>
          </el-tab-pane>
          <el-tab-pane label="15416" name="3">
            <h2>ISO/IEC 15416</h2>
            <p>由国际标准化组织（<a href="https://www.iso.org/home.html" target="_blank">International Organization for Standardization</a>）制定的条码刻印验证规格。</p>
            <p>主要用于评估<strong>标签上印刷的条码</strong>。</p>
            <div class="barcode-list">
              <p class="barcode-title">条码种类：</p>
              <div class="barcode-item">·Code39</div>
              <div class="barcode-item">·Code128</div>
              <div class="barcode-item">·ITF</div>
              <div class="barcode-item">·Code93</div>
              <div class="barcode-item">·Codebar</div>
              <div class="barcode-item">·JAN/EAN/UPC</div>
            </div>
            <div class="image-container">
              <img src="@/assets/ISOexample/15416example.png" alt="ISO 15416 示例">
            </div>
          </el-tab-pane>
          <el-tab-pane label="章节 4" name="4">
            <h2>章节 4 内容</h2>
            <p>这里是章节 4 的内容...</p>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '1' // 默认选中的标签
    }
  },
  methods: {
    handleTabClick(tab) {
      this.activeTab = tab.name // 更新选中的标签
    }
  }
}
</script>

<style scoped>
.document-reader {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使文档阅读器占满整个视口高度 */
}

.header {
  background-color: #f5f5f5; /* 头部背景颜色 */
  padding: 10px; /* 头部内边距 */
  border-bottom: 1px solid #e0e0e0; /* 底部边框 */
}

.content {
  padding: 20px; /* 内容区域的内边距 */
  flex: 1; /* 使内容区域占据剩余空间 */
}

.tabs {
  position: absolute; /* 绝对定位 */
  right: 20px; /* 距离右侧的距离 */
  top: 10px; /* 距离顶部的距离 */
}

a {
    color: #337ab7;
    cursor: pointer;
}

a:hover {
    cursor: pointer;
    color: #1890ff;
    text-decoration: none;
}

.image-container {
  margin-top: 20px; /* 图片与上方内容的间距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  overflow: hidden; /* 确保阴影不超出容器 */
  max-height: 50%;
}

.image-container img {
  width: auto; /* 自适应宽度 */
  height: 100%; /* 保持纵横比 */
}

.barcode-title {
  margin-top: 50px; /* 设置上边距 */
}

.barcode-list {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  margin-left: 20px; /* 添加左边距 */
}

.barcode-item {
  margin-top: 5px; /* 每个条码项之间的间距 */
}
</style>

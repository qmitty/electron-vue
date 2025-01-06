<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div
          style="
            height: 30px;
            width: 70%;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
          "
        >
          Fixed Top Block
        </div>
        <div ref="containerRef" style="height: 300px; overflow-y: auto">
          <div
            id="part1"
            style="
              height: 300px;
              background: rgba(255, 0, 0, 0.02);
              margin-top: 30px;
            "
          >
            part1
          </div>
          <div
            id="part2"
            style="
              height: 300px;
              background: rgba(0, 255, 0, 0.02);
              margin-top: 30px;
            "
          >
            part2
          </div>
          <div
            id="part3"
            style="
              height: 300px;
              background: rgba(0, 0, 255, 0.02);
              margin-top: 30px;
            "
          >
            part3
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-anchor
          :container="containerRef"
          direction="vertical"
          type="default"
          :offset="30"
          @click="handleClick"
        >
          <el-anchor-link href="#part1" title="part1" />
          <el-anchor-link href="#part2" title="part2" />
          <el-anchor-link href="#part3" title="part3" />
          <!-- 新增的锚点链接 -->
          <el-anchor-link href="#basic-usage">
            Basic Usage
          </el-anchor-link>
          <el-anchor-link href="#horizontal-mode">
            Horizontal Mode
          </el-anchor-link>
          <el-anchor-link href="#scroll-container">
            Scroll Container
          </el-anchor-link>
          <el-anchor-link href="#anchor-api">
            Anchor API
            <template #sub-link>
              <el-anchor-link href="#anchor-attributes">
                Anchor Attributes
              </el-anchor-link>
              <el-anchor-link href="#anchor-events">
                Anchor Events
              </el-anchor-link>
            </template>
          </el-anchor-link>
        </el-anchor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const containerRef = ref(null)

    const handleClick = (e) => {
      e.preventDefault()
    }

    return {
      containerRef,
      handleClick
    }
  }
}
</script>

<style scoped>
/* 添加样式以确保页面布局正常 */
.document-reader {
  display: flex;
  height: 100vh; /* 使文档阅读器占满整个视口高度 */
}

.content {
  padding: 20px; /* 内容区域的内边距 */
}

.section {
  height: 300px; /* 每个章节的高度 */
  margin-bottom: 20px; /* 章节之间的间距 */
  background-color: rgba(0, 0, 0, 0.05); /* 章节背景颜色 */
  padding: 20px; /* 章节内边距 */
  border: 1px solid #ccc; /* 章节边框 */
}
</style>

<template>
  <div>
    <div class="sidebar">
      <div
        v-for="item in items"
        :key="item.id"
        :class="['sidebar-item', { active: activeId === item.id }]"
        @click="scrollTo(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content">
      <div
        v-for="item in items"
        :id="item.id"
        :key="item.id"
        class="content-section"
      >
        <h2>{{ item.name }}</h2>
        <p>内容块 {{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 'section1', name: '部分 1' },
        { id: 'section2', name: '部分 2' },
        { id: 'section3', name: '部分 3' }
      ],
      activeId: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    handleScroll() {
      const sections = this.items.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY

      sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          this.activeId = section.id
        }
      })
    }
  }
}
</script>

<style>
.sidebar {
  position: fixed;
  top: 150px; /* 距离顶部20px */
  right: 20px; /* 距离右侧20px */
  width: 200px;
  /* 其他样式 */
}

.sidebar-item {
  position: relative; /* 使伪元素相对于.sidebar-item定位 */
  padding-left: 10px; /* 为文字留出空间 */
  color: gray; /* 未激活时文字颜色为灰色 */
  font-size: 16px; /* 增大字体大小 */
  line-height: 1.4; /* 设置行高 */
  margin-bottom: 10px; /* 增加目录项之间的间距 */
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0; /* 竖线在左侧 */
  top: 50%; /* 竖线垂直居中 */
  transform: translateY(-50%); /* 竖线垂直居中 */
  width: 4px; /* 竖线的宽度 */
  height: 145%; /* 竖线的高度比文字高 */
  background-color: lightgray; /* 未激活状态的竖线颜色 */
}

.sidebar-item.active::before {
  background-color: #3eaf7c; /* 激活状态的竖线颜色 */
}

.sidebar-item.active {
  color: green; /* 激活状态下文字颜色为绿色 */
}

.content {
  margin-left: 220px; /* 留出侧边栏的空间 */
}

.content-section {
  height: 600px; /* 示例高度 */
  /* 其他样式 */
}
</style>

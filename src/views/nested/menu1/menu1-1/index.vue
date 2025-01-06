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
      <el-alert :closable="false" title="二维码细项介绍" type="success" />
      <div v-for="(item, index) in contentList" :id="'section' + (index + 1)" :key="index" class="section">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <img :src="item.image" alt="Image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 'section1', name: 'DEC' },
        { id: 'section2', name: 'SC/CC' },
        { id: 'section3', name: 'MOD/CM' },
        { id: 'section4', name: 'RM' },
        { id: 'section5', name: 'FPD ' },
        { id: 'section6', name: 'FID' },
        { id: 'section7', name: 'VID' },
        { id: 'section8', name: 'AN' },
        { id: 'section9', name: 'GN' },
        { id: 'section10', name: 'UEC' },
        { id: 'section11', name: 'PGH & PGV' }
      ],
      activeId: '',
      contentList: [
        {
          title: 'DEC(Decode)',
          description: '使用标准参考解码算法以指定库参数读取是否成功。',
          image: require('@/assets/ISOexample/dec.png') // 替换为实际图片路径
        },
        {
          title: 'SC(Symbol Contrast) / CC(Cell Contrast)',
          description: '测量最亮模块与最暗模块之间的反射率差异。可确认照明的照射方法、照明颜色、条码的发色状态等相关信息。',
          image: require('@/assets/ISOexample/sc.png') // 替换为实际图片路径
        },
        {
          title: 'MOD(Modulation) / CM(Cell Modulation)',
          description: '对二维码内数据的模块反射率的变化量进行评级（黄色部分）。',
          image: require('@/assets/ISOexample/mod.png') // 替换为实际图片路径
        },
        {
          title: 'RM(Reflectance Margin)',
          description: '在 MOD 及 CM 的评估方法中加入黑白正确性的评估。',
          image: require('@/assets/ISOexample/rm.png') // 替换为实际图片路径
        },
        {
          title: 'FPD(Fixed Pattern Damage)',
          description: '固定图案的所有组成部分的总体评级。该评级等于定位图案各个组成部分中的最低评级。',
          image: require('@/assets/ISOexample/fpd.png') // 替换为实际图片路径
        },
        {
          title: 'FID(Format Information Damage)',
          description: '具有 QR 码的错误订正等级和屏蔽图案相关信息，此处如果污脏，将无法读取。仅 QR、微型 QR 码有效，如为 DataMatrix，将显示“-”。',
          image: require('@/assets/ISOexample/fid.png') // 替换为实际图片路径
        },
        {
          title: 'VID(Version Information Damage)',
          description: 'QR 码型号 2 版本 7 或更高版本才有的评估项目。如为除此之外的条码，将显示“-”。',
          image: require('@/assets/ISOexample/vid.png') // 替换为实际图片路径
        },
        {
          title: 'AN(Axial Nonuniformity)',
          description: '根据水平方向以及垂直方向的单元配置位置，评估单元是否刻印为正确的正方形。',
          image: require('@/assets/ISOexample/an.png') // 替换为实际图片路径
        },
        {
          title: 'GN(Grid Nonuniformity)',
          description: '评估单元的中心位置是否偏离理想位置。如果因装置振动等导致刻印时单元位置偏移，则等级会降低。',
          image: require('@/assets/ISOexample/gn.png') // 替换为实际图片路径
        },
        {
          title: 'UEC(Unused Error Correction)',
          description: '评估二维码错误订正能力的使用率。等级降低意味着使用较多的错误订正能力。',
          image: require('@/assets/ISOexample/uec.png') // 替换为实际图片路径
        },
        {
          title: 'PGH(Print Growth Horizontal) & PGV(Print Growth Vertical)',
          description: '是评估水平 & 垂直方向的黑色单元、白色单元的伸缩。按照ISO官方文档不参与最终的综合等级判定。',
          image: require('@/assets/ISOexample/pgh.png') // 替换为实际图片路径
        }
      ]
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
  top: 150px; /* 距离顶部150px */
  right: 0px; /* 距离右侧0px */
  width: 180px;
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
  margin-right: 220px; /* 留出侧边栏的空间 */
  background-color: white;
}

.content img {
  max-width: calc(100% - 10px);
  height: auto; /* 高度自动调整以保持比例 */
  display: block; /* 使图像为块级元素，避免下方有空隙 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 80px; /* 增加内容块之间的间隔 */
}

.content-section {
  height: 600px; /* 示例高度 */
}
</style>

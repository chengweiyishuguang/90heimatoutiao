// 公共实例
import Vue from 'vue'
export default new Vue()// 公共实例实例化一个vue
// 任何组件之间的传值都可以用eventBus
// 这里也会导出一个实例，也有一个方法叫$emit,调用的时候不能用this了应该用eventBus.$emit
// 监听事件直接用eventBus.$on

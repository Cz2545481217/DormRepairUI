import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/


export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true, // 启用ts支持
      resolvers: [
          // https://github.com/antfu/unplugin-vue-components
          ElementPlusResolver() // 配置 ant design vue 按需加载支持
      ],
  })
  ],
  resolve:{
    alias:[
      {
        find:'@',
        replacement: resolve(__dirname,'./src')
      }
    ],
  
  },
  server:{
    host:'192.168.158.1',
    port:7122,
    proxy:{
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

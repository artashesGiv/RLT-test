import '@/app/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import Button from '@/shared/ui/Button.vue'
import Input from '@/shared/ui/Input.vue'
import Skeleton from '@/shared/ui/Skeleton.vue'
import IconBase from '@/entities/ui/IconBase.vue'

const app = createApp(App)

app.component('button-component', Button)
app.component('input-component', Input)
app.component('skeleton-component', Skeleton)
app.component('icon-base-component', IconBase)

app.use(createPinia())

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// ✅ CSS do Vuetify deve vir antes
import 'vuetify/styles'

// ✅ Variáveis do Vuetify (opcional, mas recomendável se usar SASS customizado)
import '@mdi/font/css/materialdesignicons.css'

// ✅ Configuração do Vuetify
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
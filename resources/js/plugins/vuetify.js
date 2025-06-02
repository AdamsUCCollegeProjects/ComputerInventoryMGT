import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      density: 'comfortable',
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
    },
    VSelect: {
      density: 'comfortable',
      variant: 'outlined',
    },
    VTextarea: {
      density: 'comfortable',
      variant: 'outlined',
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        }
      }
    }
  }
})
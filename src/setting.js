import { version } from '../package'

const setting={
    page:{
        opened:[{
            name: 'home',
            meta: {
              name: '首页',
              requiresAuth: false
            }
        }]
    },
    releases: {
        version: version,
        api: ''
      },
}

export default setting
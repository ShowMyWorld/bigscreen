import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import setting from '@/setting.js'

const adapter = new LocalStorage(`db-${setting.releases.version}`)
const db = low(adapter)

db.defaults({
    sys:{},
    detabase:{},
}).write()

export default db
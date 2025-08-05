import { app } from './app.js'
import { getPort } from './utils/config.js'
import { info_log } from './utils/logger.js'

app.listen(getPort(), () => {
  info_log(`Server running on port ${getPort()}`)
})

import { app } from './app.js'
import { getPort } from './utils/config.js'
import { info } from './utils/logger.js'

app.listen(getPort(), () => {
  info(`Server running on port ${getPort()}`)
})

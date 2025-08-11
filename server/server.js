/** /server/server.js */
import { getPort, info_log } from '#utils'
import { app } from './app.js'

app.listen(getPort(), () => {
  info_log(`Server running on port ${getPort()}`)
})

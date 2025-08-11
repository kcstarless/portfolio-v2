/** server/utils/_helper.js */

// Extract a non private IP from possible headers
export const getClientIP = (req) => {
  const possibleHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ]

  for (const header of possibleHeaders) {
    const value = req.headers[header]
    if (value) {
      const ip = value.split(',')[0].trim() // take first IP if there is mulitple
      if (!isPrivateIP(ip)) {
        return ip
      }
    }
  }

  // Fallback to socket remote address
  const socketIP = req.socket.remoteAddress || req.connection.remoteAddress
  if (socketIP && !isPrivateIP(socketIP)) {
    return socketIP
  }

  return null
}

const isPrivateIP = (ip) => {
  const cleanIP = ip.replace(/^::ffff:/, '')  // Remove IPv6 wrapper if present
  
  // Check for localhost
  if (cleanIP === '127.0.0.1' || cleanIP === '::1' || cleanIP === 'localhost') {
    return true
  }
  
  // Check for private IP ranges
  const privateRanges = [
    /^10\./,                    // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
    /^192\.168\./,              // 192.168.0.0/16
    /^169\.254\./,              // 169.254.0.0/16 (link-local)
    /^fc00:/,                   // IPv6 private
    /^fe80:/                    // IPv6 link-local
  ]
  
  return privateRanges.some(range => range.test(cleanIP))
}

//// 
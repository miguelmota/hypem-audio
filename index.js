const request = require('request')
const cheerio = require('cheerio')

function getStreamUrls(hypemUrl) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  };

  return new Promise((resolve, reject) => {
    // get auth token in cookie
    request({
      url: 'https://hypem.com',
      headers
    }, (error, response, body) => {
      if (error) {
        reject(error)
      }

      const cookie = response.headers['set-cookie'][0]

      if (!cookie) {
        return reject(new Error('No cookie found'))
      }

      headers.Cookie = cookie
      return resolve(cookie)
    })
  })
  .then(cookie => {
    return new Promise((resolve, reject) => {
      request({
        url: hypemUrl,
        headers
      }, (error, response, body) => {
        if (error) {
          return reject(error)
        }

        if (!body) {
          return resolve([])
        }

        const $ = cheerio.load(body)
        const script = $('#displayList-data').html()

        try {
          const json = JSON.parse(script)
          const tracks = json.tracks

          const promises = tracks.map(track => {
            return new Promise((resolve, reject) => {
              if (track.id && track.key) {
                const trackLocatorUrl = `http://hypem.com/serve/source/${track.id}/${track.key}`

                request({
                  url: trackLocatorUrl,
                  headers,
                  json: true
                }, (error, response, body) => {
                  if (error) {
                    return resolve(null)
                  }

                  resolve(body.url)
                })
              } else {
                return resolve(null)
              }
            })
          })

          Promise.all(promises)
          .then(result => {
            resolve(result.filter(x => x))
          })
        } catch(error) {
          reject(error)
        }
      })
    })
  })
}

module.exports = {
  getStreamUrls
}

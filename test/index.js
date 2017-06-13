const test = require('tape')
const {getStreamUrls} = require('../')

test('got urls', t => {
  t.plan(2)

  const url = 'http://hypem.com/latest'

  getStreamUrls(url)
  .then(streamUrls => {
    console.log(streamUrls)
    t.ok(Array.isArray(streamUrls))
    t.ok(streamUrls.length > 0)
  })
  .catch(error => {
    console.error(error)
  })
})

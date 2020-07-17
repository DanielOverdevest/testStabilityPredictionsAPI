const axios = require('axios');
const assert = require('assert').strict;

var argv = require('yargs')
  .demandOption(['url', 'count'])
  .alias('u', 'url')
  .alias('c', 'count')
  .alias('a', 'assert')
  .boolean('assert')
  .argv;

const url = argv.url
const amountofRequests = argv.count

const instance = axios.create()
instance.interceptors.request.use((config) => {
  config.headers['request-startTime'] = process.hrtime()
  return config
})

instance.interceptors.response.use((response) => {
  const start = response.config.headers['request-startTime']
  const end = process.hrtime(start)
  const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000)) / 1000;
  response.headers['request-duration'] = milliseconds
  return response
})

requests = []
for (var i = 0; i < amountofRequests; i++) {
  let durl = url
  // Add loop number at end of the url to force an assert to test if this test works!
  if (argv.assert) {
    durl = url + (i + 1)
  }
  requests.push(instance.get(durl).then(response => {
    console.log("individualRequest: " + response.headers['request-duration'] + "ms")
    return response.data
  }))
}

(async () => {
  try {
    console.log(`Check if ${url} gives equal response. Total amount of requests: ${requests.length}.`)
    console.time("AllRequestsFinished")
    const responses = await axios.all(requests)
    console.timeEnd("AllRequestsFinished")

    responses.forEach(element => {
      assert.deepEqual(element, responses[0])
    });

    console.log()
    console.log("Raw response:")
    console.log(responses[0])

    console.log()
    console.log("\x1b[32mAll are deep equal!")

  } catch (error) {
    console.log(error);
  }
})();

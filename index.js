const Tokio = require('tokio')

module.exports = username => {
  return new Promise((resolve, reject) => {
    if (!username || typeof username !== 'string') {
      return reject(new Error('Expected username to be a string'))
    }

    const tokio = new Tokio({
      url: `https://github.com/${username}?tab=stars`
    })

    tokio.fetch().then(html => {
      const $ = tokio.query(html)
      const pageCount = $('.next_page').prev().text()
      const randmonPage = getRandomIntInclusive(1, pageCount)

      tokio.fetch({
        url: `https://github.com/${username}?page=${randmonPage}&tab=stars`
      }).then(html => {
        const $ = tokio.query(html)
        const elements = $('.col-12.d-block.width-full.py-4.border-bottom')
        const count = elements.length
        const randomNumber = getRandomIntInclusive(1, count)
        const singleElement = $(elements[randomNumber])
        const shorturl = singleElement.find('a').attr('href')

        if (!shorturl) return reject(new Error('user does not exist'))

        return resolve({
          url: `https://github.com${shorturl}`,
          username: shorturl.split('/')[1],
          reponame: shorturl.split('/')[2],
          description: singleElement.find('.py-1 p').text().trim(),
          starCount: $(singleElement.find('a.muted-link')[0]).text().trim()
        })
      })
    }).catch(e => reject(e))
  })
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}

const githubRandomStar = require('../')

test('main', () => {
  expect(typeof githubRandomStar).toBe('function')
})

test('ok', async () => {
  jest.setTimeout(20000)

  const username = 'sinchang'
  return githubRandomStar(username).then(res => {
    expect(typeof res.username).toBe('string')
  })
})

test('error', async () => {
  jest.setTimeout(20000)

  const username = 'sinchang123'
  return githubRandomStar(username).catch(e => {
    expect(e.message).toMatch('user does not exist')
  })
})

test('username required', async () => {
  return githubRandomStar('').catch(e => {
    expect(e.message).toMatch('username required')
  })
})

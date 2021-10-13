import JtockAuth from 'j-tockauth'

const auth = new JtockAuth({
  host: 'https://desolate-beach-43985.herokuapp.com',
  prefixUrl: '/api'
})

export default auth
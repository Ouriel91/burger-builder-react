import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-react-d2e88.firebaseio.com/'
})

export default instance
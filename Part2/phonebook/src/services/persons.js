import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
    console.log(baseUrl);
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data

    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data

    })
}


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data

    })
}


const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        return response.status

    })
}

export default { getAll, create, update, deleteContact }
const axios = require('axios').default;


export let PostFunction = async (data, url) => {
    try {

        let response = await axios.post(url, data)

        return response;
    }
    catch (err) {
        return err
    }

}


export let GetFunction = async (url) => {
    try {
        let response = await axios.get(url)

        return response.data;
    } catch (err) {
        return err
    }
}

export let DeleteFunction = async (url) => {
    try {
        let response = await axios.delete(url)

        return response;
    } catch (err) {
        return err
    }
}

export let EditFunction = async (data, url) => {
    try {
        let response = await axios.put(url, data)

        return response;
    } catch (err) {
        return err
    }
}
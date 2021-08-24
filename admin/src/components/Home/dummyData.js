const axios = require('axios').default;

let NewBooks = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/category/newBooks')
            .then((result) => {
                let slideData = [];
                for (let i = 0; i < result.data.length; i++) {
                    slideData.push({
                        index: i,
                        headline: result.data[i].productName,
                        button: "View Details",
                        product: result.data[i].product,
                        src: `http://localhost:5000/${result.data[i].fileName}`
                    })
                }
                resolve(slideData)
            }).catch((err) => {
                console.log(err.message)
            })
    })

}
let concatenated = async () => {
    var a = await NewBooks();

    return (a);
}



export default concatenated;
/*export const TopData = [

    {
        index: 0,
        headline: 'For Your Current Mood',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 1,
        headline: 'Focus On The Writing',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    },
    {
        index: 2,
        headline: 'Focus On The Writing',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    },
    {
        index: 3,
        headline: 'New Fashion Apparel',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 4,
        headline: 'In The Wilderness',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
]*/
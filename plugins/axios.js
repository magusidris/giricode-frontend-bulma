import https from 'https';

export default function ({ $axios, redirect }) {
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    $axios.onError(error => {
      if (error.response.status === 500) {
        redirect('/sorry')
        console.log(error)
      }
    })
}

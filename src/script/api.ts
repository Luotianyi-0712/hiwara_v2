const xVersion: string = '5nFp9kmbNnHdAFhaqMvt';
const testUserToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxZTBkOWZiLTdlZjgtNDg5OC1hODZjLThiYzMzZDdiYWM1ZiIsInR5cGUiOiJyZWZyZXNoX3Rva2VuIiwiaXNzIjoiaXdhcmEiLCJpYXQiOjE3Mjc4ODIzMzMsImV4cCI6MTczMDQ3NDMzM30.9X7P-gMVNrwtYpVhBIyLvBHyUOOlRq4hGxNInnT4zhA';
var accessToken: string | null = null;
interface ApiResponse {
  results: any[];
}
function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('https://api.iwara.tv/user/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + testUserToken
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch:' + res.statusText)
      }
      return res.json()
    }).then(data => {
      accessToken = data.accessToken
      resolve(data.accessToken)
    }).catch(err => {
      reject(err)
    })
  })
}


function get(apiPath: string, query: any): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    if (accessToken) {
      send()
    }
    else {
      getAccessToken().then(() => {
        send()
      }).catch(err => {
        reject(err)
      })
    }
    function send() {
      let queryString = Object.keys(query)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
        .join('&');
      let sendUrl = apiPath + '?' + new URLSearchParams(queryString).toString()
      console.log(sendUrl)
      fetch(sendUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch:' + res.statusText)
        }
        return res.json()
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

interface VideoItem {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: string,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
  loss: boolean
}
export function getSubscribeVideoList(page: number): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      sort: 'date',
      page: page
    }
    get('https://api.iwara.tv/videos', query).then(data => {
      let videoList: VideoItem[] = []
      let i = 0
      for (let item of data.results) {
        videoList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numViews: item.numViews,
          numLikes: item.numLikes,
          duration: item.file ? `${Math.floor(item.file.duration / 60)}:${(`0${item.file.duration % 60}`).slice(-2)}` : "00:00",
          createdAt: new Date(item.createdAt).toISOString().split("T")[0],
          updatedAt: new Date(item.updatedAt).toISOString().split("T")[0],
          ecchi: item.rating == 'ecchi' ? true : false,
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            '~/assets/img/loss.png',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}


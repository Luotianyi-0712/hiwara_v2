const secretKey: string = '_5nFp9kmbNnHdAFhaqMvt';
const testUserToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxZTBkOWZiLTdlZjgtNDg5OC1hODZjLThiYzMzZDdiYWM1ZiIsInR5cGUiOiJyZWZyZXNoX3Rva2VuIiwiaXNzIjoiaXdhcmEiLCJpYXQiOjE3Mjc4ODIzMzMsImV4cCI6MTczMDQ3NDMzM30.9X7P-gMVNrwtYpVhBIyLvBHyUOOlRq4hGxNInnT4zhA';

import CryptoJS from 'crypto-js';

const apiPath = "https://api.iwara.tv"
let accessToken: string | null = null;

setInterval(setInterval, 36000000)
function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(apiPath + '/user/token', {
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


function get(path: string, query: any): Promise<any> {
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
      let sendUrl: string
      if (query) {
        const queryString = Object.keys(query)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
          .join('&');
        sendUrl = path + '?' + new URLSearchParams(queryString).toString()
      } else {
        sendUrl = path
      }
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

function post(path: string, query: any, body: any): Promise<any> {
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
      let sendUrl: string
      if (query) {
        const queryString = Object.keys(query)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
          .join('&');
        sendUrl = path + '?' + new URLSearchParams(queryString).toString()
      } else {
        sendUrl = path
      }
      console.log(sendUrl)
      fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
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

function deletef(path: string): Promise<any> {
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
      console.log(path)
      fetch(path, {
        method: 'DELETE',
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
  duration: number,
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
      limit: 32,
      subscribed: true,
      page: page
    }
    get(apiPath + '/videos', query).then(data => {
      let videoList: VideoItem[] = []
      for (let item of data.results) {
        videoList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numViews: item.numViews,
          numLikes: item.numLikes,
          duration: item.file ? item.file.duration ? item.file.duration : 0 : 0,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: item.file ?
          //   'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
          //   '~/assets/img/loss.png',
          img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getVideoList(page: number, sort: string): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 32,
      sort: sort,
      page: page
    }
    get(apiPath + '/videos', query).then(data => {
      let videoList: VideoItem[] = []
      for (let item of data.results) {
        videoList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numViews: item.numViews,
          numLikes: item.numLikes,
          duration: item.file ? item.file.duration ? item.file.duration : 0 : 0,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: item.file ?
          //   'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
          //   '~/assets/img/loss.png',
          img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserTestimonialsVideoList(user: string, exclude: string): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      user: user,
      exclude: exclude,
      limit: 6
    }
    get(apiPath + '/videos', query).then(data => {
      let videoList: VideoItem[] = []
      for (let item of data.results) {
        videoList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numViews: item.numViews,
          numLikes: item.numLikes,
          duration: item.file ? item.file.duration ? item.file.duration : 0 : 0,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: item.file ?
          //   'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
          //   '~/assets/img/loss.png',
          img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getSystemTestimonialsVideoList(exclude: string): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/video/' + exclude + '/related', null).then(data => {
      let videoList: VideoItem[] = []
      for (let item of data.results) {
        videoList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numViews: item.numViews,
          numLikes: item.numLikes,
          duration: item.file ? item.file.duration ? item.file.duration : 0 : 0,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: item.file ?
          //   'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
          //   '~/assets/img/loss.png',
          img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}

interface VideoData {
  id: string,
  title: string,
  up: string,
  uid: string,
  body: string,
  numViews: number,
  numLikes: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  liked: boolean,
  following: boolean,
  friend: boolean,
  thumbnail: string,
  avatar: string,
  loss: boolean,
  fileUrl: string,
  fid: string
}

export function getVideoData(id: string): Promise<VideoData> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/video/' + id, null).then(res => {
      const data = res
      const videoData: VideoData = {
        id: data.id,
        title: data.title,
        up: data.user.name,
        uid: data.user.id,
        body: data.body,
        numViews: data.numViews,
        numLikes: data.numLikes,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        ecchi: data.rating == 'ecchi' ? true : false,
        liked: data.liked ? true : false,
        following: data.user.following ? true : false,
        friend: data.user.friend ? true : false,
        thumbnail: data.file ?
          'https://i.iwara.tv/image/thumbnail/' + data.file.id + '/thumbnail-' + data.thumbnail.toString().padStart(2, '0') + '.jpg' :
          '~/assets/img/loss.png',
        avatar: data.user.avatar ? 'https://i.iwara.tv/image/avatar/' + data.user.avatar.id + '/' + data.user.avatar.name : 'https://www.iwara.tv/images/default-avatar.jpg',
        loss: data.file ? false : true,
        fileUrl: data.fileUrl,
        fid: data.file ? data.file.id : ''
      }
      resolve(videoData)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getVideoFiles(fileUrl: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const fileId = fileUrl.split('?')[0].split('/').pop()
    const expires = fileUrl.split('=')[1].split('&')[0]
    const xVersion = CryptoJS.SHA1(fileId + '_' + expires + secretKey).toString()
    fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-Version': xVersion
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch:' + res.statusText)
      }
      return res.json()
    }).then(data => {
      if (Array.isArray(data)) {
        resolve(data)
      } else {
        reject('This not array!')
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function likeVideo(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    post(apiPath + '/video/' + id + '/like', null, null).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function unLikeVideo(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    deletef(apiPath + '/video/' + id + '/like').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function followers(uid: string): Promise<any> {
  return new Promise((resolve, reject) => {
    post(apiPath + '/user/' + uid + '/followers', null, null).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function disFollowers(uid: string): Promise<any> {
  return new Promise((resolve, reject) => {
    deletef(apiPath + '/user/' + uid + '/followers').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

interface Comments {
  id: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  userName: string,
  uid: string,
  avatar: string,
  numReplies: number
}
export function getVideoComments(id: string, page: number, parent?: string): Promise<Comments[]> {
  return new Promise((resolve, reject) => {
    let query: {
      limit: number,
      page: number,
      parent?: string
    }
    if (parent) {
      query = {
        limit: 32,
        page: page,
        parent: parent
      }
    } else {
      query = {
        limit: 32,
        page: page
      }
    }
    get(apiPath + '/video/' + id + '/comments', query).then(data => {
      let commentsList: Comments[] = []
      for (let item of data.results) {
        commentsList.push({
          id: item.id,
          body: item.body,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          userName: item.user.name,
          uid: item.user.id,
          avatar: item.user.avatar ? 'https://i.iwara.tv/image/avatar/' + item.user.avatar.id + '/' + item.user.avatar.name : 'https://www.iwara.tv/images/default-avatar.jpg',
          numReplies: item.numReplies
        })
      }
      resolve(commentsList)
    }).catch(err => {
      reject(err)
    })
  })
}


export function addCommentForVideo(id: string, body: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('评论发送')
    post(apiPath + '/video/' + id + '/comments', null, {
      body: body,
      rulesAgreement: true
    }).then(data => {
      console.log(data)
      resolve(data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

interface ImageItem {
  id: string,
  title: string,
  up: string,
  numImages: number,
  numViews: number,
  numLikes: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string
}
export function getSubscribeImageList(page: number): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 32,
      subscribed: true,
      page: page
    }
    get(apiPath + '/images', query).then(data => {
      let imageList: ImageItem[] = []
      for (let item of data.results) {
        imageList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numImages: item.numImages,
          numViews: item.numViews,
          numLikes: item.numLikes,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getImageList(page: number, sort: string): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 32,
      sort: sort,
      page: page
    }
    get(apiPath + '/images', query).then(data => {
      let imageList: ImageItem[] = []
      for (let item of data.results) {
        imageList.push({
          id: item.id,
          title: item.title,
          up: item.user.name,
          numImages: item.numImages,
          numViews: item.numViews,
          numLikes: item.numLikes,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          ecchi: item.rating == 'ecchi' ? true : false,
          // img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}
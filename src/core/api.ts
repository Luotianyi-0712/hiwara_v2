import CryptoJS from 'crypto-js';
import { getUserToken, getUserData } from './database'
import { isTokenValid } from './viewFunction'

const secretKey: string = '_5nFp9kmbNnHdAFhaqMvt';
const apiPath = "https://api.iwara.tv"

const defaultAvatar = 'https://www.iwara.tv/images/default-avatar.jpg'
const lossImgSrc = '~/assets/img/loss.png'

let userToken: string | null = null
let accessToken: string | null = null
let uid: string | null = null

function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (userToken) {
      send()
    } else {
      getUserToken().then(res => {
        userToken = res
        send()
      }).catch(err => {
        reject(err)
      })
    }
    function send() {
      fetch(apiPath + '/user/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + userToken
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
        console.log(err)
        reject(err)
      })
    }
  })
}

function get(path: string, query: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (isTokenValid(accessToken)) {
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
        console.log(err)
        reject(err)
      })
    }
  })
}

function post(path: string, query: any, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (isTokenValid(accessToken)) {
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
    if (isTokenValid(accessToken)) {
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
      }).then(data => {
        if (data.status == 204) {
          resolve(null)
        } else {
          resolve('Response status: ' + data.status)
        }
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
interface VideoData {
  id: string,
  title: string,
  slug: string,
  up: string,
  uid: string,
  username: string,
  body: string | null,
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
interface ImageData {
  id: string,
  title: string,
  slug: string,
  up: string,
  uid: string,
  username: string,
  body: string | null,
  numViews: number,
  numLikes: number,
  numImages: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  liked: boolean,
  following: boolean,
  friend: boolean,
  thumbnail: string,
  avatar: string
  loss: boolean,
  files: string[]
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
interface MyselfData {
  uid: string,
  name: string,
  username: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
  email: string,
  body: string,
  premium: boolean
}
interface PostsItem {
  id: string,
  title: string,
  body: string,
  numViews: string,
  createdAt: string,
  updatedAt: string,
  user: string,
  uid: string
}
interface usersItem {
  uid: string,
  name: string,
  username: string,
  avatar: string,
  following: boolean,
  friend: boolean,
  premium: boolean
}
interface UserData {
  uid: string,
  name: string,
  username: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
  body: string,
  premium: boolean,
  status: string,
  header: string | null,
  following: boolean
}

export function login(email: string, password: string): Promise<any> {
  const body = {
    email: email,
    password: password
  }
  console.log(body)
  return new Promise((resolve, reject) => {
    fetch(apiPath + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => {
      switch (res.status) {
        case 200:
          return res.json().then(data => ({
            status: 200,
            data: data
          }))
        case 400:
          return {
            status: 400,
            data: res.statusText
          }
        default:
          throw new Error('Failed to fetch:' + res.statusText)
      }
    }).then(data => {
      userToken = data.data.token
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserZoneVideoList(uid: string, page: number, sort: string): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 32,
      sort: sort,
      page: page,
      user: uid
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getVideoData(id: string): Promise<VideoData> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/video/' + id, null).then(res => {
      const data = res
      const videoData: VideoData = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        up: data.user.name,
        uid: data.user.id,
        username: data.user.username,
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
          lossImgSrc,
        avatar: data.user.avatar ? 'https://i.iwara.tv/image/avatar/' + data.user.avatar.id + '/' + data.user.avatar.name : defaultAvatar,
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
      console.log(err)
      reject(err)
    })
  })
}

export function unLikeVideo(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    deletef(apiPath + '/video/' + id + '/like').then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function followers(uid: string): Promise<any> {
  return new Promise((resolve, reject) => {
    post(apiPath + '/user/' + uid + '/followers', null, null).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function disFollowers(uid: string): Promise<any> {
  return new Promise((resolve, reject) => {
    deletef(apiPath + '/user/' + uid + '/followers').then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserTestimonialsImageList(uid: string, pid: string): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 6,
      user: uid,
      exclude: pid
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getSystemTestimonialsImageList(pid: string): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/image/' + pid + '/related', null).then(data => {
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserZoneImageList(uid: string, page: number, sort: string): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    const query = {
      rating: 'all',
      limit: 32,
      sort: sort,
      page: page,
      user: uid
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }).catch(err => {
      reject(err)
    })
  })
}



export function getImageData(id: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/image/' + id, null).then(res => {
      const data = res
      const imageData: ImageData = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        up: data.user.name,
        uid: data.user.id,
        username: data.user.username,
        body: data.body,
        numViews: data.numViews,
        numLikes: data.numLikes,
        numImages: data.numImages,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        ecchi: data.rating == 'ecchi' ? true : false,
        liked: data.liked ? true : false,
        following: data.user.following ? true : false,
        friend: data.user.friend ? true : false,
        thumbnail: 'https://i.iwara.tv/image/thumbnail/' + data.thumbnail.id + '/' + data.thumbnail.name,
        avatar: data.user.avatar ? 'https://i.iwara.tv/image/avatar/' + data.user.avatar.id + '/' + data.user.avatar.name : defaultAvatar,
        loss: data.files ? false : true,
        files: getImageUrl(data.files)
      }
      resolve(imageData)
    }).catch(err => {
      reject(err)
    })
  })
  function getImageUrl(files: any): string[] {
    if (!files) { return [] } else {
      let arr = []
      for (let i = 0; i < files.length; i++) {
        arr.push('https://i.iwara.tv/image/original/' + files[i].id + '/' + files[i].name)
      }
      return arr
    }
  }
}

export function likeImage(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    post(apiPath + '/image/' + id + '/like', null, null).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function unLikeImage(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    deletef(apiPath + '/image/' + id + '/like').then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
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
          avatar: item.user.avatar ? 'https://i.iwara.tv/image/avatar/' + item.user.avatar.id + '/' + item.user.avatar.name : defaultAvatar,
          numReplies: item.numReplies
        })
      }
      resolve(commentsList)
    }).catch(err => {
      reject(err)
    })
  })
}


export function addCommentForVideo(id: string, body: string, parentId?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('评论发送')
    let send: any
    if (parentId) {
      send = {
        body: body,
        parentId: parentId
      }
    } else {
      send = {
        body: body,
        rulesAgreement: true
      }
    }
    post(apiPath + '/video/' + id + '/comments', null, send).then(data => {
      console.log(data)
      resolve(data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function getImageComments(id: string, page: number, parent?: string): Promise<Comments[]> {
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
    get(apiPath + '/image/' + id + '/comments', query).then(data => {
      let commentsList: Comments[] = []
      for (let item of data.results) {
        commentsList.push({
          id: item.id,
          body: item.body,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          userName: item.user.name,
          uid: item.user.id,
          avatar: item.user.avatar ? 'https://i.iwara.tv/image/avatar/' + item.user.avatar.id + '/' + item.user.avatar.name : defaultAvatar,
          numReplies: item.numReplies
        })
      }
      resolve(commentsList)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addCommentForImage(id: string, body: string, parentId?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('评论发送')
    let send: any
    if (parentId) {
      send = {
        body: body,
        parentId: parentId
      }
    } else {
      send = {
        body: body,
        rulesAgreement: true
      }
    }
    post(apiPath + '/image/' + id + '/comments', null, send).then(data => {
      console.log(data)
      resolve(data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}


export function getMyselfUserData(): Promise<MyselfData> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/user', null).then(res => {
      const users = res.user
      const profile = res.profile
      uid = users.id
      resolve({
        uid: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar ? 'https://i.iwara.tv/image/avatar/' + users.avatar.id + '/' + users.avatar.name : defaultAvatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        email: users.email,
        body: profile.body,
        premium: users.premium
      })
    }).catch(err => {
      reject(err)
    })
  })
}

function getUID(): Promise<void> {
  return new Promise((resolve, reject) => {
    getUserData().then(data => {
      if (data.uid != "null") {
        uid = data.uid
        resolve()
      } else {
        get(apiPath + '/user', null).then(res => {
          uid = res.user.id
          resolve()
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      }
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function getFollowingList(uid: string, page: number, limit: number): Promise<any> {
  // 关注列表
  return new Promise((resolve, reject) => {
    const query = {
      page: page,
      limit: limit
    }
    get(apiPath + '/user/' + uid + '/following', query).then(res => {
      let usersList: usersItem[] = []
      for (let item of res.results) {
        usersList.push({
          uid: item.user.id,
          name: item.user.name,
          username: item.user.username,
          avatar: item.user.avatar ? 'https://i.iwara.tv/image/avatar/' + item.user.avatar.id + '/' + item.user.avatar.name : defaultAvatar,
          following: item.user.following,
          friend: item.user.friend,
          premium: item.user.premium
        })
      }
      resolve({
        count: res.count,
        data: usersList
      })
    }).catch(err => {
      reject(err)
    })
  })
}
export function getFollowersList(uid: string, page: number, limit: number): Promise<any> {
  // 粉丝列表
  return new Promise((resolve, reject) => {
    const query = {
      page: page,
      limit: limit
    }
    get(apiPath + '/user/' + uid + '/followers', query).then(res => {
      let usersList: usersItem[] = []
      for (let item of res.results) {
        usersList.push({
          uid: item.follower.id,
          name: item.follower.name,
          username: item.follower.username,
          avatar: item.follower.avatar ? 'https://i.iwara.tv/image/avatar/' + item.follower.avatar.id + '/' + item.follower.avatar.name : defaultAvatar,
          following: item.follower.following,
          friend: item.follower.friend,
          premium: item.follower.premium
        })
      }
      resolve({
        count: res.count,
        data: usersList
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPosts(uid: string, page: number, limit: number): Promise<any> {
  // 发布内容
  return new Promise((resolve, reject) => {
    const query = {
      user: uid,
      page: page,
      limit: limit
    }
    get(apiPath + '/posts', query).then(res => {
      let postsList: PostsItem[] = []
      for (let item of res.results) {
        postsList.push({
          id: item.id,
          title: item.title,
          body: item.body,
          numViews: item.numViews,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          user: item.user.name,
          uid: item.user.id
        })
      }
      resolve({
        count: res.count,
        data: postsList
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export function getZoneUserData(username: string): Promise<UserData> {
  return new Promise((resolve, reject) => {
    get(apiPath + '/profile/' + username, null).then(res => {
      const users = res.user
      resolve({
        uid: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar ? 'https://i.iwara.tv/image/avatar/' + users.avatar.id + '/' + users.avatar.name : defaultAvatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        body: res.body,
        premium: users.premium,
        status: users.status,
        header: res.header ? 'https://i.iwara.tv/image/profileHeader/' + res.header.id + '/' + res.header.name : null,
        following: users.following
      })
    })
  })
}

export function searchData(query: string, type: 'video' | 'image' | 'post' | 'user' | 'forum', page: number, limit: number): Promise<any> {
  return new Promise((resolve, reject) => {
    const sendMsg = {
      type: type,
      page: page,
      limit: limit,
      query: query
    }
    get(apiPath + '/search', sendMsg).then(res => {
      switch (type) {
        case 'video':
          video(res)
          break;
        case 'image':
          image(res)
          break;
        case 'post':
          posts(res)
          break;
        case 'user':
          users(res)
          break;
        case 'forum':
          break;
        default:
          break;
      }
    }).catch(err => {
      console.error(err)
      reject(err)
    })
    function video(data: any) {
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
          img: item.file ?
            'https://i.iwara.tv/image/thumbnail/' + item.file.id + '/thumbnail-' + item.thumbnail.toString().padStart(2, '0') + '.jpg' :
            lossImgSrc,
          // img: '~/assets/img/not-img.jpg',
          loss: item.file ? false : true
        })
      }
      resolve(videoList)
    }
    function image(data: any) {
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
          img: 'https://i.iwara.tv/image/thumbnail/' + item.thumbnail.id + '/' + item.thumbnail.name
          // img: '~/assets/img/not-img.jpg'
        })
      }
      resolve(imageList)
    }
    function posts(data: any) {
      let postsList: PostsItem[] = []
      for (let item of data.results) {
        postsList.push({
          id: item.id,
          title: item.title,
          body: item.body,
          numViews: item.numViews,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          user: item.user.name,
          uid: item.user.id
        })
      }
      resolve(postsList)
    }
    function users(data: any) {
      let usersList: usersItem[] = []
      for (let item of data.results) {
        usersList.push({
          uid: item.id,
          name: item.name,
          username: item.username,
          avatar: item.avatar ? 'https://i.iwara.tv/image/avatar/' + item.avatar.id + '/' + item.avatar.name : defaultAvatar,
          following: item.following,
          friend: item.friend,
          premium: item.premium
        })
      }
      resolve(usersList)
    }
  })
}
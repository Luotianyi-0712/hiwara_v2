import { knownFolders, Folder } from '@nativescript/core'
import { openOrCreate, deleteDatabase } from "@nativescript-community/sqlite"
const appDocuments = knownFolders.documents()
console.log(appDocuments.path)
let sqlite: any
function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (Folder.exists(appDocuments.path + '/databases')) {
      createdTable().then(() => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    } else {
      appDocuments.getFolder('databases')
      createdTable().then(() => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    }
  })
}

function createdTable(): Promise<void> {
  sqlite = openOrCreate(appDocuments.path + '/databases/app.db')
  const userTable = [
    ['uuid', 'TEXT'],
    ['uid', 'TEXT'],
    ['name', 'TEXT'],
    ['username', 'TEXT'],
    ['avatar', 'TEXT'],
    ['email', 'TEXT'],
    ['createdAt', 'TEXT'],
    ['updatedAt', 'TEXT'],
    ['body', 'TEXT'],
    ['premium', 'TEXT'],
    ['login', 'TEXT'],
    ['passwd', 'TEXT'],
    ['token', 'TEXT'],
  ]
  const configTable = [
    ['autoplay', 'TINYINT'],
    ['reconnect', 'TINYINT'],
    ['definition', 'TEXT'],
    ['language', 'TEXT'],
    ['download', 'TEXT'],
    ['aria', 'TINYINT'],
    ['ariaRPC', 'TEXT'],
    ['ariaToken', 'TEXT'],
    ['ariaDownload', 'TEXT'],
  ]
  const historyTable = [
    ['id', 'TEXT'],
    ['title', 'TEXT'],
    ['up', 'TEXT'],
    ['img', 'TEXT'],
    ['numViews', 'TEXT'],
    ['numLikes', 'TEXT'],
    ['long', 'TEXT'],
    ['ecchi', 'TINYINT'],
    ['time', 'TEXT'],
    ['createdAt', 'TEXT']
  ]
  const userTableCrate = "CREATE TABLE user ( " + userTable.map(item => item.join(' ')).join(',') + " );"
  const configTableCrate = "CREATE TABLE config ( " + configTable.map(item => item.join(' ')).join(',') + " );"
  const videoHistoryTableCrate = "CREATE TABLE videoHistory ( " + historyTable.map(item => item.join(' ')).join(',') + " );"
  const imageHistoryTableCrate = "CREATE TABLE imageHistory ( " + historyTable.map(item => item.join(' ')).join(',') + " );"
  return new Promise((resolve, reject) => {
    Promise.all([
      tableQuery('user').then(exist => {
        if (!exist) {
          sqlite.execute(userTableCrate).catch((err: any) => {
            console.log(err)
          })
          sqlite.execute("INSERT INTO user ( " + userTable.map(item => item[0]).join(',') + " ) VALUES ( '" + generateUUID() + "'" + ",null".repeat(userTable.length - 1) + " );").catch((err: any) => {
            console.log(err)
          })
        }
      }),
      tableQuery('config').then(exist => {
        if (!exist) {
          sqlite.execute(configTableCrate).catch((err: any) => {
            console.log(err)
          })
          const values = [
            1, 4, "'Source'", "'auto'", "null", 0, "null", "null", "null"
          ]
          sqlite.execute("INSERT INTO config ( " + configTable.map(item => item[0]).join(',') + " ) VALUES ( " + values.map(item => item).join(',') + " );").catch((err: any) => {
            console.log(err)
          })
        }
      }),
      tableQuery('videoHistory').then(exist => {
        if (!exist) {
          sqlite.execute(videoHistoryTableCrate).catch((err: any) => {
            console.log(err)
          })
        }
      }),
      tableQuery('imageHistory').then(exist => {
        if (!exist) {
          sqlite.execute(imageHistoryTableCrate).catch((err: any) => {
            console.log(err)
          })
        }
      })
    ]).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
  function tableQuery(table: string): Promise<boolean> {
    const query = "SELECT name FROM sqlite_master WHERE type='table' AND name='" + table + "';"
    return new Promise((resolve, reject) => {
      sqlite.get(query).then((res: any) => {
        if (res) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch((err: any) => {
        console.log(err)
        reject(err)
      })
    })
  }
}
function getQuery(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (sqlite) {
      querySQL()
    } else {
      initDatabase().then(() => {
        querySQL()
      }).catch(err => {
        reject(err)
      })
    }
    function querySQL() {
      sqlite.get(query).then((res: any) => {
        resolve(res)
      }).catch((err: any) => {
        reject(err)
      })
    }
  })
}

export function getUserPasswd(): Promise<any> {
  return new Promise((resolve, reject) => {
    getQuery('SELECT login, passwd FROM user;').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserToken(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    getQuery('SELECT token FROM user;').then(res => {
      resolve(res.token)
    }).catch(err => {
      reject(err)
    })
  })
}

export function saveUserToken(login: string, passwd: string, token: string): Promise<void> {
  return new Promise((resolve, reject) => {
    getQuery('SELECT uuid FROM user;').then(res => {
      sqlite.execute("UPDATE user SET login = '" + login + "', passwd = '" + passwd + "', token = '" + token + "' WHERE uuid = '" + res.uuid + "'").then(() => {
        resolve()
      }).catch((err: any) => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export function saveUserData(uid: string, name: string, username: string, avatar: string, createdAt: string, updatedAt: string, email: string, body: string, premium: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    getQuery('SELECT uuid FROM user;').then(res => {
      sqlite.execute("UPDATE user SET uid = '" + uid + "', name = '" + name + "', username = '" + username + "', avatar = '" + avatar + "', createdAt = '" + createdAt + "', updatedAt = '" + updatedAt + "', email = '" + email + "',  body = '" + body + "',  premium = '" + (premium ? 1 : 0) + "' WHERE uuid = '" + res.uuid + "';").then(() => {
        resolve()
      }).catch((err: any) => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserData(): Promise<any> {
  return new Promise((resolve, reject) => {
    getQuery('SELECT uid, name, username, avatar, createdAt, updatedAt, email, body, premium FROM user;').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addVideoHistory(id: string, title: string, up: string, img: string, numViews: number, numLikes: number, long: number, ecchi: boolean, createdAt: string): Promise<void> {
  return new Promise((resolve, reject) => {
    sqlite.execute("DELETE FROM videoHistory WHERE id = '" + id + "';").then(() => {
    }).then(() => {
      sqlite.execute("INSERT INTO videoHistory ('id', 'title', 'up', 'img', 'numViews', 'numLikes', 'long', 'ecchi', 'time', 'createdAt') VALUES ('" + id + "', '" + title + "', '" + up + "', '" + img + "', '" + numViews + "', '" + numLikes + "', '" + long + "', '" + ecchi + "', '" + getCurrentTimeFormatted() + "', '" + createdAt + "');").then(() => {
        resolve()
      }).catch((err: any) => {
        reject(err)
      })
    }).catch((err: any) => {
      reject(err)
    })

  })
}

export function getVideoHistory(page: number, limit: number): Promise<any> {
  return new Promise((resolve, reject) => {
    sqlite.select("SELECT * FROM videoHistory ORDER BY time DESC LIMIT " + limit + " OFFSET " + limit * page + ";").then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export function addImageHistory(id: string, title: string, up: string, img: string, numViews: number, numLikes: number, long: number, ecchi: boolean, createdAt: string): Promise<void> {
  return new Promise((resolve, reject) => {
    sqlite.execute("DELETE FROM imageHistory WHERE id = '" + id + "';").then(() => {
      sqlite.execute("INSERT INTO imageHistory ('id', 'title', 'up', 'img', 'numViews', 'numLikes', 'long', 'ecchi', 'time', 'createdAt') VALUES ('" + id + "', '" + title + "', '" + up + "', '" + img + "', '" + numViews + "', '" + numLikes + "', '" + long + "', '" + ecchi + "', '" + getCurrentTimeFormatted() + "', '" + createdAt + "');").then(() => {
        resolve()
      }).catch((err: any) => {
        reject(err)
      })
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export function getImageHistory(page: number, limit: number): Promise<any> {
  return new Promise((resolve, reject) => {
    sqlite.select("SELECT * FROM imageHistory ORDER BY time DESC LIMIT " + limit + " OFFSET " + limit * page + ";").then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}

function generateUUID() {
  let d = new Date().getTime(); // 获取当前时间
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // 使用高精度时间
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function getCurrentTimeFormatted() {
  // 获取当前时间
  const now = new Date();
  // 将当前时间格式化为ISO 8601格式的字符串，并去除毫秒部分
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = now.getUTCDate().toString().padStart(2, '0');
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  // 构建格式化的时间字符串
  const formattedISOString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  return formattedISOString;
}
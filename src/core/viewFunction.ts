import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';
import { getMyselfUserData } from "./api"
import { saveUserData, getUserData } from "./database"

export const languageList = [
  {
    label: 'English',
    tslabel: 'English',
    value: 'en-US'
  },
  {
    label: '简体中文',
    tslabel: 'Chinese Simplified',
    value: 'zh-Hans'
  }, {
    label: '繁體中文',
    tslabel: 'Chinese Traditional',
    value: 'zh-Hant'
  }, {
    label: '日本語',
    tslabel: 'Japanese',
    value: 'ja-JP'
  }, {
    label: '한국어',
    tslabel: 'Korean',
    value: 'ko-KR'
  }, {
    label: 'Deutsch',
    tslabel: 'German',
    value: 'de-DE'
  }, {
    label: 'Français',
    tslabel: 'French',
    value: 'fr-FR'
  }, {
    label: 'Español',
    tslabel: 'Spanish',
    value: 'es-ES'
  }, {
    label: 'Português',
    tslabel: 'Portuguese',
    value: 'pt-PT'
  }, {
    label: 'Italiano',
    tslabel: 'Italian',
    value: 'it-IT'
  }, {
    label: 'Русский',
    tslabel: 'Russian',
    value: 'ru-RU'
  }, {
    label: 'Українська',
    tslabel: 'Ukrainian',
    value: 'uk-UA'
  }, {
    label: 'العربية',
    tslabel: 'Arabic',
    value: 'ar-SA'
  }, {
    label: 'فارسی',
    tslabel: 'Persian',
    value: 'fa-IR'
  }, {
    label: 'ئۇيغۇر تىلى',
    tslabel: 'Uyghur',
    value: 'ug-CN'
  }, {
    label: 'བོད་ཀྱི་སྐད་',
    tslabel: 'Tibetan',
    value: 'bo-CN'
  }, {
    label: 'Tiếng Việt',
    tslabel: 'Vietnamese',
    value: 'vi-VN'
  }, {
    label: 'ภาษาไทย',
    tslabel: 'Thai',
    value: 'th-TH'
  }, {
    label: 'हिन्दी',
    tslabel: 'Hindi',
    value: 'hi-IN'
  }, {
    label: 'বাংলা',
    tslabel: 'Bengali',
    value: 'bn-IN'
  }
]

export function toasty(text: string, type?: 'Success' | 'Error') {
  let variant: any
  switch (type) {
    case 'Success':
      variant = ToastVariant.Success
      break
    case 'Error':
      variant = ToastVariant.Error
      break
    default:
      variant = ToastVariant.Success
      break
  }
  const toast = new Toasty({
    text: text,
    duration: ToastDuration.Short,
    variant: variant
  })
  toast.show()
}
export function parseDefinitionLabel(value: string) {
  switch (value) {
    case '360': return '360P'
    case '540': return '540P'
    case 'Source': return '原画'
    default: return value
  }
}
export function unParseDefinitionLabel(value: string) {
  switch (value) {
    case '360P': return '360'
    case '540P': return '540'
    case '原画': return 'Source'
    default: return value
  }
}
export function parseMonthLabel(value: number) {
  switch (value) {
    case 0: return '全部月份'
    case 1: return '1月'
    case 2: return '2月'
    case 3: return '3月'
    case 4: return '4月'
    case 5: return '5月'
    case 6: return '6月'
    case 7: return '7月'
    case 8: return '8月'
    case 9: return '9月'
    case 10: return '10月'
    case 11: return '11月'
    case 12: return '12月'
    default: return ''
  }
}
export function unParseMonthLabel(value: string) {
  switch (value) {
    case '1月': return 1
    case '2月': return 2
    case '3月': return 3
    case '4月': return 4
    case '5月': return 5
    case '6月': return 6
    case '7月': return 7
    case '8月': return 8
    case '9月': return 9
    case '10月': return 10
    case '11月': return 11
    case '12月': return 12
    default: return 0
  }
}
export function isTokenValid(token: string | null): boolean {
  if (token) {
    const arr = token.split('.')
    const exp = JSON.parse(base64Decode(arr[1])).exp * 1000
    const date = new Date()
    if (date.getTime() < exp) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
function base64Decode(str: string): string {
  const base64Chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output: string = '';
  let char1: number, char2: number, char3: number;
  let enc1: number, enc2: number, enc3: number, enc4: number;
  for (let i = 0; i < str.length; i += 4) {
    enc1 = base64Chars.indexOf(str.charAt(i));
    enc2 = base64Chars.indexOf(str.charAt(i + 1));
    enc3 = base64Chars.indexOf(str.charAt(i + 2));
    enc4 = base64Chars.indexOf(str.charAt(i + 3));
    char1 = (enc1 << 2) | (enc2 >> 4);
    char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    char3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(char1);
    if (enc3 !== 64) {
      output += String.fromCharCode(char2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(char3);
    }
  }
  return output.replace(/\0/g, '');
}

export function myselfData(): Promise<any> {
  return new Promise((resolve, reject) => {
    getUserData().then(data => {
      if (data.uid == null) {
        getMyselfUserData().then(res => {
          saveUserData(res.uid, res.name, res.username, res.avatar, res.createdAt, res.updatedAt, res.email, res.body, res.premium).then(() => {
            resolve({
              uid: res.uid,
              name: res.name,
              username: res.username,
              avatar: res.avatar,
              createdAt: res.createdAt,
              updatedAt: res.updatedAt,
              email: res.email,
              body: res.body,
              premium: res.premium
            })
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      } else {
        resolve(data)
      }
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export function formatIsoToDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}`;
}

export function parseLanguageLabel(val: string) {
  if (val === 'auto') {
    return '跟随系统'
  } else {
    return languageList.find(item => item.value === val)?.label || val
  }
}
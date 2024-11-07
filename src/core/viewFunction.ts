import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';

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
    case '360':
      return '360P'
    case '540':
      return '540P'
    case 'Source':
      return '原画'
    default:
      return value
  }
}
export function unParseDefinitionLabel(value: string) {
  switch (value) {
    case '360P':
      return '360'
    case '540P':
      return '540'
    case '原画':
      return 'Source'
    default:
      return value
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
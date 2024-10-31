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
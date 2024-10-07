const testUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxZTBkOWZiLTdlZjgtNDg5OC1hODZjLThiYzMzZDdiYWM1ZiIsInR5cGUiOiJyZWZyZXNoX3Rva2VuIiwiaXNzIjoiaXdhcmEiLCJpYXQiOjE3Mjc4ODIzMzMsImV4cCI6MTczMDQ3NDMzM30.9X7P-gMVNrwtYpVhBIyLvBHyUOOlRq4hGxNInnT4zhA';
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
  console.log(data)
}).catch(err => {
  console.log(err)
})
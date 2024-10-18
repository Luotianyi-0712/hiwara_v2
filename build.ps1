$keyStorePath = ".\release-key.keystore"
$keyStorePassword = "<your store password>"
$keyStoreAlias = "hiwara"
$keyStoreAliasPassword = "<your store alias password>"

ns clean
ns build android --release --clean `
  --key-store-path $keyStorePath `
  --key-store-password $keyStorePassword `
  --key-store-alias $keyStoreAlias `
  --key-store-alias-password $keyStoreAliasPassword

explorer '.\platforms\android\app\build\outputs\apk\release'

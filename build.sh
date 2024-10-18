#!/bin/bash

KEY_STORE_PATH="release-key.keystore"
KEY_STORE_PASSWORD="<your store password>"
KEY_STORE_ALIAS="hiwara"
KEY_STORE_ALIAS_PASSWORD="<your store alias password>"

ns clean
ns build android --release --clean \
  --key-store-path "$KEY_STORE_PATH" \
  --key-store-password "$KEY_STORE_PASSWORD" \
  --key-store-alias "$KEY_STORE_ALIAS" \
  --key-store-alias-password "$KEY_STORE_ALIAS_PASSWORD"

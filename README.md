# Zark's Dictionary

這是一個能夠美化顯示介面的工具，僅適用於固定的檔案格式。

## 安裝與編譯

您可以選擇使用`yarn`或是`npm`來進行安裝編譯。
> **Info**  
> 您需要先設定您的環境變數

 1. 使用`yarn`(或`npm install`)安裝依賴
 2. 執行`yarn start`(或`npm start`)執行網頁版本

## 環境變數

您需要設定環境變數以便這個應用的API使用

參數                              | 說明
-------------------------------- | --------------
REACT_APP_GOOGLE_API_TOKEN       | 您於Google Cloud Console所申請的**API金鑰**
REACT_APP_GOOGLE_OAUTH_CLIENT_ID | 您於Google Cloud Console所申請的**OAuth金鑰**

## Github Pages

這個應用可適用於Github Pages上，如需自動編譯發布，請設定以下環境密鑰

參數                        | 對應的環境變數
--------------------------- | ----------------
GOOGLE_OAUTH_CLIENT_ID      | REACT_APP_GOOGLE_OAUTH_CLIENT_ID
GOOGLE_API_TOKEN            | REACT_APP_GOOGLE_API_TOKEN

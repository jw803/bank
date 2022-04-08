## 忘記密碼Demo
### API文件
啟動後，拜訪http://localhost:3000/doc/
![](https://i.imgur.com/UtTfFGc.png)

### API 流程
1. /v1/email/otp: 使用者要求OTP，使用者會收到OTP mail
2. /v1/otp/verify: 
    * 使用者使用/v1/email/otp得到已編碼之OTP資訊放入這支API的verification_key欄位
    * otp填入mail收到之OTP
    * email為使用者mail
3. /v1/user/changePassword:
    * 使用者更新密碼
    * 需提供正確舊密碼
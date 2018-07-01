//const SERVER = "http://localhost";
const SERVER = "http://125.212.216.80:8080";

module.exports = {
  AVATAR:SERVER+"/uploads/",
  SENDSMS:SERVER+"/api/auth/sendsms",
  REGISTER:SERVER+"/api/auth/register-web",
  CAPTCHA:SERVER+"/api/captcha",
  TYPEDRIVE:SERVER+"/api/type_drive",
  REFERRAL:SERVER+"/api/referral",
  VERIFYWEB:SERVER+"/api/auth/verifyweb",
  SIGNIN:SERVER+"/api/auth/sign-in-pass-word",
  USERACCOUNT:SERVER+"/api/auth/profile/",
  PROFILE_PICTRUE:SERVER+"/api/auth/avatar",
  PROFILE_CARD:SERVER+"/api/auth/card",
  PROFILE_DOC:SERVER+"/api/auth/doccument",
  UPDATE_USER:SERVER+"/api/auth/doccumentboth",
  CITIES:SERVER+"/api/city",
  CATEGORY:SERVER+"/api/category",
};

/**
 * Created by linustorvalds on 8/28/18.
 */

/*
  get uuid from HERE
  https://github.com/Microsoft/vscode/blob/master/src/vs/base/common/uuid.ts

 papago script HERE
 POST request to : https://papago.naver.com/apis/n2mt/translate with form data encoded base64


 var r = n("./node_modules/redux-actions/lib/index.js")
 , s = n("./node_modules/redux-thunk-actions/lib/index.js")
 , i = n("./app/constants/actions.ts")
 , l = n("./app/utils/request.ts")
 , c = n("./app/constants/naver.ts")
 , u = n("./app/utils/user-agent.ts")
 , d = n("./app/utils/uuid.ts")
 , p = n("./app/utils/convert.ts")
 , f = n("./app/utils/request.ts")
 , h = u.isMobile();
 t.translate = s.createActionThunk(i.TRANSLATE, function(e, t) {
 var n = e.type;
 return e = o({}, e, {
 deviceId: d.default()
 }),
 delete e.type,
 l.post(c.URL_PAPAGO_HOME + "/apis/" + n + "/translate", {
 body: JSON.stringify(e),
 headers: {
 Accept: "application/json",
 "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
 "device-type": h ? "mobile" : "pc",
 "x-apigw-partnerid": "papago"
 }
 })
 }),
 */
import{a as F,b as R,c as E,d as _,e as d,g as b,h as V,j as D}from"./chunk-YQDQSI62.js";import{a as G}from"./chunk-3ZGYBLRK.js";import{a as g}from"./chunk-DLVQ55JA.js";import{e as y}from"./chunk-HMFFZYJV.js";import{a as x}from"./chunk-GLZ7CWDM.js";import"./chunk-N6K2W27P.js";import{$a as a,Ea as v,T as n,Va as S,W as h,Za as e,_a as i,cb as k,da as p,ea as c,eb as u,ia as w,jb as s,pb as C}from"./chunk-ROZATKAH.js";var P=(()=>{let r=class r{constructor(){this.httpService=n(x),this.destroyRef=n(w),this.sharingService=n(G),this.router=n(y),this.registerForm=new _({email:new d(""),password:new d("")})}onLoginClick(){throw new Error("Method not implemented.")}onRegisterClick(){console.log(this.registerForm.value),this.httpService.register(this.registerForm.value).pipe(g(this.destroyRef)).subscribe(m=>{localStorage.setItem("mylife-token",m.token);let t=this.registerForm.get("email")?.value;this.httpService.sendVerificationEmail({email:t}).pipe(g(this.destroyRef)).subscribe(o=>{console.log(o)}),this.sharingService.updateUserEmail(t),this.router.navigateByUrl("check-email")})}};r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=h({type:r,selectors:[["app-register"]],standalone:!0,features:[C],decls:18,vars:1,consts:[["passwordInput",""],[1,"main"],["src","../../assets/star-struck.png","alt",""],[1,"title-login"],[1,"forgot"],[1,"sign-up",3,"click"],[1,"input-container",3,"formGroup"],[1,"input-wrapper"],["src","../../assets/envelope.png","alt","",1,"icon"],["formControlName","email","placeholder","Email","type","text",1,"row","input"],[1,"input-wrapper","password-wrapper"],["src","../../assets/password.png","alt","",1,"password-img","icon"],["formControlName","password","placeholder","Password","type","text",1,"row","input","password"],[1,"login-btn",3,"click"]],template:function(t,o){if(t&1){let f=k();e(0,"main",1),a(1,"img",2),e(2,"h1",3),s(3,"Register"),i(),e(4,"span",4),s(5,"Already have an account? "),i(),e(6,"span",5),u("click",function(){return p(f),c(o.onLoginClick())}),s(7,"Login "),i(),e(8,"div",6)(9,"div",7),a(10,"img",8)(11,"input",9),i(),e(12,"div",10),a(13,"img",11)(14,"input",12,0),i()(),e(16,"button",13),u("click",function(){return p(f),c(o.onRegisterClick())}),s(17,"Register"),i()()}t&2&&(v(8),S("formGroup",o.registerForm))},dependencies:[D,F,R,E,b,V]});let l=r;return l})();export{P as RegisterComponent};
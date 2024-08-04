import{a as j,b as W,c as U,d as X}from"./chunk-2JIXGZJN.js";import{b as Y}from"./chunk-VS57RFAZ.js";import"./chunk-ASFMWAJ2.js";import"./chunk-5IC5DNT2.js";import{a as F,b as D,c as N,d as V,e as B,f as G,g as z}from"./chunk-VAKHA43H.js";import{a as R,b as I}from"./chunk-IUANNFGH.js";import{a as S}from"./chunk-7ETHMLRB.js";import{c as H,d as O}from"./chunk-SQFHUTQY.js";import{$a as E,Ca as M,Db as v,Nb as c,Qb as L,Rb as b,S as y,Sb as x,Ta as _,U as q,Ub as f,Va as k,Xa as w,Za as Z,_ as g,ab as A,da as u,ga as C,kc as P,oa as d,pa as p,vb as r,wb as s,xb as m}from"./chunk-2WDL2M4L.js";import"./chunk-CWTPBX7D.js";var J=[{path:"",loadComponent:()=>import("./chunk-E34BYFVY.js").then(t=>t.ChatComponent)},{path:"login",loadComponent:()=>import("./chunk-WCQT27NA.js").then(t=>t.LoginComponent)},{path:"register",loadComponent:()=>import("./chunk-RJK4JURF.js").then(t=>t.RegisterComponent)},{path:"check-email",loadComponent:()=>import("./chunk-WIUH7T4K.js").then(t=>t.CheckEmailComponent)},{path:"forgot-password",loadComponent:()=>import("./chunk-FXUBOATG.js").then(t=>t.ForgotPasswordComponent)},{path:"home",loadComponent:()=>import("./chunk-E34BYFVY.js").then(t=>t.ChatComponent)},{path:"daily-stories",loadComponent:()=>import("./chunk-DBOAVPQB.js").then(t=>t.DailyStoriesComponent)},{path:"story/:storyId",loadComponent:()=>import("./chunk-62EGUGNL.js").then(t=>t.DayStoryComponent)},{path:"ebook",loadComponent:()=>import("./chunk-NCUQHXMS.js").then(t=>t.EbookComponent)}];var oe="@",re=(()=>{let e=class e{constructor(i,o,a,l,h){this.doc=i,this.delegate=o,this.zone=a,this.animationType=l,this.moduleImpl=h,this._rendererFactoryPromise=null,this.scheduler=g(w,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-VFA2PKIR.js")).catch(o=>{throw new y(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:a})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let l=new a(this.delegate,this._engine,this.zone);return this.delegate=l,l})}createRenderer(i,o){let a=this.delegate.createRenderer(i,o);if(a.\u0275type===0)return a;typeof a.throwOnSyntheticProps=="boolean"&&(a.throwOnSyntheticProps=!1);let l=new T(a);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(h=>{let ie=h.createRenderer(i,o);l.use(ie)}).catch(h=>{l.use(a)}),l}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){k()},e.\u0275prov=q({token:e,factory:e.\u0275fac});let t=e;return t})(),T=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let n of this.replay)n(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,n){return this.delegate.createElement(e,n)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,n){this.delegate.appendChild(e,n)}insertBefore(e,n,i,o){this.delegate.insertBefore(e,n,i,o)}removeChild(e,n,i){this.delegate.removeChild(e,n,i)}selectRootElement(e,n){return this.delegate.selectRootElement(e,n)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,n,i,o){this.delegate.setAttribute(e,n,i,o)}removeAttribute(e,n,i){this.delegate.removeAttribute(e,n,i)}addClass(e,n){this.delegate.addClass(e,n)}removeClass(e,n){this.delegate.removeClass(e,n)}setStyle(e,n,i,o){this.delegate.setStyle(e,n,i,o)}removeStyle(e,n,i){this.delegate.removeStyle(e,n,i)}setProperty(e,n,i){this.shouldReplay(n)&&this.replay.push(o=>o.setProperty(e,n,i)),this.delegate.setProperty(e,n,i)}setValue(e,n){this.delegate.setValue(e,n)}listen(e,n,i){return this.shouldReplay(n)&&this.replay.push(o=>o.listen(e,n,i)),this.delegate.listen(e,n,i)}shouldReplay(e){return this.replay!==null&&e.startsWith(oe)}};function Q(t="animations"){return E("NgAsyncAnimations"),C([{provide:Z,useFactory:(e,n,i)=>new re(e,n,i,t),deps:[P,R,A]},{provide:M,useValue:t==="noop"?"NoopAnimations":"BrowserAnimations"}])}var $=(t,e)=>{let n=localStorage.getItem("mylife-token");return n&&(t=t.clone({setHeaders:{Authorization:`Bearer ${n}`}})),e(t)};var ee={providers:[B(J,G()),H(O([$])),Q(),Y()]};var te=(()=>{let e=class e{constructor(){this.router=g(D),this.sharingService=g(S)}toggleSidenav(){this.sharingService.toggleSidenav()}onLogout(){this.toggleSidenav(),localStorage.removeItem("mylife-token"),this.router.navigateByUrl("login")}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=u({type:e,selectors:[["app-sidenav"]],standalone:!0,features:[f],decls:42,vars:0,consts:[["xmlns","http://www.w3.org/2000/svg","height","24px","viewBox","0 -960 960 960","width","24px","fill","#000"],["d","m480-193 85-85 57 56L480-80 338-222l57-56 85 85ZM193-480l85 85-56 57L80-480l142-142 56 57-85 85Zm574 0-85-85 56-57 142 142-142 142-56-57 85-85ZM480-767l-85 85-57-56 142-142 142 142-57 56-85-85Z"],[1,"sidenav-body"],["routerLink","home","routerLinkActive","active-route",1,"sidenav-item",3,"click"],["xmlns","http://www.w3.org/2000/svg","height","24px","viewBox","0 -960 960 960","width","24px","fill","#55ad90"],["d","M880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"],["routerLink","daily-stories","routerLinkActive","active-route",1,"sidenav-item",3,"click"],["d","M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"],["routerLink","ebook","routerLinkActive","active-route",1,"sidenav-item",3,"click"],["d","M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"],[1,"sidenav-item",3,"click"],["d","M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"],["d","M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"],["d","M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z"],["d","M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"]],template:function(o,a){o&1&&(r(0,"main")(1,"header"),d(),r(2,"svg",0),m(3,"path",1),s(),p(),r(4,"h5"),c(5,"My Life"),s()(),r(6,"div",2)(7,"div",3),v("click",function(){return a.toggleSidenav()}),d(),r(8,"svg",4),m(9,"path",5),s(),p(),r(10,"p"),c(11,"Chat"),s()(),r(12,"div",6),v("click",function(){return a.toggleSidenav()}),d(),r(13,"svg",4),m(14,"path",7),s(),p(),r(15,"p"),c(16,"Daily Stories"),s()(),r(17,"div",8),v("click",function(){return a.toggleSidenav()}),d(),r(18,"svg",4),m(19,"path",9),s(),p(),r(20,"p"),c(21,"My Life e-book"),s()(),r(22,"div",10),v("click",function(){return a.toggleSidenav()}),d(),r(23,"svg",4),m(24,"path",11),s(),p(),r(25,"p"),c(26,"Memory Album"),s()(),r(27,"div",10),v("click",function(){return a.toggleSidenav()}),d(),r(28,"svg",4),m(29,"path",12),s(),p(),r(30,"p"),c(31,"Find a memory"),s()(),r(32,"div",10),v("click",function(){return a.toggleSidenav()}),d(),r(33,"svg",4),m(34,"path",13),s(),p(),r(35,"p"),c(36,"Chat Archive"),s()(),r(37,"div",10),v("click",function(){return a.onLogout()}),d(),r(38,"svg",4),m(39,"path",14),s(),p(),r(40,"p"),c(41,"Logout"),s()()()())},dependencies:[z,N,V],styles:["main[_ngcontent-%COMP%]{width:100%;height:100%;background-color:#f5f5f5}header[_ngcontent-%COMP%], .sidenav-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:15px;padding:20px}header[_ngcontent-%COMP%]{font-size:18px;letter-spacing:1px;width:100%;color:#55ad90}h5[_ngcontent-%COMP%]{font-size:18px}.sidenav-item[_ngcontent-%COMP%]{cursor:pointer;color:#55ad90;font-size:16px;letter-spacing:1px;width:100%;transition:all .3s ease-in-out}.active-route[_ngcontent-%COMP%]{color:#fff;background-color:#55ad90;border:none;outline:none}.active-route[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff}"]});let t=e;return t})();var ne=(()=>{let e=class e{constructor(){this.title="my-life",this.sharingService=g(S),this.isSidenavOpen=!1}ngOnInit(){this.sharingService.toogleSidenav$.subscribe(i=>{this.isSidenavOpen=i})}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=u({type:e,selectors:[["app-root"]],standalone:!0,features:[f],decls:6,vars:1,consts:[["mode","over",1,"sidenav",3,"openedChange","opened"],[1,"container"]],template:function(o,a){o&1&&(r(0,"mat-sidenav-container")(1,"mat-sidenav",0),x("openedChange",function(h){return b(a.isSidenavOpen,h)||(a.isSidenavOpen=h),h}),m(2,"app-sidenav"),s(),r(3,"mat-sidenav-content")(4,"div",1),m(5,"router-outlet"),s()()()),o&2&&(_(),L("opened",a.isSidenavOpen))},dependencies:[F,X,W,U,j,te],styles:[".container[_ngcontent-%COMP%]{height:100vh}.sidenav[_ngcontent-%COMP%]{width:60%}"]});let t=e;return t})();I(ne,ee).catch(t=>console.error(t));

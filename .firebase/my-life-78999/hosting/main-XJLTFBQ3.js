import{b as N}from"./chunk-3X44BZ4O.js";import{a as M,b as S,d as D,f as E}from"./chunk-HMFFZYJV.js";import{c as F,d as P}from"./chunk-N6K2W27P.js";import"./chunk-WXI33M2S.js";import{$a as I,Bb as w,Ga as g,Ha as f,Ja as y,L as d,La as C,Ma as v,N as p,T as h,W as m,Z as c,Za as A,_a as R,pa as u,pb as b}from"./chunk-ROZATKAH.js";var x=[{path:"",loadComponent:()=>import("./chunk-OFDIS2IS.js").then(r=>r.ChatComponent)},{path:"login",loadComponent:()=>import("./chunk-6XLUEIVR.js").then(r=>r.LoginComponent)},{path:"register",loadComponent:()=>import("./chunk-JCEZA4ZA.js").then(r=>r.RegisterComponent)},{path:"check-email",loadComponent:()=>import("./chunk-EVZLV5H7.js").then(r=>r.CheckEmailComponent)},{path:"home",loadComponent:()=>import("./chunk-OFDIS2IS.js").then(r=>r.ChatComponent)}];var z="@",V=(()=>{let e=class e{constructor(o,n,i,s,a){this.doc=o,this.delegate=n,this.zone=i,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=h(f,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-XH6LGBTY.js")).catch(n=>{throw new d(5300,!1)}).then(({\u0275createEngine:n,\u0275AnimationRendererFactory:i})=>{this._engine=n(this.animationType,this.doc,this.scheduler);let s=new i(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(o,n){let i=this.delegate.createRenderer(o,n);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let s=new l(i);return n?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let B=a.createRenderer(o,n);s.use(B)}).catch(a=>{s.use(i)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(n){g()},e.\u0275prov=p({token:e,factory:e.\u0275fac});let r=e;return r})(),l=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,o,n){this.delegate.insertBefore(e,t,o,n)}removeChild(e,t,o){this.delegate.removeChild(e,t,o)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,o,n){this.delegate.setAttribute(e,t,o,n)}removeAttribute(e,t,o){this.delegate.removeAttribute(e,t,o)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,o,n){this.delegate.setStyle(e,t,o,n)}removeStyle(e,t,o){this.delegate.removeStyle(e,t,o)}setProperty(e,t,o){this.shouldReplay(t)&&this.replay.push(n=>n.setProperty(e,t,o)),this.delegate.setProperty(e,t,o)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,o){return this.shouldReplay(t)&&this.replay.push(n=>n.listen(e,t,o)),this.delegate.listen(e,t,o)}shouldReplay(e){return this.replay!==null&&e.startsWith(z)}};function O(r="animations"){return C("NgAsyncAnimations"),c([{provide:y,useFactory:(e,t,o)=>new V(e,t,o,r),deps:[w,M,v]},{provide:u,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var k=(r,e)=>{let t=localStorage.getItem("mylife-token");return t&&(r=r.clone({setHeaders:{Authorization:`Bearer ${t}`}})),e(r)};var T={providers:[E(x),F(P([k])),O(),N()]};var _=(()=>{let e=class e{constructor(){this.title="my-life"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-root"]],standalone:!0,features:[b],decls:2,vars:0,consts:[[1,"container"]],template:function(n,i){n&1&&(A(0,"div",0),I(1,"router-outlet"),R())},dependencies:[D],styles:[".container[_ngcontent-%COMP%]{height:100vh}"]});let r=e;return r})();S(_,T).catch(r=>console.error(r));
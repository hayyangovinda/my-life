import{c as U,d as $,e as q,f as J,g as K,h as Q,i as W,j as X}from"./chunk-EDAI6TNL.js";import"./chunk-NJAWYSDF.js";import{F as R,I as L}from"./chunk-FDE6MBQY.js";import{b as V,g as Y,h as z,i as G,k as b,m as j,n as N,o as B,p as H}from"./chunk-KKUW3EYT.js";import"./chunk-5IC5DNT2.js";import{b as A}from"./chunk-BXZAQA36.js";import"./chunk-GIDJWLZK.js";import{a as Z}from"./chunk-D6VDJXMI.js";import{a as I}from"./chunk-XVXDBZAN.js";import"./chunk-GTL4EDMA.js";import{p as T}from"./chunk-E6I4JPOI.js";import{$ as d,Ab as r,Bb as p,Eb as v,Jb as u,Lb as w,Sb as O,Tb as g,Va as c,Vb as P,Zb as D,_b as S,bc as E,dc as F,ea as f,oa as m,ob as x,pa as h,qa as y,ra as C,vb as _,xb as k,yb as M,zb as t}from"./chunk-FVMQVLXL.js";import"./chunk-CWTPBX7D.js";function ee(o,e){if(o&1){let s=v();t(0,"div",14),u("click",function(){let n=m(s).$implicit,i=w();return h(i.goToChat(n))}),t(1,"div",15),g(2,"\u{1F4D6}"),r(),g(3),E(4,"date"),r()}if(o&2){let s=e.$implicit;c(3),P(" ",F(4,1,s.date,"EEEE, dd MMMM yyyy")," ")}}var xe=(()=>{let e=class e{constructor(){this.currentYear=new Date,this.firstDayOfYear=X(this.currentYear),this.lastDayOfYear=W(this.currentYear),this.range=new G({start:new b(this.firstDayOfYear),end:new b(this.lastDayOfYear)}),this.sharingService=d(Z),this.httpService=d(I),this.router=d(A),this.chats=[]}ngOnInit(){this.httpService.getAllDayChats().subscribe(a=>{this.chats=a,console.log(this.chats)})}toggleSidenav(){this.sharingService.toggleSidenav()}goToChat(a){this.router.navigateByUrl("home/"+a.date)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["app-chat-archive"]],standalone:!0,features:[D([L(),{provide:R,useValue:"en-GB"}]),S],decls:18,vars:3,consts:[["picker",""],[1,"header"],[1,"header-container"],["xmlns","http://www.w3.org/2000/svg","height","30px","viewBox","0 -960 960 960","width","30px","fill","var(--black-text-color)",3,"click"],["d","M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"],[1,"date-picker"],[1,"inner-date-picker"],[3,"formGroup","rangePicker"],["readonly","","matStartDate","","formControlName","start","placeholder","Start date"],["readonly","","matEndDate","","formControlName","end","placeholder","End date"],["matIconSuffix","",3,"for"],["touchUi","true"],[1,"daily-stories-body"],[1,"daily-stories-item","row"],[1,"daily-stories-item","row",3,"click"],[1,"img"]],template:function(n,i){if(n&1){let l=v();t(0,"main")(1,"header",1)(2,"div",2),y(),t(3,"svg",3),u("click",function(){return m(l),h(i.toggleSidenav())}),p(4,"path",4),r(),C(),t(5,"h5"),g(6,"Chat Archive"),r()()(),t(7,"div",5)(8,"div",6)(9,"mat-date-range-input",7),p(10,"input",8)(11,"input",9),r(),p(12,"mat-datepicker-toggle",10)(13,"mat-date-range-picker",11,0),r()(),t(15,"div",12),k(16,ee,5,4,"div",13,_),r()()}if(n&2){let l=O(14);c(9),x("formGroup",i.range)("rangePicker",l),c(3),x("for",l),c(4),M(i.chats)}},dependencies:[T,Q,U,J,$,q,K,B,V,Y,z,H,j,N],styles:["main[_ngcontent-%COMP%]{height:100%;overflow-y:hidden;background-color:var(--secondary-bg-color)}footer[_ngcontent-%COMP%]{position:absolute;bottom:5px;width:100%;display:flex;align-items:center}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{flex:1;padding:10px;border:1px solid #ddd;border-radius:10px;resize:none;height:40px;max-height:120px;overflow-y:auto;outline:none}.camera[_ngcontent-%COMP%]{width:30px;height:30px;margin-left:10px;border-radius:50%}.send[_ngcontent-%COMP%]{width:30px;height:30px;margin-right:10px;border-radius:50%}.chat-body[_ngcontent-%COMP%]{height:calc(100% - 100px);overflow-y:scroll;padding:10px;display:flex;flex-direction:column;gap:10px;font-size:.9rem}.message[_ngcontent-%COMP%]{margin-bottom:10px;padding:8px;border-radius:8px;word-wrap:break-word;max-width:90%}.message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.message.received[_ngcontent-%COMP%]{color:var(--black-text-color);text-align:left;align-self:flex-start;background-color:var(--main-bg-color)}.message.sent[_ngcontent-%COMP%]{color:var(--sent-text-color);align-self:flex-end;margin-left:auto;display:inline-block;background-color:var(--primary-color);padding:5px 10px;text-align:right}textarea[_ngcontent-%COMP%]{flex:1;resize:none;padding:8px;border-radius:8px;border:1px solid #ccc;width:100%;background-color:var(--secondary-bg-color);color:var(--black-text-color)}.send[_ngcontent-%COMP%], .camera[_ngcontent-%COMP%]{cursor:pointer}.received-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.received-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-image:var(--header-border-color);border:0;box-shadow:var(--header-shadow);box-sizing:border-box;padding-bottom:1px}header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:30px;height:30px;cursor:pointer;margin-left:10px}h5[_ngcontent-%COMP%]{color:var(--title-color);font-size:15px}.header-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-color:var(--secondary-bg-color);padding:9px 3px;width:100%;height:100%;color:#757575}.message-container[_ngcontent-%COMP%]{position:relative}.delete-icon[_ngcontent-%COMP%]{width:19px;height:19px;cursor:pointer;position:absolute;right:-17px;top:-12px}.text-area-wrapper[_ngcontent-%COMP%]{width:100%;margin:0 10px;position:relative}.text-area-wrapper[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:absolute;right:12px;bottom:12px;cursor:pointer}.chat-image[_ngcontent-%COMP%]{max-width:100%;height:200px;object-fit:cover}.loader[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#252525e6;z-index:100;display:flex;align-items:center;justify-content:center}",".daily-stories-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;height:100%;padding:20px;color:var(--black-text-color);background-color:var(--main-bg-color)}.main-daily[_ngcontent-%COMP%]{height:100%;background-color:var(--main-bg-color)}.row[_ngcontent-%COMP%]{width:100%;margin-bottom:20px;height:50px;background-color:var(--secondary-bg-color);border-radius:10px;box-shadow:0 10px 15px #0000000a;justify-content:flex-start;display:flex;align-items:center;font-size:15px;gap:10px;color:var(--row-text-color)}.row[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{margin-bottom:7px;margin-left:10px;font-size:17px}.date-picker[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;background-color:var(--main-bg-color)}.inner-date-picker[_ngcontent-%COMP%]{margin-top:10px;width:250px;border:1px solid var(--primary-color);display:flex;align-items:center;justify-content:center;padding-left:15px;height:40px;border-radius:12px;background-color:var(--secondary-bg-color)}[_nghost-%COMP%]     .mat-datepicker-toggle-default-icon{fill:var(--primary-color);width:20px;height:20px}[_nghost-%COMP%]     .mat-date-range-input-inner{color:var(--black-text-color)!important}header[_ngcontent-%COMP%]{box-shadow:none}  .mat-calendar-header{background-color:var(--secondary-bg-color)!important;color:var(--black-text-color)!important}  .mat-mdc-button{color:var(--primary-color)!important}  .mat-calendar-arrow{fill:var(--black-text-color)!important}  .mat-datepicker-toggle,   .mat-datepicker-content .mat-calendar-next-button,   .mat-datepicker-content .mat-calendar-previous-button{color:var(--black-text-color)!important}  .mat-calendar-table-header-divider:after{background-color:var(--primary-color)!important}  .mat-calendar-table-header,   .mat-calendar-body-label{color:var(--black-text-color)!important}  .mat-calendar-body-cell-content{color:var(--black-text-color)!important}  .mat-calendar-body-selected{background-color:var(--primary-color)!important;color:var(--black-text-color)!important}  .mat-datepicker-content-touch .mat-datepicker-content-container{background:var(--secondary-bg-color)!important;color:var(--primary-color)!important}  .mat-calendar-body-in-range:before{background-color:#55ad902a!important;color:var(--black-text-color)!important}  .mat-calendar-body-cell-container:hover .mat-calendar-body-cell-content.mat-focus-indicator{background-color:var(--primary-color)!important;color:var(--black-text-color)!important}"]});let o=e;return o})();export{xe as ChatArchiveComponent};
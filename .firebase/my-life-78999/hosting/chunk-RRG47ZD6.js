import{a as I}from"./chunk-C4QJN3LX.js";import{b as T}from"./chunk-BXZAQA36.js";import"./chunk-GIDJWLZK.js";import{a as H}from"./chunk-D6VDJXMI.js";import{a as j}from"./chunk-XVXDBZAN.js";import"./chunk-GTL4EDMA.js";import{p as D}from"./chunk-E6I4JPOI.js";import{$ as l,Ab as n,Bb as P,Eb as w,Jb as x,Lb as O,Tb as a,Ub as k,Va as p,Vb as h,_b as S,bc as E,dc as z,ea as m,oa as f,pa as v,qa as y,ra as b,vb as C,wa as u,xb as _,yb as M,zb as t}from"./chunk-FVMQVLXL.js";import"./chunk-CWTPBX7D.js";function B(c,o){if(c&1){let d=w();t(0,"div",10),x("click",function(){let r=f(d).$implicit,e=O();return v(e.goToStory(r))}),t(1,"div",11),a(2,"\u{1F4D6}"),n(),a(3),E(4,"date"),n()}if(c&2){let d=o.$implicit;p(3),h(" ",z(4,1,d.date,"EEEE, dd MMMM yyyy")," ")}}var q=(()=>{let o=class o{constructor(){this.sharingService=l(H),this.destroyRef=l(u),this.peep={},this.httpService=l(j),this.router=l(T),this.dayChats=[]}ngOnInit(){this.httpService.getAllDayChats().subscribe(i=>{this.dayChats=i,console.log(this.dayChats),this.sharingService.peepToView$.pipe(I(this.destroyRef)).subscribe(r=>{let e=r;console.log(e),e.dayChats=[],e.mentions.forEach(s=>{console.log(s);let g=this.dayChats.find(V=>V._id===s.trim());console.log(g),g&&e.dayChats.push(g)}),console.log(e),this.peep=e})})}goToStory(i){console.log(i),this.sharingService.updateDayToGenerate(i),this.router.navigateByUrl("story/"+i._id)}toggleSidenav(){this.sharingService.toggleSidenav()}};o.\u0275fac=function(r){return new(r||o)},o.\u0275cmp=m({type:o,selectors:[["app-peep-profile"]],standalone:!0,features:[S],decls:17,vars:2,consts:[[1,"main","story"],[1,"header-story"],[1,"header-container"],["xmlns","http://www.w3.org/2000/svg","height","30px","viewBox","0 -960 960 960","width","30px","fill","var(--black-text-color)",3,"click"],["d","M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"],["contenteditable","true","id","story-body",1,"story-body"],[1,"mentions"],[1,"mention-title"],[1,"mention-container"],[1,"daily-stories-item","row"],[1,"daily-stories-item","row",3,"click"],[1,"img"]],template:function(r,e){r&1&&(t(0,"main",0)(1,"header",1)(2,"div",2),y(),t(3,"svg",3),x("click",function(){return e.toggleSidenav()}),P(4,"path",4),n(),b(),t(5,"h5"),a(6,"My Life"),n()()(),t(7,"h4"),a(8),n(),t(9,"div",5),a(10),n(),t(11,"div",6)(12,"span",7),a(13,"Mentioned in :"),n(),t(14,"div",8),_(15,B,5,4,"div",9,C),n()()()),r&2&&(p(8),k(e.peep.name),p(2),h(" ",e.peep.about," "),p(5),M(e.peep.dayChats))},dependencies:[D],styles:["main[_ngcontent-%COMP%]{height:100%;overflow-y:hidden;background-color:var(--secondary-bg-color)}footer[_ngcontent-%COMP%]{position:absolute;bottom:5px;width:100%;display:flex;align-items:center}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{flex:1;padding:10px;border:1px solid #ddd;border-radius:10px;resize:none;height:40px;max-height:120px;overflow-y:auto;outline:none}.camera[_ngcontent-%COMP%]{width:30px;height:30px;margin-left:10px;border-radius:50%}.send[_ngcontent-%COMP%]{width:30px;height:30px;margin-right:10px;border-radius:50%}.chat-body[_ngcontent-%COMP%]{height:calc(100% - 100px);overflow-y:scroll;padding:10px;display:flex;flex-direction:column;gap:10px;font-size:.9rem}.message[_ngcontent-%COMP%]{margin-bottom:10px;padding:8px;border-radius:8px;word-wrap:break-word;max-width:90%}.message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.message.received[_ngcontent-%COMP%]{color:var(--black-text-color);text-align:left;align-self:flex-start;background-color:var(--main-bg-color)}.message.sent[_ngcontent-%COMP%]{color:var(--sent-text-color);align-self:flex-end;margin-left:auto;display:inline-block;background-color:var(--primary-color);padding:5px 10px;text-align:right}textarea[_ngcontent-%COMP%]{flex:1;resize:none;padding:8px;border-radius:8px;border:1px solid #ccc;width:100%;background-color:var(--secondary-bg-color);color:var(--black-text-color)}.send[_ngcontent-%COMP%], .camera[_ngcontent-%COMP%]{cursor:pointer}.received-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.received-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-image:var(--header-border-color);border:0;box-shadow:var(--header-shadow);box-sizing:border-box;padding-bottom:1px}header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:30px;height:30px;cursor:pointer;margin-left:10px}h5[_ngcontent-%COMP%]{color:var(--title-color);font-size:15px}.header-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-color:var(--secondary-bg-color);padding:9px 3px;width:100%;height:100%;color:#757575}.message-container[_ngcontent-%COMP%]{position:relative}.delete-icon[_ngcontent-%COMP%]{width:19px;height:19px;cursor:pointer;position:absolute;right:-17px;top:-12px}.text-area-wrapper[_ngcontent-%COMP%]{width:100%;margin:0 10px;position:relative}.text-area-wrapper[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:absolute;right:12px;bottom:12px;cursor:pointer}.chat-image[_ngcontent-%COMP%]{max-width:100%;height:200px;object-fit:cover}.loader[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#252525e6;z-index:100;display:flex;align-items:center;justify-content:center}",".story-body[_ngcontent-%COMP%]{color:var(--black-text-color);padding:22px 35px 35px;line-height:30px;text-align:justify;font-size:15px}.main.story[_ngcontent-%COMP%]{overflow-y:auto;background-color:var(--main-bg-color)}.header-story[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10}h4[_ngcontent-%COMP%]{margin-top:20px;color:var(--black-text-color);text-align:center}.daily-stories-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;height:100%;padding:20px;color:var(--black-text-color);background-color:var(--main-bg-color)}.main-daily[_ngcontent-%COMP%]{height:100%;background-color:var(--main-bg-color)}.row[_ngcontent-%COMP%]{width:80%;margin-bottom:20px;height:50px;background-color:var(--secondary-bg-color);border-radius:10px;box-shadow:0 10px 15px #0000000a;justify-content:flex-start;display:flex;align-items:center;font-size:15px;gap:10px;color:var(--row-text-color)}.row[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{margin-bottom:7px;margin-left:10px;font-size:17px}.mention-container[_ngcontent-%COMP%]{color:var(--black-text-color);display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:20px}.mention-title[_ngcontent-%COMP%]{color:var(--black-text-color);font-size:15px;font-weight:700;padding:35px}"]});let c=o;return c})();export{q as PeepProfileComponent};
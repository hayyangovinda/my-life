import{e as N,g as G,h as W,i as J}from"./chunk-YSP3EGIP.js";import{d as U}from"./chunk-76INWWHM.js";import"./chunk-NJAWYSDF.js";import"./chunk-FDE6MBQY.js";import{b as B,g as Z,l as z,o as V}from"./chunk-KKUW3EYT.js";import"./chunk-5IC5DNT2.js";import{b as I}from"./chunk-BXZAQA36.js";import"./chunk-GIDJWLZK.js";import{a as H}from"./chunk-D6VDJXMI.js";import{a as j}from"./chunk-XVXDBZAN.js";import"./chunk-GTL4EDMA.js";import{p as E}from"./chunk-E6I4JPOI.js";import{$ as h,Ab as r,Bb as p,Eb as _,Jb as g,Lb as u,Tb as m,Va as l,Vb as S,Wb as T,Xb as R,Yb as L,_b as D,bc as q,dc as A,ea as M,mb as y,nc as F,oa as f,pa as v,qa as w,ra as C,ub as x,vb as k,xb as O,yb as P,zb as i}from"./chunk-FVMQVLXL.js";import"./chunk-CWTPBX7D.js";function Q(n,a){if(n&1){let c=_();i(0,"div",13),g("click",function(){let e=f(c).$implicit,o=u();return v(o.goToStory(e))}),i(1,"div",14),m(2,"\u{1F4D6}"),r(),m(3),q(4,"date"),r()}if(n&2){let c=a.$implicit;l(3),S(" ",A(4,1,c.date,"EEEE, dd MMMM yyyy")," ")}}function X(n,a){if(n&1){let c=_();i(0,"record-loader",15),g("stopRecording",function(){f(c);let e=u(2);return v(e.toggleRecording())}),r()}}function Y(n,a){n&1&&p(0,"app-loader")}function $(n,a){if(n&1&&(i(0,"div",12),y(1,X,1,0,"record-loader")(2,Y,1,0,"app-loader"),r()),n&2){let c=u();l(),x(1,c.showRecordingLoader?1:-1),l(),x(2,c.showImageLoader?2:-1)}}var ve=(()=>{let a=class a{constructor(){this.changeDetectorRef=h(F),this.httpService=h(j),this.router=h(I),this.newMessage="",this.showRecordingLoader=!1,this.showImageLoader=!1,this.showLoaders=!1,this.canRecord=!1,this.isRecording=!1,this.recorder=null,this.chunks=[],this.selectedFile=null,this.contextString="",this.contextArray=[],this.stories=[],this.sharingService=h(H)}ngOnInit(){this.setUpAudio(),this.httpService.getAllDayChats().subscribe(t=>{this.contextArray=t.map(e=>({date:e.date,story:e.story,id:e._id})),this.contextString=JSON.stringify(this.contextArray)})}sendMessage(){console.log(this.newMessage),this.showLoaders=!0,this.showImageLoader=!0,this.changeDetectorRef.detectChanges();let t=`Base on the above context, answer the following question, by returning only only only(not even /n,or whitespaces) an array of id or ids of the day chats that are relevant to the question. If no relevant day chats are found, return an empty array. Do not invent your own story, base it on the given prompts. Do not return anything other than the array of ids. Return the array so that it can be assigned directly to a variable in js. 
 
`+this.newMessage,e=this.contextString+t;this.newMessage="",this.httpService.generateStory({prompt:e}).subscribe(o=>{console.log("response",o);let s=JSON.parse(o.generatedText);console.log("responseArray",s),s.forEach(d=>{let b=this.contextArray.find(K=>K.id.trim()===d);console.log("dayChat",b),this.stories.push(b)}),this.showLoaders=!1,this.showImageLoader=!1,this.changeDetectorRef.detectChanges()},()=>{this.showLoaders=!1,this.showImageLoader=!1,this.changeDetectorRef.detectChanges()})}toggleSidenav(){this.sharingService.toggleSidenav()}goToStory(t){this.sharingService.updateDayToGenerate(t),this.router.navigateByUrl("story/"+t.id)}autoGrow(t){let e=t.target;e.style.height="auto",e.value?e.style.height=e.scrollHeight+"px":e.style.height="40px"}toggleRecording(){this.canRecord&&(this.isRecording?(this.recorder?.stop(),this.showLoaders=!1,this.showRecordingLoader=!1,this.isRecording=!1):(this.showLoaders=!0,this.showRecordingLoader=!0,this.recorder?.start(),this.isRecording=!0))}setUpAudio(){console.log("navigator",navigator.mediaDevices),navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!0}).then(t=>{this.recorder=new MediaRecorder(t),this.recorder.ondataavailable=e=>{this.chunks.push(e.data)},this.recorder.onstop=()=>{let e=new Blob(this.chunks,{type:"audio/aiff"});this.chunks=[];let o=URL.createObjectURL(e);this.selectedFile=new File([e],"recording.wav",{type:"audio/wav"}),console.log("recording-stop"),console.log(this.selectedFile);let s=new FormData;s.append("audio",this.selectedFile),this.transcribeAudioBlob(s)}}),this.canRecord=!0}transcribeAudioBlob(t){this.showLoaders=!0,this.showImageLoader=!0,this.changeDetectorRef.detectChanges(),this.httpService.transcribeAudio(t).subscribe(e=>{console.log(e),this.newMessage=e.transcripts[0]+"a",this.showLoaders=!1,this.showImageLoader=!1,this.changeDetectorRef.detectChanges()},()=>{this.showLoaders=!1,this.showImageLoader=!1,this.changeDetectorRef.detectChanges()})}};a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=M({type:a,selectors:[["app-find-a-memory"]],standalone:!0,features:[D],decls:20,vars:2,consts:[[1,"header-container"],["xmlns","http://www.w3.org/2000/svg","height","30px","viewBox","0 -960 960 960","width","30px","fill","var(--black-text-color)",3,"click"],["d","M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"],[1,"bard-hello"],[1,"daily-stories-body"],[1,"daily-stories-item","row"],[1,"text-area-wrapper"],["placeholder","Type a message",3,"ngModelChange","input","ngModel"],["xmlns","http://www.w3.org/2000/svg","height","24px","viewBox","0 -960 960 960","width","24px","fill","#ff5b24",3,"click"],["d","M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"],["xmlns","http://www.w3.org/2000/svg","height","30px","viewBox","0 -960 960 960","width","30px","fill","var(--black-text-color)",1,"send",3,"click"],["d","m357-384 123-123 123 123 57-56-180-180-180 180 57 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"],[1,"loader"],[1,"daily-stories-item","row",3,"click"],[1,"img"],[3,"stopRecording"]],template:function(e,o){e&1&&(i(0,"main")(1,"header")(2,"div",0),w(),i(3,"svg",1),g("click",function(){return o.toggleSidenav()}),p(4,"path",2),r(),C(),i(5,"h5"),m(6,"Find a memory"),r()()(),i(7,"h4",3),m(8,"What memory would you like to find?"),r(),i(9,"div",4),O(10,Q,5,4,"div",5,k),r(),i(12,"footer")(13,"div",6)(14,"textarea",7),L("ngModelChange",function(d){return R(o.newMessage,d)||(o.newMessage=d),d}),g("input",function(d){return o.autoGrow(d)}),r(),w(),i(15,"svg",8),g("click",function(){return o.toggleRecording()}),p(16,"path",9),r()(),i(17,"svg",10),g("click",function(){return o.sendMessage()}),p(18,"path",11),r()()(),y(19,$,3,2,"div",12)),e&2&&(l(10),P(o.stories),l(4),T("ngModel",o.newMessage),l(5),x(19,o.showLoaders?19:-1))},dependencies:[V,B,Z,z,U,N,G,W,J,E],styles:["main[_ngcontent-%COMP%]{height:100%;overflow-y:hidden;background-color:var(--secondary-bg-color)}footer[_ngcontent-%COMP%]{position:absolute;bottom:5px;width:100%;display:flex;align-items:center}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{flex:1;padding:10px;border:1px solid #ddd;border-radius:10px;resize:none;height:40px;max-height:120px;overflow-y:auto;outline:none}.camera[_ngcontent-%COMP%]{width:30px;height:30px;margin-left:10px;border-radius:50%}.send[_ngcontent-%COMP%]{width:30px;height:30px;margin-right:10px;border-radius:50%}.chat-body[_ngcontent-%COMP%]{height:calc(100% - 100px);overflow-y:scroll;padding:10px;display:flex;flex-direction:column;gap:10px;font-size:.9rem}.message[_ngcontent-%COMP%]{margin-bottom:10px;padding:8px;border-radius:8px;word-wrap:break-word;max-width:90%}.message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.message.received[_ngcontent-%COMP%]{color:var(--black-text-color);text-align:left;align-self:flex-start;background-color:var(--main-bg-color)}.message.sent[_ngcontent-%COMP%]{color:var(--sent-text-color);align-self:flex-end;margin-left:auto;display:inline-block;background-color:var(--primary-color);padding:5px 10px;text-align:right}textarea[_ngcontent-%COMP%]{flex:1;resize:none;padding:8px;border-radius:8px;border:1px solid #ccc;width:100%;background-color:var(--secondary-bg-color);color:var(--black-text-color)}.send[_ngcontent-%COMP%], .camera[_ngcontent-%COMP%]{cursor:pointer}.received-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.received-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-image:var(--header-border-color);border:0;box-shadow:var(--header-shadow);box-sizing:border-box;padding-bottom:1px}header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:30px;height:30px;cursor:pointer;margin-left:10px}h5[_ngcontent-%COMP%]{color:var(--title-color);font-size:15px}.header-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;background-color:var(--secondary-bg-color);padding:9px 3px;width:100%;height:100%;color:#757575}.message-container[_ngcontent-%COMP%]{position:relative}.delete-icon[_ngcontent-%COMP%]{width:19px;height:19px;cursor:pointer;position:absolute;right:-17px;top:-12px}.text-area-wrapper[_ngcontent-%COMP%]{width:100%;margin:0 10px;position:relative}.text-area-wrapper[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:absolute;right:12px;bottom:12px;cursor:pointer}.chat-image[_ngcontent-%COMP%]{max-width:100%;height:200px;object-fit:cover}.loader[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#252525e6;z-index:100;display:flex;align-items:center;justify-content:center}",".bard-hello[_ngcontent-%COMP%]{position:relative;display:inline-block;color:transparent;background:var(--text-gradient);font-size:44px;background-size:400% 100%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-inline:15px;margin-block:20px}.daily-stories-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;height:100%;padding:20px;color:var(--black-text-color);background-color:var(--secondary-bg-color)}.main-daily[_ngcontent-%COMP%]{height:100%;background-color:var(--secondary-bg-color)}.row[_ngcontent-%COMP%]{width:100%;margin-bottom:20px;height:50px;background-color:var(--secondary-bg-color);border-radius:10px;box-shadow:0 10px 15px #0000000a;justify-content:flex-start;display:flex;align-items:center;font-size:15px;gap:10px;color:var(--row-text-color)}.row[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{margin-bottom:7px;margin-left:10px;font-size:17px}.date-picker[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.inner-date-picker[_ngcontent-%COMP%]{margin-top:10px;width:250px;border:1px solid var(--primary-color);display:flex;align-items:center;justify-content:center;padding-left:15px;height:40px;border-radius:12px;background-color:var(--secondary-bg-color)}"]});let n=a;return n})();export{ve as FindAMemoryComponent};

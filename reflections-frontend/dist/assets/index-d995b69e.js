var fe=Object.defineProperty;var ue=(n,l,i)=>l in n?fe(n,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[l]=i;var H=(n,l,i)=>(ue(n,typeof l!="symbol"?l+"":l,i),i);import{r as d,j as t,R as pe}from"./react-d39729e7.js";import{c as xe}from"./react-dom-eb291ab4.js";import{d as $}from"./dayjs-afe83796.js";import{a as K}from"./axios-28bc18a3.js";import{o as me}from"./jwt-decode-9c18df67.js";import{E as he,t as e,u as V,T as z,H as G,C as J,a as O,L as Q,S as W,b as Z}from"./@tiptap-330b5d3f.js";import{a as D,b as ee,d as be,e as ge,f as R}from"./react-router-6ab5a7f0.js";import{L as te,B as ve}from"./react-router-dom-2f9d2c86.js";import"./scheduler-765c72db.js";import"./prosemirror-state-d99efc48.js";import"./prosemirror-model-714031c1.js";import"./orderedmap-1b52af60.js";import"./prosemirror-transform-4fc52813.js";import"./prosemirror-view-d12f7755.js";import"./prosemirror-keymap-8634b7a8.js";import"./w3c-keyname-a25e4cc1.js";import"./prosemirror-commands-175c63be.js";import"./prosemirror-schema-list-771d4f75.js";import"./prosemirror-dropcursor-da1713bb.js";import"./prosemirror-gapcursor-5148966c.js";import"./prosemirror-history-1f4dfada.js";import"./rope-sequence-5ceeafee.js";import"./@remix-run-1dd2da88.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}})();class $e{constructor(l,i){H(this,"endpoint");H(this,"apiClient");this.endpoint=l,this.apiClient=i}get(l){return this.apiClient.get(this.endpoint+l)}post(l,i){return this.apiClient.post(this.endpoint+l,i)}put(l,i){return this.apiClient.put(this.endpoint+"/"+l,i)}delete(l){return this.apiClient.delete(this.endpoint+"/"+l)}}const se=(n,l)=>new $e(n,l),je=()=>ne.post("/api/user/refresh"),ne=K.create({baseURL:""}),le=K.create({baseURL:"",withCredentials:!0});le.interceptors.request.use(n=>{const l=localStorage.getItem("accessToken"),i=new Date;let a,r;return l&&(a=me(l),r=a.exp),r&&r*1e3<i.getTime()||!l?je().then(f=>{f.data.accessToken&&(localStorage.setItem("accessToken",f.data.accessToken),n.headers.Authorization=`Bearer ${f.data.accessToken}`)}).catch(()=>{window.location.href="/login"}):n.headers.Authorization=`Bearer ${l}`,n});const S=se("/api/content",le),q=se("/api/user",ne),Ne=he.create({name:"smilieReplacer",addInputRules(){return[e({find:/-___- $/,replace:"😑 "}),e({find:/:'-\) $/,replace:"😂 "}),e({find:/':-\) $/,replace:"😅 "}),e({find:/':-D $/,replace:"😅 "}),e({find:/>:-\) $/,replace:"😆 "}),e({find:/-__- $/,replace:"😑 "}),e({find:/':-\( $/,replace:"😓 "}),e({find:/:'-\( $/,replace:"😢 "}),e({find:/>:-\( $/,replace:"😠 "}),e({find:/O:-\) $/,replace:"😇 "}),e({find:/0:-3 $/,replace:"😇 "}),e({find:/0:-\) $/,replace:"😇 "}),e({find:/0;\^\) $/,replace:"😇 "}),e({find:/O;-\) $/,replace:"😇 "}),e({find:/0;-\) $/,replace:"😇 "}),e({find:/O:-3 $/,replace:"😇 "}),e({find:/:'\) $/,replace:"😂 "}),e({find:/:-D $/,replace:"😃 "}),e({find:/':\) $/,replace:"😅 "}),e({find:/'=\) $/,replace:"😅 "}),e({find:/':D $/,replace:"😅 "}),e({find:/'=D $/,replace:"😅 "}),e({find:/>:\) $/,replace:"😆 "}),e({find:/>;\) $/,replace:"😆 "}),e({find:/>=\) $/,replace:"😆 "}),e({find:/;-\) $/,replace:"😉 "}),e({find:/\*-\) $/,replace:"😉 "}),e({find:/;-\] $/,replace:"😉 "}),e({find:/;\^\) $/,replace:"😉 "}),e({find:/B-\) $/,replace:"😎 "}),e({find:/8-\) $/,replace:"😎 "}),e({find:/B-D $/,replace:"😎 "}),e({find:/8-D $/,replace:"😎 "}),e({find:/:-\* $/,replace:"😘 "}),e({find:/:\^\* $/,replace:"😘 "}),e({find:/:-\) $/,replace:"🙂 "}),e({find:/-_- $/,replace:"😑 "}),e({find:/:-X $/,replace:"😶 "}),e({find:/:-# $/,replace:"😶 "}),e({find:/:-x $/,replace:"😶 "}),e({find:/>.< $/,replace:"😣 "}),e({find:/:-O $/,replace:"😮 "}),e({find:/:-o $/,replace:"😮 "}),e({find:/O_O $/,replace:"😮 "}),e({find:/>:O $/,replace:"😮 "}),e({find:/:-P $/,replace:"😛 "}),e({find:/:-p $/,replace:"😛 "}),e({find:/:-Þ $/,replace:"😛 "}),e({find:/:-þ $/,replace:"😛 "}),e({find:/:-b $/,replace:"😛 "}),e({find:/>:P $/,replace:"😜 "}),e({find:/X-P $/,replace:"😜 "}),e({find:/x-p $/,replace:"😜 "}),e({find:/':\( $/,replace:"😓 "}),e({find:/'=\( $/,replace:"😓 "}),e({find:/>:\\ $/,replace:"😕 "}),e({find:/>:\/ $/,replace:"😕 "}),e({find:/:-\/ $/,replace:"😕 "}),e({find:/:-. $/,replace:"😕 "}),e({find:/>:\[ $/,replace:"😞 "}),e({find:/:-\( $/,replace:"😞 "}),e({find:/:-\[ $/,replace:"😞 "}),e({find:/:'\( $/,replace:"😢 "}),e({find:/;-\( $/,replace:"😢 "}),e({find:/#-\) $/,replace:"😵 "}),e({find:/%-\) $/,replace:"😵 "}),e({find:/X-\) $/,replace:"😵 "}),e({find:/>:\( $/,replace:"😠 "}),e({find:/0:3 $/,replace:"😇 "}),e({find:/0:\) $/,replace:"😇 "}),e({find:/O:\) $/,replace:"😇 "}),e({find:/O=\) $/,replace:"😇 "}),e({find:/O:3 $/,replace:"😇 "}),e({find:/<\/3 $/,replace:"💔 "}),e({find:/:D $/,replace:"😃 "}),e({find:/=D $/,replace:"😃 "}),e({find:/;\) $/,replace:"😉 "}),e({find:/\*\) $/,replace:"😉 "}),e({find:/;\] $/,replace:"😉 "}),e({find:/;D $/,replace:"😉 "}),e({find:/B\) $/,replace:"😎 "}),e({find:/8\) $/,replace:"😎 "}),e({find:/:\* $/,replace:"😘 "}),e({find:/=\* $/,replace:"😘 "}),e({find:/:\) $/,replace:"🙂 "}),e({find:/=\] $/,replace:"🙂 "}),e({find:/=\) $/,replace:"🙂 "}),e({find:/:\] $/,replace:"🙂 "}),e({find:/:X $/,replace:"😶 "}),e({find:/:# $/,replace:"😶 "}),e({find:/=X $/,replace:"😶 "}),e({find:/=x $/,replace:"😶 "}),e({find:/:x $/,replace:"😶 "}),e({find:/=# $/,replace:"😶 "}),e({find:/:O $/,replace:"😮 "}),e({find:/:o $/,replace:"😮 "}),e({find:/:P $/,replace:"😛 "}),e({find:/=P $/,replace:"😛 "}),e({find:/:p $/,replace:"😛  "}),e({find:/=p $/,replace:"😛 "}),e({find:/:Þ $/,replace:"😛 "}),e({find:/:þ $/,replace:"😛 "}),e({find:/:b $/,replace:"😛 "}),e({find:/d: $/,replace:"😛 "}),e({find:/:\/ $/,replace:"😕 "}),e({find:/:\\ $/,replace:"😕 "}),e({find:/=\/ $/,replace:"😕 "}),e({find:/=\\ $/,replace:"😕 "}),e({find:/:L $/,replace:"😕 "}),e({find:/=L $/,replace:"😕 "}),e({find:/:\( $/,replace:"😞 "}),e({find:/:\[ $/,replace:"😞 "}),e({find:/=\( $/,replace:"😞 "}),e({find:/;\( $/,replace:"😢 "}),e({find:/D: $/,replace:"😨 "}),e({find:/:\$ $/,replace:"😳 "}),e({find:/=\$ $/,replace:"😳 "}),e({find:/#\) $/,replace:"😵 "}),e({find:/%\) $/,replace:"😵 "}),e({find:/X\) $/,replace:"😵 "}),e({find:/:@ $/,replace:"😠 "}),e({find:/<3 $/,replace:"❤️ "}),e({find:/\/shrug $/,replace:"¯\\_(ツ)_/¯"})]}});const we=({editor:n})=>{if(!n)return null;const l=D();return t.jsx("div",{className:"flex justify-center text-[17px]",children:t.jsxs("div",{className:"overflow-auto customScroll mx-4 mt-8 flex gap-1 rounded-lg bg-[#363636] px-2 py-[5px] text-[#a1a1a1]",children:[t.jsx("button",{onClick:()=>n.chain().focus().toggleBold().run(),disabled:!n.can().chain().focus().toggleBold().run(),className:`flex ${n.isActive("bold")?"is-active":""} rounded-md px-2 py-0.5`,children:"bold"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleItalic().run(),disabled:!n.can().chain().focus().toggleItalic().run(),className:`flex ${n.isActive("italic")?"is-active":""} rounded-md px-2 py-0.5 `,children:"italic"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleCode().run(),disabled:!n.can().chain().focus().toggleCode().run(),className:`flex ${n.isActive("code")?"is-active":""} rounded-md px-2 py-0.5 `,children:"code"}),t.jsx("button",{onClick:()=>n.chain().focus().setParagraph().run(),className:`${n.isActive("paragraph")?"is-active":""} flex rounded-md px-2 py-0.5 `,children:"paragraph"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleHeading({level:1}).run(),className:`${n.isActive("heading",{level:1})?"is-active":""} flex rounded-md px-2 py-0.5 `,children:"heading"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleBulletList().run(),className:`${n.isActive("bulletList")?"is-active":""} flex rounded-md px-2 py-0.5 `,children:"list"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleCodeBlock().run(),className:`${n.isActive("codeBlock")?"is-active":""} flex rounded-md px-2 py-0.5 `,children:"codeblock"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleBlockquote().run(),className:`${n.isActive("blockquote")?"is-active":""} flex rounded-md px-2 py-0.5 `,children:"blockquote"}),t.jsx("button",{onClick:()=>n.chain().focus().setHorizontalRule().run(),className:"flex rounded-md px-2 py-0.5  ",children:"rule"}),t.jsx("button",{onClick:()=>n.chain().focus().toggleHighlight({color:"#b197fc"}).setColor(n!=null&&n.isActive("highlight",{color:"#b197fc"})?"":"#000000").run(),className:`${n.isActive("highlight",{color:"#b197fc"})?"is-active":""}
				flex rounded-md px-2 py-0.5 `,children:"highlight"}),t.jsx("button",{onClick:()=>n.chain().focus().unsetAllMarks().run(),className:"flex rounded-md px-2 py-0.5  ",children:"clrm"}),t.jsx("button",{onClick:()=>n.chain().focus().clearNodes().run(),className:"flex rounded-md px-2 py-0.5  ",children:"clrn"}),t.jsx("button",{onClick:()=>n.chain().focus().undo().run(),disabled:!n.can().chain().focus().undo().run(),className:"flex rounded-md px-2 py-0.5  ",children:"undo"}),t.jsx("button",{onClick:()=>n.chain().focus().redo().run(),disabled:!n.can().chain().focus().redo().run(),className:"flex rounded-md px-2 py-0.5  ",children:"redo"}),t.jsx("button",{className:"flex rounded-md px-2 py-0.5 hover:border-0 hover:bg-[#da6888] hover:font-semibold hover:text-stone-900",onClick:()=>{q.get("/logout"),localStorage.removeItem("accessToken"),l("/login")},children:"logout"})]})})},ye=({editorValue:n,setEditorValue:l,title:i,changeNote:a,setChangeNote:r})=>{const c=V({extensions:[z,G.configure({multicolor:!0}),J.configure({types:[O.name,Q.name]}),O.configure(),W.configure({bulletList:{keepMarks:!0,keepAttributes:!1},orderedList:{keepMarks:!0,keepAttributes:!1}}),Ne],onUpdate:({editor:p})=>{const w=p.getHTML();f(w)},content:n,editable:!0});d.useEffect(()=>{a&&(c==null||c.commands.setContent(n),r(!1))},[a]);const f=p=>{l(p)};return t.jsxs("div",{className:"customScroll flex h-full w-full flex-col gap-5 overflow-auto bg-[#1f1f1f]",children:[t.jsx(we,{editor:c}),t.jsx("input",{className:"mx-8 mt-8 flex w-1/4 border-b-2 border-[#515151] bg-transparent text-xl font-semibold text-[#dadada]",placeholder:"title goes here",ref:i}),t.jsx(Z,{spellCheck:!1,editor:c,className:"customScroll mx-8 mb-12 mt-2 font-inter text-lg leading-6 text-[#c0c0c0]"})]})},ke=()=>{const[n,l]=d.useState(""),i=d.useRef(null),a=d.useRef(null),[r,c]=d.useState([]),[f,p]=d.useState([]),[w,T]=d.useState(!0),[M,j]=d.useState(!1),[b,N]=d.useState(""),[I,g]=d.useState(null),[k,E]=d.useState(0),[ae,P]=d.useState(!1),[U,v]=d.useState("Save"),[ce,L]=d.useState(!1),[ie,C]=d.useState(!1),[_e,h]=d.useState(""),[y,_]=d.useState(()=>{const s=localStorage.getItem("recentsCount"),o=5;return s!==null?parseInt(s,10):(localStorage.setItem("recentsCount",o.toString()),o)}),oe=D(),B=ee(),F=(s,o,u=!1)=>{if(!s)return;const m=$();b!==""?(v("Saving"),S.put(b,{date:m.valueOf(),title:s,notesContent:o}).then(()=>{!u&&g(m),!u&&h(o),p(x=>x.map(A=>A._id===b?{_id:b,notesContent:o,title:s,date:m}:A)),Y(),setTimeout(()=>{v("Save Successful!"),setTimeout(()=>{v("Save")},1e3)},1e3),console.log("Updated Successfully!")}).catch(()=>{setTimeout(()=>{v("Save Unsuccessful!"),setTimeout(()=>{v("Save")},1e3)},1e3),console.log("Could not update the content")})):(v("Saving"),S.post("/new",{date:m.valueOf(),title:s,notesContent:o}).then(x=>{!u&&N(x.data.id),!u&&h(o),!u&&g(m),p(A=>[...A,{_id:x.data.id,notesContent:o,title:s,date:m}]),Y(),setTimeout(()=>{v("Save Successful!"),setTimeout(()=>{v("Save")},1e3)},1e3),console.log("Saved Successfully!")}).catch(()=>{setTimeout(()=>{v("Save Unsuccessful!"),setTimeout(()=>{v("Save")},1e3)},1e3),console.log("Could not save the content")}))};function de(){S.delete(b).then(()=>{h(""),l(""),j(!0),a.current.value="",g(null),p(f.filter(s=>s._id!==b)),N(""),console.log("Content Removed Successfully")}).catch(()=>{console.log("An error occurred")}),L(!1)}function X(){return new Promise(s=>{const o=setInterval(()=>{let u=!0;C(m=>(u=m,m)),u||(clearInterval(o),s("resolve confirmed"))},100)})}function Y(){p(s=>s.sort((o,u)=>$(u.date).valueOf()-$(o.date).valueOf()))}return d.useEffect(()=>{S.get("/recents").then(s=>{p(s.data)}).catch(()=>{p([])})},[]),d.useEffect(()=>{B.state!==null&&B.state.noteID!==null&&(S.get("/search/"+B.state.noteID).then(s=>{N(s.data._id),l(s.data.notesContent),j(!0),a.current.value=s.data.title,g($(s.data.date)),h(s.data.notesContent)}).catch(s=>{console.log("An error occurred",s)}),window.history.replaceState({noteID:null},document.title))},[]),d.useEffect(()=>{localStorage.setItem("recentsCount",y.toString())},[y]),t.jsxs("div",{className:"min-w-screen flex h-screen justify-center",onKeyDown:s=>{s.key==="Escape"&&(L(!1),C(!1))},children:[ce&&t.jsxs("div",{className:"text-md fixed bottom-10 right-4 flex flex-col justify-center gap-3 rounded-lg bg-[#444444] px-4 py-3 font-semibold text-[#e3e3e3]",children:["Are you sure you want to delete this note?",t.jsxs("div",{className:"flex justify-end gap-2 font-semibold",children:[t.jsx("button",{className:"rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#FF6969] hover:text-black",onClick:de,children:"Delete"}),t.jsx("button",{className:"rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#8de86b] hover:text-black",onClick:()=>L(!1),children:"Cancel"})]})]}),ie&&t.jsxs("div",{className:"text-md fixed bottom-10 right-4 flex flex-col justify-center gap-3 rounded-lg bg-[#444444] px-4 py-3 font-semibold text-[#e3e3e3]",children:["Changes made to the note are not saved",t.jsxs("div",{className:"flex justify-end gap-2 font-semibold",children:[t.jsx("button",{className:"rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#FF6969] hover:text-black",onClick:()=>{C(!1)},children:"Discard"}),t.jsx("button",{className:"rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#8de86b] hover:text-black",onClick:()=>{var s,o;(s=a.current)!=null&&s.value&&F((o=a.current)==null?void 0:o.value,n,!0),C(!1)},children:"Save"})]})]}),w&&t.jsxs("div",{className:"hidden h-screen w-0 flex-col items-center border-r-[1px] border-[#515151] bg-[#1f1f1f] md:flex md:w-1/4",children:[t.jsx("input",{className:"363636 mb-2 mt-8 h-fit w-4/5 rounded-lg bg-[#363636] px-2 py-[7px] text-[17px] font-semibold text-[#dadada]",placeholder:"Search",spellCheck:"false",ref:i,onKeyDown:s=>{s.key==="Enter"&&(c([]),P(!0),E(1),setTimeout(()=>{var o;S.post("/search",{title:(o=i.current)==null?void 0:o.value}).then(u=>{P(!1),c(u.data)}).catch(()=>{P(!1),c([])})},700))}}),t.jsx("div",{className:"flex h-full w-full flex-col items-center overflow-auto",children:t.jsxs("div",{className:"flex h-full w-11/12 flex-col items-start",children:[t.jsxs("div",{className:"mb-2 mt-4 flex w-full items-center justify-between",children:[t.jsxs("div",{className:"flex whitespace-pre-wrap text-sm text-[#a1a1a1]",children:[t.jsxs("button",{className:`${k===0&&"font-semibold text-[#dadada]"}`,onClick:()=>E(0),children:["Recents"," "]})," ","|"," ",t.jsx("button",{className:`${k===1&&"font-semibold text-[#dadada]"}`,onClick:()=>E(1),children:"Results"})]}),t.jsxs("div",{className:"flex whitespace-pre-wrap text-[#a1a1a1]",children:[t.jsxs("button",{className:`${y===5?"text-[#dadada]":""}`,onClick:()=>{_(5)},children:["5"," "]}),t.jsxs("button",{className:`${y===10?"text-[#dadada]":""}`,onClick:()=>{_(10)},children:["10"," "]}),t.jsxs("button",{className:`${y===15?"text-[#dadada]":""}`,onClick:()=>{_(15)},children:["15"," "]}),t.jsxs("button",{className:`${y===1e7?"text-[#dadada]":""}`,onClick:()=>{_(1e7)},children:["INF"," "]})]})]}),t.jsx("div",{className:"customScroll flex h-fit w-full flex-col overflow-auto",children:k===1&&r.map((s,o)=>{if(o<y)return t.jsxs("div",{className:`mb-3 w-full items-start justify-center rounded-lg ${b===s._id?"bg-[#4b4b4b]":""} bg-[#333333] px-2 py-2 hover:bg-[#4b4b4b]`,onClick:()=>{let u="",m="";h(x=>(u=x,x)),l(x=>(m=x,x)),u!==m?(C(!0),X().then(()=>{a.current.value=s.title,l(s.notesContent),h(s.notesContent),N(s._id),j(!0),g(()=>s.date?$(s.date):null)})):(a.current.value=s.title,l(s.notesContent),h(s.notesContent),N(s._id),j(!0),g(()=>s.date?$(s.date):null))},children:[t.jsxs("div",{className:"flex justify-between ",children:[t.jsx("p",{className:"text-[#e5e2e2]",children:s.title}),t.jsxs("p",{className:"text-[#bcbcbc]",children:["#",o+1]})]}),t.jsxs("p",{className:"text-[#bcbcbc]",children:["Last Edited :"," ",$(s.date).format("DD-MMM, HH:mm")]})]},s._id)})}),t.jsx("div",{className:"customScroll flex h-fit w-full flex-col overflow-auto",children:k===0&&f.map((s,o)=>{if(o<y)return t.jsxs("div",{className:`mb-3 w-full items-start justify-center rounded-lg ${b===s._id?"bg-[#4b4b4b]":""} bg-[#333333] px-2 py-2 hover:bg-[#4b4b4b]`,onClick:()=>{let u="",m="";h(x=>(u=x,x)),l(x=>(m=x,x)),u!==m?(C(!0),X().then(()=>{a.current.value=s.title,l(s.notesContent),h(s.notesContent),N(s._id),j(!0),g(()=>s.date?$(s.date):null)})):(a.current.value=s.title,l(s.notesContent),h(s.notesContent),N(s._id),j(!0),g(()=>s.date?$(s.date):null))},children:[t.jsxs("div",{className:"flex justify-between ",children:[t.jsx("p",{className:"text-[#e5e2e2]",children:s.title}),t.jsxs("p",{className:"text-[#bcbcbc]",children:["#",o+1]})]}),t.jsxs("p",{className:"text-[#bcbcbc]",children:["Last Edited :"," ",$(s.date).format("DD-MMM, HH:mm")]})]},s._id)})}),k===0&&f.length===0||k===1&&r.length===0?t.jsx("div",{className:"mt-4 flex w-11/12 items-center justify-center text-[#a1a1a1]",children:ae?"Loading":"Nothing Here"}):t.jsx("div",{className:"flex w-full pt-8"})]})})]}),t.jsx("div",{className:`flex ${w?"w-full md:w-3/4":"w-full"}`,children:t.jsx(ye,{title:a,editorValue:n,setEditorValue:l,changeNote:M,setChangeNote:j})}),t.jsxs("div",{className:"fixed bottom-0 flex w-full justify-between bg-[#3c3e41] px-1 py-[1.5px]",children:[t.jsxs("div",{className:"left-0 flex",children:[t.jsx("button",{className:"mr-4 font-inter text-xs tracking-wider text-white",onClick:()=>{T(s=>!s)},children:w?"Hide Sidebar":"Show Sidebar"}),t.jsx("button",{className:"mr-4 font-inter text-xs tracking-wider text-white",onClick:()=>{c([]),l(""),j(!0),N(""),h(""),a.current.value="",i.current.value="",g(null)},children:"Clear"}),t.jsx("button",{className:"mr-4 font-inter text-xs tracking-wider text-white",onClick:()=>{l(""),j(!0),a.current.value="",N(""),h(""),g(null)},children:"New"}),t.jsx("button",{className:"font-inter text-xs tracking-wider text-white",onClick:()=>{L(!0)},disabled:b==="",children:"Delete"})]}),t.jsxs("div",{className:"right-0 flex",children:[t.jsx("button",{className:"mr-4 font-inter text-xs tracking-wider text-white",onClick:()=>{var s;oe(`${b}/reader`,{state:{title:(s=a.current)==null?void 0:s.value,value:n}})},disabled:b==="",children:"Reading Mode"}),t.jsx("button",{className:"mr-4 font-inter text-xs tracking-wider text-white",onClick:()=>{var s,o;(s=a.current)!=null&&s.value&&F((o=a.current)==null?void 0:o.value,n)},disabled:U!=="Save",children:U}),t.jsxs("p",{className:"font-inter text-xs tracking-wider text-white",children:["Last saved:"," ",I===null?"Never":I==null?void 0:I.format("DD-MMM-YYYY | HH:mm")]})]})]})]})},Ce="_bgi1_6v7ke_1",Se="_bgi2_6v7ke_13",re={bgi1:Ce,bgi2:Se},Re=()=>{const n=d.useRef(null),l=d.useRef(null),i=D();return t.jsxs("div",{className:"flex items-center bg-[#1d1d1d]",children:[t.jsx("div",{className:"flex w-full flex-col items-center pr-2 sm:w-1/3",children:t.jsx("div",{className:"w-2/3",children:t.jsx("form",{onSubmit:a=>{var r,c;a.preventDefault(),q.post("/login",{userName:(r=n.current)==null?void 0:r.value,password:(c=l.current)==null?void 0:c.value}).then(f=>{f.data.accessToken&&(localStorage.setItem("accessToken",f.data.accessToken),localStorage.setItem("userName",n.current.value),i("/"))}).catch(f=>console.log(f))},children:t.jsxs("div",{className:"flex flex-col items-center gap-2 bg-transparent",children:[t.jsx("span",{className:"text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl",children:"Sign in to your account"}),t.jsx("input",{type:"text",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none",placeholder:"Username",autoComplete:"username",ref:n,required:!0,spellCheck:!1}),t.jsx("input",{type:"password",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-5 font-serif text-[#f0f8ff] focus:bg-transparent focus:outline-none",placeholder:"Password",autoComplete:"current-password",ref:l,required:!0,spellCheck:!1}),t.jsx("button",{className:"text-md mt-9 w-full rounded-md bg-[#038373] px-3 py-2 font-serif font-bold text-white",type:"submit",children:"Sign in"}),t.jsx("div",{className:"w-full text-center",children:t.jsxs("p",{className:"mt-5 font-inter text-sm font-semibold text-white",children:["Don't have an account yet,"," ",t.jsx(te,{className:"font-bold text-white underline decoration-white decoration-solid",to:"/signup",children:"sign up."})]})})]})})})}),t.jsx("div",{className:`relative flex h-screen w-0 overflow-hidden sm:w-2/3 ${re.bgi1} items-center justify-center`,children:t.jsx("div",{className:"flex h-1/3 w-1/2 items-center justify-center rounded-xl bg-stone-900 bg-opacity-50 text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-white backdrop-blur-2xl md:text-4xl/[40px] xl:text-5xl/[50px]",children:t.jsxs("p",{className:"px-5",children:["Minimalist Magic:",t.jsx("br",{})," Streamline Your Notes with Ease"]})})})]})},De=()=>{const n=d.useRef(null),l=d.useRef(null),i=d.useRef(null),a=d.useRef(null),r=D();return t.jsxs("div",{className:"flex items-center bg-[#1d1d1d]",children:[t.jsx("div",{className:"flex w-full flex-col items-center pr-2 sm:w-1/3",children:t.jsx("div",{className:"w-2/3",children:t.jsx("form",{onSubmit:c=>{var f,p,w,T;c.preventDefault(),q.post("/new",{name:(f=n.current)==null?void 0:f.value,email:(p=l.current)==null?void 0:p.value,userName:(w=i.current)==null?void 0:w.value,password:(T=a.current)==null?void 0:T.value}).then(()=>{console.log("User Created Succesfully"),r("/login")}).catch(M=>console.log(M))},children:t.jsxs("div",{className:"flex flex-col items-center gap-2 bg-transparent",children:[t.jsx("span",{className:"text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl",children:"Create a new account"}),t.jsx("input",{type:"text",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none",placeholder:"Name",autoComplete:"off",ref:n,required:!0,spellCheck:!1}),t.jsx("input",{type:"text",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-6 font-serif text-[#f0f8ff] focus:outline-none",placeholder:"Email",autoComplete:"off",ref:l,required:!0,spellCheck:!1}),t.jsx("input",{type:"text",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none",placeholder:"Username",autoComplete:"username",ref:i,required:!0,spellCheck:!1}),t.jsx("input",{type:"password",className:"text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-5 font-serif text-[#f0f8ff] focus:bg-transparent focus:outline-none",placeholder:"Password",autoComplete:"current-password",ref:a,required:!0,spellCheck:!1}),t.jsx("button",{className:"mt-9 w-full rounded-md bg-[#61a7ec] px-3 py-2 font-serif font-bold text-black",type:"submit",children:"Sign up"})]})})})}),t.jsx("div",{className:`relative flex h-screen w-0 overflow-hidden sm:w-2/3 ${re.bgi2} items-center justify-center`,children:t.jsx("div",{className:"flex h-1/3 w-1/2 items-center justify-center rounded-xl bg-stone-900 bg-opacity-50 text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-white backdrop-blur-2xl md:text-4xl/[40px] xl:text-5xl/[50px] ",children:t.jsxs("p",{className:"px-5",children:["Simplicity Redefined:",t.jsx("br",{})," Embrace the Beauty of Minimalist Notes"]})})})]})},Te=()=>{const n=D();return d.useEffect(()=>{setTimeout(()=>{n("/",{replace:!0})},3e3)},[]),t.jsxs("div",{className:"flex h-screen w-screen flex-col items-center justify-center bg-[#222222]",children:[t.jsx("p",{className:"font-serif text-4xl font-bold text-white md:text-5xl lg:text-7xl",children:"404 Not Found"}),t.jsx("p",{className:"font-serif text-lg font-semibold text-white md:text-xl lg:text-2xl",children:"The page you are looking for does not exist."})]})},Ie=()=>{var f,p;const n=be(),l=ee(),i=(f=l.state)==null?void 0:f.value,a=(p=l.state)==null?void 0:p.title,r=n.id,c=V({extensions:[z,G.configure({multicolor:!0}),J.configure({types:[O.name,Q.name]}),O.configure(),W.configure({bulletList:{keepMarks:!0,keepAttributes:!1},orderedList:{keepMarks:!0,keepAttributes:!1}})],content:i,editable:!1});return t.jsxs("div",{className:"min-w-screen flex min-h-screen justify-center bg-[#1f1f1f]",children:[t.jsx(te,{to:"/",state:{noteID:r},className:"fixed bottom-3 left-3 font-inter text-xs font-semibold text-[#e2e2e2]",children:"Back"}),t.jsxs("div",{className:"flex min-h-full w-3/4 flex-col bg-[#363636] px-8 py-6 font-inter text-white",children:[t.jsx("p",{className:"flex w-1/4 border-b-2 border-[#a3a3a3] bg-transparent text-xl font-semibold text-[#e8e8e8]",children:a}),t.jsx(Z,{className:"mt-6 text-[#e9e9e9]",editor:c,spellCheck:"false"})]})]})};function Le(){return t.jsxs(ge,{children:[t.jsx(R,{path:"/",element:t.jsx(ke,{})}),t.jsx(R,{path:"/:id/reader",element:t.jsx(Ie,{})}),t.jsx(R,{path:"/login",element:t.jsx(Re,{})}),t.jsx(R,{path:"/signup",element:t.jsx(De,{})}),t.jsx(R,{path:"*",element:t.jsx(Te,{})})]})}xe.createRoot(document.getElementById("root")).render(t.jsx(ve,{children:t.jsx(pe.StrictMode,{children:t.jsx(Le,{})})}));

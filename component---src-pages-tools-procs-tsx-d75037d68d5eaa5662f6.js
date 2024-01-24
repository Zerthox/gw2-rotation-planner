"use strict";(self.webpackChunkgw2_rotation_planner=self.webpackChunkgw2_rotation_planner||[]).push([[990],{4102:function(e,t,n){n.d(t,{Z:function(){return E}});var r=n(3366),a=n(7462),o=n(7294),i=n(512),s=n(4142),l=n(4867),u=n(4780),d=n(7333),c=n(3264),p=n(6268),m=n(5893);const f=["className","component","disableGutters","fixed","maxWidth","classes"],h=(0,p.Z)(),x=(0,c.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,s.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),b=e=>(0,d.Z)({props:e,name:"MuiContainer",defaultTheme:h});var g=n(8216),Z=n(948),v=n(1657);const k=function(e={}){const{createStyledComponent:t=x,useThemeProps:n=b,componentName:d="MuiContainer"}=e,c=t((({theme:e,ownerState:t})=>(0,a.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=n,a=e.breakpoints.values[r];return 0!==a&&(t[e.breakpoints.up(r)]={maxWidth:`${a}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,a.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),p=o.forwardRef((function(e,t){const o=n(e),{className:p,component:h="div",disableGutters:x=!1,fixed:b=!1,maxWidth:g="lg"}=o,Z=(0,r.Z)(o,f),v=(0,a.Z)({},o,{component:h,disableGutters:x,fixed:b,maxWidth:g}),k=((e,t)=>{const{classes:n,fixed:r,disableGutters:a,maxWidth:o}=e,i={root:["root",o&&`maxWidth${(0,s.Z)(String(o))}`,r&&"fixed",a&&"disableGutters"]};return(0,u.Z)(i,(e=>(0,l.ZP)(t,e)),n)})(v,d);return(0,m.jsx)(c,(0,a.Z)({as:h,ownerState:v,className:(0,i.Z)(k.root,p),ref:t},Z))}));return p}({createStyledComponent:(0,Z.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,g.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,v.Z)({props:e,name:"MuiContainer"})});var E=k},9417:function(e,t,n){n.r(t),n.d(t,{Head:function(){return m}});var r=n(7294),a=n(4102),o=n(5295),i=n(9708),s=n(4659),l=n(270),u=n(2658),d=n(9237);const c="Proc Calculator",p=(e,t)=>Math.ceil(e/t)*t;t.default=()=>{const{0:e,1:t}=(0,r.useState)(20),{0:n,1:m}=(0,r.useState)(2),{0:f,1:h}=(0,r.useState)(12),{0:x,1:b}=(0,r.useState)(1),g=e>0,Z=n>0,v=f>=0,k=x>=0,E=g&&Z&&v&&k,P=x>0?p(f,x):f;let S=0,W=0;if(E)for(let r=0;r<e;r+=n)if(f>0){const t=Math.min(e-r,f),n=x>0?p(t,x):t;S+=n/P,W+=n}else S+=1;return r.createElement(d.Ar,{title:c},r.createElement(a.Z,{sx:{marginY:2}},r.createElement(o.Z,{sx:{padding:2}},r.createElement(i.Z,{direction:"column",spacing:2},r.createElement(s.Z,{type:"number",label:"Phase Duration",helperText:"Time frame of combat to calculate procs for.",value:e,onChange:e=>{let{target:n}=e;return t(Number.parseFloat(n.value))},error:!g,InputProps:{endAdornment:r.createElement(l.Z,{position:"end"},"s"),inputProps:{min:0,step:.1}}}),r.createElement(s.Z,{type:"number",label:"Proc Interval",helperText:"Interval or cooldown at which the proc happens.",value:n,onChange:e=>{let{target:t}=e;return m(Number.parseFloat(t.value))},error:!Z,InputProps:{endAdornment:r.createElement(l.Z,{position:"end"},"s"),inputProps:{min:0,step:.1}}}),r.createElement(s.Z,{type:"number",label:"Proc Duration",helperText:"Duration for a proc to take full effect. For example duration of inflicted Conditions. A duration of 0 indicates instant full effect.",value:f,onChange:e=>{let{target:t}=e;return h(Number.parseFloat(t.value))},error:!v,InputProps:{endAdornment:r.createElement(l.Z,{position:"end"},"s"),inputProps:{min:0,step:.1}}}),r.createElement(s.Z,{type:"number",label:"Proc Tickrate",helperText:"Interval between proc ticks. For example 1s for Conditions. A tickrate of 0 indicates infinitely small tickrate.",value:x,onChange:e=>{let{target:t}=e;return b(Number.parseFloat(t.value))},error:!k,InputProps:{endAdornment:r.createElement(l.Z,{position:"end"},"s"),inputProps:{min:0,step:.1}}}),E?r.createElement(r.Fragment,null,r.createElement(u.Z,null,"Single Proc Duration: ",P.toFixed(3),"s"),r.createElement(u.Z,null,"Effective Procs: ",S.toFixed(3)),r.createElement(u.Z,null,"Total Duration: ",W.toFixed(3),"s")):r.createElement(u.Z,{color:"error"},"Invalid parameters.")))))};const m=()=>r.createElement(d.HJ,{title:c})}}]);
//# sourceMappingURL=component---src-pages-tools-procs-tsx-d75037d68d5eaa5662f6.js.map
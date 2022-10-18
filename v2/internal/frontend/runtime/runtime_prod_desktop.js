(()=>{var O=Object.defineProperty;var u=(e,o)=>{for(var n in o)O(e,n,{get:o[n],enumerable:!0})};var p={};u(p,{LogDebug:()=>R,LogError:()=>H,LogFatal:()=>A,LogInfo:()=>P,LogLevel:()=>J,LogPrint:()=>C,LogTrace:()=>z,LogWarning:()=>B,SetLogLevel:()=>M});function d(e,o){window.WailsInvoke("L"+e+o)}function z(e){d("T",e)}function C(e){d("P",e)}function R(e){d("D",e)}function P(e){d("I",e)}function B(e){d("W",e)}function H(e){d("E",e)}function A(e){d("F",e)}function M(e){d("S",e)}var J={TRACE:1,DEBUG:2,INFO:3,WARNING:4,ERROR:5};var v=class{constructor(o,n){n=n||-1,this.Callback=i=>(o.apply(null,i),n===-1?!1:(n-=1,n===0))}},l={};function g(e,o,n){l[e]=l[e]||[];let i=new v(o,n);l[e].push(i)}function k(e,o){g(e,o,-1)}function S(e,o){g(e,o,1)}function y(e){let o=e.name;if(l[o]){let n=l[o].slice();for(let i=0;i<l[o].length;i+=1){let r=l[o][i],t=e.data;r.Callback(t)&&n.splice(i,1)}l[o]=n}}function E(e){let o;try{o=JSON.parse(e)}catch{let i="Invalid JSON passed to Notify: "+e;throw new Error(i)}y(o)}function b(e){let o={name:e,data:[].slice.apply(arguments).slice(1)};y(o),window.WailsInvoke("EE"+JSON.stringify(o))}function h(e){delete l[e],window.WailsInvoke("EX"+e)}function D(e,...o){h(e),o.length>0&&o.forEach(n=>{h(n)})}var f={};function F(){var e=new Uint32Array(1);return window.crypto.getRandomValues(e)[0]}function G(){return Math.random()*9007199254740991}var W;window.crypto?W=F:W=G;function s(e,o,n){return n==null&&(n=0),new Promise(function(i,r){var t;do t=e+"-"+W();while(f[t]);var w;n>0&&(w=setTimeout(function(){r(Error("Call to "+e+" timed out. Request ID: "+t))},n)),f[t]={timeoutHandle:w,reject:r,resolve:i};try{let c={name:e,args:o,callbackID:t};window.WailsInvoke("C"+JSON.stringify(c))}catch(c){console.error(c)}})}window.ObfuscatedCall=(e,o,n)=>(n==null&&(n=0),new Promise(function(i,r){var t;do t=e+"-"+W();while(f[t]);var w;n>0&&(w=setTimeout(function(){r(Error("Call to method "+e+" timed out. Request ID: "+t))},n)),f[t]={timeoutHandle:w,reject:r,resolve:i};try{let c={id:e,args:o,callbackID:t};window.WailsInvoke("c"+JSON.stringify(c))}catch(c){console.error(c)}}));function L(e){let o;try{o=JSON.parse(e)}catch(r){let t=`Invalid JSON passed to callback: ${r.message}. Message: ${e}`;throw runtime.LogDebug(t),new Error(t)}let n=o.callbackid,i=f[n];if(!i){let r=`Callback '${n}' not registered!!!`;throw console.error(r),new Error(r)}clearTimeout(i.timeoutHandle),delete f[n],o.error?i.reject(o.error):i.resolve(o.result)}window.go={};function T(e){try{e=JSON.parse(e)}catch(o){console.error(o)}window.go=window.go||{},Object.keys(e).forEach(o=>{window.go[o]=window.go[o]||{},Object.keys(e[o]).forEach(n=>{window.go[o][n]=window.go[o][n]||{},Object.keys(e[o][n]).forEach(i=>{window.go[o][n][i]=function(){let r=0;function t(){let w=[].slice.call(arguments);return s([o,n,i].join("."),w,r)}return t.setTimeout=function(w){r=w},t.getTimeout=function(){return r},t}()})})})}var x={};u(x,{WindowCenter:()=>N,WindowFullscreen:()=>q,WindowGetPosition:()=>te,WindowGetSize:()=>_,WindowHide:()=>re,WindowIsFullscreen:()=>Z,WindowIsMaximised:()=>de,WindowIsMinimised:()=>ue,WindowIsNormal:()=>ge,WindowMaximise:()=>le,WindowMinimise:()=>fe,WindowReload:()=>U,WindowReloadApp:()=>V,WindowSetAlwaysOnTop:()=>ne,WindowSetBackgroundColour:()=>We,WindowSetDarkTheme:()=>Y,WindowSetLightTheme:()=>X,WindowSetMaxSize:()=>ee,WindowSetMinSize:()=>oe,WindowSetPosition:()=>ie,WindowSetSize:()=>K,WindowSetSystemDefaultTheme:()=>j,WindowSetTitle:()=>$,WindowShow:()=>se,WindowToggleMaximise:()=>we,WindowUnfullscreen:()=>Q,WindowUnmaximise:()=>ae,WindowUnminimise:()=>ce});function U(){window.location.reload()}function V(){window.WailsInvoke("WR")}function j(){window.WailsInvoke("WASDT")}function X(){window.WailsInvoke("WALT")}function Y(){window.WailsInvoke("WADT")}function N(){window.WailsInvoke("Wc")}function $(e){window.WailsInvoke("WT"+e)}function q(){window.WailsInvoke("WF")}function Q(){window.WailsInvoke("Wf")}function Z(){return s(":wails:WindowIsFullscreen")}function K(e,o){window.WailsInvoke("Ws:"+e+":"+o)}function _(){return s(":wails:WindowGetSize")}function ee(e,o){window.WailsInvoke("WZ:"+e+":"+o)}function oe(e,o){window.WailsInvoke("Wz:"+e+":"+o)}function ne(e){window.WailsInvoke("WATP:"+(e?"1":"0"))}function ie(e,o){window.WailsInvoke("Wp:"+e+":"+o)}function te(){return s(":wails:WindowGetPos")}function re(){window.WailsInvoke("WH")}function se(){window.WailsInvoke("WS")}function le(){window.WailsInvoke("WM")}function we(){window.WailsInvoke("Wt")}function ae(){window.WailsInvoke("WU")}function de(){return s(":wails:WindowIsMaximised")}function fe(){window.WailsInvoke("Wm")}function ce(){window.WailsInvoke("Wu")}function ue(){return s(":wails:WindowIsMinimised")}function ge(){return s(":wails:WindowIsNormal")}function We(e,o,n,i){let r=JSON.stringify({r:e||0,g:o||0,b:n||0,a:i||255});window.WailsInvoke("Wr:"+r)}var m={};u(m,{ScreenGetAll:()=>pe});function pe(){return s(":wails:ScreenGetAll")}var I={};u(I,{BrowserOpenURL:()=>ve});function ve(e){window.WailsInvoke("BO:"+e)}function xe(){window.WailsInvoke("Q")}function me(){window.WailsInvoke("S")}function Ie(){window.WailsInvoke("H")}function he(){return s(":wails:Environment")}window.runtime={...p,...x,...I,...m,EventsOn:k,EventsOnce:S,EventsOnMultiple:g,EventsEmit:b,EventsOff:D,Environment:he,Show:me,Hide:Ie,Quit:xe};window.wails={Callback:L,EventsNotify:E,SetBindings:T,eventListeners:l,callbacks:f,flags:{disableScrollbarDrag:!1,disableWailsDefaultContextMenu:!1,enableResize:!1,defaultCursor:null,borderThickness:6,shouldDrag:!1,cssDragProperty:"--wails-draggable",cssDragValue:"drag"}};window.wailsbindings&&(window.wails.SetBindings(window.wailsbindings),delete window.wails.SetBindings);delete window.wailsbindings;window.addEventListener("mouseup",()=>{window.wails.flags.shouldDrag=!1});var ke=function(e){var o=window.getComputedStyle(e.target).getPropertyValue(window.wails.flags.cssDragProperty);return o&&(o=o.trim()),o===window.wails.flags.cssDragValue};window.wails.setCSSDragProperties=function(e,o){window.wails.flags.cssDragProperty=e,window.wails.flags.cssDragValue=o};window.addEventListener("mousedown",e=>{if(window.wails.flags.resizeEdge){window.WailsInvoke("resize:"+window.wails.flags.resizeEdge),e.preventDefault();return}if(ke(e)){if(window.wails.flags.disableScrollbarDrag&&(e.offsetX>e.target.clientWidth||e.offsetY>e.target.clientHeight))return;window.wails.flags.shouldDrag=!0}});function a(e){document.body.style.cursor=e||window.wails.flags.defaultCursor,window.wails.flags.resizeEdge=e}window.addEventListener("mousemove",function(e){let o=e.buttons!==void 0?e.buttons:e.which;if(window.wails.flags.shouldDrag&&o<=0&&(window.wails.flags.shouldDrag=!1),window.wails.flags.shouldDrag){window.WailsInvoke("drag");return}if(!window.wails.flags.enableResize)return;window.wails.flags.defaultCursor==null&&(window.wails.flags.defaultCursor=document.body.style.cursor),window.outerWidth-e.clientX<window.wails.flags.borderThickness&&window.outerHeight-e.clientY<window.wails.flags.borderThickness&&(document.body.style.cursor="se-resize");let n=window.outerWidth-e.clientX<window.wails.flags.borderThickness,i=e.clientX<window.wails.flags.borderThickness,r=e.clientY<window.wails.flags.borderThickness,t=window.outerHeight-e.clientY<window.wails.flags.borderThickness;!i&&!n&&!r&&!t&&window.wails.flags.resizeEdge!==void 0?a():n&&t?a("se-resize"):i&&t?a("sw-resize"):i&&r?a("nw-resize"):r&&n?a("ne-resize"):i?a("w-resize"):r?a("n-resize"):t?a("s-resize"):n&&a("e-resize")});window.addEventListener("contextmenu",function(e){window.wails.flags.disableWailsDefaultContextMenu&&e.preventDefault()});window.WailsInvoke("runtime:ready");})();

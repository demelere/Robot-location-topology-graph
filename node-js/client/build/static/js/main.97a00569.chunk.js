(this["webpackJsonpnode-js-coding-exercise-client"]=this["webpackJsonpnode-js-coding-exercise-client"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),r=n(4),a=n.n(r),s=(n(10),n(1));n(11),n(12),n(14);var i=function(){var e=function(){var e=Object(o.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(o.useEffect)((function(){fetch("http://localhost:3001/states",{method:"POST"}).then((function(e){return e.json()})).then((function(e){c(e.states)})).catch((function(e){console.error(e)}))}),[]),n}(),t=(Object(s.a)(e,1)[0],Object(o.useState)(!1)),n=Object(s.a)(t,2),r=n[0],a=n[1];return Object(o.useEffect)((function(){var e=document.createElement("script");e.src="http://localhost:3000/public/arbor.js",e.async=!0,e.onload=function(){return a(!0)},document.head.appendChild(e);var t=document.createElement("script");return t.src="http://localhost:3000/public/arbor-tween.js",t.async=!0,document.head.appendChild(t),function(){document.head.removeChild(e),document.head.removeChild(t)}}),[]),r||console.error("arbor not defined"),c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("p",null,"Your code goes here..")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(i,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},5:function(e,t,n){e.exports=n(15)}},[[5,1,2]]]);
//# sourceMappingURL=main.97a00569.chunk.js.map
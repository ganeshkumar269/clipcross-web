import{S as e,i as t,s as o,e as n,t as s,k as a,c as i,a as l,g as c,d as r,n as f,f as d,E as u,F as h,h as m,H as v,M as p,j as g,m as y,o as w,v as b,r as S,w as $,I,u as N,N as k,K as O,z as E,B as x,O as C}from"../chunks/vendor-c49cf35e.js";import{d as T,w as _}from"../chunks/stores-57bcb912.js";function j(e){let t,o,p,g,y,w,b,S,$,I,N,k;return{c(){t=n("main"),o=n("span"),p=s(e[0]),g=a(),y=n("span"),w=s("DeviceId: "),b=s(e[1]),S=a(),$=n("button"),I=s("Copy")},l(n){t=i(n,"MAIN",{});var s=l(t);o=i(s,"SPAN",{});var a=l(o);p=c(a,e[0]),a.forEach(r),g=f(s),y=i(s,"SPAN",{});var d=l(y);w=c(d,"DeviceId: "),b=c(d,e[1]),d.forEach(r),S=f(s),$=i(s,"BUTTON",{});var u=l($);I=c(u,"Copy"),u.forEach(r),s.forEach(r)},m(n,s){d(n,t,s),u(t,o),u(o,p),u(t,g),u(t,y),u(y,w),u(y,b),u(t,S),u(t,$),u($,I),N||(k=h($,"click",e[5]),N=!0)},p(e,[t]){1&t&&m(p,e[0]),2&t&&m(b,e[1])},i:v,o:v,d(e){e&&r(t),N=!1,k()}}}function A(e,t,o){let{value:n}=t,{format:s}=t,{timestamp:a}=t,{hash:i}=t,{deviceId:l}=t;return e.$$set=e=>{"value"in e&&o(0,n=e.value),"format"in e&&o(2,s=e.format),"timestamp"in e&&o(3,a=e.timestamp),"hash"in e&&o(4,i=e.hash),"deviceId"in e&&o(1,l=e.deviceId)},[n,l,s,a,i,function(t){p(e,t)}]}class B extends e{constructor(e){super(),t(this,e,A,j,o,{value:0,format:2,timestamp:3,hash:4,deviceId:1})}}function J(e,t,o){const n=e.slice();return n[11]=t[o],n[13]=o,n}function M(e){let t,o;return t=new B({props:{value:e[11].value,format:e[11].format,timestamp:e[11].timestamp,hash:e[11].hash,deviceId:T[e[13]]}}),{c(){g(t.$$.fragment)},l(e){y(t.$$.fragment,e)},m(e,n){w(t,e,n),o=!0},p:v,i(e){o||(b(t.$$.fragment,e),o=!0)},o(e){S(t.$$.fragment,e),o=!1},d(e){$(t,e)}}}function R(e){let t,o,m,v,p,g,y,w,$=e[0],O=[];for(let n=0;n<$.length;n+=1)O[n]=M(J(e,$,n));const E=e=>S(O[e],1,1,(()=>{O[e]=null}));return{c(){t=a(),o=n("main"),m=n("button"),v=s("Get Clips"),p=a();for(let e=0;e<O.length;e+=1)O[e].c();this.h()},l(e){I('[data-svelte="svelte-1rmb2bd"]',document.head).forEach(r),t=f(e),o=i(e,"MAIN",{});var n=l(o);m=i(n,"BUTTON",{});var s=l(m);v=c(s,"Get Clips"),s.forEach(r),p=f(n);for(let t=0;t<O.length;t+=1)O[t].l(n);n.forEach(r),this.h()},h(){document.title="Clips"},m(n,s){d(n,t,s),d(n,o,s),u(o,m),u(m,v),u(o,p);for(let e=0;e<O.length;e+=1)O[e].m(o,null);g=!0,y||(w=h(m,"click",e[1]),y=!0)},p(e,[t]){if(1&t){let n;for($=e[0],n=0;n<$.length;n+=1){const s=J(e,$,n);O[n]?(O[n].p(s,t),b(O[n],1)):(O[n]=M(s),O[n].c(),b(O[n],1),O[n].m(o,null))}for(x(),n=$.length;n<O.length;n+=1)E(n);N()}},i(e){if(!g){for(let e=0;e<$.length;e+=1)b(O[e]);g=!0}},o(e){O=O.filter(Boolean);for(let t=0;t<O.length;t+=1)S(O[t]);g=!1},d(e){e&&r(t),e&&r(o),k(O,e),y=!1,w()}}}function D(e){var t=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(s,a){function i(e){try{c(n.next(e))}catch(t){a(t)}}function l(e){try{c(n.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,l)}c((n=n.apply(e,t||[])).next())}))};let o,n=O.get("id_token"),s=O.get("device_id"),a=[{value:"temp value",format:"temp format",timestamp:4,hash:"temp hash"}],i=_+`?id_token=${n}&device_id=${s}`;const l=e=>{console.log("WebScoket Connection Opened");const t=JSON.stringify({syncflow:!0});console.log(t,o),f()},c=e=>t(void 0,void 0,void 0,(function*(){console.log("onMessage",e);let t=JSON.parse(e.data.toString());if(console.log(t),console.log(typeof t),1==t.syncflow){delete t.syncflow;for(const[e,o]of Object.entries(t))console.log({key:e,value:o}),a.push(o),T.update((t=>[...t,e.toString()]))}500==(null==t?void 0:t.status)&&(console.log("Got a 500"),yield r())})),r=()=>t(void 0,void 0,void 0,(function*(){const e=navigator.clipboard,t=yield e.readText();if(console.log(t),t){let e={value:t,format:"text",timestamp:Date.now(),hash:C(t)};console.log("updateRemoteClip clip",e),o.send(JSON.stringify({clip:e,vcbIds:["default-web"]}))}})),f=()=>t(void 0,void 0,void 0,(function*(){setTimeout((()=>{o.send(JSON.stringify({syncflow:!0}))}),3e3)}));return E((()=>{o=new WebSocket(i),console.log("ws created"),o.onopen=l,o.onmessage=c,o.onerror=e=>{console.log("WS ERROR :("),console.log(e)}})),[a,f]}export default class extends e{constructor(e){super(),t(this,e,D,R,o,{})}}

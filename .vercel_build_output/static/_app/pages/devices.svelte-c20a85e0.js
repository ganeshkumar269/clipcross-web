import{S as s,i as a,s as e,e as t,t as c,k as r,c as n,a as l,g as o,d as h,n as i,b as u,f as m,E as f,h as d,H as v}from"../chunks/vendor-c49cf35e.js";import{d as b}from"../chunks/stores-57bcb912.js";function k(s){let a,e,b,k,p,H,g,j,y,E,x=function(s){let a;return{c(){a=c("Device")},l(s){a=o(s,"Device")},m(s,e){m(s,a,e)},d(s){s&&h(a)}}}();return{c(){a=t("main"),e=t("h1"),b=c("Hello "),k=c(s[0]),p=c("!"),H=r(),g=t("h3"),j=c("device array length "),y=c(s[1]),E=r(),x&&x.c(),this.h()},l(t){a=n(t,"MAIN",{class:!0});var c=l(a);e=n(c,"H1",{class:!0});var r=l(e);b=o(r,"Hello "),k=o(r,s[0]),p=o(r,"!"),r.forEach(h),H=i(c),g=n(c,"H3",{});var u=l(g);j=o(u,"device array length "),y=o(u,s[1]),u.forEach(h),E=i(c),x&&x.l(c),c.forEach(h),this.h()},h(){u(e,"class","svelte-1tky8bj"),u(a,"class","svelte-1tky8bj")},m(s,t){m(s,a,t),f(a,e),f(e,b),f(e,k),f(e,p),f(a,H),f(a,g),f(g,j),f(g,y),f(a,E),x&&x.m(a,null)},p(s,[a]){1&a&&d(k,s[0]),2&a&&d(y,s[1])},i:v,o:v,d(s){s&&h(a),x&&x.d()}}}function p(s,a,e){let{name:t}=a,c=-1;return b.subscribe((s=>e(1,c=s.length))),s.$$set=s=>{"name"in s&&e(0,t=s.name)},[t,c]}export default class extends s{constructor(s){super(),a(this,s,p,k,e,{name:0})}}

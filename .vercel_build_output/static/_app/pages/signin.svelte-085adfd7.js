import{S as a,i as n,s,e as t,t as o,c as r,a as c,g as i,d as e,f as l,E as u,k as f,n as g,F as d,L as h,H as m}from"../chunks/vendor-c49cf35e.js";function p(a){let n,s;return{c(){n=t("h1"),s=o("Loading Bro!")},l(a){n=r(a,"H1",{});var t=c(n);s=i(t,"Loading Bro!"),t.forEach(e)},m(a,t){l(a,n,t),u(n,s)},d(a){a&&e(n)}}}function v(a){let n,s,v,E,I,S,x,B,H,L=a[0]&&p();return{c(){n=t("main"),s=t("h1"),v=o("Sign In With Google"),E=f(),I=t("button"),S=o("SignIn"),x=f(),L&&L.c()},l(a){n=r(a,"MAIN",{});var t=c(n);s=r(t,"H1",{});var o=c(s);v=i(o,"Sign In With Google"),o.forEach(e),E=g(t),I=r(t,"BUTTON",{});var l=c(I);S=i(l,"SignIn"),l.forEach(e),x=g(t),L&&L.l(t),t.forEach(e)},m(t,o){l(t,n,o),u(n,s),u(s,v),u(n,E),u(n,I),u(I,S),u(n,x),L&&L.m(n,null),B||(H=d(I,"submit",h(a[1])),B=!0)},p(a,[s]){a[0]?L||(L=p(),L.c(),L.m(n,null)):L&&(L.d(1),L=null)},i:m,o:m,d(a){a&&e(n),L&&L.d(),B=!1,H()}}}const E=async({fetch:a,page:n})=>{const s=await a("/api/signin");return console.log(s),s.data(),{status:200}};function I(a,n,s){return[!1,()=>{}]}export default class extends a{constructor(a){super(),n(this,a,I,v,s,{})}}export{E as load};

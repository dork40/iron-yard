var Eh=Object.defineProperty;var Mh=(i,e,t)=>e in i?Eh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var me=(i,e,t)=>Mh(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Wc=3e4,qc=1500,Xs=6,cd=-10,ld=7e3,Fr=1500,ls={minWaitMs:2e3,maxWaitMs:6e3,minOpponentReactionMs:550,maxOpponentReactionMs:1400},Th={easy:{...ls,minOpponentReactionMs:1200,maxOpponentReactionMs:2200},normal:ls,hard:{...ls,minOpponentReactionMs:250,maxOpponentReactionMs:650}},wn=(i,e)=>Math.round(i+Math.random()*(e-i));function bh(i="normal"){const e=Th[i];return{waitMs:wn(e.minWaitMs,e.maxWaitMs),opponentReactionMs:wn(e.minOpponentReactionMs,e.maxOpponentReactionMs)}}const Tl=["SHOOT","DRAW","POW"];function ud(){return Tl[Math.floor(Math.random()*Tl.length)]}function $c(i,e){return i<e?{outcome:"win",reactionMs:i,opponentReactionMs:e,message:"You were faster on the draw."}:{outcome:"loss",reactionMs:i,opponentReactionMs:e,message:"The other gun spoke first."}}function Ah(i){return{outcome:"false-start",opponentReactionMs:i,message:"False start. No one draws before the bell."}}function wh(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function dd(i,e=Math.ceil(Wc/qc)*Xs){const t=wh(i),n=[18,42,66,82].flatMap(o=>[22,50,78].map(a=>({x:o,y:a})));let s=[],r=[];return Array.from({length:e},(o,a)=>{a%Xs===0&&(s=[...n],r=["green","green","blue","red","red","red"]);const c=s.splice(Math.floor(t()*s.length),1)[0],l=r.splice(Math.floor(t()*r.length),1)[0];return{id:a,kind:l,x:c.x,y:c.y}})}function Rh(i){return i==="red"?-10:10}function Ch(i){const e=i==="easy"?wn(24,34):i==="normal"?wn(35,45):wn(48,58),t=i==="easy"?wn(8,12):i==="normal"?wn(5,8):wn(2,4),n=i==="easy"?wn(8,12):i==="normal"?wn(4,7):wn(1,3);return e*10+(t+n)*cd}function Ih(i){return["rock","paper","scissors"][Math.floor(Math.random()*3)]}function Lh(i,e){const t={rock:"scissors",paper:"rock",scissors:"paper"};if(i===e)return{outcome:"tie",opponentReactionMs:0,message:"Matching signs tie. Start the next round."};const n=i!==e&&t[i]===e;return{outcome:n?"win":"loss",opponentReactionMs:0,message:i===e?"A tie. The host deals the next round.":`${i.toUpperCase()} ${n?"beats":"loses to"} ${e.toUpperCase()}.`}}let Bi=!1,Ki;function Ph(){try{Bi=localStorage.getItem("high-noon-muted")==="true"}catch{}return Bi}function bl(){return Bi}function Dh(){Bi=!Bi;try{localStorage.setItem("high-noon-muted",String(Bi))}catch{}return Bi}function sn(i){if(!(Bi||typeof AudioContext>"u"))try{Ki??(Ki=new AudioContext),Ki.state==="suspended"&&Ki.resume().catch(()=>{});const e=Ki.currentTime,t={click:[340,.035,.03,"triangle"],signal:[760,.11,.08,"triangle"],shot:[105,.09,.14,"sawtooth"],negative:[150,.15,.11,"triangle"],bottle:[980,.12,.08,"triangle"],win:[520,.22,.1,"triangle"],loss:[190,.22,.1,"triangle"],"frontier-shot":[82,.12,.17,"sawtooth"],"modern-shot":[138,.075,.12,"square"],"pistol-shot":[190,.07,.1,"square"],reload:[520,.055,.045,"triangle"],impact:[760,.045,.06,"square"]},[n,s,r,o]=t[i],a=Ki.createOscillator(),c=Ki.createGain();a.type=o,a.frequency.setValueAtTime(n,e),a.frequency.exponentialRampToValueAtTime(Math.max(35,n*(i.includes("shot")?.35:.62)),e+s),c.gain.setValueAtTime(r,e),c.gain.exponentialRampToValueAtTime(.001,e+s),a.connect(c).connect(Ki.destination),a.start(e),a.stop(e+s)}catch{}}function Nh(i){let e=i>>>0;return()=>{e+=1831565813;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Uh(i,e=34){const t=Nh(i),n=[{x:.07,y:.5}];let s=.5;for(let r=1;r<e;r++)s=Math.max(.13,Math.min(.87,s+(t()-.5)*.3)),n.push({x:.07+r*.86/(e-1),y:s});return n}function Oh(i,e){if(!i.length)return{score:0,progress:0,accuracy:0};let t=0;for(const o of i){let a=0,c=1/0;e.forEach((l,u)=>{const d=Math.hypot(o.x-l.x,o.y-l.y);d<c&&(c=d,a=u)}),t=Math.max(t,a)}const n=Math.round(t/(e.length-1)*100),s=e.slice(0,t+1).reduce((o,a)=>o+Math.min(...i.map(c=>Math.hypot(c.x-a.x,c.y-a.y))),0),r=Math.round(Math.max(0,1-s/(t+1)/.16)*100);return{score:Math.round(n*.6+r*.4+(n>92?8:0)),progress:n,accuracy:r,reachedEnd:t===e.length-1}}const hd=95,fd=55;function pd(i){return i.reachedEnd===!0&&i.progress>=hd&&i.accuracy>=fd}function Fh(i){const e={easy:[48,72],normal:[68,88],hard:[84,98]},[t,n]=e[i];return Math.round(t+Math.random()*(n-t))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xc="180",Bh=0,Al=1,kh=2,md=1,gd=2,Si=3,Ai=0,Sn=1,Wn=2,Hi=0,Gs=1,wl=2,Rl=3,Cl=4,Hh=5,os=100,zh=101,Vh=102,Gh=103,Wh=104,qh=200,$h=201,Xh=202,Yh=203,$a=204,Xa=205,Kh=206,jh=207,Zh=208,Jh=209,Qh=210,ef=211,tf=212,nf=213,sf=214,Ya=0,Ka=1,ja=2,Ys=3,Za=4,Ja=5,Qa=6,ec=7,_d=0,rf=1,of=2,zi=0,af=1,cf=2,lf=3,vd=4,uf=5,df=6,hf=7,Il="attached",ff="detached",Sd=300,Ks=301,js=302,tc=303,nc=304,ea=306,Gi=1e3,ki=1001,$o=1002,hn=1003,xd=1004,Cr=1005,Cn=1006,Oo=1007,Mi=1008,ai=1009,yd=1010,Ed=1011,Br=1012,Yc=1013,ds=1014,Yn=1015,Zr=1016,Kc=1017,jc=1018,kr=1020,Md=35902,Td=35899,bd=1021,Ad=1022,Un=1023,Hr=1026,zr=1027,Zc=1028,Jc=1029,wd=1030,Qc=1031,el=1033,Fo=33776,Bo=33777,ko=33778,Ho=33779,ic=35840,sc=35841,rc=35842,oc=35843,ac=36196,cc=37492,lc=37496,uc=37808,dc=37809,hc=37810,fc=37811,pc=37812,mc=37813,gc=37814,_c=37815,vc=37816,Sc=37817,xc=37818,yc=37819,Ec=37820,Mc=37821,Tc=36492,bc=36494,Ac=36495,wc=36283,Rc=36284,Cc=36285,Ic=36286,pf=2200,mf=2201,gf=2202,Vr=2300,Gr=2301,aa=2302,ks=2400,Hs=2401,Xo=2402,tl=2500,_f=2501,vf=0,Rd=1,Lc=2,Sf=3200,xf=3201,Cd=0,yf=1,Fi="",Ot="srgb",mn="srgb-linear",Yo="linear",Tt="srgb",ys=7680,Ll=519,Ef=512,Mf=513,Tf=514,Id=515,bf=516,Af=517,wf=518,Rf=519,Pc=35044,Pl="300 es",ni=2e3,Ko=2001;class ps{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dl=1234567;const Dr=Math.PI/180,Zs=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function nl(i,e){return(i%e+e)%e}function Cf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function If(i,e,t){return i!==e?(t-i)/(e-i):0}function Nr(i,e,t){return(1-t)*i+t*e}function Lf(i,e,t,n){return Nr(i,e,1-Math.exp(-t*n))}function Pf(i,e=1){return e-Math.abs(nl(i,e*2)-e)}function Df(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Nf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Uf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Of(i,e){return i+Math.random()*(e-i)}function Ff(i){return i*(.5-Math.random())}function Bf(i){i!==void 0&&(Dl=i);let e=Dl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kf(i){return i*Dr}function Hf(i){return i*Zs}function zf(i){return(i&i-1)===0&&i!==0}function Vf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Gf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wf(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Nn={DEG2RAD:Dr,RAD2DEG:Zs,generateUUID:Kn,clamp:st,euclideanModulo:nl,mapLinear:Cf,inverseLerp:If,lerp:Nr,damp:Lf,pingpong:Pf,smoothstep:Df,smootherstep:Nf,randInt:Uf,randFloat:Of,randFloatSpread:Ff,seededRandom:Bf,degToRad:kf,radToDeg:Hf,isPowerOfTwo:zf,ceilPowerOfTwo:Vf,floorPowerOfTwo:Gf,setQuaternionFromProperEuler:Wf,normalize:Mt,denormalize:qn};class ct{constructor(e=0,t=0){ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3];const h=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==h||l!==p||u!==g){let m=1-a;const f=c*h+l*p+u*g+d*_,M=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const w=Math.sqrt(T),C=Math.atan2(w,f*M);m=Math.sin(m*C)/w,a=Math.sin(a*C)/w}const x=a*M;if(c=c*m+h*x,l=l*m+p*x,u=u*m+g*x,d=d*m+_*x,m===1-a){const w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-a*p,e[t+2]=l*g+u*p+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ca.copy(this).projectOnVector(e),this.sub(ca)}reflect(e){return this.sub(ca.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ca=new D,Nl=new jn;class Je{constructor(e,t,n,s,r,o,a,c,l){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],T=s[4],x=s[7],w=s[2],C=s[5],I=s[8];return r[0]=o*_+a*M+c*w,r[3]=o*m+a*T+c*C,r[6]=o*f+a*x+c*I,r[1]=l*_+u*M+d*w,r[4]=l*m+u*T+d*C,r[7]=l*f+u*x+d*I,r[2]=h*_+p*M+g*w,r[5]=h*m+p*T+g*C,r[8]=h*f+p*x+g*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*r,p=l*r-o*c,g=t*d+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*l-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=h*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(la.makeScale(e,t)),this}rotate(e){return this.premultiply(la.makeRotation(-e)),this}translate(e,t){return this.premultiply(la.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const la=new Je;function Ld(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qf(){const i=Wr("canvas");return i.style.display="block",i}const Ul={};function qr(i){i in Ul||(Ul[i]=!0,console.warn(i))}function $f(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ol=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fl=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xf(){const i={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Tt&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Tt&&(s.r=Ws(s.r),s.g=Ws(s.g),s.b=Ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?Yo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return qr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return qr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mn]:{primaries:e,whitePoint:n,transfer:Yo,toXYZ:Ol,fromXYZ:Fl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:e,whitePoint:n,transfer:Tt,toXYZ:Ol,fromXYZ:Fl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),i}const dt=Xf();function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Es;class Yf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Es===void 0&&(Es=Wr("canvas")),Es.width=e.width,Es.height=e.height;const s=Es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Es}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Wr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kf=0;class il{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ua(s[o].image)):r.push(ua(s[o]))}else r=ua(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jf=0;const da=new D;class kt extends ps{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=ki,s=ki,r=Cn,o=Mi,a=Un,c=ai,l=kt.DEFAULT_ANISOTROPY,u=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Kn(),this.name="",this.source=new il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(da).x}get height(){return this.source.getSize(da).y}get depth(){return this.source.getSize(da).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gi:e.x=e.x-Math.floor(e.x);break;case ki:e.x=e.x<0?0:1;break;case $o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gi:e.y=e.y-Math.floor(e.y);break;case ki:e.y=e.y<0?0:1;break;case $o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Sd;kt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,s=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,x=(p+1)/2,w=(f+1)/2,C=(u+h)/4,I=(d+_)/4,A=(g+m)/4;return T>x&&T>w?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=C/n,r=I/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=A/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=I/r,s=A/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(h-u)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zf extends ps{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new kt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new il(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hs extends Zf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pd extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jf extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),io.subVectors(this.max,gr),Ms.subVectors(e.a,gr),Ts.subVectors(e.b,gr),bs.subVectors(e.c,gr),Ci.subVectors(Ts,Ms),Ii.subVectors(bs,Ts),ji.subVectors(Ms,bs);let t=[0,-Ci.z,Ci.y,0,-Ii.z,Ii.y,0,-ji.z,ji.y,Ci.z,0,-Ci.x,Ii.z,0,-Ii.x,ji.z,0,-ji.x,-Ci.y,Ci.x,0,-Ii.y,Ii.x,0,-ji.y,ji.x,0];return!ha(t,Ms,Ts,bs,io)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Ms,Ts,bs,io))?!1:(so.crossVectors(Ci,Ii),t=[so.x,so.y,so.z],ha(t,Ms,Ts,bs,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fi=[new D,new D,new D,new D,new D,new D,new D,new D],kn=new D,no=new yn,Ms=new D,Ts=new D,bs=new D,Ci=new D,Ii=new D,ji=new D,gr=new D,io=new D,so=new D,Zi=new D;function ha(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Zi.fromArray(i,r);const a=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),c=e.dot(Zi),l=t.dot(Zi),u=n.dot(Zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Qf=new yn,_r=new D,fa=new D;class li{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Qf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);const t=_r.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(_r,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(fa)),this.expandByPoint(_r.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const pi=new D,pa=new D,ro=new D,Li=new D,ma=new D,oo=new D,ga=new D;class rr{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pa.copy(e).add(t).multiplyScalar(.5),ro.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ro),a=Li.dot(this.direction),c=-Li.dot(ro),l=Li.lengthSq(),u=Math.abs(1-o*o);let d,h,p,g;if(u>0)if(d=o*c-a,h=o*a-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,p=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(pa).addScaledVector(ro,h),p}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,s,r){ma.subVectors(t,e),oo.subVectors(n,e),ga.crossVectors(ma,oo);let o=this.direction.dot(ga),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,e);const c=a*this.direction.dot(oo.crossVectors(Li,oo));if(c<0)return null;const l=a*this.direction.dot(ma.cross(Li));if(l<0||c+l>o)return null;const u=-a*Li.dot(ga);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,s,r,o,a,c,l,u,d,h,p,g,_,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,d,h,p,g,_,m)}set(e,t,n,s,r,o,a,c,l,u,d,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),r=1/As.setFromMatrixColumn(e,1).length(),o=1/As.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,g=l*u,_=l*d;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,g=l*u,_=l*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-h*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ep,e,tp)}lookAt(e,t,n){const s=this.elements;return Tn.subVectors(e,t),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Pi.crossVectors(n,Tn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Pi.crossVectors(n,Tn)),Pi.normalize(),ao.crossVectors(Tn,Pi),s[0]=Pi.x,s[4]=ao.x,s[8]=Tn.x,s[1]=Pi.y,s[5]=ao.y,s[9]=Tn.y,s[2]=Pi.z,s[6]=ao.z,s[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],T=n[7],x=n[11],w=n[15],C=s[0],I=s[4],A=s[8],y=s[12],S=s[1],L=s[5],U=s[9],H=s[13],W=s[2],V=s[6],Y=s[10],J=s[14],k=s[3],le=s[7],de=s[11],Ae=s[15];return r[0]=o*C+a*S+c*W+l*k,r[4]=o*I+a*L+c*V+l*le,r[8]=o*A+a*U+c*Y+l*de,r[12]=o*y+a*H+c*J+l*Ae,r[1]=u*C+d*S+h*W+p*k,r[5]=u*I+d*L+h*V+p*le,r[9]=u*A+d*U+h*Y+p*de,r[13]=u*y+d*H+h*J+p*Ae,r[2]=g*C+_*S+m*W+f*k,r[6]=g*I+_*L+m*V+f*le,r[10]=g*A+_*U+m*Y+f*de,r[14]=g*y+_*H+m*J+f*Ae,r[3]=M*C+T*S+x*W+w*k,r[7]=M*I+T*L+x*V+w*le,r[11]=M*A+T*U+x*Y+w*de,r[15]=M*y+T*H+x*J+w*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*d-s*l*d-r*a*h+n*l*h+s*a*p-n*c*p)+_*(+t*c*p-t*l*h+r*o*h-s*o*p+s*l*u-r*c*u)+m*(+t*l*d-t*a*p-r*o*d+n*o*p+r*a*u-n*l*u)+f*(-s*a*u-t*c*d+t*a*h+s*o*d-n*o*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],M=d*m*l-_*h*l+_*c*p-a*m*p-d*c*f+a*h*f,T=g*h*l-u*m*l-g*c*p+o*m*p+u*c*f-o*h*f,x=u*_*l-g*d*l+g*a*p-o*_*p-u*a*f+o*d*f,w=g*d*c-u*_*c-g*a*h+o*_*h+u*a*m-o*d*m,C=t*M+n*T+s*x+r*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/C;return e[0]=M*I,e[1]=(_*h*r-d*m*r-_*s*p+n*m*p+d*s*f-n*h*f)*I,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*f+n*c*f)*I,e[3]=(d*c*r-a*h*r-d*s*l+n*h*l+a*s*p-n*c*p)*I,e[4]=T*I,e[5]=(u*m*r-g*h*r+g*s*p-t*m*p-u*s*f+t*h*f)*I,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*f-t*c*f)*I,e[7]=(o*h*r-u*c*r+u*s*l-t*h*l-o*s*p+t*c*p)*I,e[8]=x*I,e[9]=(g*d*r-u*_*r-g*n*p+t*_*p+u*n*f-t*d*f)*I,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*I,e[11]=(u*a*r-o*d*r-u*n*l+t*d*l+o*n*p-t*a*p)*I,e[12]=w*I,e[13]=(u*_*s-g*d*s+g*n*h-t*_*h-u*n*m+t*d*m)*I,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*I,e[15]=(o*d*s-u*a*s+u*n*c-t*d*c-o*n*h+t*a*h)*I,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,h=r*l,p=r*u,g=r*d,_=o*u,m=o*d,f=a*d,M=c*l,T=c*u,x=c*d,w=n.x,C=n.y,I=n.z;return s[0]=(1-(_+f))*w,s[1]=(p+x)*w,s[2]=(g-T)*w,s[3]=0,s[4]=(p-x)*C,s[5]=(1-(h+f))*C,s[6]=(m+M)*C,s[7]=0,s[8]=(g+T)*I,s[9]=(m-M)*I,s[10]=(1-(h+_))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=As.set(s[0],s[1],s[2]).length();const o=As.set(s[4],s[5],s[6]).length(),a=As.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Hn.copy(this);const l=1/r,u=1/o,d=1/a;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=u,Hn.elements[5]*=u,Hn.elements[6]*=u,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,t.setFromRotationMatrix(Hn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ni,c=!1){const l=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s);let g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===ni)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ko)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ni,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===ni)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Ko)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const As=new D,Hn=new tt,ep=new D(0,0,0),tp=new D(1,1,1),Pi=new D,ao=new D,Tn=new D,Bl=new tt,kl=new jn;class ci{constructor(e=0,t=0,n=0,s=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kl.setFromEuler(this),this.setFromQuaternion(kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let np=0;const Hl=new D,ws=new jn,mi=new tt,co=new D,vr=new D,ip=new D,sp=new jn,zl=new D(1,0,0),Vl=new D(0,1,0),Gl=new D(0,0,1),Wl={type:"added"},rp={type:"removed"},Rs={type:"childadded",child:null},_a={type:"childremoved",child:null};class Pt extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new D,t=new ci,n=new jn,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new Je}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(vr,co,this.up):mi.lookAt(co,vr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(mi),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wl),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rp),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wl),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,ip),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,sp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new D(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new D,gi=new D,va=new D,_i=new D,Cs=new D,Is=new D,ql=new D,Sa=new D,xa=new D,ya=new D,Ea=new _t,Ma=new _t,Ta=new _t;class $n{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),zn.subVectors(e,t),s.cross(zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){zn.subVectors(s,t),gi.subVectors(n,t),va.subVectors(e,t);const o=zn.dot(zn),a=zn.dot(gi),c=zn.dot(va),l=gi.dot(gi),u=gi.dot(va),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,p=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ea.setScalar(0),Ma.setScalar(0),Ta.setScalar(0),Ea.fromBufferAttribute(e,t),Ma.fromBufferAttribute(e,n),Ta.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ea,r.x),o.addScaledVector(Ma,r.y),o.addScaledVector(Ta,r.z),o}static isFrontFacing(e,t,n,s){return zn.subVectors(n,t),gi.subVectors(e,t),zn.cross(gi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),zn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return $n.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Cs.subVectors(s,n),Is.subVectors(r,n),Sa.subVectors(e,n);const c=Cs.dot(Sa),l=Is.dot(Sa);if(c<=0&&l<=0)return t.copy(n);xa.subVectors(e,s);const u=Cs.dot(xa),d=Is.dot(xa);if(u>=0&&d<=u)return t.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Cs,o);ya.subVectors(e,r);const p=Cs.dot(ya),g=Is.dot(ya);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Is,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return ql.subVectors(r,s),a=(d-u)/(d-u+(p-g)),t.copy(s).addScaledVector(ql,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(n).addScaledVector(Cs,o).addScaledVector(Is,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},lo={h:0,s:0,l:0};function ba(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class $e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=nl(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ba(o,r,e+1/3),this.g=ba(o,r,e),this.b=ba(o,r,e-1/3)}return dt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=Dd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return dt.workingToColorSpace(tn.copy(this),e),Math.round(st(tn.r*255,0,255))*65536+Math.round(st(tn.g*255,0,255))*256+Math.round(st(tn.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(tn.copy(this),t);const n=tn.r,s=tn.g,r=tn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Ot){dt.workingToColorSpace(tn.copy(this),e);const t=tn.r,n=tn.g,s=tn.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(lo);const n=Nr(Di.h,lo.h,t),s=Nr(Di.s,lo.s,t),r=Nr(Di.l,lo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new $e;$e.NAMES=Dd;let op=0;class ii extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=Gs,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$a,this.blendDst=Xa,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$a&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==os&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ll&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Rn extends ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=_d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ft=new D,uo=new ct;let ap=0;class fn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ap++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pc,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uo.fromBufferAttribute(this,t),uo.applyMatrix3(e),this.setXY(t,uo.x,uo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pc&&(e.usage=this.usage),e}}class Nd extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ud extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $t extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let cp=0;const Ln=new tt,Aa=new Pt,Ls=new D,bn=new yn,Sr=new yn,qt=new D;class En extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ld(e)?Ud:Nd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,n){return Ln.makeTranslation(e,t,n),this.applyMatrix4(Ln),this}scale(e,t,n){return Ln.makeScale(e,t,n),this.applyMatrix4(Ln),this}lookAt(e){return Aa.lookAt(e),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(qt.addVectors(bn.min,Sr.min),bn.expandByPoint(qt),qt.addVectors(bn.max,Sr.max),bn.expandByPoint(qt)):(bn.expandByPoint(Sr.min),bn.expandByPoint(Sr.max))}bn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)qt.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(e,l),qt.add(Ls)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<n.count;A++)a[A]=new D,c[A]=new D;const l=new D,u=new D,d=new D,h=new ct,p=new ct,g=new ct,_=new D,m=new D;function f(A,y,S){l.fromBufferAttribute(n,A),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,S),h.fromBufferAttribute(r,A),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,S),u.sub(l),d.sub(l),p.sub(h),g.sub(h);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(L),a[A].add(_),a[y].add(_),a[S].add(_),c[A].add(m),c[y].add(m),c[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let A=0,y=M.length;A<y;++A){const S=M[A],L=S.start,U=S.count;for(let H=L,W=L+U;H<W;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const T=new D,x=new D,w=new D,C=new D;function I(A){w.fromBufferAttribute(s,A),C.copy(w);const y=a[A];T.copy(y),T.sub(w.multiplyScalar(w.dot(y))).normalize(),x.crossVectors(C,y);const L=x.dot(c[A])<0?-1:1;o.setXYZW(A,T.x,T.y,T.z,L)}for(let A=0,y=M.length;A<y;++A){const S=M[A],L=S.start,U=S.count;for(let H=L,W=L+U;H<W;H+=3)I(e.getX(H+0)),I(e.getX(H+1)),I(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,u=new D,d=new D;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let f=0;f<u;f++)h[g++]=l[p++]}return new fn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new En,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $l=new tt,Ji=new rr,ho=new li,Xl=new D,fo=new D,po=new D,mo=new D,wa=new D,go=new D,Yl=new D,_o=new D;class wt extends Pt{constructor(e=new En,t=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){go.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(wa.fromBufferAttribute(d,e),o?go.addScaledVector(wa,u):go.addScaledVector(wa.sub(t),u))}t.add(go)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(r),Ji.copy(e.ray).recast(e.near),!(ho.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(ho,Xl)===null||Ji.origin.distanceToSquared(Xl)>(e.far-e.near)**2))&&($l.copy(r).invert(),Ji.copy(e.ray).applyMatrix4($l),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,w=T;x<w;x+=3){const C=a.getX(x),I=a.getX(x+1),A=a.getX(x+2);s=vo(this,f,e,n,l,u,d,C,I,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);s=vo(this,o,e,n,l,u,d,M,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,w=T;x<w;x+=3){const C=x,I=x+1,A=x+2;s=vo(this,f,e,n,l,u,d,C,I,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,T=m+1,x=m+2;s=vo(this,o,e,n,l,u,d,M,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function lp(i,e,t,n,s,r,o,a){let c;if(e.side===Sn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ai,a),c===null)return null;_o.copy(a),_o.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(_o);return l<t.near||l>t.far?null:{distance:l,point:_o.clone(),object:i}}function vo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,fo),i.getVertexPosition(c,po),i.getVertexPosition(l,mo);const u=lp(i,e,t,n,fo,po,mo,Yl);if(u){const d=new D;$n.getBarycoord(Yl,fo,po,mo,d),s&&(u.uv=$n.getInterpolatedAttribute(s,a,c,l,d,new ct)),r&&(u.uv1=$n.getInterpolatedAttribute(r,a,c,l,d,new ct)),o&&(u.normal=$n.getInterpolatedAttribute(o,a,c,l,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new D,materialIndex:0};$n.getNormal(fo,po,mo,h.normal),u.face=h,u.barycoord=d}return u}class At extends En{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(d,2));function g(_,m,f,M,T,x,w,C,I,A,y){const S=x/I,L=w/A,U=x/2,H=w/2,W=C/2,V=I+1,Y=A+1;let J=0,k=0;const le=new D;for(let de=0;de<Y;de++){const Ae=de*L-H;for(let He=0;He<V;He++){const te=He*S-U;le[_]=te*M,le[m]=Ae*T,le[f]=W,l.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[f]=C>0?1:-1,u.push(le.x,le.y,le.z),d.push(He/I),d.push(1-de/A),J+=1}}for(let de=0;de<A;de++)for(let Ae=0;Ae<I;Ae++){const He=h+Ae+V*de,te=h+Ae+V*(de+1),Xe=h+(Ae+1)+V*(de+1),Oe=h+(Ae+1)+V*de;c.push(He,te,Oe),c.push(te,Xe,Oe),k+=6}a.addGroup(p,k,y),p+=k,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function ln(i){const e={};for(let t=0;t<i.length;t++){const n=Js(i[t]);for(const s in n)e[s]=n[s]}return e}function up(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Od(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const dp={clone:Js,merge:ln};var hp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wi extends ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=up(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Fd extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new D,Kl=new ct,jl=new ct;class un extends Fd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,Kl,jl),t.subVectors(jl,Kl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ps=-90,Ds=1;class pp extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(Ps,Ds,e,t);s.layers=this.layers,this.add(s);const r=new un(Ps,Ds,e,t);r.layers=this.layers,this.add(r);const o=new un(Ps,Ds,e,t);o.layers=this.layers,this.add(o);const a=new un(Ps,Ds,e,t);a.layers=this.layers,this.add(a);const c=new un(Ps,Ds,e,t);c.layers=this.layers,this.add(c);const l=new un(Ps,Ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ko)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Bd extends kt{constructor(e=[],t=Ks,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mp extends hs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Bd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new At(5,5,5),r=new Wi({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:Hi});r.uniforms.tEquirect.value=t;const o=new wt(s,r),a=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Cn),new pp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class On extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gp={type:"move"};class Ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new On;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class rl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new $e(e),this.near=t,this.far=n}clone(){return new rl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class _p extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pc,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const cn=new D;class ol{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ol(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Zl=new D,Jl=new _t,Ql=new _t,Sp=new D,eu=new tt,So=new D,Ca=new li,tu=new tt,Ia=new rr;class xp extends wt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Il,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingBox.expandByPoint(So)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new li),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingSphere.expandByPoint(So)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ca.copy(this.boundingSphere),Ca.applyMatrix4(s),e.ray.intersectsSphere(Ca)!==!1&&(tu.copy(s).invert(),Ia.copy(e.ray).applyMatrix4(tu),!(this.boundingBox!==null&&Ia.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ia)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new _t,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Il?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ff?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Jl.fromBufferAttribute(s.attributes.skinIndex,e),Ql.fromBufferAttribute(s.attributes.skinWeight,e),Zl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Ql.getComponent(r);if(o!==0){const a=Jl.getComponent(r);eu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Sp.copy(Zl).applyMatrix4(eu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class kd extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Hd extends kt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=hn,u=hn,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nu=new tt,yp=new tt;class al{constructor(e=[],t=[]){this.uuid=Kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:yp;nu.multiplyMatrices(a,t[r]),nu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new al(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Hd(t,e,e,Un,Yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new kd),this.bones.push(o),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Dc extends fn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ns=new tt,iu=new tt,xo=[],su=new yn,Ep=new tt,xr=new wt,yr=new li;class Mp extends wt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ep)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ns),su.copy(e.boundingBox).applyMatrix4(Ns),this.boundingBox.union(su)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ns),yr.copy(e.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yr.copy(this.boundingSphere),yr.applyMatrix4(n),e.ray.intersectsSphere(yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ns),iu.multiplyMatrices(n,Ns),xr.matrixWorld=iu,xr.raycast(e,xo);for(let o=0,a=xo.length;o<a;o++){const c=xo[o];c.instanceId=r,c.object=this,t.push(c)}xo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hd(new Float32Array(s*this.count),s,this.count,Zc,Yn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const La=new D,Tp=new D,bp=new Je;class ss{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=La.subVectors(n,t).cross(Tp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(La),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bp.getNormalMatrix(e),s=this.coplanarPoint(La).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new li,Ap=new ct(.5,.5),yo=new D;class cl{constructor(e=new ss,t=new ss,n=new ss,s=new ss,r=new ss,o=new ss){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],M=r[12],T=r[13],x=r[14],w=r[15];if(s[0].setComponents(l-o,p-u,f-g,w-M).normalize(),s[1].setComponents(l+o,p+u,f+g,w+M).normalize(),s[2].setComponents(l+a,p+d,f+_,w+T).normalize(),s[3].setComponents(l-a,p-d,f-_,w-T).normalize(),n)s[4].setComponents(c,h,m,x).normalize(),s[5].setComponents(l-c,p-h,f-m,w-x).normalize();else if(s[4].setComponents(l-c,p-h,f-m,w-x).normalize(),t===ni)s[5].setComponents(l+c,p+h,f+m,w+x).normalize();else if(t===Ko)s[5].setComponents(c,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){Qi.center.set(0,0,0);const t=Ap.distanceTo(e.center);return Qi.radius=.7071067811865476+t,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(yo.x=s.normal.x>0?e.max.x:e.min.x,yo.y=s.normal.y>0?e.max.y:e.min.y,yo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(yo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ll extends ii{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const jo=new D,Zo=new D,ru=new tt,Er=new rr,Eo=new li,Pa=new D,ou=new D;class ta extends Pt{constructor(e=new En,t=new ll){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)jo.fromBufferAttribute(t,s-1),Zo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=jo.distanceTo(Zo);e.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(s),Eo.radius+=r,e.ray.intersectsSphere(Eo)===!1)return;ru.copy(s).invert(),Er.copy(e.ray).applyMatrix4(ru);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=u.getX(_),M=u.getX(_+1),T=Mo(this,e,Er,c,f,M,_);T&&t.push(T)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),f=Mo(this,e,Er,c,_,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=Mo(this,e,Er,c,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Mo(this,e,Er,c,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Mo(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(jo.fromBufferAttribute(a,s),Zo.fromBufferAttribute(a,r),t.distanceSqToSegment(jo,Zo,Pa,ou)>n)return;Pa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Pa);if(!(l<e.near||l>e.far))return{distance:l,point:ou.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const au=new D,cu=new D;class wp extends ta{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)au.fromBufferAttribute(t,s),cu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+au.distanceTo(cu);e.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rp extends ta{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class zd extends ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const lu=new tt,Nc=new rr,To=new li,bo=new D;class Cp extends Pt{constructor(e=new En,t=new zd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(s),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;lu.copy(s).invert(),Nc.copy(e.ray).applyMatrix4(lu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=h,_=p;g<_;g++){const m=l.getX(g);bo.fromBufferAttribute(d,m),uu(bo,m,c,s,e,t,this)}}else{const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=h,_=p;g<_;g++)bo.fromBufferAttribute(d,g),uu(bo,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function uu(i,e,t,n,s,r,o){const a=Nc.distanceSqToPoint(i);if(a<t){const c=new D;Nc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Ip extends kt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vd extends kt{constructor(e,t,n=ds,s,r,o,a=hn,c=hn,l,u=Hr,d=1){if(u!==Hr&&u!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new il(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gd extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Jo extends En{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=t/2,d=Math.PI/2*e,h=t,p=2*d+h,g=n*2+r,_=s+1,m=new D,f=new D;for(let M=0;M<=g;M++){let T=0,x=0,w=0,C=0;if(M<=n){const y=M/n,S=y*Math.PI/2;x=-u-e*Math.cos(S),w=e*Math.sin(S),C=-e*Math.cos(S),T=y*d}else if(M<=n+r){const y=(M-n)/r;x=-u+y*t,w=e,C=0,T=d+y*h}else{const y=(M-n-r)/n,S=y*Math.PI/2;x=u+e*Math.sin(S),w=e*Math.cos(S),C=e*Math.sin(S),T=d+h+y*d}const I=Math.max(0,Math.min(1,T/p));let A=0;M===0?A=.5/s:M===g&&(A=-.5/s);for(let y=0;y<=s;y++){const S=y/s,L=S*Math.PI*2,U=Math.sin(L),H=Math.cos(L);f.x=-w*H,f.y=x,f.z=w*U,a.push(f.x,f.y,f.z),m.set(-w*H,C,w*U),m.normalize(),c.push(m.x,m.y,m.z),l.push(S+A,I)}if(M>0){const y=(M-1)*_;for(let S=0;S<s;S++){const L=y+S,U=y+S+1,H=M*_+S,W=M*_+S+1;o.push(L,U,H),o.push(U,W,H)}}}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class xi extends En{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],p=[];let g=0;const _=[],m=n/2;let f=0;M(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new $t(d,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(p,2));function M(){const x=new D,w=new D;let C=0;const I=(t-e)/n;for(let A=0;A<=r;A++){const y=[],S=A/r,L=S*(t-e)+e;for(let U=0;U<=s;U++){const H=U/s,W=H*c+a,V=Math.sin(W),Y=Math.cos(W);w.x=L*V,w.y=-S*n+m,w.z=L*Y,d.push(w.x,w.y,w.z),x.set(V,I,Y).normalize(),h.push(x.x,x.y,x.z),p.push(H,1-S),y.push(g++)}_.push(y)}for(let A=0;A<s;A++)for(let y=0;y<r;y++){const S=_[y][A],L=_[y+1][A],U=_[y+1][A+1],H=_[y][A+1];(e>0||y!==0)&&(u.push(S,L,H),C+=3),(t>0||y!==r-1)&&(u.push(L,U,H),C+=3)}l.addGroup(f,C,0),f+=C}function T(x){const w=g,C=new ct,I=new D;let A=0;const y=x===!0?e:t,S=x===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*S,0),h.push(0,S,0),p.push(.5,.5),g++;const L=g;for(let U=0;U<=s;U++){const W=U/s*c+a,V=Math.cos(W),Y=Math.sin(W);I.x=y*Y,I.y=m*S,I.z=y*V,d.push(I.x,I.y,I.z),h.push(0,S,0),C.x=V*.5+.5,C.y=Y*.5*S+.5,p.push(C.x,C.y),g++}for(let U=0;U<s;U++){const H=w+U,W=L+U;x===!0?u.push(W,W+1,H):u.push(W+1,W,H),A+=3}l.addGroup(f,A,x===!0?1:2),f+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jr extends En{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=e/a,h=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const M=f*h-o;for(let T=0;T<l;T++){const x=T*d-r;g.push(x,-M,0),_.push(0,0,1),m.push(T/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<a;M++){const T=M+l*f,x=M+l*(f+1),w=M+1+l*(f+1),C=M+1+l*f;p.push(T,x,C),p.push(x,w,C)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(_,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ur extends En{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new D,h=new D,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const M=[],T=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&c===Math.PI&&(x=-.5/t);for(let w=0;w<=t;w++){const C=w/t;d.x=-e*Math.cos(s+C*r)*Math.sin(o+T*a),d.y=e*Math.cos(o+T*a),d.z=e*Math.sin(s+C*r)*Math.sin(o+T*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(C+x,1-T),M.push(l++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const T=u[f][M+1],x=u[f][M],w=u[f+1][M],C=u[f+1][M+1];(f!==0||o>0)&&p.push(T,x,C),(f!==n-1||c<Math.PI)&&p.push(x,w,C)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(_,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class si extends ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cd,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ui extends si{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Lp extends ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pp extends ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ao(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Dp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Np(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function du(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Wd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Qr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Up extends Qr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ks,endingEnd:ks}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Hs:r=e,a=2*t-n;break;case Xo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Hs:o=e,c=2*n-t;break;case Xo:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-h*m+2*h*_-h*g,M=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,T=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let w=0;w!==a;++w)r[w]=f*o[u+w]+M*o[l+w]+T*o[c+w]+x*o[d+w];return r}}class qd extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}}class Op extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Op(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Up(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Vr:t=this.InterpolantFactoryMethodDiscrete;break;case Gr:t=this.InterpolantFactoryMethodLinear;break;case aa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vr;case this.InterpolantFactoryMethodLinear:return Gr;case this.InterpolantFactoryMethodSmooth:return aa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Dp(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===aa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{const d=a*n,h=d-n,p=d+n;for(let g=0;g!==n;++g){const _=t[d+g];if(_!==t[h+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Zn.prototype.ValueTypeName="";Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=Gr;class or extends Zn{constructor(e,t,n){super(e,t,n)}}or.prototype.ValueTypeName="bool";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=Vr;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;class $d extends Zn{constructor(e,t,n,s){super(e,t,n,s)}}$d.prototype.ValueTypeName="color";class Qs extends Zn{constructor(e,t,n,s){super(e,t,n,s)}}Qs.prototype.ValueTypeName="number";class Fp extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let u=l+a;l!==u;l+=4)jn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class er extends Zn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Fp(this.times,this.values,this.getValueSize(),e)}}er.prototype.ValueTypeName="quaternion";er.prototype.InterpolantFactoryMethodSmooth=void 0;class ar extends Zn{constructor(e,t,n){super(e,t,n)}}ar.prototype.ValueTypeName="string";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=Vr;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class tr extends Zn{constructor(e,t,n,s){super(e,t,n,s)}}tr.prototype.ValueTypeName="vector";class Uc{constructor(e="",t=-1,n=[],s=tl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(kp(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Zn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=Np(c);c=du(c,1,u),l=du(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Qs(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(r);if(u&&u.length>1){const d=u[1];let h=s[d];h||(s[d]=h=[]),h.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,p,g,_){if(p.length!==0){const m=[],f=[];Wd(p,m,f,g),m.length!==0&&_.push(new d(h,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let d=0;d<l.length;d++){const h=l[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const p={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)p[h[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let M=0;M!==h[g].morphTargets.length;++M){const T=h[g];m.push(T.time),f.push(T.morphTarget===_?1:0)}s.push(new Qs(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{const p=".bones["+t[d].name+"]";n(tr,p+".position",h,"pos",s),n(er,p+".quaternion",h,"rot",s),n(tr,p+".scale",h,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Bp(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qs;case"vector":case"vector2":case"vector3":case"vector4":return tr;case"color":return $d;case"quaternion":return er;case"bool":case"boolean":return or;case"string":return ar}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function kp(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Bp(i.type);if(i.times===void 0){const t=[],n=[];Wd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ti={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Hp{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const zp=new Hp;class cr{constructor(e){this.manager=e!==void 0?e:zp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi={};class Vp extends Error{constructor(e,t){super(e),this.response=t}}class Xd extends cr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ti.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:s});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=vi[e],d=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=h?parseInt(h):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){M();function M(){d.read().then(({done:T,value:x})=>{if(T)f.close();else{_+=x.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let C=0,I=u.length;C<I;C++){const A=u[C];A.onProgress&&A.onProgress(w)}f.enqueue(x),M()}},T=>{f.error(T)})}}});return new Response(m)}else throw new Vp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(h);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Ti.add(`file:${e}`,l);const u=vi[e];delete vi[e];for(let d=0,h=u.length;d<h;d++){const p=u[d];p.onLoad&&p.onLoad(l)}}).catch(l=>{const u=vi[e];if(u===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let d=0,h=u.length;d<h;d++){const p=u[d];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Us=new WeakMap;class Gp extends cr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ti.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Us.get(o);d===void 0&&(d=[],Us.set(o,d)),d.push({onLoad:t,onError:s})}return o}const a=Wr("img");function c(){u(),t&&t(this);const d=Us.get(this)||[];for(let h=0;h<d.length;h++){const p=d[h];p.onLoad&&p.onLoad(this)}Us.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),Ti.remove(`image:${e}`);const h=Us.get(this)||[];for(let p=0;p<h.length;p++){const g=h[p];g.onError&&g.onError(d)}Us.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ti.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class Yd extends cr{constructor(e){super(e)}load(e,t,n,s){const r=new kt,o=new Gp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class na extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Wp extends na{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Da=new tt,hu=new D,fu=new D;class ul{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cl,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;hu.setFromMatrixPosition(e.matrixWorld),t.position.copy(hu),fu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fu),t.updateMatrixWorld(),Da.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qp extends ul{constructor(){super(new un(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Zs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class $p extends na{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new qp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const pu=new tt,Mr=new D,Na=new D;class Xp extends ul{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new _t(2,1,1,1),new _t(0,1,1,1),new _t(3,1,1,1),new _t(1,1,1,1),new _t(3,0,1,1),new _t(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Mr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Mr),Na.copy(n.position),Na.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Na),n.updateMatrixWorld(),s.makeTranslation(-Mr.x,-Mr.y,-Mr.z),pu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pu,n.coordinateSystem,n.reversedDepth)}}class dl extends na{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Xp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class hl extends Fd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yp extends ul{constructor(){super(new hl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kd extends na{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Yp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Or{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ua=new WeakMap;class Kp extends cr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ti.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{if(Ua.has(o)===!0)s&&s(Ua.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ti.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ua.set(c,l),Ti.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ti.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class jp extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Zp{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){jn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const o=this._workIndex*r;jn.multiplyQuaternionsFlat(e,o,e,t,e,n),jn.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){const o=1-s;for(let a=0;a!==r;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*s}}}const fl="\\[\\]\\.:\\/",Jp=new RegExp("["+fl+"]","g"),pl="[^"+fl+"]",Qp="[^"+fl.replace("\\.","")+"]",em=/((?:WC+[\/:])*)/.source.replace("WC",pl),tm=/(WCOD+)?/.source.replace("WCOD",Qp),nm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pl),im=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pl),sm=new RegExp("^"+em+tm+nm+im+"$"),rm=["material","materials","bones","map"];class om{constructor(e,t,n){const s=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class St{constructor(e,t,n){this.path=t,this.parsedPath=n||St.parseTrackName(t),this.node=St.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new St.Composite(e,t,n):new St(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Jp,"")}static parseTrackName(e){const t=sm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);rm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=St.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}St.Composite=om;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class am{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,o=r.length,a=new Array(o),c={endingStart:ks,endingEnd:ks};for(let l=0;l!==o;++l){const u=r[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=mf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case _f:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case tl:default:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(o),l[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const o=n===gf;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===pf){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){const a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=Hs,s.endingEnd=Hs):(e?s.endingStart=this.zeroSlopeAtStart?Hs:ks:s.endingStart=Xo,t?s.endingEnd=this.zeroSlopeAtEnd?Hs:ks:s.endingEnd=Xo)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}}const cm=new Float32Array(1);class lm extends ps{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let d=0;d!==r;++d){const h=s[d],p=h.name;let g=u[p];if(g!==void 0)++g.referenceCount,o[d]=g;else{if(g=o[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}const _=t&&t._propertyBindings[d].binding.parsedPath;g=new Zp(St.create(n,p,_),h.ValueTypeName,h.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[d]=g}a[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new qd(new Float32Array(2),new Float32Array(2),1,cm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let o=typeof e=="string"?Uc.findByName(s,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=tl),c!==void 0){const d=c.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new am(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,r),u}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Uc.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const mu=new tt;class um{constructor(e,t,n=0,s=1/0){this.ray=new rr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mu),this}intersectObject(e,t=!0,n=[]){return Oc(e,this,n,t),n.sort(gu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Oc(e[s],this,n,t);return n.sort(gu),n}}function gu(i,e){return i.distance-e.distance}function Oc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Oc(r[o],e,t,!0)}}function _u(i,e,t,n){const s=dm(n);switch(t){case bd:return i*e;case Zc:return i*e/s.components*s.byteLength;case Jc:return i*e/s.components*s.byteLength;case wd:return i*e*2/s.components*s.byteLength;case Qc:return i*e*2/s.components*s.byteLength;case Ad:return i*e*3/s.components*s.byteLength;case Un:return i*e*4/s.components*s.byteLength;case el:return i*e*4/s.components*s.byteLength;case Fo:case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ko:case Ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:case oc:return Math.max(i,16)*Math.max(e,8)/4;case ic:case rc:return Math.max(i,8)*Math.max(e,8)/2;case ac:case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _c:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Tc:case bc:case Ac:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wc:case Rc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Cc:case Ic:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dm(i){switch(i){case ai:case yd:return{byteLength:1,components:1};case Br:case Ed:case Zr:return{byteLength:2,components:1};case Kc:case jc:return{byteLength:2,components:4};case ds:case Yc:case Yn:return{byteLength:4,components:1};case Md:case Td:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function hm(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ym=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Am=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Om=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ng=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,og=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ug=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Eg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ag=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ig=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ug=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$g=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,e_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,s_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,r_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,c_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const h_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,f_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,__=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,S_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,M_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,b_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,L_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,N_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,W_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:fm,alphahash_pars_fragment:pm,alphamap_fragment:mm,alphamap_pars_fragment:gm,alphatest_fragment:_m,alphatest_pars_fragment:vm,aomap_fragment:Sm,aomap_pars_fragment:xm,batching_pars_vertex:ym,batching_vertex:Em,begin_vertex:Mm,beginnormal_vertex:Tm,bsdfs:bm,iridescence_fragment:Am,bumpmap_pars_fragment:wm,clipping_planes_fragment:Rm,clipping_planes_pars_fragment:Cm,clipping_planes_pars_vertex:Im,clipping_planes_vertex:Lm,color_fragment:Pm,color_pars_fragment:Dm,color_pars_vertex:Nm,color_vertex:Um,common:Om,cube_uv_reflection_fragment:Fm,defaultnormal_vertex:Bm,displacementmap_pars_vertex:km,displacementmap_vertex:Hm,emissivemap_fragment:zm,emissivemap_pars_fragment:Vm,colorspace_fragment:Gm,colorspace_pars_fragment:Wm,envmap_fragment:qm,envmap_common_pars_fragment:$m,envmap_pars_fragment:Xm,envmap_pars_vertex:Ym,envmap_physical_pars_fragment:rg,envmap_vertex:Km,fog_vertex:jm,fog_pars_vertex:Zm,fog_fragment:Jm,fog_pars_fragment:Qm,gradientmap_pars_fragment:eg,lightmap_pars_fragment:tg,lights_lambert_fragment:ng,lights_lambert_pars_fragment:ig,lights_pars_begin:sg,lights_toon_fragment:og,lights_toon_pars_fragment:ag,lights_phong_fragment:cg,lights_phong_pars_fragment:lg,lights_physical_fragment:ug,lights_physical_pars_fragment:dg,lights_fragment_begin:hg,lights_fragment_maps:fg,lights_fragment_end:pg,logdepthbuf_fragment:mg,logdepthbuf_pars_fragment:gg,logdepthbuf_pars_vertex:_g,logdepthbuf_vertex:vg,map_fragment:Sg,map_pars_fragment:xg,map_particle_fragment:yg,map_particle_pars_fragment:Eg,metalnessmap_fragment:Mg,metalnessmap_pars_fragment:Tg,morphinstance_vertex:bg,morphcolor_vertex:Ag,morphnormal_vertex:wg,morphtarget_pars_vertex:Rg,morphtarget_vertex:Cg,normal_fragment_begin:Ig,normal_fragment_maps:Lg,normal_pars_fragment:Pg,normal_pars_vertex:Dg,normal_vertex:Ng,normalmap_pars_fragment:Ug,clearcoat_normal_fragment_begin:Og,clearcoat_normal_fragment_maps:Fg,clearcoat_pars_fragment:Bg,iridescence_pars_fragment:kg,opaque_fragment:Hg,packing:zg,premultiplied_alpha_fragment:Vg,project_vertex:Gg,dithering_fragment:Wg,dithering_pars_fragment:qg,roughnessmap_fragment:$g,roughnessmap_pars_fragment:Xg,shadowmap_pars_fragment:Yg,shadowmap_pars_vertex:Kg,shadowmap_vertex:jg,shadowmask_pars_fragment:Zg,skinbase_vertex:Jg,skinning_pars_vertex:Qg,skinning_vertex:e_,skinnormal_vertex:t_,specularmap_fragment:n_,specularmap_pars_fragment:i_,tonemapping_fragment:s_,tonemapping_pars_fragment:r_,transmission_fragment:o_,transmission_pars_fragment:a_,uv_pars_fragment:c_,uv_pars_vertex:l_,uv_vertex:u_,worldpos_vertex:d_,background_vert:h_,background_frag:f_,backgroundCube_vert:p_,backgroundCube_frag:m_,cube_vert:g_,cube_frag:__,depth_vert:v_,depth_frag:S_,distanceRGBA_vert:x_,distanceRGBA_frag:y_,equirect_vert:E_,equirect_frag:M_,linedashed_vert:T_,linedashed_frag:b_,meshbasic_vert:A_,meshbasic_frag:w_,meshlambert_vert:R_,meshlambert_frag:C_,meshmatcap_vert:I_,meshmatcap_frag:L_,meshnormal_vert:P_,meshnormal_frag:D_,meshphong_vert:N_,meshphong_frag:U_,meshphysical_vert:O_,meshphysical_frag:F_,meshtoon_vert:B_,meshtoon_frag:k_,points_vert:H_,points_frag:z_,shadow_vert:V_,shadow_frag:G_,sprite_vert:W_,sprite_frag:q_},pe={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},ti={basic:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new $e(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:ln([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:ln([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new $e(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:ln([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:ln([pe.points,pe.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:ln([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:ln([pe.common,pe.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:ln([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:ln([pe.sprite,pe.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:ln([pe.common,pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:ln([pe.lights,pe.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};ti.physical={uniforms:ln([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const wo={r:0,b:0,g:0},es=new ci,$_=new tt;function X_(i,e,t,n,s,r,o){const a=new $e(0);let c=r===!0?0:1,l,u,d=null,h=0,p=null;function g(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function _(T){let x=!1;const w=g(T);w===null?f(a,c):w&&w.isColor&&(f(w,1),x=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===ea)?(u===void 0&&(u=new wt(new At(1,1,1),new Wi({name:"BackgroundCubeMaterial",uniforms:Js(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,I,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),es.copy(x.backgroundRotation),es.x*=-1,es.y*=-1,es.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4($_.makeRotationFromEuler(es)),u.material.toneMapped=dt.getTransfer(w.colorSpace)!==Tt,(d!==w||h!==w.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=w,h=w.version,p=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new wt(new Jr(2,2),new Wi({name:"BackgroundMaterial",uniforms:Js(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=dt.getTransfer(w.colorSpace)!==Tt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||h!==w.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=w,h=w.version,p=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function f(T,x){T.getRGB(wo,Od(i)),n.buffers.color.setClear(wo.r,wo.g,wo.b,x,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),c=x,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,f(a,c)},render:_,addToRenderList:m,dispose:M}}function Y_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,o=!1;function a(S,L,U,H,W){let V=!1;const Y=d(H,U,L);r!==Y&&(r=Y,l(r.object)),V=p(S,H,U,W),V&&g(S,H,U,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,x(S,L,U,H),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function d(S,L,U){const H=U.wireframe===!0;let W=n[S.id];W===void 0&&(W={},n[S.id]=W);let V=W[L.id];V===void 0&&(V={},W[L.id]=V);let Y=V[H];return Y===void 0&&(Y=h(c()),V[H]=Y),Y}function h(S){const L=[],U=[],H=[];for(let W=0;W<t;W++)L[W]=0,U[W]=0,H[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:H,object:S,attributes:{},index:null}}function p(S,L,U,H){const W=r.attributes,V=L.attributes;let Y=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){const de=W[k];let Ae=V[k];if(Ae===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(Ae=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(Ae=S.instanceColor)),de===void 0||de.attribute!==Ae||Ae&&de.data!==Ae.data)return!0;Y++}return r.attributesNum!==Y||r.index!==H}function g(S,L,U,H){const W={},V=L.attributes;let Y=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){let de=V[k];de===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(de=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(de=S.instanceColor));const Ae={};Ae.attribute=de,de&&de.data&&(Ae.data=de.data),W[k]=Ae,Y++}r.attributes=W,r.attributesNum=Y,r.index=H}function _(){const S=r.newAttributes;for(let L=0,U=S.length;L<U;L++)S[L]=0}function m(S){f(S,0)}function f(S,L){const U=r.newAttributes,H=r.enabledAttributes,W=r.attributeDivisors;U[S]=1,H[S]===0&&(i.enableVertexAttribArray(S),H[S]=1),W[S]!==L&&(i.vertexAttribDivisor(S,L),W[S]=L)}function M(){const S=r.newAttributes,L=r.enabledAttributes;for(let U=0,H=L.length;U<H;U++)L[U]!==S[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function T(S,L,U,H,W,V,Y){Y===!0?i.vertexAttribIPointer(S,L,U,W,V):i.vertexAttribPointer(S,L,U,H,W,V)}function x(S,L,U,H){_();const W=H.attributes,V=U.getAttributes(),Y=L.defaultAttributeValues;for(const J in V){const k=V[J];if(k.location>=0){let le=W[J];if(le===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const de=le.normalized,Ae=le.itemSize,He=e.get(le);if(He===void 0)continue;const te=He.buffer,Xe=He.type,Oe=He.bytesPerElement,X=Xe===i.INT||Xe===i.UNSIGNED_INT||le.gpuType===Yc;if(le.isInterleavedBufferAttribute){const Q=le.data,ye=Q.stride,ze=le.offset;if(Q.isInstancedInterleavedBuffer){for(let ge=0;ge<k.locationSize;ge++)f(k.location+ge,Q.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ge=0;ge<k.locationSize;ge++)m(k.location+ge);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ge=0;ge<k.locationSize;ge++)T(k.location+ge,Ae/k.locationSize,Xe,de,ye*Oe,(ze+Ae/k.locationSize*ge)*Oe,X)}else{if(le.isInstancedBufferAttribute){for(let Q=0;Q<k.locationSize;Q++)f(k.location+Q,le.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Q=0;Q<k.locationSize;Q++)m(k.location+Q);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Q=0;Q<k.locationSize;Q++)T(k.location+Q,Ae/k.locationSize,Xe,de,Ae*Oe,Ae/k.locationSize*Q*Oe,X)}}else if(Y!==void 0){const de=Y[J];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(k.location,de);break;case 3:i.vertexAttrib3fv(k.location,de);break;case 4:i.vertexAttrib4fv(k.location,de);break;default:i.vertexAttrib1fv(k.location,de)}}}}M()}function w(){A();for(const S in n){const L=n[S];for(const U in L){const H=L[U];for(const W in H)u(H[W].object),delete H[W];delete L[U]}delete n[S]}}function C(S){if(n[S.id]===void 0)return;const L=n[S.id];for(const U in L){const H=L[U];for(const W in H)u(H[W].object),delete H[W];delete L[U]}delete n[S.id]}function I(S){for(const L in n){const U=n[L];if(U[S.id]===void 0)continue;const H=U[S.id];for(const W in H)u(H[W].object),delete H[W];delete U[S.id]}}function A(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function K_(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,n,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function j_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==Un&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const A=I===Zr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==ai&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Yn&&!A)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:w,maxSamples:C}}function Z_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ss,a=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,T=M*4;let x=f.clippingState||null;c.value=x,x=u(g,h,T,p);for(let w=0;w!==T;++w)x[w]=t[w];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==_;++T,x+=4)o.copy(d[T]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function J_(i){let e=new WeakMap;function t(o,a){return a===tc?o.mapping=Ks:a===nc&&(o.mapping=js),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===tc||a===nc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new mp(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const zs=4,vu=[.125,.215,.35,.446,.526,.582],as=20,Oa=new hl,Su=new $e;let Fa=null,Ba=0,ka=0,Ha=!1;const rs=(1+Math.sqrt(5))/2,Os=1/rs,xu=[new D(-rs,Os,0),new D(rs,Os,0),new D(-Os,0,rs),new D(Os,0,rs),new D(0,rs,-Os),new D(0,rs,Os),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Q_=new D;class yu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=Q_}=r;Fa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fa,Ba,ka),this._renderer.xr.enabled=Ha,e.scissorTest=!1,Ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ks||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:Zr,format:Un,colorSpace:mn,depthBuffer:!1},s=Eu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Eu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e0(r)),this._blurMaterial=t0(r,e,t)}return s}_compileMaterial(e){const t=new wt(this._lodPlanes[0],e);this._renderer.compile(t,Oa)}_sceneToCubeUV(e,t,n,s,r){const c=new un(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Su),d.toneMapping=zi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new Rn({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1}),m=new wt(new At,_);let f=!1;const M=e.background;M?M.isColor&&(_.color.copy(M),e.background=null,f=!0):(_.color.copy(Su),f=!0);for(let T=0;T<6;T++){const x=T%3;x===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):x===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const w=this._cubeSize;Ro(s,x*w,T>2?w:0,w,w),d.setRenderTarget(s),f&&d.render(m,c),d.render(e,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ks||e.mapping===js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new wt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ro(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Oa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=xu[(s-r-1)%xu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new wt(this._lodPlanes[s],l),h=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*as-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):as;m>as&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${as}`);const f=[];let M=0;for(let I=0;I<as;++I){const A=I/_,y=Math.exp(-A*A/2);f.push(y),I===0?M+=y:I<m&&(M+=2*y)}for(let I=0;I<f.length;I++)f[I]=f[I]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-n;const x=this._sizeLods[s],w=3*x*(s>T-zs?s-T+zs:0),C=4*(this._cubeSize-x);Ro(t,w,C,3*x,2*x),c.setRenderTarget(t),c.render(d,Oa)}}function e0(i){const e=[],t=[],n=[];let s=i;const r=i-zs+1+vu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-zs?c=vu[o-i+zs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),T=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let C=0;C<p;C++){const I=C%3*2/3-1,A=C>2?0:-1,y=[I,A,0,I+2/3,A,0,I+2/3,A+1,0,I,A,0,I+2/3,A+1,0,I,A+1,0];M.set(y,_*g*C),T.set(h,m*g*C);const S=[C,C,C,C,C,C];x.set(S,f*g*C)}const w=new En;w.setAttribute("position",new fn(M,_)),w.setAttribute("uv",new fn(T,m)),w.setAttribute("faceIndex",new fn(x,f)),e.push(w),s>zs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Eu(i,e,t){const n=new hs(i,e,t);return n.texture.mapping=ea,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ro(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function t0(i,e,t){const n=new Float32Array(as),s=new D(0,1,0);return new Wi({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Mu(){return new Wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Tu(){return new Wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function ml(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function n0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===tc||c===nc,u=c===Ks||c===js;if(l||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new yu(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new yu(i)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function i0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&qr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function s0(i,e,t,n){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let T=0,x=M.length;T<x;T+=3){const w=M[T+0],C=M[T+1],I=M[T+2];h.push(w,C,C,I,I,w)}}else if(g!==void 0){const M=g.array;_=g.version;for(let T=0,x=M.length/3-1;T<x;T+=3){const w=T+0,C=T+1,I=T+2;h.push(w,C,C,I,I,w)}}else return;const m=new(Ld(h)?Ud:Nd)(h,1);m.version=_;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function u(d){const h=r.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function r0(i,e,t){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,p){i.drawElements(n,p,r,h*o),t.update(p,n,1)}function l(h,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,h*o,g),t.update(p,n,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function d(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,h,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*_[M];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function o0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function a0(i,e,t){const n=new WeakMap,s=new _t;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var p=S;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let w=a.attributes.position.count*x,C=1;w>e.maxTextureSize&&(C=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const I=new Float32Array(w*C*4*d),A=new Pd(I,w,C,d);A.type=Yn,A.needsUpdate=!0;const y=x*4;for(let L=0;L<d;L++){const U=f[L],H=M[L],W=T[L],V=w*C*4*L;for(let Y=0;Y<U.count;Y++){const J=Y*y;g===!0&&(s.fromBufferAttribute(U,Y),I[V+J+0]=s.x,I[V+J+1]=s.y,I[V+J+2]=s.z,I[V+J+3]=0),_===!0&&(s.fromBufferAttribute(H,Y),I[V+J+4]=s.x,I[V+J+5]=s.y,I[V+J+6]=s.z,I[V+J+7]=0),m===!0&&(s.fromBufferAttribute(W,Y),I[V+J+8]=s.x,I[V+J+9]=s.y,I[V+J+10]=s.z,I[V+J+11]=W.itemSize===4?s.w:1)}}h={count:d,texture:A,size:new ct(w,C)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function c0(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const Zd=new kt,bu=new Vd(1,1),Jd=new Pd,Qd=new Jf,eh=new Bd,Au=[],wu=[],Ru=new Float32Array(16),Cu=new Float32Array(9),Iu=new Float32Array(4);function lr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Au[s];if(r===void 0&&(r=new Float32Array(s),Au[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ia(i,e){let t=wu[e];t===void 0&&(t=new Int32Array(e),wu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function l0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function u0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function d0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function h0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function f0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(zt(t,n))return;Iu.set(n),i.uniformMatrix2fv(this.addr,!1,Iu),Vt(t,n)}}function p0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(zt(t,n))return;Cu.set(n),i.uniformMatrix3fv(this.addr,!1,Cu),Vt(t,n)}}function m0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(zt(t,n))return;Ru.set(n),i.uniformMatrix4fv(this.addr,!1,Ru),Vt(t,n)}}function g0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function v0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function x0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function M0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function T0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bu.compareFunction=Id,r=bu):r=Zd,t.setTexture2D(e||r,s)}function b0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Qd,s)}function A0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||eh,s)}function w0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Jd,s)}function R0(i){switch(i){case 5126:return l0;case 35664:return u0;case 35665:return d0;case 35666:return h0;case 35674:return f0;case 35675:return p0;case 35676:return m0;case 5124:case 35670:return g0;case 35667:case 35671:return _0;case 35668:case 35672:return v0;case 35669:case 35673:return S0;case 5125:return x0;case 36294:return y0;case 36295:return E0;case 36296:return M0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return A0;case 36289:case 36303:case 36311:case 36292:return w0}}function C0(i,e){i.uniform1fv(this.addr,e)}function I0(i,e){const t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function L0(i,e){const t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function P0(i,e){const t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function D0(i,e){const t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function N0(i,e){const t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function U0(i,e){const t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function O0(i,e){i.uniform1iv(this.addr,e)}function F0(i,e){i.uniform2iv(this.addr,e)}function B0(i,e){i.uniform3iv(this.addr,e)}function k0(i,e){i.uniform4iv(this.addr,e)}function H0(i,e){i.uniform1uiv(this.addr,e)}function z0(i,e){i.uniform2uiv(this.addr,e)}function V0(i,e){i.uniform3uiv(this.addr,e)}function G0(i,e){i.uniform4uiv(this.addr,e)}function W0(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Zd,r[o])}function q0(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Qd,r[o])}function $0(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||eh,r[o])}function X0(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Jd,r[o])}function Y0(i){switch(i){case 5126:return C0;case 35664:return I0;case 35665:return L0;case 35666:return P0;case 35674:return D0;case 35675:return N0;case 35676:return U0;case 5124:case 35670:return O0;case 35667:case 35671:return F0;case 35668:case 35672:return B0;case 35669:case 35673:return k0;case 5125:return H0;case 36294:return z0;case 36295:return V0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return W0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return X0}}class K0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=R0(t.type)}}class j0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y0(t.type)}}class Z0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Lu(i,e){i.seq.push(e),i.map[e.id]=e}function J0(i,e,t){const n=i.name,s=n.length;for(za.lastIndex=0;;){const r=za.exec(n),o=za.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Lu(t,l===void 0?new K0(a,i,e):new j0(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Z0(a),Lu(t,d)),t=d}}}class zo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);J0(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Pu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Q0=37297;let ev=0;function tv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Du=new Je;function nv(i){dt._getMatrix(Du,dt.workingColorSpace,i);const e=`mat3( ${Du.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case Yo:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Nu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+tv(i.getShaderSource(e),a)}else return r}function iv(i,e){const t=nv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function sv(i,e){let t;switch(e){case af:t="Linear";break;case cf:t="Reinhard";break;case lf:t="Cineon";break;case vd:t="ACESFilmic";break;case df:t="AgX";break;case hf:t="Neutral";break;case uf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Co=new D;function rv(){dt.getLuminanceCoefficients(Co);const i=Co.x.toFixed(4),e=Co.y.toFixed(4),t=Co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ov(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function av(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ir(i){return i!==""}function Uu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ou(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fc(i){return i.replace(lv,dv)}const uv=new Map;function dv(i,e){let t=nt[e];if(t===void 0){const n=uv.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fc(t)}const hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fu(i){return i.replace(hv,fv)}function fv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===md?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function mv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ks:case js:e="ENVMAP_TYPE_CUBE";break;case ea:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case js:e="ENVMAP_MODE_REFRACTION";break}return e}function _v(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case _d:e="ENVMAP_BLENDING_MULTIPLY";break;case rf:e="ENVMAP_BLENDING_MIX";break;case of:e="ENVMAP_BLENDING_ADD";break}return e}function vv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Sv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=pv(t),l=mv(t),u=gv(t),d=_v(t),h=vv(t),p=ov(t),g=av(r),_=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),f.length>0&&(f+=`
`)):(m=[Bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),f=[Bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zi?"#define TONE_MAPPING":"",t.toneMapping!==zi?nt.tonemapping_pars_fragment:"",t.toneMapping!==zi?sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,iv("linearToOutputTexel",t.outputColorSpace),rv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),o=Fc(o),o=Uu(o,t),o=Ou(o,t),a=Fc(a),a=Uu(a,t),a=Ou(a,t),o=Fu(o),a=Fu(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=M+m+o,x=M+f+a,w=Pu(s,s.VERTEX_SHADER,T),C=Pu(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function I(L){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_)||"",H=s.getShaderInfoLog(w)||"",W=s.getShaderInfoLog(C)||"",V=U.trim(),Y=H.trim(),J=W.trim();let k=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,C);else{const de=Nu(s,w,"vertex"),Ae=Nu(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+de+`
`+Ae)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(Y===""||J==="")&&(le=!1);le&&(L.diagnostics={runnable:k,programLog:V,vertexShader:{log:Y,prefix:m},fragmentShader:{log:J,prefix:f}})}s.deleteShader(w),s.deleteShader(C),A=new zo(s,_),y=cv(s,_)}let A;this.getUniforms=function(){return A===void 0&&I(this),A};let y;this.getAttributes=function(){return y===void 0&&I(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Q0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ev++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=C,this}let xv=0;class yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ev(e),t.set(e,n)),n}}class Ev{constructor(e){this.id=xv++,this.code=e,this.usedTimes=0}}function Mv(i,e,t,n,s,r,o){const a=new sl,c=new yv,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,S,L,U,H){const W=U.fog,V=H.geometry,Y=y.isMeshStandardMaterial?U.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||Y),k=J&&J.mapping===ea?J.image.height:null,le=g[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const de=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ae=de!==void 0?de.length:0;let He=0;V.morphAttributes.position!==void 0&&(He=1),V.morphAttributes.normal!==void 0&&(He=2),V.morphAttributes.color!==void 0&&(He=3);let te,Xe,Oe,X;if(le){const ut=ti[le];te=ut.vertexShader,Xe=ut.fragmentShader}else te=y.vertexShader,Xe=y.fragmentShader,c.update(y),Oe=c.getVertexShaderID(y),X=c.getFragmentShaderID(y);const Q=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),ze=H.isInstancedMesh===!0,ge=H.isBatchedMesh===!0,je=!!y.map,Ht=!!y.matcap,P=!!J,xt=!!y.aoMap,Pe=!!y.lightMap,Ne=!!y.bumpMap,Te=!!y.normalMap,mt=!!y.displacementMap,xe=!!y.emissiveMap,Ge=!!y.metalnessMap,bt=!!y.roughnessMap,It=y.anisotropy>0,b=y.clearcoat>0,v=y.dispersion>0,B=y.iridescence>0,Z=y.sheen>0,ee=y.transmission>0,K=It&&!!y.anisotropyMap,Re=b&&!!y.clearcoatMap,ae=b&&!!y.clearcoatNormalMap,_e=b&&!!y.clearcoatRoughnessMap,we=B&&!!y.iridescenceMap,se=B&&!!y.iridescenceThicknessMap,fe=Z&&!!y.sheenColorMap,Be=Z&&!!y.sheenRoughnessMap,Le=!!y.specularMap,ue=!!y.specularColorMap,Ye=!!y.specularIntensityMap,N=ee&&!!y.transmissionMap,re=ee&&!!y.thicknessMap,ce=!!y.gradientMap,Me=!!y.alphaMap,ne=y.alphaTest>0,j=!!y.alphaHash,be=!!y.extensions;let We=zi;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(We=i.toneMapping);const yt={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:te,fragmentShader:Xe,defines:y.defines,customVertexShaderID:Oe,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:ge,batchingColor:ge&&H._colorsTexture!==null,instancing:ze,instancingColor:ze&&H.instanceColor!==null,instancingMorph:ze&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:mn,alphaToCoverage:!!y.alphaToCoverage,map:je,matcap:Ht,envMap:P,envMapMode:P&&J.mapping,envMapCubeUVHeight:k,aoMap:xt,lightMap:Pe,bumpMap:Ne,normalMap:Te,displacementMap:h&&mt,emissiveMap:xe,normalMapObjectSpace:Te&&y.normalMapType===yf,normalMapTangentSpace:Te&&y.normalMapType===Cd,metalnessMap:Ge,roughnessMap:bt,anisotropy:It,anisotropyMap:K,clearcoat:b,clearcoatMap:Re,clearcoatNormalMap:ae,clearcoatRoughnessMap:_e,dispersion:v,iridescence:B,iridescenceMap:we,iridescenceThicknessMap:se,sheen:Z,sheenColorMap:fe,sheenRoughnessMap:Be,specularMap:Le,specularColorMap:ue,specularIntensityMap:Ye,transmission:ee,transmissionMap:N,thicknessMap:re,gradientMap:ce,opaque:y.transparent===!1&&y.blending===Gs&&y.alphaToCoverage===!1,alphaMap:Me,alphaTest:ne,alphaHash:j,combine:y.combine,mapUv:je&&_(y.map.channel),aoMapUv:xt&&_(y.aoMap.channel),lightMapUv:Pe&&_(y.lightMap.channel),bumpMapUv:Ne&&_(y.bumpMap.channel),normalMapUv:Te&&_(y.normalMap.channel),displacementMapUv:mt&&_(y.displacementMap.channel),emissiveMapUv:xe&&_(y.emissiveMap.channel),metalnessMapUv:Ge&&_(y.metalnessMap.channel),roughnessMapUv:bt&&_(y.roughnessMap.channel),anisotropyMapUv:K&&_(y.anisotropyMap.channel),clearcoatMapUv:Re&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:se&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(y.sheenRoughnessMap.channel),specularMapUv:Le&&_(y.specularMap.channel),specularColorMapUv:ue&&_(y.specularColorMap.channel),specularIntensityMapUv:Ye&&_(y.specularIntensityMap.channel),transmissionMapUv:N&&_(y.transmissionMap.channel),thicknessMapUv:re&&_(y.thicknessMap.channel),alphaMapUv:Me&&_(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Te||It),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!V.attributes.uv&&(je||Me),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:H.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:He,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:je&&y.map.isVideoTexture===!0&&dt.getTransfer(y.map.colorSpace)===Tt,decodeVideoTextureEmissive:xe&&y.emissiveMap.isVideoTexture===!0&&dt.getTransfer(y.emissiveMap.colorSpace)===Tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Wn,flipSided:y.side===Sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:be&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&y.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function f(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)S.push(L),S.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(M(S,y),T(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function M(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function T(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const S=g[y.type];let L;if(S){const U=ti[S];L=dp.clone(U.uniforms)}else L=y.uniforms;return L}function w(y,S){let L;for(let U=0,H=u.length;U<H;U++){const W=u[U];if(W.cacheKey===S){L=W,++L.usedTimes;break}}return L===void 0&&(L=new Sv(i,S,y,r),u.push(L)),L}function C(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function I(y){c.remove(y)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:w,releaseProgram:C,releaseShaderCache:I,programs:u,dispose:A}}function Tv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function bv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ku(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Hu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,h,p,g,_,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function a(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||bv),n.length>1&&n.sort(h||ku),s.length>1&&s.sort(h||ku)}function u(){for(let d=e,h=i.length;d<h;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Av(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Hu,i.set(n,[o])):s>=r.length?(o=new Hu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new $e};break;case"SpotLight":t={position:new D,direction:new D,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Rv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Cv=0;function Iv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lv(i){const e=new wv,t=Rv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new tt,o=new tt;function a(l){let u=0,d=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,T=0,x=0,w=0,C=0,I=0;l.sort(Iv);for(let y=0,S=l.length;y<S;y++){const L=l[y],U=L.color,H=L.intensity,W=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*H,d+=U.g*H,h+=U.b*H;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],H);I++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const J=L.shadow,k=t.get(L);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,n.directionalShadow[p]=k,n.directionalShadowMap[p]=V,n.directionalShadowMatrix[p]=L.shadow.matrix,M++}n.directional[p]=Y,p++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(U).multiplyScalar(H),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[_]=Y;const J=L.shadow;if(L.map&&(n.spotLightMap[w]=L.map,w++,J.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[_]=J.matrix,L.castShadow){const k=t.get(L);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=V,x++}_++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(U).multiplyScalar(H),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Y,m++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const J=L.shadow,k=t.get(L);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,k.shadowCameraNear=J.camera.near,k.shadowCameraFar=J.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=L.shadow.matrix,T++}n.point[g]=Y,g++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(H),Y.groundColor.copy(L.groundColor).multiplyScalar(H),n.hemi[f]=Y,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const A=n.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==f||A.numDirectionalShadows!==M||A.numPointShadows!==T||A.numSpotShadows!==x||A.numSpotMaps!==w||A.numLightProbes!==I)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+w-C,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,A.directionalLength=p,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=f,A.numDirectionalShadows=M,A.numPointShadows=T,A.numSpotShadows=x,A.numSpotMaps=w,A.numLightProbes=I,n.version=Cv++)}function c(l,u){let d=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const T=l[f];if(T.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(T.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function zu(i){const e=new Lv(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Pv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new zu(i),e.set(s,[a])):r>=o.length?(a=new zu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Dv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Uv(i,e,t){let n=new cl;const s=new ct,r=new ct,o=new _t,a=new Lp({depthPacking:xf}),c=new Pp,l={},u=t.maxTextureSize,d={[Ai]:Sn,[Sn]:Ai,[Wn]:Wn},h=new Wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Dv,fragmentShader:Nv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new En;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new wt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=md;let f=this.type;this.render=function(C,I,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const y=i.getRenderTarget(),S=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Hi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const H=f!==Si&&this.type===Si,W=f===Si&&this.type!==Si;for(let V=0,Y=C.length;V<Y;V++){const J=C[V],k=J.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const le=k.getFrameExtents();if(s.multiply(le),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/le.x),s.x=r.x*le.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/le.y),s.y=r.y*le.y,k.mapSize.y=r.y)),k.map===null||H===!0||W===!0){const Ae=this.type!==Si?{minFilter:hn,magFilter:hn}:{};k.map!==null&&k.map.dispose(),k.map=new hs(s.x,s.y,Ae),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const de=k.getViewportCount();for(let Ae=0;Ae<de;Ae++){const He=k.getViewport(Ae);o.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),U.viewport(o),k.updateMatrices(J,Ae),n=k.getFrustum(),x(I,A,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Si&&M(k,A),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(y,S,L)};function M(C,I){const A=e.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new hs(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(I,null,A,h,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(I,null,A,p,_,null)}function T(C,I,A,y){let S=null;const L=A.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)S=L;else if(S=A.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const U=S.uuid,H=I.uuid;let W=l[U];W===void 0&&(W={},l[U]=W);let V=W[H];V===void 0&&(V=S.clone(),W[H]=V,I.addEventListener("dispose",w)),S=V}if(S.visible=I.visible,S.wireframe=I.wireframe,y===Si?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:d[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,A.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=i.properties.get(S);U.light=A}return S}function x(C,I,A,y,S){if(C.visible===!1)return;if(C.layers.test(I.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===Si)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,C.matrixWorld);const H=e.update(C),W=C.material;if(Array.isArray(W)){const V=H.groups;for(let Y=0,J=V.length;Y<J;Y++){const k=V[Y],le=W[k.materialIndex];if(le&&le.visible){const de=T(C,le,y,S);C.onBeforeShadow(i,C,I,A,H,de,k),i.renderBufferDirect(A,null,H,de,C,k),C.onAfterShadow(i,C,I,A,H,de,k)}}}else if(W.visible){const V=T(C,W,y,S);C.onBeforeShadow(i,C,I,A,H,V,null),i.renderBufferDirect(A,null,H,V,C,null),C.onAfterShadow(i,C,I,A,H,V,null)}}const U=C.children;for(let H=0,W=U.length;H<W;H++)x(U[H],I,A,y,S)}function w(C){C.target.removeEventListener("dispose",w);for(const A in l){const y=l[A],S=C.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Ov={[Ya]:Ka,[ja]:Qa,[Za]:ec,[Ys]:Ja,[Ka]:Ya,[Qa]:ja,[ec]:Za,[Ja]:Ys};function Fv(i,e){function t(){let N=!1;const re=new _t;let ce=null;const Me=new _t(0,0,0,0);return{setMask:function(ne){ce!==ne&&!N&&(i.colorMask(ne,ne,ne,ne),ce=ne)},setLocked:function(ne){N=ne},setClear:function(ne,j,be,We,yt){yt===!0&&(ne*=We,j*=We,be*=We),re.set(ne,j,be,We),Me.equals(re)===!1&&(i.clearColor(ne,j,be,We),Me.copy(re))},reset:function(){N=!1,ce=null,Me.set(-1,0,0,0)}}}function n(){let N=!1,re=!1,ce=null,Me=null,ne=null;return{setReversed:function(j){if(re!==j){const be=e.get("EXT_clip_control");j?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=j;const We=ne;ne=null,this.setClear(We)}},getReversed:function(){return re},setTest:function(j){j?Q(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(j){ce!==j&&!N&&(i.depthMask(j),ce=j)},setFunc:function(j){if(re&&(j=Ov[j]),Me!==j){switch(j){case Ya:i.depthFunc(i.NEVER);break;case Ka:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case Ys:i.depthFunc(i.LEQUAL);break;case Za:i.depthFunc(i.EQUAL);break;case Ja:i.depthFunc(i.GEQUAL);break;case Qa:i.depthFunc(i.GREATER);break;case ec:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=j}},setLocked:function(j){N=j},setClear:function(j){ne!==j&&(re&&(j=1-j),i.clearDepth(j),ne=j)},reset:function(){N=!1,ce=null,Me=null,ne=null,re=!1}}}function s(){let N=!1,re=null,ce=null,Me=null,ne=null,j=null,be=null,We=null,yt=null;return{setTest:function(ut){N||(ut?Q(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(ut){re!==ut&&!N&&(i.stencilMask(ut),re=ut)},setFunc:function(ut,In,Mn){(ce!==ut||Me!==In||ne!==Mn)&&(i.stencilFunc(ut,In,Mn),ce=ut,Me=In,ne=Mn)},setOp:function(ut,In,Mn){(j!==ut||be!==In||We!==Mn)&&(i.stencilOp(ut,In,Mn),j=ut,be=In,We=Mn)},setLocked:function(ut){N=ut},setClear:function(ut){yt!==ut&&(i.clearStencil(ut),yt=ut)},reset:function(){N=!1,re=null,ce=null,Me=null,ne=null,j=null,be=null,We=null,yt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,T=null,x=null,w=null,C=null,I=new $e(0,0,0),A=0,y=!1,S=null,L=null,U=null,H=null,W=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,J=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=J>=1):k.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=J>=2);let le=null,de={};const Ae=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),te=new _t().fromArray(Ae),Xe=new _t().fromArray(He);function Oe(N,re,ce,Me){const ne=new Uint8Array(4),j=i.createTexture();i.bindTexture(N,j),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<ce;be++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(re+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return j}const X={};X[i.TEXTURE_2D]=Oe(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Oe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Oe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Oe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(Ys),Ne(!1),Te(Al),Q(i.CULL_FACE),xt(Hi);function Q(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function ye(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function ze(N,re){return d[N]!==re?(i.bindFramebuffer(N,re),d[N]=re,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function ge(N,re){let ce=p,Me=!1;if(N){ce=h.get(re),ce===void 0&&(ce=[],h.set(re,ce));const ne=N.textures;if(ce.length!==ne.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let j=0,be=ne.length;j<be;j++)ce[j]=i.COLOR_ATTACHMENT0+j;ce.length=ne.length,Me=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,Me=!0);Me&&i.drawBuffers(ce)}function je(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const Ht={[os]:i.FUNC_ADD,[zh]:i.FUNC_SUBTRACT,[Vh]:i.FUNC_REVERSE_SUBTRACT};Ht[Gh]=i.MIN,Ht[Wh]=i.MAX;const P={[qh]:i.ZERO,[$h]:i.ONE,[Xh]:i.SRC_COLOR,[$a]:i.SRC_ALPHA,[Qh]:i.SRC_ALPHA_SATURATE,[Zh]:i.DST_COLOR,[Kh]:i.DST_ALPHA,[Yh]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[Jh]:i.ONE_MINUS_DST_COLOR,[jh]:i.ONE_MINUS_DST_ALPHA,[ef]:i.CONSTANT_COLOR,[tf]:i.ONE_MINUS_CONSTANT_COLOR,[nf]:i.CONSTANT_ALPHA,[sf]:i.ONE_MINUS_CONSTANT_ALPHA};function xt(N,re,ce,Me,ne,j,be,We,yt,ut){if(N===Hi){_===!0&&(ye(i.BLEND),_=!1);return}if(_===!1&&(Q(i.BLEND),_=!0),N!==Hh){if(N!==m||ut!==y){if((f!==os||x!==os)&&(i.blendEquation(i.FUNC_ADD),f=os,x=os),ut)switch(N){case Gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFunc(i.ONE,i.ONE);break;case Rl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Rl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,T=null,w=null,C=null,I.set(0,0,0),A=0,m=N,y=ut}return}ne=ne||re,j=j||ce,be=be||Me,(re!==f||ne!==x)&&(i.blendEquationSeparate(Ht[re],Ht[ne]),f=re,x=ne),(ce!==M||Me!==T||j!==w||be!==C)&&(i.blendFuncSeparate(P[ce],P[Me],P[j],P[be]),M=ce,T=Me,w=j,C=be),(We.equals(I)===!1||yt!==A)&&(i.blendColor(We.r,We.g,We.b,yt),I.copy(We),A=yt),m=N,y=!1}function Pe(N,re){N.side===Wn?ye(i.CULL_FACE):Q(i.CULL_FACE);let ce=N.side===Sn;re&&(ce=!ce),Ne(ce),N.blending===Gs&&N.transparent===!1?xt(Hi):xt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Me=N.stencilWrite;a.setTest(Me),Me&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),xe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(N){S!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),S=N)}function Te(N){N!==Bh?(Q(i.CULL_FACE),N!==L&&(N===Al?i.cullFace(i.BACK):N===kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),L=N}function mt(N){N!==U&&(Y&&i.lineWidth(N),U=N)}function xe(N,re,ce){N?(Q(i.POLYGON_OFFSET_FILL),(H!==re||W!==ce)&&(i.polygonOffset(re,ce),H=re,W=ce)):ye(i.POLYGON_OFFSET_FILL)}function Ge(N){N?Q(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function bt(N){N===void 0&&(N=i.TEXTURE0+V-1),le!==N&&(i.activeTexture(N),le=N)}function It(N,re,ce){ce===void 0&&(le===null?ce=i.TEXTURE0+V-1:ce=le);let Me=de[ce];Me===void 0&&(Me={type:void 0,texture:void 0},de[ce]=Me),(Me.type!==N||Me.texture!==re)&&(le!==ce&&(i.activeTexture(ce),le=ce),i.bindTexture(N,re||X[N]),Me.type=N,Me.texture=re)}function b(){const N=de[le];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(N){te.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),te.copy(N))}function Be(N){Xe.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Xe.copy(N))}function Le(N,re){let ce=l.get(re);ce===void 0&&(ce=new WeakMap,l.set(re,ce));let Me=ce.get(N);Me===void 0&&(Me=i.getUniformBlockIndex(re,N.name),ce.set(N,Me))}function ue(N,re){const Me=l.get(re).get(N);c.get(re)!==Me&&(i.uniformBlockBinding(re,Me,N.__bindingPointIndex),c.set(re,Me))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},le=null,de={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,T=null,x=null,w=null,C=null,I=new $e(0,0,0),A=0,y=!1,S=null,L=null,U=null,H=null,W=null,te.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:ye,bindFramebuffer:ze,drawBuffers:ge,useProgram:je,setBlending:xt,setMaterial:Pe,setFlipSided:Ne,setCullFace:Te,setLineWidth:mt,setPolygonOffset:xe,setScissorTest:Ge,activeTexture:bt,bindTexture:It,unbindTexture:b,compressedTexImage2D:v,compressedTexImage3D:B,texImage2D:we,texImage3D:se,updateUBOMapping:Le,uniformBlockBinding:ue,texStorage2D:ae,texStorage3D:_e,texSubImage2D:Z,texSubImage3D:ee,compressedTexSubImage2D:K,compressedTexSubImage3D:Re,scissor:fe,viewport:Be,reset:Ye}}function Bv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ct,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,v){return p?new OffscreenCanvas(b,v):Wr("canvas")}function _(b,v,B){let Z=1;const ee=It(b);if((ee.width>B||ee.height>B)&&(Z=B/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const K=Math.floor(Z*ee.width),Re=Math.floor(Z*ee.height);d===void 0&&(d=g(K,Re));const ae=v?g(K,Re):d;return ae.width=K,ae.height=Re,ae.getContext("2d").drawImage(b,0,0,K,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+K+"x"+Re+")."),ae}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function m(b){return b.generateMipmaps}function f(b){i.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(b,v,B,Z,ee=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let K=v;if(v===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),v===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),v===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),v===i.RGBA){const Re=ee?Yo:dt.getTransfer(Z);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=Re===Tt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(b,v){let B;return b?v===null||v===ds||v===kr?B=i.DEPTH24_STENCIL8:v===Yn?B=i.DEPTH32F_STENCIL8:v===Br&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ds||v===kr?B=i.DEPTH_COMPONENT24:v===Yn?B=i.DEPTH_COMPONENT32F:v===Br&&(B=i.DEPTH_COMPONENT16),B}function w(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==hn&&b.minFilter!==Cn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function C(b){const v=b.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&u.delete(v)}function I(b){const v=b.target;v.removeEventListener("dispose",I),S(v)}function A(b){const v=n.get(b);if(v.__webglInit===void 0)return;const B=b.source,Z=h.get(B);if(Z){const ee=Z[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(b),Object.keys(Z).length===0&&h.delete(B)}n.remove(b)}function y(b){const v=n.get(b);i.deleteTexture(v.__webglTexture);const B=b.source,Z=h.get(B);delete Z[v.__cacheKey],o.memory.textures--}function S(b){const v=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ee=0;ee<v.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(v.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=b.textures;for(let Z=0,ee=B.length;Z<ee;Z++){const K=n.get(B[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(B[Z])}n.remove(b)}let L=0;function U(){L=0}function H(){const b=L;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),L+=1,b}function W(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function V(b,v){const B=n.get(b);if(b.isVideoTexture&&Ge(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&B.__version!==b.version){const Z=b.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,b,v);return}}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function Y(b,v){const B=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){X(B,b,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function J(b,v){const B=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){X(B,b,v);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function k(b,v){const B=n.get(b);if(b.version>0&&B.__version!==b.version){Q(B,b,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}const le={[Gi]:i.REPEAT,[ki]:i.CLAMP_TO_EDGE,[$o]:i.MIRRORED_REPEAT},de={[hn]:i.NEAREST,[xd]:i.NEAREST_MIPMAP_NEAREST,[Cr]:i.NEAREST_MIPMAP_LINEAR,[Cn]:i.LINEAR,[Oo]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},Ae={[Ef]:i.NEVER,[Rf]:i.ALWAYS,[Mf]:i.LESS,[Id]:i.LEQUAL,[Tf]:i.EQUAL,[wf]:i.GEQUAL,[bf]:i.GREATER,[Af]:i.NOTEQUAL};function He(b,v){if(v.type===Yn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Cn||v.magFilter===Oo||v.magFilter===Cr||v.magFilter===Mi||v.minFilter===Cn||v.minFilter===Oo||v.minFilter===Cr||v.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,le[v.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,le[v.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,le[v.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,de[v.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Ae[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==Cr&&v.minFilter!==Mi||v.type===Yn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function te(b,v){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",C));const Z=v.source;let ee=h.get(Z);ee===void 0&&(ee={},h.set(Z,ee));const K=W(v);if(K!==b.__cacheKey){ee[K]===void 0&&(ee[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ee[K].usedTimes++;const Re=ee[b.__cacheKey];Re!==void 0&&(ee[b.__cacheKey].usedTimes--,Re.usedTimes===0&&y(v)),b.__cacheKey=K,b.__webglTexture=ee[K].texture}return B}function Xe(b,v,B){return Math.floor(Math.floor(b/B)/v)}function Oe(b,v,B,Z){const K=b.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,B,Z,v.data);else{K.sort((se,fe)=>se.start-fe.start);let Re=0;for(let se=1;se<K.length;se++){const fe=K[Re],Be=K[se],Le=fe.start+fe.count,ue=Xe(Be.start,v.width,4),Ye=Xe(fe.start,v.width,4);Be.start<=Le+1&&ue===Ye&&Xe(Be.start+Be.count-1,v.width,4)===ue?fe.count=Math.max(fe.count,Be.start+Be.count-fe.start):(++Re,K[Re]=Be)}K.length=Re+1;const ae=i.getParameter(i.UNPACK_ROW_LENGTH),_e=i.getParameter(i.UNPACK_SKIP_PIXELS),we=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let se=0,fe=K.length;se<fe;se++){const Be=K[se],Le=Math.floor(Be.start/4),ue=Math.ceil(Be.count/4),Ye=Le%v.width,N=Math.floor(Le/v.width),re=ue,ce=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ye,N,re,ce,B,Z,v.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ae),i.pixelStorei(i.UNPACK_SKIP_PIXELS,_e),i.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function X(b,v,B){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);const ee=te(b,v),K=v.source;t.bindTexture(Z,b.__webglTexture,i.TEXTURE0+B);const Re=n.get(K);if(K.version!==Re.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);const ae=dt.getPrimaries(dt.workingColorSpace),_e=v.colorSpace===Fi?null:dt.getPrimaries(v.colorSpace),we=v.colorSpace===Fi||ae===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let se=_(v.image,!1,s.maxTextureSize);se=bt(v,se);const fe=r.convert(v.format,v.colorSpace),Be=r.convert(v.type);let Le=T(v.internalFormat,fe,Be,v.colorSpace,v.isVideoTexture);He(Z,v);let ue;const Ye=v.mipmaps,N=v.isVideoTexture!==!0,re=Re.__version===void 0||ee===!0,ce=K.dataReady,Me=w(v,se);if(v.isDepthTexture)Le=x(v.format===zr,v.type),re&&(N?t.texStorage2D(i.TEXTURE_2D,1,Le,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Le,se.width,se.height,0,fe,Be,null));else if(v.isDataTexture)if(Ye.length>0){N&&re&&t.texStorage2D(i.TEXTURE_2D,Me,Le,Ye[0].width,Ye[0].height);for(let ne=0,j=Ye.length;ne<j;ne++)ue=Ye[ne],N?ce&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,fe,Be,ue.data):t.texImage2D(i.TEXTURE_2D,ne,Le,ue.width,ue.height,0,fe,Be,ue.data);v.generateMipmaps=!1}else N?(re&&t.texStorage2D(i.TEXTURE_2D,Me,Le,se.width,se.height),ce&&Oe(v,se,fe,Be)):t.texImage2D(i.TEXTURE_2D,0,Le,se.width,se.height,0,fe,Be,se.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){N&&re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Le,Ye[0].width,Ye[0].height,se.depth);for(let ne=0,j=Ye.length;ne<j;ne++)if(ue=Ye[ne],v.format!==Un)if(fe!==null)if(N){if(ce)if(v.layerUpdates.size>0){const be=_u(ue.width,ue.height,v.format,v.type);for(const We of v.layerUpdates){const yt=ue.data.subarray(We*be/ue.data.BYTES_PER_ELEMENT,(We+1)*be/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,We,ue.width,ue.height,1,fe,yt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,se.depth,fe,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,Le,ue.width,ue.height,se.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,se.depth,fe,Be,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,Le,ue.width,ue.height,se.depth,0,fe,Be,ue.data)}else{N&&re&&t.texStorage2D(i.TEXTURE_2D,Me,Le,Ye[0].width,Ye[0].height);for(let ne=0,j=Ye.length;ne<j;ne++)ue=Ye[ne],v.format!==Un?fe!==null?N?ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,fe,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,Le,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ce&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,fe,Be,ue.data):t.texImage2D(i.TEXTURE_2D,ne,Le,ue.width,ue.height,0,fe,Be,ue.data)}else if(v.isDataArrayTexture)if(N){if(re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Le,se.width,se.height,se.depth),ce)if(v.layerUpdates.size>0){const ne=_u(se.width,se.height,v.format,v.type);for(const j of v.layerUpdates){const be=se.data.subarray(j*ne/se.data.BYTES_PER_ELEMENT,(j+1)*ne/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,se.width,se.height,1,fe,Be,be)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,fe,Be,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,se.width,se.height,se.depth,0,fe,Be,se.data);else if(v.isData3DTexture)N?(re&&t.texStorage3D(i.TEXTURE_3D,Me,Le,se.width,se.height,se.depth),ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,fe,Be,se.data)):t.texImage3D(i.TEXTURE_3D,0,Le,se.width,se.height,se.depth,0,fe,Be,se.data);else if(v.isFramebufferTexture){if(re)if(N)t.texStorage2D(i.TEXTURE_2D,Me,Le,se.width,se.height);else{let ne=se.width,j=se.height;for(let be=0;be<Me;be++)t.texImage2D(i.TEXTURE_2D,be,Le,ne,j,0,fe,Be,null),ne>>=1,j>>=1}}else if(Ye.length>0){if(N&&re){const ne=It(Ye[0]);t.texStorage2D(i.TEXTURE_2D,Me,Le,ne.width,ne.height)}for(let ne=0,j=Ye.length;ne<j;ne++)ue=Ye[ne],N?ce&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,fe,Be,ue):t.texImage2D(i.TEXTURE_2D,ne,Le,fe,Be,ue);v.generateMipmaps=!1}else if(N){if(re){const ne=It(se);t.texStorage2D(i.TEXTURE_2D,Me,Le,ne.width,ne.height)}ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Be,se)}else t.texImage2D(i.TEXTURE_2D,0,Le,fe,Be,se);m(v)&&f(Z),Re.__version=K.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Q(b,v,B){if(v.image.length!==6)return;const Z=te(b,v),ee=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+B);const K=n.get(ee);if(ee.version!==K.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);const Re=dt.getPrimaries(dt.workingColorSpace),ae=v.colorSpace===Fi?null:dt.getPrimaries(v.colorSpace),_e=v.colorSpace===Fi||Re===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const we=v.isCompressedTexture||v.image[0].isCompressedTexture,se=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let j=0;j<6;j++)!we&&!se?fe[j]=_(v.image[j],!0,s.maxCubemapSize):fe[j]=se?v.image[j].image:v.image[j],fe[j]=bt(v,fe[j]);const Be=fe[0],Le=r.convert(v.format,v.colorSpace),ue=r.convert(v.type),Ye=T(v.internalFormat,Le,ue,v.colorSpace),N=v.isVideoTexture!==!0,re=K.__version===void 0||Z===!0,ce=ee.dataReady;let Me=w(v,Be);He(i.TEXTURE_CUBE_MAP,v);let ne;if(we){N&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ye,Be.width,Be.height);for(let j=0;j<6;j++){ne=fe[j].mipmaps;for(let be=0;be<ne.length;be++){const We=ne[be];v.format!==Un?Le!==null?N?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be,0,0,We.width,We.height,Le,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be,Ye,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be,0,0,We.width,We.height,Le,ue,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be,Ye,We.width,We.height,0,Le,ue,We.data)}}}else{if(ne=v.mipmaps,N&&re){ne.length>0&&Me++;const j=It(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ye,j.width,j.height)}for(let j=0;j<6;j++)if(se){N?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,fe[j].width,fe[j].height,Le,ue,fe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,fe[j].width,fe[j].height,0,Le,ue,fe[j].data);for(let be=0;be<ne.length;be++){const yt=ne[be].image[j].image;N?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be+1,0,0,yt.width,yt.height,Le,ue,yt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be+1,Ye,yt.width,yt.height,0,Le,ue,yt.data)}}else{N?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Le,ue,fe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,Le,ue,fe[j]);for(let be=0;be<ne.length;be++){const We=ne[be];N?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be+1,0,0,Le,ue,We.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,be+1,Ye,Le,ue,We.image[j])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),K.__version=ee.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ye(b,v,B,Z,ee,K){const Re=r.convert(B.format,B.colorSpace),ae=r.convert(B.type),_e=T(B.internalFormat,Re,ae,B.colorSpace),we=n.get(v),se=n.get(B);if(se.__renderTarget=v,!we.__hasExternalTextures){const fe=Math.max(1,v.width>>K),Be=Math.max(1,v.height>>K);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,K,_e,fe,Be,v.depth,0,Re,ae,null):t.texImage2D(ee,K,_e,fe,Be,0,Re,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),xe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ee,se.__webglTexture,0,mt(v)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ee,se.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(b,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,b),v.depthBuffer){const Z=v.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,K=x(v.stencilBuffer,ee),Re=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=mt(v);xe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,K,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,K,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,K,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,b)}else{const Z=v.textures;for(let ee=0;ee<Z.length;ee++){const K=Z[ee],Re=r.convert(K.format,K.colorSpace),ae=r.convert(K.type),_e=T(K.internalFormat,Re,ae,K.colorSpace),we=mt(v);B&&xe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,we,_e,v.width,v.height):xe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,we,_e,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,_e,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V(v.depthTexture,0);const ee=Z.__webglTexture,K=mt(v);if(v.depthTexture.format===Hr)xe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(v.depthTexture.format===zr)xe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function je(b){const v=n.get(b),B=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const Z=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=Z}if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Z=b.texture.mipmaps;Z&&Z.length>0?ge(v.__webglFramebuffer[0],b):ge(v.__webglFramebuffer,b)}else if(B){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),ze(v.__webglDepthbuffer[Z],b,!1);else{const ee=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,K)}}else{const Z=b.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ze(v.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(b,v,B){const Z=n.get(b);v!==void 0&&ye(Z.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&je(b)}function P(b){const v=b.texture,B=n.get(b),Z=n.get(v);b.addEventListener("dispose",I);const ee=b.textures,K=b.isWebGLCubeRenderTarget===!0,Re=ee.length>1;if(Re||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,o.memory.textures++),K){B.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ae]=[];for(let _e=0;_e<v.mipmaps.length;_e++)B.__webglFramebuffer[ae][_e]=i.createFramebuffer()}else B.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)B.__webglFramebuffer[ae]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Re)for(let ae=0,_e=ee.length;ae<_e;ae++){const we=n.get(ee[ae]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&xe(b)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ae=0;ae<ee.length;ae++){const _e=ee[ae];B.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ae]);const we=r.convert(_e.format,_e.colorSpace),se=r.convert(_e.type),fe=T(_e.internalFormat,we,se,_e.colorSpace,b.isXRRenderTarget===!0),Be=mt(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,fe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,B.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),He(i.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let _e=0;_e<v.mipmaps.length;_e++)ye(B.__webglFramebuffer[ae][_e],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e);else ye(B.__webglFramebuffer[ae],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(v)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ae=0,_e=ee.length;ae<_e;ae++){const we=ee[ae],se=n.get(we);let fe=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(fe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,se.__webglTexture),He(fe,we),ye(B.__webglFramebuffer,b,we,i.COLOR_ATTACHMENT0+ae,fe,0),m(we)&&f(fe)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,Z.__webglTexture),He(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let _e=0;_e<v.mipmaps.length;_e++)ye(B.__webglFramebuffer[_e],b,v,i.COLOR_ATTACHMENT0,ae,_e);else ye(B.__webglFramebuffer,b,v,i.COLOR_ATTACHMENT0,ae,0);m(v)&&f(ae),t.unbindTexture()}b.depthBuffer&&je(b)}function xt(b){const v=b.textures;for(let B=0,Z=v.length;B<Z;B++){const ee=v[B];if(m(ee)){const K=M(b),Re=n.get(ee).__webglTexture;t.bindTexture(K,Re),f(K),t.unbindTexture()}}}const Pe=[],Ne=[];function Te(b){if(b.samples>0){if(xe(b)===!1){const v=b.textures,B=b.width,Z=b.height;let ee=i.COLOR_BUFFER_BIT;const K=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(b),ae=v.length>1;if(ae)for(let we=0;we<v.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const _e=b.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let we=0;we<v.length;we++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const se=n.get(v[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,ee,i.NEAREST),c===!0&&(Pe.length=0,Ne.length=0,Pe.push(i.COLOR_ATTACHMENT0+we),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Pe.push(K),Ne.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ne)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let we=0;we<v.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const se=n.get(v[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const v=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function mt(b){return Math.min(s.maxSamples,b.samples)}function xe(b){const v=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ge(b){const v=o.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function bt(b,v){const B=b.colorSpace,Z=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==mn&&B!==Fi&&(dt.getTransfer(B)===Tt?(Z!==Un||ee!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function It(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=U,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=J,this.setTextureCube=k,this.rebindTextures=Ht,this.setupRenderTarget=P,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=xe}function kv(i,e){function t(n,s=Fi){let r;const o=dt.getTransfer(s);if(n===ai)return i.UNSIGNED_BYTE;if(n===Kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===jc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Md)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Td)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yd)return i.BYTE;if(n===Ed)return i.SHORT;if(n===Br)return i.UNSIGNED_SHORT;if(n===Yc)return i.INT;if(n===ds)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===Zr)return i.HALF_FLOAT;if(n===bd)return i.ALPHA;if(n===Ad)return i.RGB;if(n===Un)return i.RGBA;if(n===Hr)return i.DEPTH_COMPONENT;if(n===zr)return i.DEPTH_STENCIL;if(n===Zc)return i.RED;if(n===Jc)return i.RED_INTEGER;if(n===wd)return i.RG;if(n===Qc)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===Fo||n===Bo||n===ko||n===Ho)if(o===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ko)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ic||n===sc||n===rc||n===oc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ic)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ac||n===cc||n===lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ac||n===cc)return o===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===lc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uc||n===dc||n===hc||n===fc||n===pc||n===mc||n===gc||n===_c||n===vc||n===Sc||n===xc||n===yc||n===Ec||n===Mc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_c)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ec)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mc)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tc||n===bc||n===Ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Tc)return o===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wc||n===Rc||n===Cc||n===Ic)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Rc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Vv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Gd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wi({vertexShader:Hv,fragmentShader:zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new Jr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gv extends ps{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Vv,f={},M=t.getContextAttributes();let T=null,x=null;const w=[],C=[],I=new ct;let A=null;const y=new un;y.viewport=new _t;const S=new un;S.viewport=new _t;const L=[y,S],U=new jp;let H=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=w[X];return Q===void 0&&(Q=new Ra,w[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=w[X];return Q===void 0&&(Q=new Ra,w[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=w[X];return Q===void 0&&(Q=new Ra,w[X]=Q),Q.getHandSpace()};function V(X){const Q=C.indexOf(X.inputSource);if(Q===-1)return;const ye=w[Q];ye!==void 0&&(ye.update(X.inputSource,X.frame,l||o),ye.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",J);for(let X=0;X<w.length;X++){const Q=C[X];Q!==null&&(C[X]=null,w[X].disconnect(Q))}H=null,W=null,m.reset();for(const X in f)delete f[X];e.setRenderTarget(T),p=null,h=null,d=null,s=null,x=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",J),M.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(I),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,ze=null,ge=null;M.depth&&(ge=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=M.stencil?zr:Hr,ze=M.stencil?kr:ds);const je={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new hs(h.textureWidth,h.textureHeight,{format:Un,type:ai,depthTexture:new Vd(h.textureWidth,h.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ye={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new hs(p.framebufferWidth,p.framebufferHeight,{format:Un,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Oe.setContext(s),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(X){for(let Q=0;Q<X.removed.length;Q++){const ye=X.removed[Q],ze=C.indexOf(ye);ze>=0&&(C[ze]=null,w[ze].disconnect(ye))}for(let Q=0;Q<X.added.length;Q++){const ye=X.added[Q];let ze=C.indexOf(ye);if(ze===-1){for(let je=0;je<w.length;je++)if(je>=C.length){C.push(ye),ze=je;break}else if(C[je]===null){C[je]=ye,ze=je;break}if(ze===-1)break}const ge=w[ze];ge&&ge.connect(ye)}}const k=new D,le=new D;function de(X,Q,ye){k.setFromMatrixPosition(Q.matrixWorld),le.setFromMatrixPosition(ye.matrixWorld);const ze=k.distanceTo(le),ge=Q.projectionMatrix.elements,je=ye.projectionMatrix.elements,Ht=ge[14]/(ge[10]-1),P=ge[14]/(ge[10]+1),xt=(ge[9]+1)/ge[5],Pe=(ge[9]-1)/ge[5],Ne=(ge[8]-1)/ge[0],Te=(je[8]+1)/je[0],mt=Ht*Ne,xe=Ht*Te,Ge=ze/(-Ne+Te),bt=Ge*-Ne;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(bt),X.translateZ(Ge),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ge[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const It=Ht+Ge,b=P+Ge,v=mt-bt,B=xe+(ze-bt),Z=xt*P/b*It,ee=Pe*P/b*It;X.projectionMatrix.makePerspective(v,B,Z,ee,It,b),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Ae(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Q=X.near,ye=X.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),U.near=S.near=y.near=Q,U.far=S.far=y.far=ye,(H!==U.near||W!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),H=U.near,W=U.far),U.layers.mask=X.layers.mask|6,y.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const ze=X.parent,ge=U.cameras;Ae(U,ze);for(let je=0;je<ge.length;je++)Ae(ge[je],ze);ge.length===2?de(U,y,S):U.projectionMatrix.copy(y.projectionMatrix),He(X,U,ze)};function He(X,Q,ye){ye===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(ye.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Zs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(X){return f[X]};let te=null;function Xe(X,Q){if(u=Q.getViewerPose(l||o),g=Q,u!==null){const ye=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ze=!1;ye.length!==U.cameras.length&&(U.cameras.length=0,ze=!0);for(let P=0;P<ye.length;P++){const xt=ye[P];let Pe=null;if(p!==null)Pe=p.getViewport(xt);else{const Te=d.getViewSubImage(h,xt);Pe=Te.viewport,P===0&&(e.setRenderTargetTextures(x,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(x))}let Ne=L[P];Ne===void 0&&(Ne=new un,Ne.layers.enable(P),Ne.viewport=new _t,L[P]=Ne),Ne.matrix.fromArray(xt.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(xt.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),P===0&&(U.matrix.copy(Ne.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ze===!0&&U.cameras.push(Ne)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const P=d.getDepthInformation(ye[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(ge&&ge.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let P=0;P<ye.length;P++){const xt=ye[P].camera;if(xt){let Pe=f[xt];Pe||(Pe=new Gd,f[xt]=Pe);const Ne=d.getCameraImage(xt);Pe.sourceTexture=Ne}}}}for(let ye=0;ye<w.length;ye++){const ze=C[ye],ge=w[ye];ze!==null&&ge!==void 0&&ge.update(ze,Q,l||o)}te&&te(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Oe=new jd;Oe.setAnimationLoop(Xe),this.setAnimationLoop=function(X){te=X},this.dispose=function(){}}}const ts=new ci,Wv=new tt;function qv(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Od(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,T,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,M,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Sn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Sn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),T=M.envMap,x=M.envMapRotation;T&&(m.envMap.value=T,ts.copy(x),ts.x*=-1,ts.y*=-1,ts.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),m.envMapRotation.value.setFromMatrix4(Wv.makeRotationFromEuler(ts)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Sn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $v(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,T){const x=T.program;n.uniformBlockBinding(M,x)}function l(M,T){let x=s[M.id];x===void 0&&(g(M),x=u(M),s[M.id]=x,M.addEventListener("dispose",m));const w=T.program;n.updateUBOMapping(M,w);const C=e.render.frame;r[M.id]!==C&&(h(M),r[M.id]=C)}function u(M){const T=d();M.__bindingPointIndex=T;const x=i.createBuffer(),w=M.__size,C=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,w,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,x),x}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const T=s[M.id],x=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let C=0,I=x.length;C<I;C++){const A=Array.isArray(x[C])?x[C]:[x[C]];for(let y=0,S=A.length;y<S;y++){const L=A[y];if(p(L,C,y,w)===!0){const U=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let W=0;for(let V=0;V<H.length;V++){const Y=H[V],J=_(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,U+W,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,W),W+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,T,x,w){const C=M.value,I=T+"_"+x;if(w[I]===void 0)return typeof C=="number"||typeof C=="boolean"?w[I]=C:w[I]=C.clone(),!0;{const A=w[I];if(typeof C=="number"||typeof C=="boolean"){if(A!==C)return w[I]=C,!0}else if(A.equals(C)===!1)return A.copy(C),!0}return!1}function g(M){const T=M.uniforms;let x=0;const w=16;for(let I=0,A=T.length;I<A;I++){const y=Array.isArray(T[I])?T[I]:[T[I]];for(let S=0,L=y.length;S<L;S++){const U=y[S],H=Array.isArray(U.value)?U.value:[U.value];for(let W=0,V=H.length;W<V;W++){const Y=H[W],J=_(Y),k=x%w,le=k%J.boundary,de=k+le;x+=le,de!==0&&w-de<J.storage&&(x+=w-de),U.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=J.storage}}}const C=x%w;return C>0&&(x+=w-C),M.__size=x,M.__cache={},this}function _(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),T}function m(M){const T=M.target;T.removeEventListener("dispose",m);const x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class Xv{constructor(e={}){const{canvas:t=qf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=Ot;let C=0,I=0,A=null,y=-1,S=null;const L=new _t,U=new _t;let H=null;const W=new $e(0);let V=0,Y=t.width,J=t.height,k=1,le=null,de=null;const Ae=new _t(0,0,Y,J),He=new _t(0,0,Y,J);let te=!1;const Xe=new cl;let Oe=!1,X=!1;const Q=new tt,ye=new D,ze=new _t,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function Ht(){return A===null?k:1}let P=n;function xt(E,O){return t.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xc}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ne,!1),P===null){const O="webgl2";if(P=xt(O,E),P===null)throw xt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Pe,Ne,Te,mt,xe,Ge,bt,It,b,v,B,Z,ee,K,Re,ae,_e,we,se,fe,Be,Le,ue,Ye;function N(){Pe=new i0(P),Pe.init(),Le=new kv(P,Pe),Ne=new j_(P,Pe,e,Le),Te=new Fv(P,Pe),Ne.reversedDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),mt=new o0(P),xe=new Tv,Ge=new Bv(P,Pe,Te,xe,Ne,Le,mt),bt=new J_(x),It=new n0(x),b=new hm(P),ue=new Y_(P,b),v=new s0(P,b,mt,ue),B=new c0(P,v,b,mt),se=new a0(P,Ne,Ge),ae=new Z_(xe),Z=new Mv(x,bt,It,Pe,Ne,ue,ae),ee=new qv(x,xe),K=new Av,Re=new Pv(Pe),we=new X_(x,bt,It,Te,B,p,c),_e=new Uv(x,B,Ne),Ye=new $v(P,mt,Ne,Te),fe=new K_(P,Pe,mt),Be=new r0(P,Pe,mt),mt.programs=Z.programs,x.capabilities=Ne,x.extensions=Pe,x.properties=xe,x.renderLists=K,x.shadowMap=_e,x.state=Te,x.info=mt}N();const re=new Gv(x,P);this.xr=re,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=Pe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Pe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(Y,J,!1))},this.getSize=function(E){return E.set(Y,J)},this.setSize=function(E,O,z=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,J=O,t.width=Math.floor(E*k),t.height=Math.floor(O*k),z===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(Y*k,J*k).floor()},this.setDrawingBufferSize=function(E,O,z){Y=E,J=O,k=z,t.width=Math.floor(E*z),t.height=Math.floor(O*z),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(Ae)},this.setViewport=function(E,O,z,G){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,O,z,G),Te.viewport(L.copy(Ae).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(He)},this.setScissor=function(E,O,z,G){E.isVector4?He.set(E.x,E.y,E.z,E.w):He.set(E,O,z,G),Te.scissor(U.copy(He).multiplyScalar(k).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(E){Te.setScissorTest(te=E)},this.setOpaqueSort=function(E){le=E},this.setTransparentSort=function(E){de=E},this.getClearColor=function(E){return E.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,z=!0){let G=0;if(E){let F=!1;if(A!==null){const ie=A.texture.format;F=ie===el||ie===Qc||ie===Jc}if(F){const ie=A.texture.type,he=ie===ai||ie===ds||ie===Br||ie===kr||ie===Kc||ie===jc,Ee=we.getClearColor(),ve=we.getClearAlpha(),Ue=Ee.r,Fe=Ee.g,Ce=Ee.b;he?(g[0]=Ue,g[1]=Fe,g[2]=Ce,g[3]=ve,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Ue,_[1]=Fe,_[2]=Ce,_[3]=ve,P.clearBufferiv(P.COLOR,0,_))}else G|=P.COLOR_BUFFER_BIT}O&&(G|=P.DEPTH_BUFFER_BIT),z&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),we.dispose(),K.dispose(),Re.dispose(),xe.dispose(),bt.dispose(),It.dispose(),B.dispose(),ue.dispose(),Ye.dispose(),Z.dispose(),re.dispose(),re.removeEventListener("sessionstart",Mn),re.removeEventListener("sessionend",hr),Jn.stop()};function ce(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const E=mt.autoReset,O=_e.enabled,z=_e.autoUpdate,G=_e.needsUpdate,F=_e.type;N(),mt.autoReset=E,_e.enabled=O,_e.autoUpdate=z,_e.needsUpdate=G,_e.type=F}function ne(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function j(E){const O=E.target;O.removeEventListener("dispose",j),be(O)}function be(E){We(E),xe.remove(E)}function We(E){const O=xe.get(E).programs;O!==void 0&&(O.forEach(function(z){Z.releaseProgram(z)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,z,G,F,ie){O===null&&(O=ge);const he=F.isMesh&&F.matrixWorld.determinant()<0,Ee=oa(E,O,z,G,F);Te.setMaterial(G,he);let ve=z.index,Ue=1;if(G.wireframe===!0){if(ve=v.getWireframeAttribute(z),ve===void 0)return;Ue=2}const Fe=z.drawRange,Ce=z.attributes.position;let Ke=Fe.start*Ue,lt=(Fe.start+Fe.count)*Ue;ie!==null&&(Ke=Math.max(Ke,ie.start*Ue),lt=Math.min(lt,(ie.start+ie.count)*Ue)),ve!==null?(Ke=Math.max(Ke,0),lt=Math.min(lt,ve.count)):Ce!=null&&(Ke=Math.max(Ke,0),lt=Math.min(lt,Ce.count));const vt=lt-Ke;if(vt<0||vt===1/0)return;ue.setup(F,G,Ee,z,ve);let Et,ot=fe;if(ve!==null&&(Et=b.get(ve),ot=Be,ot.setIndex(Et)),F.isMesh)G.wireframe===!0?(Te.setLineWidth(G.wireframeLinewidth*Ht()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(F.isLine){let Ie=G.linewidth;Ie===void 0&&(Ie=1),Te.setLineWidth(Ie*Ht()),F.isLineSegments?ot.setMode(P.LINES):F.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else F.isPoints?ot.setMode(P.POINTS):F.isSprite&&ot.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)qr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Pe.get("WEBGL_multi_draw"))ot.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ie=F._multiDrawStarts,ht=F._multiDrawCounts,at=F._multiDrawCount,Yt=ve?b.get(ve).bytesPerElement:1,di=xe.get(G).currentProgram.getUniforms();for(let Qt=0;Qt<at;Qt++)di.setValue(P,"_gl_DrawID",Qt),ot.render(Ie[Qt]/Yt,ht[Qt])}else if(F.isInstancedMesh)ot.renderInstances(Ke,vt,F.count);else if(z.isInstancedBufferGeometry){const Ie=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,ht=Math.min(z.instanceCount,Ie);ot.renderInstances(Ke,vt,ht)}else ot.render(Ke,vt)};function yt(E,O,z){E.transparent===!0&&E.side===Wn&&E.forceSinglePass===!1?(E.side=Sn,E.needsUpdate=!0,$i(E,O,z),E.side=Ai,E.needsUpdate=!0,$i(E,O,z),E.side=Wn):$i(E,O,z)}this.compile=function(E,O,z=null){z===null&&(z=E),f=Re.get(z),f.init(O),T.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),E!==z&&E.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const G=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ie=F.material;if(ie)if(Array.isArray(ie))for(let he=0;he<ie.length;he++){const Ee=ie[he];yt(Ee,z,F),G.add(Ee)}else yt(ie,z,F),G.add(ie)}),f=T.pop(),G},this.compileAsync=function(E,O,z=null){const G=this.compile(E,O,z);return new Promise(F=>{function ie(){if(G.forEach(function(he){xe.get(he).currentProgram.isReady()&&G.delete(he)}),G.size===0){F(E);return}setTimeout(ie,10)}Pe.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let ut=null;function In(E){ut&&ut(E)}function Mn(){Jn.stop()}function hr(){Jn.start()}const Jn=new jd;Jn.setAnimationLoop(In),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(E){ut=E,re.setAnimationLoop(E),E===null?Jn.stop():Jn.start()},re.addEventListener("sessionstart",Mn),re.addEventListener("sessionend",hr),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(O),O=re.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,A),f=Re.get(E,T.length),f.init(O),T.push(f),Q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Xe.setFromProjectionMatrix(Q,ni,O.reversedDepth),X=this.localClippingEnabled,Oe=ae.init(this.clippingPlanes,X),m=K.get(E,M.length),m.init(),M.push(m),re.enabled===!0&&re.isPresenting===!0){const ie=x.xr.getDepthSensingMesh();ie!==null&&ms(ie,O,-1/0,x.sortObjects)}ms(E,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(le,de),je=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,je&&we.addToRenderList(m,E),this.info.render.frame++,Oe===!0&&ae.beginShadows();const z=f.state.shadowsArray;_e.render(z,E,O),Oe===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(f.setupLights(),O.isArrayCamera){const ie=O.cameras;if(F.length>0)for(let he=0,Ee=ie.length;he<Ee;he++){const ve=ie[he];gs(G,F,E,ve)}je&&we.render(E);for(let he=0,Ee=ie.length;he<Ee;he++){const ve=ie[he];fr(m,E,ve,ve.viewport)}}else F.length>0&&gs(G,F,E,O),je&&we.render(E),fr(m,E,O);A!==null&&I===0&&(Ge.updateMultisampleRenderTarget(A),Ge.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(x,E,O),ue.resetDefaultState(),y=-1,S=null,T.pop(),T.length>0?(f=T[T.length-1],Oe===!0&&ae.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function ms(E,O,z,G){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Xe.intersectsSprite(E)){G&&ze.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Q);const he=B.update(E),Ee=E.material;Ee.visible&&m.push(E,he,Ee,z,ze.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Xe.intersectsObject(E))){const he=B.update(E),Ee=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ze.copy(E.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),ze.copy(he.boundingSphere.center)),ze.applyMatrix4(E.matrixWorld).applyMatrix4(Q)),Array.isArray(Ee)){const ve=he.groups;for(let Ue=0,Fe=ve.length;Ue<Fe;Ue++){const Ce=ve[Ue],Ke=Ee[Ce.materialIndex];Ke&&Ke.visible&&m.push(E,he,Ke,z,ze.z,Ce)}}else Ee.visible&&m.push(E,he,Ee,z,ze.z,null)}}const ie=E.children;for(let he=0,Ee=ie.length;he<Ee;he++)ms(ie[he],O,z,G)}function fr(E,O,z,G){const F=E.opaque,ie=E.transmissive,he=E.transparent;f.setupLightsView(z),Oe===!0&&ae.setGlobalState(x.clippingPlanes,z),G&&Te.viewport(L.copy(G)),F.length>0&&wi(F,O,z),ie.length>0&&wi(ie,O,z),he.length>0&&wi(he,O,z),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function gs(E,O,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[G.id]===void 0&&(f.state.transmissionRenderTarget[G.id]=new hs(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float")?Zr:ai,minFilter:Mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const ie=f.state.transmissionRenderTarget[G.id],he=G.viewport||L;ie.setSize(he.z*x.transmissionResolutionScale,he.w*x.transmissionResolutionScale);const Ee=x.getRenderTarget(),ve=x.getActiveCubeFace(),Ue=x.getActiveMipmapLevel();x.setRenderTarget(ie),x.getClearColor(W),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),je&&we.render(z);const Fe=x.toneMapping;x.toneMapping=zi;const Ce=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),f.setupLightsView(G),Oe===!0&&ae.setGlobalState(x.clippingPlanes,G),wi(E,z,G),Ge.updateMultisampleRenderTarget(ie),Ge.updateRenderTargetMipmap(ie),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let lt=0,vt=O.length;lt<vt;lt++){const Et=O[lt],ot=Et.object,Ie=Et.geometry,ht=Et.material,at=Et.group;if(ht.side===Wn&&ot.layers.test(G.layers)){const Yt=ht.side;ht.side=Sn,ht.needsUpdate=!0,pr(ot,z,G,Ie,ht,at),ht.side=Yt,ht.needsUpdate=!0,Ke=!0}}Ke===!0&&(Ge.updateMultisampleRenderTarget(ie),Ge.updateRenderTargetMipmap(ie))}x.setRenderTarget(Ee,ve,Ue),x.setClearColor(W,V),Ce!==void 0&&(G.viewport=Ce),x.toneMapping=Fe}function wi(E,O,z){const G=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ie=E.length;F<ie;F++){const he=E[F],Ee=he.object,ve=he.geometry,Ue=he.group;let Fe=he.material;Fe.allowOverride===!0&&G!==null&&(Fe=G),Ee.layers.test(z.layers)&&pr(Ee,O,z,ve,Fe,Ue)}}function pr(E,O,z,G,F,ie){E.onBeforeRender(x,O,z,G,F,ie),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(x,O,z,G,E,ie),F.transparent===!0&&F.side===Wn&&F.forceSinglePass===!1?(F.side=Sn,F.needsUpdate=!0,x.renderBufferDirect(z,O,G,F,E,ie),F.side=Ai,F.needsUpdate=!0,x.renderBufferDirect(z,O,G,F,E,ie),F.side=Wn):x.renderBufferDirect(z,O,G,F,E,ie),E.onAfterRender(x,O,z,G,F,ie)}function $i(E,O,z){O.isScene!==!0&&(O=ge);const G=xe.get(E),F=f.state.lights,ie=f.state.shadowsArray,he=F.state.version,Ee=Z.getParameters(E,F.state,ie,O,z),ve=Z.getProgramCacheKey(Ee);let Ue=G.programs;G.environment=E.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(E.isMeshStandardMaterial?It:bt).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",j),Ue=new Map,G.programs=Ue);let Fe=Ue.get(ve);if(Fe!==void 0){if(G.currentProgram===Fe&&G.lightsStateVersion===he)return Ri(E,Ee),Fe}else Ee.uniforms=Z.getUniforms(E),E.onBeforeCompile(Ee,x),Fe=Z.acquireProgram(Ee,ve),Ue.set(ve,Fe),G.uniforms=Ee.uniforms;const Ce=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ce.clippingPlanes=ae.uniform),Ri(E,Ee),G.needsLights=Xi(E),G.lightsStateVersion=he,G.needsLights&&(Ce.ambientLightColor.value=F.state.ambient,Ce.lightProbe.value=F.state.probe,Ce.directionalLights.value=F.state.directional,Ce.directionalLightShadows.value=F.state.directionalShadow,Ce.spotLights.value=F.state.spot,Ce.spotLightShadows.value=F.state.spotShadow,Ce.rectAreaLights.value=F.state.rectArea,Ce.ltc_1.value=F.state.rectAreaLTC1,Ce.ltc_2.value=F.state.rectAreaLTC2,Ce.pointLights.value=F.state.point,Ce.pointLightShadows.value=F.state.pointShadow,Ce.hemisphereLights.value=F.state.hemi,Ce.directionalShadowMap.value=F.state.directionalShadowMap,Ce.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ce.spotShadowMap.value=F.state.spotShadowMap,Ce.spotLightMatrix.value=F.state.spotLightMatrix,Ce.spotLightMap.value=F.state.spotLightMap,Ce.pointShadowMap.value=F.state.pointShadowMap,Ce.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Fe,G.uniformsList=null,Fe}function Xt(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=zo.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Ri(E,O){const z=xe.get(E);z.outputColorSpace=O.outputColorSpace,z.batching=O.batching,z.batchingColor=O.batchingColor,z.instancing=O.instancing,z.instancingColor=O.instancingColor,z.instancingMorph=O.instancingMorph,z.skinning=O.skinning,z.morphTargets=O.morphTargets,z.morphNormals=O.morphNormals,z.morphColors=O.morphColors,z.morphTargetsCount=O.morphTargetsCount,z.numClippingPlanes=O.numClippingPlanes,z.numIntersection=O.numClipIntersection,z.vertexAlphas=O.vertexAlphas,z.vertexTangents=O.vertexTangents,z.toneMapping=O.toneMapping}function oa(E,O,z,G,F){O.isScene!==!0&&(O=ge),Ge.resetTextureUnits();const ie=O.fog,he=G.isMeshStandardMaterial?O.environment:null,Ee=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:mn,ve=(G.isMeshStandardMaterial?It:bt).get(G.envMap||he),Ue=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Fe=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ce=!!z.morphAttributes.position,Ke=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let vt=zi;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=x.toneMapping);const Et=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ot=Et!==void 0?Et.length:0,Ie=xe.get(G),ht=f.state.lights;if(Oe===!0&&(X===!0||E!==S)){const Wt=E===S&&G.id===y;ae.setState(G,E,Wt)}let at=!1;G.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==ht.state.version||Ie.outputColorSpace!==Ee||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==ve||G.fog===!0&&Ie.fog!==ie||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ae.numPlanes||Ie.numIntersection!==ae.numIntersection)||Ie.vertexAlphas!==Ue||Ie.vertexTangents!==Fe||Ie.morphTargets!==Ce||Ie.morphNormals!==Ke||Ie.morphColors!==lt||Ie.toneMapping!==vt||Ie.morphTargetsCount!==ot)&&(at=!0):(at=!0,Ie.__version=G.version);let Yt=Ie.currentProgram;at===!0&&(Yt=$i(G,O,F));let di=!1,Qt=!1,hi=!1;const Rt=Yt.getUniforms(),on=Ie.uniforms;if(Te.useProgram(Yt.program)&&(di=!0,Qt=!0,hi=!0),G.id!==y&&(y=G.id,Qt=!0),di||S!==E){Te.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Rt.setValue(P,"projectionMatrix",E.projectionMatrix),Rt.setValue(P,"viewMatrix",E.matrixWorldInverse);const Kt=Rt.map.cameraPosition;Kt!==void 0&&Kt.setValue(P,ye.setFromMatrixPosition(E.matrixWorld)),Ne.logarithmicDepthBuffer&&Rt.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Rt.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Qt=!0,hi=!0)}if(F.isSkinnedMesh){Rt.setOptional(P,F,"bindMatrix"),Rt.setOptional(P,F,"bindMatrixInverse");const Wt=F.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),Rt.setValue(P,"boneTexture",Wt.boneTexture,Ge))}F.isBatchedMesh&&(Rt.setOptional(P,F,"batchingTexture"),Rt.setValue(P,"batchingTexture",F._matricesTexture,Ge),Rt.setOptional(P,F,"batchingIdTexture"),Rt.setValue(P,"batchingIdTexture",F._indirectTexture,Ge),Rt.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&Rt.setValue(P,"batchingColorTexture",F._colorsTexture,Ge));const an=z.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&se.update(F,z,Yt),(Qt||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,Rt.setValue(P,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(on.envMap.value=ve,on.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(on.envMapIntensity.value=O.environmentIntensity),Qt&&(Rt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Ie.needsLights&&mr(on,hi),ie&&G.fog===!0&&ee.refreshFogUniforms(on,ie),ee.refreshMaterialUniforms(on,G,k,J,f.state.transmissionRenderTarget[E.id]),zo.upload(P,Xt(Ie),on,Ge)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(zo.upload(P,Xt(Ie),on,Ge),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Rt.setValue(P,"center",F.center),Rt.setValue(P,"modelViewMatrix",F.modelViewMatrix),Rt.setValue(P,"normalMatrix",F.normalMatrix),Rt.setValue(P,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Wt=G.uniformsGroups;for(let Kt=0,Ss=Wt.length;Kt<Ss;Kt++){const Qn=Wt[Kt];Ye.update(Qn,Yt),Ye.bind(Qn,Yt)}}return Yt}function mr(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Xi(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,O,z){const G=xe.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),xe.get(E.texture).__webglTexture=O,xe.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){const z=xe.get(E);z.__webglFramebuffer=O,z.__useDefaultFramebuffer=O===void 0};const to=P.createFramebuffer();this.setRenderTarget=function(E,O=0,z=0){A=E,C=O,I=z;let G=!0,F=null,ie=!1,he=!1;if(E){const ve=xe.get(E);if(ve.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(ve.__webglFramebuffer===void 0)Ge.setupRenderTarget(E);else if(ve.__hasExternalTextures)Ge.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ce=E.depthTexture;if(ve.__boundDepthTexture!==Ce){if(Ce!==null&&xe.has(Ce)&&(E.width!==Ce.image.width||E.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(he=!0);const Fe=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Fe[O])?F=Fe[O][z]:F=Fe[O],ie=!0):E.samples>0&&Ge.useMultisampledRTT(E)===!1?F=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(Fe)?F=Fe[z]:F=Fe,L.copy(E.viewport),U.copy(E.scissor),H=E.scissorTest}else L.copy(Ae).multiplyScalar(k).floor(),U.copy(He).multiplyScalar(k).floor(),H=te;if(z!==0&&(F=to),Te.bindFramebuffer(P.FRAMEBUFFER,F)&&G&&Te.drawBuffers(E,F),Te.viewport(L),Te.scissor(U),Te.setScissorTest(H),ie){const ve=xe.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,ve.__webglTexture,z)}else if(he){const ve=O;for(let Ue=0;Ue<E.textures.length;Ue++){const Fe=xe.get(E.textures[Ue]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ue,Fe.__webglTexture,z,ve)}}else if(E!==null&&z!==0){const ve=xe.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ve.__webglTexture,z)}y=-1},this.readRenderTargetPixels=function(E,O,z,G,F,ie,he,Ee=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(ve=ve[he]),ve){Te.bindFramebuffer(P.FRAMEBUFFER,ve);try{const Ue=E.textures[Ee],Fe=Ue.format,Ce=Ue.type;if(!Ne.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ne.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-G&&z>=0&&z<=E.height-F&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ee),P.readPixels(O,z,G,F,Le.convert(Fe),Le.convert(Ce),ie))}finally{const Ue=A!==null?xe.get(A).__webglFramebuffer:null;Te.bindFramebuffer(P.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(E,O,z,G,F,ie,he,Ee=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(ve=ve[he]),ve)if(O>=0&&O<=E.width-G&&z>=0&&z<=E.height-F){Te.bindFramebuffer(P.FRAMEBUFFER,ve);const Ue=E.textures[Ee],Fe=Ue.format,Ce=Ue.type;if(!Ne.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ne.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ke),P.bufferData(P.PIXEL_PACK_BUFFER,ie.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ee),P.readPixels(O,z,G,F,Le.convert(Fe),Le.convert(Ce),0);const lt=A!==null?xe.get(A).__webglFramebuffer:null;Te.bindFramebuffer(P.FRAMEBUFFER,lt);const vt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await $f(P,vt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ke),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ie),P.deleteBuffer(Ke),P.deleteSync(vt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,z=0){const G=Math.pow(2,-z),F=Math.floor(E.image.width*G),ie=Math.floor(E.image.height*G),he=O!==null?O.x:0,Ee=O!==null?O.y:0;Ge.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,he,Ee,F,ie),Te.unbindTexture()};const _s=P.createFramebuffer(),vs=P.createFramebuffer();this.copyTextureToTexture=function(E,O,z=null,G=null,F=0,ie=null){ie===null&&(F!==0?(qr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=F,F=0):ie=0);let he,Ee,ve,Ue,Fe,Ce,Ke,lt,vt;const Et=E.isCompressedTexture?E.mipmaps[ie]:E.image;if(z!==null)he=z.max.x-z.min.x,Ee=z.max.y-z.min.y,ve=z.isBox3?z.max.z-z.min.z:1,Ue=z.min.x,Fe=z.min.y,Ce=z.isBox3?z.min.z:0;else{const an=Math.pow(2,-F);he=Math.floor(Et.width*an),Ee=Math.floor(Et.height*an),E.isDataArrayTexture?ve=Et.depth:E.isData3DTexture?ve=Math.floor(Et.depth*an):ve=1,Ue=0,Fe=0,Ce=0}G!==null?(Ke=G.x,lt=G.y,vt=G.z):(Ke=0,lt=0,vt=0);const ot=Le.convert(O.format),Ie=Le.convert(O.type);let ht;O.isData3DTexture?(Ge.setTexture3D(O,0),ht=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Ge.setTexture2DArray(O,0),ht=P.TEXTURE_2D_ARRAY):(Ge.setTexture2D(O,0),ht=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const at=P.getParameter(P.UNPACK_ROW_LENGTH),Yt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),di=P.getParameter(P.UNPACK_SKIP_PIXELS),Qt=P.getParameter(P.UNPACK_SKIP_ROWS),hi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Et.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Et.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ue),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ce);const Rt=E.isDataArrayTexture||E.isData3DTexture,on=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){const an=xe.get(E),Wt=xe.get(O),Kt=xe.get(an.__renderTarget),Ss=xe.get(Wt.__renderTarget);Te.bindFramebuffer(P.READ_FRAMEBUFFER,Kt.__webglFramebuffer),Te.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ss.__webglFramebuffer);for(let Qn=0;Qn<ve;Qn++)Rt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,F,Ce+Qn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xe.get(O).__webglTexture,ie,vt+Qn)),P.blitFramebuffer(Ue,Fe,he,Ee,Ke,lt,he,Ee,P.DEPTH_BUFFER_BIT,P.NEAREST);Te.bindFramebuffer(P.READ_FRAMEBUFFER,null),Te.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||xe.has(E)){const an=xe.get(E),Wt=xe.get(O);Te.bindFramebuffer(P.READ_FRAMEBUFFER,_s),Te.bindFramebuffer(P.DRAW_FRAMEBUFFER,vs);for(let Kt=0;Kt<ve;Kt++)Rt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,an.__webglTexture,F,Ce+Kt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,an.__webglTexture,F),on?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Wt.__webglTexture,ie,vt+Kt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Wt.__webglTexture,ie),F!==0?P.blitFramebuffer(Ue,Fe,he,Ee,Ke,lt,he,Ee,P.COLOR_BUFFER_BIT,P.NEAREST):on?P.copyTexSubImage3D(ht,ie,Ke,lt,vt+Kt,Ue,Fe,he,Ee):P.copyTexSubImage2D(ht,ie,Ke,lt,Ue,Fe,he,Ee);Te.bindFramebuffer(P.READ_FRAMEBUFFER,null),Te.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else on?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(ht,ie,Ke,lt,vt,he,Ee,ve,ot,Ie,Et.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(ht,ie,Ke,lt,vt,he,Ee,ve,ot,Et.data):P.texSubImage3D(ht,ie,Ke,lt,vt,he,Ee,ve,ot,Ie,Et):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ie,Ke,lt,he,Ee,ot,Ie,Et.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ie,Ke,lt,Et.width,Et.height,ot,Et.data):P.texSubImage2D(P.TEXTURE_2D,ie,Ke,lt,he,Ee,ot,Ie,Et);P.pixelStorei(P.UNPACK_ROW_LENGTH,at),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Yt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,di),P.pixelStorei(P.UNPACK_SKIP_ROWS,Qt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,hi),ie===0&&O.generateMipmaps&&P.generateMipmap(ht),Te.unbindTexture()},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&Ge.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ge.setTextureCube(E,0):E.isData3DTexture?Ge.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ge.setTexture2DArray(E,0):Ge.setTexture2D(E,0),Te.unbindTexture()},this.resetState=function(){C=0,I=0,A=null,Te.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}const Yv={easy:{reactionMs:620,desiredRange:10,accuracy:.38,fireMs:310,burst:3,reloadMs:1300,speed:2.3},normal:{reactionMs:360,desiredRange:11,accuracy:.68,fireMs:185,burst:5,reloadMs:950,speed:3.1},hard:{reactionMs:180,desiredRange:12,accuracy:.86,fireMs:125,burst:7,reloadMs:700,speed:3.8}},Tr=i=>(i.seed=i.seed*1664525+1013904223>>>0,i.seed/4294967296),Vu=(i,e,t)=>{const n=e.clone().sub(i),s=n.length();if(!s)return!0;const r=new rr(i,n.multiplyScalar(1/s)),o=new D;return!t.some(a=>!!r.intersectBox(a,o)&&o.distanceTo(i)<s-.04)},Kv=(i,e)=>!e.some(t=>t.intersectsBox(new yn().setFromCenterAndSize(new D(i.x,.9,i.z),new D(.7,1.8,.7))));function Gu(i,e){i.velocity.set(0,0,0),i.lastSeen.copy(i.spawn),i.cover=void 0,i.nextDecision=e,i.reactionUntil=e+400,i.nextShot=e,i.reloadUntil=0,i.burstShots=0,i.strafe=1}function jv(i,e,t,n,s,r,o,a="normal"){var M;const c=Yv[a],l=i.group.position.clone().add(new D(0,1.25,0)),u=e.clone();u.y=1.25;const d=Vu(l,u,s),h=e.clone().sub(i.group.position);h.y=0;const p=h.length();if(d&&i.lastSeen.copy(e),t>=i.nextDecision)if(i.nextDecision=t+420+Tr(i)*280,i.strafe=Tr(i)<.5?-1:1,d)p<c.desiredRange*.7&&(i.cover=void 0);else{const T=r.filter(x=>x.distanceTo(i.group.position)<16&&!Vu(x.clone().add(new D(0,1.2,0)),u,s));i.cover=(M=T.sort((x,w)=>x.distanceTo(i.group.position)-w.distanceTo(i.group.position))[0])==null?void 0:M.clone()}const g=d?e:i.cover??i.lastSeen;if(i.group.lookAt(g.x,i.group.position.y,g.z),d&&t>=i.reactionUntil&&t>=i.nextShot&&t>=i.reloadUntil&&p<22){const T=u.sub(l).normalize(),x=(1-c.accuracy)*.12;T.x+=(Tr(i)-.5)*x,T.y+=(Tr(i)-.5)*x,T.z+=(Tr(i)-.5)*x,T.normalize(),o(l,T),i.nextShot=t+c.fireMs,i.burstShots++,i.burstShots>=c.burst&&(i.burstShots=0,i.reloadUntil=t+c.reloadMs)}d&&i.reactionUntil<t-1e3&&(i.reactionUntil=t+c.reactionMs),d||(i.reactionUntil=t+c.reactionMs);const m=(!d&&i.cover?i.cover:d&&p>c.desiredRange?e:d&&p<c.desiredRange*.7?i.group.position.clone().sub(h.normalize().multiplyScalar(4)):d?i.group.position:i.lastSeen).clone().sub(i.group.position);m.y=0,d&&p<c.desiredRange*1.3&&m.add(new D(-h.z,0,h.x).normalize().multiplyScalar(c.speed*.65*i.strafe)),m.lengthSq()>.04&&m.normalize().multiplyScalar(c.speed),i.velocity.lerp(m,Math.min(1,n*5));const f=i.group.position.clone().addScaledVector(i.velocity,n);Kv(f,s)?i.group.position.copy(f):(i.velocity.multiplyScalar(-.2),i.strafe*=-1)}function br(i,e){i.style.setProperty("--cross",e.color),i.style.setProperty("--cross-size",`${e.size}px`),i.style.setProperty("--cross-gap",`${e.gap}px`),i.style.setProperty("--cross-thickness",`${e.thickness}px`),i.dataset.dot=String(e.dot),i.dataset.outline=String(e.outline)}class Zv{constructor(e,t,n,s,r){me(this,"keys",new Set);me(this,"firing",!1);me(this,"down",e=>{[...Object.values(this.bindings),"ShiftLeft","ControlLeft"].includes(e.code)&&e.preventDefault(),this.keys.add(e.code)});me(this,"up",e=>this.keys.delete(e.code));me(this,"move",e=>{document.pointerLockElement===this.target&&this.look(e.movementX,e.movementY)});me(this,"mouse",e=>{document.pointerLockElement===this.target&&(e.button===0&&(this.firing=!0,this.fire()),e.button===2&&this.aim())});me(this,"release",e=>{e.button===0&&(this.firing=!1)});me(this,"reset",()=>{this.firing=!1});me(this,"lockChange",()=>{document.pointerLockElement!==this.target&&this.reset()});this.target=e,this.look=t,this.fire=n,this.aim=s,this.bindings=r,document.addEventListener("keydown",this.down),document.addEventListener("keyup",this.up),document.addEventListener("mousemove",this.move),document.addEventListener("pointerlockchange",this.lockChange),window.addEventListener("blur",this.reset),e.addEventListener("mousedown",this.mouse),document.addEventListener("mouseup",this.release)}movement(){return{moveX:Number(this.keys.has(this.bindings.right))-Number(this.keys.has(this.bindings.left)),moveZ:Number(this.keys.has(this.bindings.forward))-Number(this.keys.has(this.bindings.back)),sprint:this.keys.has("ShiftLeft"),crouch:this.keys.has("ControlLeft"),jump:this.keys.has(this.bindings.jump)}}destroy(){document.removeEventListener("keydown",this.down),document.removeEventListener("keyup",this.up),document.removeEventListener("mousemove",this.move),document.removeEventListener("pointerlockchange",this.lockChange),window.removeEventListener("blur",this.reset),document.removeEventListener("mouseup",this.release),this.target.removeEventListener("mousedown",this.mouse)}}class Jv{constructor(e,t,n,s,r,o,a,c){me(this,"stickPointer");me(this,"aimPointer");me(this,"firePointers",new Set);me(this,"crouchPointers",new Set);me(this,"adsPointers",new Set);me(this,"jumpUntil",0);me(this,"lastAim");me(this,"center",{x:0,y:0});me(this,"pointer",e=>e.pointerType==="touch"||e.pointerType==="pen");me(this,"startStick",e=>{!this.enabled||!this.pointer(e)||this.stickPointer!==void 0||(this.stickPointer=e.pointerId,this.center=this.options.joystick==="floating"?{x:e.clientX,y:e.clientY}:this.centerOf(this.stickArea),this.stickArea.setPointerCapture(e.pointerId),this.placeStick(e.clientX,e.clientY),e.preventDefault())});me(this,"moveStick",e=>{e.pointerId===this.stickPointer&&(this.placeStick(e.clientX,e.clientY),e.preventDefault())});me(this,"endStick",e=>{e.pointerId===this.stickPointer&&(this.stickPointer=void 0,this.stick.dataset.x="0",this.stick.dataset.y="0",this.stick.style.transform="translate(-50%,-50%)",e.preventDefault())});me(this,"startAim",e=>{!this.enabled||!this.pointer(e)||this.aimPointer!==void 0||(this.aimPointer=e.pointerId,this.lastAim={x:e.clientX,y:e.clientY},this.aimArea.setPointerCapture(e.pointerId),e.preventDefault())});me(this,"moveAim",e=>{e.pointerId!==this.aimPointer||!this.lastAim||(this.look((e.clientX-this.lastAim.x)*this.options.horizontalSensitivity,(e.clientY-this.lastAim.y)*this.options.verticalSensitivity),this.lastAim={x:e.clientX,y:e.clientY},e.preventDefault())});me(this,"endAim",e=>{e.pointerId===this.aimPointer&&(this.aimPointer=void 0,this.lastAim=void 0,e.preventDefault())});me(this,"actionDown",e=>{var n;if(!this.enabled||!this.pointer(e))return;const t=e.currentTarget.dataset.touchAction;e.currentTarget.setPointerCapture(e.pointerId),t==="fire"&&(this.firePointers.add(e.pointerId),this.fire()),t==="ads"&&this.adsPointers.add(e.pointerId),t==="crouch"&&this.crouchPointers.add(e.pointerId),t==="jump"&&(this.jumpUntil=performance.now()+120),t==="reload"&&this.reload(),this.options.haptics&&((n=navigator.vibrate)==null||n.call(navigator,8)),e.preventDefault()});me(this,"actionUp",e=>{const t=e.currentTarget.dataset.touchAction;t==="fire"&&this.firePointers.delete(e.pointerId),t==="ads"&&this.adsPointers.delete(e.pointerId),t==="crouch"&&this.crouchPointers.delete(e.pointerId),e.preventDefault()});me(this,"visibility",()=>{document.hidden&&this.reset()});me(this,"reset",()=>{this.stickPointer=void 0,this.aimPointer=void 0,this.firePointers.clear(),this.crouchPointers.clear(),this.adsPointers.clear(),this.lastAim=void 0,this.stick.dataset.x="0",this.stick.dataset.y="0",this.stick.style.transform="translate(-50%,-50%)",this.positionFixedStick()});this.root=e,this.stickArea=t,this.aimArea=n,this.stick=s,this.options=r,this.look=o,this.fire=a,this.reload=c,t.addEventListener("pointerdown",this.startStick),t.addEventListener("pointermove",this.moveStick),t.addEventListener("pointerup",this.endStick),t.addEventListener("pointercancel",this.endStick),t.addEventListener("lostpointercapture",this.endStick),n.addEventListener("pointerdown",this.startAim),n.addEventListener("pointermove",this.moveAim),n.addEventListener("pointerup",this.endAim),n.addEventListener("pointercancel",this.endAim),n.addEventListener("lostpointercapture",this.endAim),e.querySelectorAll("[data-touch-action]").forEach(l=>{l.addEventListener("pointerdown",this.actionDown),l.addEventListener("pointerup",this.actionUp),l.addEventListener("pointercancel",this.actionUp),l.addEventListener("lostpointercapture",this.actionUp)}),window.addEventListener("blur",this.reset),document.addEventListener("visibilitychange",this.visibility),this.applyOptions(r)}get enabled(){return this.root.dataset.enabled==="true"}get firing(){return this.firePointers.size>0}get aiming(){return this.adsPointers.size>0}movement(){const e=Number(this.stick.dataset.x??0),t=Number(this.stick.dataset.y??0);return{moveX:e,moveZ:-t,sprint:Math.hypot(e,t)>.82&&!this.crouchPointers.size,crouch:this.crouchPointers.size>0,jump:performance.now()<this.jumpUntil}}setEnabled(e){this.root.dataset.enabled=String(e),e||this.reset()}applyOptions(e){this.options=e,this.root.style.setProperty("--touch-size",`${e.size}px`),this.root.style.setProperty("--touch-opacity",String(e.opacity/100)),this.root.dataset.joystick=e.joystick,this.positionFixedStick()}centerOf(e){const t=e.getBoundingClientRect(),n=this.options.size*1.1;return{x:t.left+n,y:t.bottom-n}}placeStick(e,t){const n=this.options.size*.44,s=e-this.center.x,r=t-this.center.y,o=Math.hypot(s,r),a=o>n?n/o:1,c=Math.max(-1,Math.min(1,s*a/n)),l=Math.max(-1,Math.min(1,r*a/n));this.stick.style.left=`${this.center.x-this.stickArea.getBoundingClientRect().left}px`,this.stick.style.top=`${this.center.y-this.stickArea.getBoundingClientRect().top}px`,this.stick.style.transform=`translate(calc(-50% + ${c*n}px),calc(-50% + ${l*n}px))`,this.stick.dataset.x=String(c),this.stick.dataset.y=String(l)}positionFixedStick(){if(this.options.joystick!=="fixed")return;const e=this.stickArea.getBoundingClientRect(),t=this.options.size*1.1;this.stick.style.left=`${t}px`,this.stick.style.top=`${Math.max(t,e.height-t)}px`}destroy(){this.reset(),this.stickArea.removeEventListener("pointerdown",this.startStick),this.stickArea.removeEventListener("pointermove",this.moveStick),this.stickArea.removeEventListener("pointerup",this.endStick),this.stickArea.removeEventListener("pointercancel",this.endStick),this.stickArea.removeEventListener("lostpointercapture",this.endStick),this.aimArea.removeEventListener("pointerdown",this.startAim),this.aimArea.removeEventListener("pointermove",this.moveAim),this.aimArea.removeEventListener("pointerup",this.endAim),this.aimArea.removeEventListener("pointercancel",this.endAim),this.aimArea.removeEventListener("lostpointercapture",this.endAim),window.removeEventListener("blur",this.reset),document.removeEventListener("visibilitychange",this.visibility)}}function Wu(i,e){if(e===vf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Lc||e===Rd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Lc)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Qv extends cr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sS(t)}),this.register(function(t){return new rS(t)}),this.register(function(t){return new pS(t)}),this.register(function(t){return new mS(t)}),this.register(function(t){return new gS(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new cS(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new uS(t)}),this.register(function(t){return new iS(t)}),this.register(function(t){return new dS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new fS(t)}),this.register(function(t){return new hS(t)}),this.register(function(t){return new tS(t)}),this.register(function(t){return new _S(t)}),this.register(function(t){return new vS(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Or.extractUrlBase(e);o=Or.resolveURL(l,this.path)}else o=Or.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Xd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===th){try{o[rt.KHR_BINARY_GLTF]=new SS(e)}catch(d){s&&s(d);return}r=JSON.parse(o[rt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new PS(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case rt.KHR_MATERIALS_UNLIT:o[d]=new nS;break;case rt.KHR_DRACO_MESH_COMPRESSION:o[d]=new xS(r,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:o[d]=new yS;break;case rt.KHR_MESH_QUANTIZATION:o[d]=new ES;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function eS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class tS{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new $e(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mn);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Kd(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new dl(u),l.distance=d;break;case"spot":l=new $p(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class nS{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return Rn}extendParams(e,t,n){const s=[];e.color=new $e(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],mn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ot))}return Promise.all(s)}}class iS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class sS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ct(a,a)}return Promise.all(r)}}class rS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class oS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class aS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new $e(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],mn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ot)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class cS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class lS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new $e().setRGB(a[0],a[1],a[2],mn),Promise.all(r)}}class uS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class dS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new $e().setRGB(a[0],a[1],a[2],mn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ot)),Promise.all(r)}}class hS{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class fS{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class pS{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class mS{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class gS{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class _S{constructor(e){this.name=rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(p),u,d,h,s.mode,s.filter),p})})}else return null}}class vS{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Dn.TRIANGLES&&l.mode!==Dn.TRIANGLE_STRIP&&l.mode!==Dn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,p=[];for(const g of d){const _=new tt,m=new D,f=new jn,M=new D(1,1,1),T=new Mp(g.geometry,g.material,h);for(let x=0;x<h;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,x),c.SCALE&&M.fromBufferAttribute(c.SCALE,x),T.setMatrixAt(x,_.compose(m,f,M));for(const x in c)if(x==="_COLOR_0"){const w=c[x];T.instanceColor=new Dc(w.array,w.itemSize,w.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);Pt.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),p.push(T)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const th="glTF",Ar=12,qu={JSON:1313821514,BIN:5130562};class SS{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ar),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==th)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Ar,r=new DataView(e,Ar);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===qu.JSON){const l=new Uint8Array(e,Ar+o,a);this.content=n.decode(l)}else if(c===qu.BIN){const l=Ar+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class xS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const d=Bc[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Bc[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],p=qs[h.componentType];l[d]=p.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}d(p)},a,l,mn,h)})})}}class yS{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ES{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}}class nh extends Qr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,d=(n-t)/u,h=d*d,p=h*d,g=e*l,_=g-l,m=-2*p+3*h,f=p-h,M=1-m,T=f-h+d;for(let x=0;x!==a;x++){const w=o[_+x+a],C=o[_+x+c]*u,I=o[g+x+a],A=o[g+x]*u;r[x]=M*w+T*C+m*I+f*A}return r}}const MS=new jn;class TS extends nh{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return MS.fromArray(r).normalize().toArray(r),r}}const Dn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},$u={9728:hn,9729:Cn,9984:xd,9985:Oo,9986:Cr,9987:Mi},Xu={33071:ki,33648:$o,10497:Gi},Va={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},bS={CUBICSPLINE:void 0,LINEAR:Gr,STEP:Vr},Ga={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function AS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new si({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ai})),i.DefaultMaterial}function ns(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ei(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wS(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const d=e[l];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(h)}if(s){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(r){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function RS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function CS(i){let e;const t=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wa(t.attributes):e=i.indices+":"+Wa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Wa(i.targets[n]);return e}function Wa(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function kc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function IS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const LS=new tt;class PS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new eS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Yd(this.options.manager):this.textureLoader=new Kp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ns(r,a,s),ei(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Or.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Va[s.type],a=qs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new fn(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Va[s.type],l=qs[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(p&&p!==d){const f=Math.floor(h/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let T=t.cache.get(M);T||(_=new l(a,f*p,s.count*p/u),T=new vp(_,p/u),t.cache.add(M,T)),m=new ol(T,c,h%p/u,g)}else a===null?_=new l(s.count*c):_=new l(a,h,s.count*c),m=new fn(_,c,g);if(s.sparse!==void 0){const f=Va.SCALAR,M=qs[s.sparse.indices.componentType],T=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,w=new M(o[1],T,s.sparse.count*f),C=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new fn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let I=0,A=w.length;I<A;I++){const y=w[I];if(m.setX(y,C[I*c]),c>=2&&m.setY(y,C[I*c+1]),c>=3&&m.setZ(y,C[I*c+2]),c>=4&&m.setW(y,C[I*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=$u[h.magFilter]||Cn,u.minFilter=$u[h.minFilter]||Mi,u.wrapS=Xu[h.wrapS]||Gi,u.wrapT=Xu[h.wrapT]||Gi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==hn&&u.minFilter!==Cn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(d){l=!0;const h=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(d){return new Promise(function(h,p){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new kt(_);m.needsUpdate=!0,h(m)}),t.load(Or.resolveURL(d,r.path),g,void 0,p)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),ei(d,o),d.userData.mimeType=o.mimeType||IS(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[rt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new zd,ii.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new ll,ii.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return si}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[rt.KHR_MATERIALS_UNLIT]){const d=s[rt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,r,t))}else{const d=r.pbrMetallicRoughness||{};if(a.color=new $e(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],mn),a.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,Ot)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Wn);const u=r.alphaMode||Ga.OPAQUE;if(u===Ga.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ga.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ct(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Rn){const d=r.emissiveFactor;a.emissive=new $e().setRGB(d[0],d[1],d[2],mn)}return r.emissiveTexture!==void 0&&o!==Rn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ot)),Promise.all(l).then(function(){const d=new o(a);return r.name&&(d.name=r.name),ei(d,r),t.associations.set(d,{materials:e}),r.extensions&&ns(s,d,r),d})}createUniqueName(e){const t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Yu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=CS(l),d=s[u];if(d)o.push(d.promise);else{let h;l.extensions&&l.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=Yu(new En,l,t),s[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?AS(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let p=0,g=u.length;p<g;p++){const _=u[p],m=o[p];let f;const M=l[p];if(m.mode===Dn.TRIANGLES||m.mode===Dn.TRIANGLE_STRIP||m.mode===Dn.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new xp(_,M):new wt(_,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Dn.TRIANGLE_STRIP?f.geometry=Wu(f.geometry,Rd):m.mode===Dn.TRIANGLE_FAN&&(f.geometry=Wu(f.geometry,Lc));else if(m.mode===Dn.LINES)f=new wp(_,M);else if(m.mode===Dn.LINE_STRIP)f=new ta(_,M);else if(m.mode===Dn.LINE_LOOP)f=new Rp(_,M);else if(m.mode===Dn.POINTS)f=new Cp(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&RS(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),ei(f,r),m.extensions&&ns(s,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return r.extensions&&ns(s,d[0],r),d[0];const h=new On;r.extensions&&ns(s,h,r),t.associations.set(h,{meshes:e});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new un(Nn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new hl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ei(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const d=o[l];if(d){a.push(d);const h=new tt;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new al(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){const p=s.channels[d],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",M)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){const h=d[0],p=d[1],g=d[2],_=d[3],m=d[4],f=[];for(let T=0,x=h.length;T<x;T++){const w=h[T],C=p[T],I=g[T],A=_[T],y=m[T];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const S=n._createAnimationTracks(w,C,I,A,y);if(S)for(let L=0;L<S.length;L++)f.push(S[L])}const M=new Uc(r,void 0,f);return ei(M,s),M})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(h,LS)});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new kd:l.length>1?u=new On:l.length===1?u=l[0]:u=new Pt,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=o),ei(u,r),r.extensions&&ns(n,u,r),r.matrix!==void 0){const d=new tt;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new On;n.name&&(r.name=s.createUniqueName(n.name)),ei(r,n),n.extensions&&ns(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++)r.add(c[u]);const l=u=>{const d=new Map;for(const[h,p]of s.associations)(h instanceof ii||h instanceof kt)&&d.set(h,p);return u.traverse(h=>{const p=s.associations.get(h);p!=null&&d.set(h,p)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];Ui[r.path]===Ui.weights?e.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(Ui[r.path]){case Ui.weights:l=Qs;break;case Ui.rotation:l=er;break;case Ui.translation:case Ui.scale:l=tr;break;default:switch(n.itemSize){case 1:l=Qs;break;case 2:case 3:default:l=tr;break}break}const u=s.interpolation!==void 0?bS[s.interpolation]:Gr,d=this._getArrayFromAccessor(n);for(let h=0,p=c.length;h<p;h++){const g=new l(c[h]+"."+Ui[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=kc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof er?TS:nh;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function DS(i,e,t){const n=e.attributes,s=new yn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new D(c[0],c[1],c[2]),new D(l[0],l[1],l[2])),a.normalized){const u=kc(qs[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new D,c=new D;for(let l=0,u=r.length;l<u;l++){const d=r[l];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){const _=kc(qs[h.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new li;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Yu(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Bc[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return dt.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${dt.workingColorSpace}" not supported.`),ei(i,e),DS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?wS(i,e.targets,t):i})}function NS(i){const e=new Map,t=new Map,n=i.clone();return ih(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function ih(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)ih(i.children[n],e.children[n],t)}const US=new Yd,OS=new Qv,Ku=new Map;function FS(i){let e=Ku.get(i);return e||(e=OS.loadAsync(`/characters/Models/GLB%20format/${i}.glb`),Ku.set(i,e)),e}function $s(i,e=!1){const t=US.load(i);return t.wrapS=t.wrapT=Gi,e&&(t.colorSpace=Ot),t}function ju(i){if(i==="concrete"){const t=$s("/textures/concrete-floor-albedo.png",!0),n=$s("/textures/concrete-floor-roughness.png");return t.repeat.set(8,8),n.repeat.set(8,8),new si({map:t,roughnessMap:n,roughness:.82,metalness:.04})}const e=$s("/textures/rusted-metal-albedo.png",!0);return e.repeat.set(2,2),new si({map:e,roughness:.64,metalness:.38})}function qa(i){if(i==="steel"){const t=$s("/textures/gun-metal-albedo.png",!0);return t.repeat.set(2.6,1.35),t.offset.set(.12,.08),new si({map:t,color:"#d1dddd",metalness:.42,roughness:.38})}if(i==="wood"){const t=$s("/textures/gun-wood-albedo.jpg",!0);return t.repeat.set(2.2,1.15),t.offset.set(.05,.18),new si({map:t,color:"#d8b08a",metalness:.02,roughness:.5})}const e=$s("/textures/gun-metal-albedo.png",!0);return e.repeat.set(2,1.2),e.offset.set(.18,.04),new si({map:e,color:"#53636a",metalness:.28,roughness:.52})}function sh(i,e){const t=Number.isFinite(e.pixelRatio)?Nn.clamp(e.pixelRatio,.75,2):1;i.setPixelRatio(Math.min(devicePixelRatio||1,t)),i.shadowMap.enabled=!!e.shadows,i.shadowMap.type=gd,i.shadowMap.needsUpdate=!0}function BS(i,e){const t=new Xv({antialias:!0,powerPreference:"high-performance"});return sh(t,e),t.outputColorSpace=Ot,t.toneMapping=vd,t.toneMappingExposure=1.05,i.replaceChildren(t.domElement),t}function wr(i){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n={steel:["#30383a","#161b1d"],wood:["#7a482b","#3d2117"],polymer:["#35434a","#1c2529"],concrete:["#777b76","#4e5350"],brick:["#8b5340","#4e2d27"]}[i];t.fillStyle=n[0],t.fillRect(0,0,128,128);for(let r=0;r<240;r++){t.fillStyle=`${n[1]}${Math.floor(20+Math.random()*55).toString(16).padStart(2,"0")}`;const o=Math.random()*128,a=Math.random()*128;t.fillRect(o,a,i==="wood"?16+Math.random()*38:1+Math.random()*5,i==="wood"?1:1+Math.random()*4)}if(i==="brick"){t.strokeStyle="#32201c",t.lineWidth=3;for(let r=0;r<128;r+=24){t.beginPath(),t.moveTo(0,r),t.lineTo(128,r),t.stroke();for(let o=r/24%2*18;o<128;o+=36)t.beginPath(),t.moveTo(o,r),t.lineTo(o,r+24),t.stroke()}}const s=new Ip(e);return s.colorSpace=Ot,s.wrapS=s.wrapT=Gi,s.repeat.set(2,2),new si({map:s,color:"#ffffff",metalness:i==="steel"?.78:.04,roughness:i==="steel"?.32:.78})}function Zu(i,e){const t=new On,n=qa("steel"),s=qa("wood"),r=qa("polymer"),o=[],a=(l,u,d,h,p,g=0,_=!1)=>{const m=new wt(l,u);return m.position.set(d,h,p),m.rotation.x=g,t.add(m),_&&o.push({object:m,position:m.position.clone()}),m};let c;if(e==="frontier-rifle"){a(new At(.18,.17,.64),n,.3,-.27,-.68,0,!0),a(new xi(.033,.045,.75,10),n,.3,-.23,-1.24,Math.PI/2,!0),a(new At(.17,.12,.45),s,.3,-.26,-1.03),a(new At(.12,.29,.17),s,.3,-.43,-.48,-.2);const l=a(new At(.13,.37,.18),n,.3,-.48,-.72,-.35);c={object:l,position:l.position.clone(),rotation:l.rotation.clone()}}else if(e==="modern-rifle"){a(new At(.17,.15,.58),r,.3,-.27,-.68,0,!0),a(new xi(.028,.036,.78,10),n,.3,-.23,-1.28,Math.PI/2,!0),a(new At(.11,.25,.15),r,.3,-.43,-.5,-.24);const l=a(new At(.1,.32,.14),r,.3,-.45,-.75,-.05);c={object:l,position:l.position.clone(),rotation:l.rotation.clone()},a(new At(.08,.05,.22),n,.3,-.1,-.9)}else if(e==="smg"){a(new At(.2,.16,.5),r,.3,-.29,-.7,0,!0),a(new xi(.03,.038,.48,10),n,.3,-.25,-1.1,Math.PI/2,!0);const l=a(new At(.11,.34,.14),r,.3,-.47,-.55);c={object:l,position:l.position.clone(),rotation:l.rotation.clone()},a(new At(.13,.12,.36),r,.3,-.4,-.46,-.18)}else if(e==="sniper-rifle"){a(new At(.16,.13,.72),n,.3,-.26,-.78,0,!0),a(new xi(.026,.035,1.15,10),n,.3,-.21,-1.5,Math.PI/2,!0),a(new xi(.075,.075,.32,12),r,.3,-.08,-1.02,Math.PI/2),a(new At(.13,.16,.55),s,.3,-.36,-.42,-.42);const l=a(new At(.09,.25,.13),n,.3,-.42,-.62);c={object:l,position:l.position.clone(),rotation:l.rotation.clone()}}else{a(new At(.2,.17,.42),n,.3,-.29,-.65,0,!0),a(new At(.17,.11,.25),n,.3,-.36,-.89,0,!0),a(new xi(.038,.046,.38,12),n,.3,-.27,-1.02,Math.PI/2,!0),a(new At(.145,.32,.18),s,.3,-.48,-.52,-.24),a(new At(.15,.035,.2),s,.3,-.59,-.52,-.24);const l=a(new At(.1,.22,.14),n,.3,-.42,-.6);c={object:l,position:l.position.clone(),rotation:l.rotation.clone()}}return t.userData.weaponView={slide:o,magazine:c,lastShot:-1/0},i.add(t),t}function kS(i,e){const t=i.userData.weaponView;t&&(t.lastShot=e)}function HS(i,e,t,n,s){const r=i.userData.weaponView;if(!r)return;const o=Math.min(1,t/7),a=e*.008;i.position.x=n?.14:.28+Math.sin(a)*.014*o,i.position.y=n?-.18:-.28+Math.cos(a*.8)*.011*o,i.position.z=n?-.12:Math.sin(a*.55)*.018*o;const c=Nn.clamp(1-(e-r.lastShot)/100,0,1);if(r.slide.forEach(l=>{l.object.position.copy(l.position),l.object.position.z+=c*.055}),r.magazine){const l=Math.sin(Nn.clamp(s,0,1)*Math.PI);r.magazine.object.position.copy(r.magazine.position).y-=l*.24,r.magazine.object.rotation.copy(r.magazine.rotation),r.magazine.object.rotation.z+=l*.35}}function Ju(i="#4e6670",e="character-a"){const t=new On,n=new On,s=new On,r=new Rn({color:i,toneMapped:!1}),o=new Rn({color:"#bd8263",toneMapped:!1}),a=new Rn({color:"#d8c29a",toneMapped:!1}),c=new Rn({color:"#202d32",toneMapped:!1}),l=new wt(new Jo(.34,.72,5,8),r),u=new wt(new Ur(.22,12,8),o),d=new wt(new Ur(.25,12,8,0,Math.PI*2,0,Math.PI/2),a),h=new wt(new xi(.3,.3,.055,12),a),p=new wt(new At(.105,.12,.62),c);l.position.y=.72,u.position.y=1.35,d.position.y=1.45,h.position.y=1.46,p.position.set(.4,.9,-.12),p.rotation.z=-.22,s.add(l,u,d,h,p),s.traverse(M=>{M instanceof wt&&(M.raycast=()=>{})}),n.add(s),t.add(n);const g=new Rn({colorWrite:!1}),_=new wt(new Jo(.34,.8,5,8),g),m=new wt(new Ur(.23,12,8),g);_.position.y=.85,m.position.y=1.58,t.add(_,m);const f={fallback:s,motion:n,hasClip:!1,phase:Math.random()*Math.PI*2,lastPosition:t.position.clone(),firingUntil:0};return t.userData.fighter=f,FS(e).then(M=>{const T=NS(M.scene);T.updateMatrixWorld(!0);const x=new yn().setFromObject(T),w=x.getSize(new D),C=x.getCenter(new D);if(x.isEmpty()||!Number.isFinite(w.y)||w.y<=.001)throw new Error("Character GLB has no usable height");const I=1.72/w.y;if(!Number.isFinite(I)||I<=0)throw new Error("Character GLB has an invalid scale");T.scale.setScalar(I),T.position.set(-C.x*I,-x.min.y*I,-C.z*I),T.rotation.y=Math.PI;let A=0,y=0,S=0;if(T.traverse(U=>{var W;if(!(U instanceof wt)||!((W=U.geometry.getAttribute("position"))!=null&&W.count))return;A++,U.castShadow=!0,U.receiveShadow=!0;const H=Array.isArray(U.material)?U.material:[U.material];U.material=H.map(V=>{var k;const Y=V,J=!!((k=Y.map)!=null&&k.source.data);return Y.map&&(Y.map.colorSpace=Ot,J&&y++),J||S++,new Rn({map:Y.map,color:Y.color??"#b9a992",side:Wn,vertexColors:!!(Y.vertexColors&&U.geometry.getAttribute("color")),toneMapped:!1})}),U.frustumCulled=!1}),!A)throw new Error("Character GLB has no renderable meshes");T.updateMatrixWorld(!0);const L=new yn().setFromObject(T).getSize(new D).y;if(!Number.isFinite(L)||L<1.5||L>1.95)throw new Error("Character GLB could not be fitted to fighter height");f.motion.add(T),console.info("[Iron Yard] Textured character loaded",{variant:e,meshes:A,texturedMeshes:y,fallbackMaterials:S}),M.animations.length&&(f.mixer=new lm(T),f.mixer.clipAction(M.animations[0]).play(),f.hasClip=!0)}).catch(M=>{console.warn("[Iron Yard] Character GLB failed; retaining fallback",{variant:e,error:M})}),t}function Qu(i,e){const t=i.userData.fighter;t&&(t.firingUntil=e+120)}function ed(i,e,t){var a;const n=i.userData.fighter;if(!n||((a=n.mixer)==null||a.update(e),n.hasClip))return;const s=i.position.distanceTo(n.lastPosition)/Math.max(e,.001);n.lastPosition.copy(i.position);const r=Math.min(1,s/4),o=Math.max(0,(n.firingUntil-t)/120);n.motion.position.y=Math.sin(t*.011+n.phase)*(.008+r*.026),n.motion.rotation.y=Math.sin(t*.004+n.phase)*(.035+r*.025),n.motion.rotation.z=o*-.13}const jt={"iron-yard":{id:"iron-yard",name:"Iron Yard",description:"Balanced industrial lanes around the crane divider."},"freight-terminal":{id:"freight-terminal",name:"Freight Terminal",description:"Long container lanes with hard cover and open crossings."},foundry:{id:"foundry",name:"Foundry",description:"A hot interior of furnace bays, columns, and close angles."}},Io=Object.keys(jt);function gl(i,e){const t=ju("concrete"),n=ju("rust"),s=wr("brick"),r=wr("steel"),o=wr("steel");o.color.set("#315d70");const a=wr("steel");a.color.set("#8a4c28");const c=wr("concrete");c.color.set("#293035");const l=(p,g,_,m,f,M,T=t,x=!0)=>{const w=new wt(new At(m,f,M),T);return w.position.set(p,g,_),w.castShadow=w.receiveShadow=!0,i.add(w),x&&e.push(new yn().setFromObject(w)),w};return{box:l,floor:(p,g,_=t)=>{const m=new wt(new Jr(p,g),_);m.rotation.x=-Math.PI/2,m.receiveShadow=!0,i.add(m)},walls:(p,g,_=s,m=4)=>{l(0,m/2,-g/2,p,m,1,_),l(0,m/2,g/2,p,m,1,_),l(-p/2,m/2,0,1,m,g,_),l(p/2,m/2,0,1,m,g,_)},beacon:(p,g,_,m=4)=>{const f=new dl(_,3.2,13,2);f.position.set(p,m,g),i.add(f);const M=new wt(new At(.45,.22,.45),new si({color:_,emissive:_,emissiveIntensity:2}));M.position.set(p,m-.25,g),i.add(M)},concrete:t,rust:n,brick:s,steel:r,blue:o,amber:a,black:c}}const zS=(i,e)=>{const{box:t,floor:n,walls:s,beacon:r,brick:o,rust:a,steel:c,amber:l}=gl(i,e);return n(52,52),s(52,52,o),t(0,1.25,0,3.4,2.5,15,c),t(-11,1.25,-8,7,2.5,3.4,a),t(10,1.25,7,7,2.5,3.4,a),t(-10,1.25,11,3.4,2.5,4,l),t(12,1.25,-12,3.4,2.5,4,l),t(-17,2.8,-2,.65,5.6,.65,c),t(-7,2.8,-2,.65,5.6,.65,c),t(-12,5.3,-2,11,.7,.7,c),t(-12,3.6,-2,.45,2.8,.45,l,!1),r(-12,-2,"#f2ad50",5.2),r(16,15,"#69b9ce"),{...jt["iron-yard"],coverPoints:[[-13,-7],[-8,-10],[7,6],[13,7],[0,-7],[0,8],[-10,12],[12,-13],[-16,2],[16,-3]].map(([u,d])=>new D(u,0,d)),playerSpawn:new D(-16,1.7,11),botSpawns:[new D(16,0,-11),new D(5,0,-15),new D(15,0,9)],buyRadius:6.5,atmosphere:{background:"#8da6ae",fog:"#8da6ae",fogNear:26,fogFar:63,sky:"#d9e8e9",ground:"#293137",light:"#ffe0bb",lightPosition:[-10,16,8],lightIntensity:3}}},VS=(i,e)=>{const{box:t,floor:n,walls:s,beacon:r,brick:o,steel:a,blue:c,amber:l,black:u}=gl(i,e);return n(68,40,u),s(68,40,o),[[-21,-10,c],[-21,8,l],[-6,10,c],[7,-9,l],[21,9,c],[24,-8,l]].forEach(([h,p,g])=>t(h,1.6,p,10,3.2,3.5,g)),[[-29,0],[-12,0],[3,0],[18,0],[30,0]].forEach(([h,p])=>t(h,.55,p,1.2,1.1,5.5,a)),t(-29,3.4,-15,1,6.8,1,a),t(-29,3.4,15,1,6.8,1,a),t(-29,6.35,0,1,.7,31,a),r(-29,0,"#70d0dd",6.2),r(30,14,"#e5a550",4),{...jt["freight-terminal"],coverPoints:[[-27,-8],[-23,5],[-15,10],[-7,6],[-3,-9],[6,8],[11,-9],[20,6],[26,11],[28,-5]].map(([h,p])=>new D(h,0,p)),playerSpawn:new D(-28,1.7,12),botSpawns:[new D(29,0,-13),new D(18,0,12),new D(5,0,-13)],buyRadius:6.5,atmosphere:{background:"#7795a0",fog:"#7795a0",fogNear:30,fogFar:78,sky:"#d5e4e2",ground:"#243239",light:"#e1f2ff",lightPosition:[-18,18,5],lightIntensity:2.8}}},GS=(i,e)=>{const{box:t,floor:n,walls:s,beacon:r,brick:o,rust:a,steel:c,amber:l,black:u}=gl(i,e);return n(44,44,u),s(44,44,o,6),t(0,2.2,-15,15,4.4,4,a),t(0,4.7,-12.7,9,.8,.8,l,!1),r(0,-12,"#ff713c",5.3),[[-12,-4],[12,-4],[-12,8],[12,8]].forEach(([d,h])=>{t(d,2.5,h,2.1,5,2.1,c),r(d,h,"#e8a35c",4.8)}),t(-6,1.2,5,7,2.4,2.8,a),t(7,1.2,5,7,2.4,2.8,a),t(-16,1.2,13,4,2.4,4,l),t(16,1.2,13,4,2.4,4,l),t(-18,3.2,-13,.7,6.4,.7,c),t(18,3.2,-13,.7,6.4,.7,c),t(0,6,-13,36,.65,.65,c),{...jt.foundry,coverPoints:[[-16,-7],[-8,-5],[8,-5],[16,-7],[-8,8],[8,8],[-16,13],[16,13],[0,8],[0,-7]].map(([d,h])=>new D(d,0,h)),playerSpawn:new D(-10,1.7,16),botSpawns:[new D(15,0,-8),new D(11,0,13),new D(-3,0,-8)],buyRadius:6,atmosphere:{background:"#4d3b38",fog:"#4d3b38",fogNear:17,fogFar:48,sky:"#d68c68",ground:"#211c1c",light:"#ffb06d",lightPosition:[-6,15,4],lightIntensity:2.4}}},WS={"iron-yard":zS,"freight-terminal":VS,foundry:GS};function td(i,e){const t=new On;t.name=`arena-map-${e}`;const n=[],s=WS[e](t,n);return i.add(t),{...s,group:t,colliders:n}}const qS=new TextEncoder,$S=new TextDecoder,Lo=(i,e,t,n)=>typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(t,i)):e,XS={latencyMs:0,jitterMs:0,lossPercent:0};function YS(){return{...XS}}function Hc(i=void 0){if(i)try{const e=new URL(i);return e.protocol=e.protocol==="https:"?"wss:":e.protocol==="http:"?"ws:":e.protocol,e.pathname="/v1/arena",/^wss?:$/.test(e.protocol)?e.toString():void 0}catch{return}}function KS(){try{return}catch{return}}class jS{constructor(e,t){me(this,"kind","websocket");me(this,"socket");this.url=e,this.handlers=t}open(){const e=this.socket=new WebSocket(this.url);e.onopen=this.handlers.open,e.onmessage=t=>this.handlers.message(typeof t.data=="string"?t.data:""),e.onerror=this.handlers.error,e.onclose=t=>this.handlers.close(t.reason||(t.code?`Socket closed (${t.code}).`:void 0))}send(e){var t;((t=this.socket)==null?void 0:t.readyState)===WebSocket.OPEN&&this.socket.send(e)}close(){var e;(e=this.socket)==null||e.close(),this.socket=void 0}}class ZS{constructor(e,t){me(this,"kind","webtransport");me(this,"session");me(this,"writer");me(this,"closed",!1);this.url=e,this.handlers=t}open(){this.start()}async start(){try{if(typeof WebTransport>"u")throw new Error("WebTransport is unavailable.");const e=this.session=new WebTransport(this.url);if(await e.ready,this.closed)return;this.writer=e.datagrams.writable.getWriter(),this.handlers.open(),this.read(e),e.closed.then(()=>this.handlers.close()).catch(()=>{this.closed||this.handlers.error()})}catch{this.handlers.error(),this.handlers.close()}}async read(e){try{const t=e.datagrams.readable.getReader();for(;;){const n=await t.read();if(n.done)break;this.handlers.message($S.decode(n.value))}}catch{this.closed||this.handlers.error()}}send(e){var t;(t=this.writer)==null||t.write(qS.encode(e)).catch(()=>this.handlers.error())}close(){var e,t;this.closed=!0,(e=this.writer)==null||e.releaseLock(),(t=this.session)==null||t.close(),this.session=void 0}}class JS{constructor(){me(this,"transport");me(this,"room");me(this,"reconnectToken");me(this,"reconnectAttempts",0);me(this,"intentionalClose",!1);me(this,"retryTimer");me(this,"pingTimer");me(this,"listener");me(this,"simulation",YS());me(this,"metrics",{transport:"websocket",rttMs:0,jitterMs:0,snapshotLoss:0,snapshotsPerSecond:0,serverTick:0,serverLagMs:0,simulatedDrops:0});me(this,"lastRtt",0);me(this,"lastSnapshotTick",0);me(this,"snapshotCount",0);me(this,"snapshotWindowAt",performance.now());me(this,"snapshotRate",30);me(this,"inputSequence",0)}connect(e,t,n){return Hc()?(this.close(),this.intentionalClose=!1,this.reconnectAttempts=0,this.listener=n,this.open(e==="create"?{type:"create",map:t}:e==="queue"?{type:"queue",map:t}:{type:"join",room:t}),!0):!1}cancelQueue(){this.send({type:"cancel-queue"})}setSimulation(e){this.simulation={latencyMs:Lo(e.latencyMs,this.simulation.latencyMs,0,2e3),jitterMs:Lo(e.jitterMs,this.simulation.jitterMs,0,1e3),lossPercent:Lo(e.lossPercent,this.simulation.lossPercent,0,50)},this.emitMetrics()}simulationSettings(){return{...this.simulation}}serverTick(){return this.metrics.serverTick}sendInput(e){const t=++this.inputSequence;return this.send({type:"input",sequence:t,...e}),t}send(e){this.sendRaw(JSON.stringify(e))}close(){var e,t;this.intentionalClose=!0,window.clearTimeout(this.retryTimer),window.clearInterval(this.pingTimer),(e=this.transport)==null||e.send(JSON.stringify({type:"leave"})),(t=this.transport)==null||t.close(),this.transport=void 0,this.room=void 0,this.reconnectToken=void 0,this.reconnectAttempts=0}open(e,t=!1){const n=Hc();if(!n||!this.listener)return;this.listener({type:"connection",status:this.reconnectAttempts?"reconnecting":"connecting"});const s=t?void 0:KS();let r=!1,o=!1;const a=()=>{var l;o||t||!s||this.intentionalClose||(o=!0,(l=this.transport)==null||l.close(),this.open(e,!0))},c={open:()=>{var l,u;r=!0,this.metrics.transport=((l=this.transport)==null?void 0:l.kind)??"websocket",(u=this.listener)==null||u.call(this,{type:"connection",status:"connected",transport:this.metrics.transport}),this.sendRaw(JSON.stringify(e),!1),this.startPings(),this.emitMetrics()},message:l=>this.handleMessage(l),error:()=>{var l;!r&&s&&!t?a():(l=this.listener)==null||l.call(this,{type:"error",message:"Arena connection failed."})},close:l=>{var u;if(!r){s&&!t?a():(u=this.listener)==null||u.call(this,{type:"connection",status:"closed",reason:l});return}this.transport&&!o&&this.handleClose(e,l)}};this.transport=s?new ZS(s,c):new jS(n,c),this.transport.open()}handleClose(e,t){var n,s;if(this.transport=void 0,window.clearInterval(this.pingTimer),!this.intentionalClose){if(this.room&&this.reconnectToken&&this.reconnectAttempts<3){this.reconnectAttempts++,(n=this.listener)==null||n.call(this,{type:"connection",status:"reconnecting"}),this.retryTimer=window.setTimeout(()=>this.open({type:"resume",room:this.room,reconnectToken:this.reconnectToken}),this.reconnectAttempts*1e3);return}(s=this.listener)==null||s.call(this,{type:"connection",status:"closed",reason:t})}}sendRaw(e,t=!0){var o;const n=JSON.parse(e),s=t&&["input","shot","ping"].includes(n.type??"");if(s&&Math.random()*100<this.simulation.lossPercent){this.metrics.simulatedDrops++,this.emitMetrics();return}const r=s?Math.max(0,this.simulation.latencyMs+(Math.random()*2-1)*this.simulation.jitterMs):0;r?window.setTimeout(()=>{var a;return(a=this.transport)==null?void 0:a.send(e)},r):(o=this.transport)==null||o.send(e)}handleMessage(e){var t;try{const n=JSON.parse(e);if(n.type==="pong"){if(typeof n.sentAt=="number"){const s=Math.max(0,performance.now()-n.sentAt);this.metrics.jitterMs=this.lastRtt?Math.round(Math.abs(s-this.lastRtt)):0,this.metrics.rttMs=Math.round(s),this.lastRtt=s,this.metrics.serverTick=typeof n.serverTick=="number"?n.serverTick:this.metrics.serverTick,this.metrics.serverLagMs=Lo(n.serverLagMs,this.metrics.serverLagMs,0,1e4),this.emitMetrics()}return}n.type==="joined"&&(this.room=n.room,this.reconnectToken=n.reconnectToken,this.reconnectAttempts=0,this.snapshotRate=n.snapshotRate||30),n.type==="state"&&this.observeSnapshot(n),(t=this.listener)==null||t.call(this,n)}catch{}}observeSnapshot(e){const t=Math.max(1,Math.round(60/this.snapshotRate));this.lastSnapshotTick&&(this.metrics.snapshotLoss+=Math.max(0,Math.round((e.serverTick-this.lastSnapshotTick)/t)-1)),this.lastSnapshotTick=e.serverTick,this.metrics.serverTick=e.serverTick,this.snapshotCount++;const n=performance.now();n-this.snapshotWindowAt>=1e3&&(this.metrics.snapshotsPerSecond=Math.round(this.snapshotCount*1e3/(n-this.snapshotWindowAt)),this.snapshotCount=0,this.snapshotWindowAt=n),this.emitMetrics()}startPings(){window.clearInterval(this.pingTimer),this.pingTimer=window.setInterval(()=>this.send({type:"ping",sentAt:performance.now()}),1e3),this.send({type:"ping",sentAt:performance.now()})}emitMetrics(){var e;(e=this.listener)==null||e.call(this,{type:"metrics",value:{...this.metrics}})}}class QS{constructor(e,t){me(this,"velocity",new D);me(this,"yaw",0);me(this,"pitch",0);me(this,"grounded",!0);me(this,"crouched",!1);me(this,"sprinting",!1);me(this,"health",100);this.camera=e,this.colliders=t,e.rotation.order="YXZ"}look(e,t,n){this.yaw-=e*n,this.pitch=Nn.clamp(this.pitch-t*n,-1.45,1.45)}update(e,t){this.crouched=t.crouch,this.sprinting=t.sprint&&!this.crouched;const n=t.moveZ,s=t.moveX,r=new D(s,0,-n).normalize().applyAxisAngle(new D(0,1,0),this.yaw),o=this.crouched?3:this.sprinting?7.2:5,a=this.grounded?35:10;this.velocity.x+=(r.x*o-this.velocity.x)*Math.min(1,a*e),this.velocity.z+=(r.z*o-this.velocity.z)*Math.min(1,a*e),t.jump&&this.grounded&&(this.velocity.y=6.2,this.grounded=!1),this.velocity.y-=18*e;const c=this.camera.position.clone().addScaledVector(this.velocity,e),l=1.7;c.y<=l&&(c.y=l,this.velocity.y=0,this.grounded=!0);const u=this.camera.position.clone(),d=Math.max(1,Math.ceil(u.distanceTo(c)/.12));for(let h=1;h<=d;h++){const p=u.clone().lerp(c,h/d),g=new yn().setFromCenterAndSize(new D(p.x,p.y-.75,p.z),new D(.65,1.5,.65));if(!this.colliders.some(_=>_.intersectsBox(g)))this.camera.position.copy(p);else{this.velocity.x=0,this.velocity.z=0;break}}this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch}}class ex{constructor(){me(this,"pitch",0);me(this,"yaw",0)}kick(e,t){this.pitch+=e,this.yaw+=(Math.random()-.5)*t}update(e){this.pitch*=Math.max(0,1-e*13),this.yaw*=Math.max(0,1-e*13)}}const rh="iron-yard-settings-v1",Vo={sensitivity:.0022,fov:78,crosshair:{color:"#f3d78b",size:9,gap:5,thickness:2,dot:!0,outline:!0},graphics:{quality:"high",pixelRatio:1.75,shadows:!0},touch:{controls:"auto",joystick:"fixed",size:76,opacity:72,horizontalSensitivity:1,verticalSensitivity:1,haptics:!0},bindings:{forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",reload:"KeyR",jump:"Space"}},Go={low:{quality:"low",pixelRatio:1,shadows:!1},medium:{quality:"medium",pixelRatio:1.4,shadows:!0},high:{quality:"high",pixelRatio:1.75,shadows:!0}};function tx(){try{const i=JSON.parse(localStorage.getItem(rh)??"{}"),e=matchMedia("(pointer: coarse)").matches,t=e&&!i.graphics?{...Vo,graphics:{...Go.medium,pixelRatio:1.2,shadows:!1}}:Vo;return{...t,...i,crosshair:{...t.crosshair,...i.crosshair},graphics:{...t.graphics,...i.graphics},touch:{...t.touch,...i.touch},bindings:{...t.bindings,...i.bindings}}}catch{return structuredClone(Vo)}}function is(i){try{localStorage.setItem(rh,JSON.stringify(i))}catch{}}function nx(i){return btoa(JSON.stringify(i))}function ix(i){try{const e=JSON.parse(atob(i.trim()));return typeof e.color=="string"&&[e.size,e.gap,e.thickness].every(Number.isFinite)?{color:e.color,size:Math.max(1,Math.min(24,e.size)),gap:Math.max(0,Math.min(20,e.gap)),thickness:Math.max(1,Math.min(5,e.thickness)),dot:!!e.dot,outline:!!e.outline}:null}catch{return null}}const yi={"frontier-rifle":{id:"frontier-rifle",name:"BRAMBLE-47 AR",automatic:!0,magazine:30,reserve:90,damage:34,headshot:102,fireMs:108,reloadMs:1850,recoil:.029,spread:.011,price:1800,sound:"frontier"},"modern-rifle":{id:"modern-rifle",name:"YARDLINE-5 AR",automatic:!0,magazine:28,reserve:84,damage:34,headshot:102,fireMs:82,reloadMs:1650,recoil:.021,spread:.007,price:2400,sound:"modern"},smg:{id:"smg",name:"CINDER SMG",automatic:!0,magazine:36,reserve:108,damage:25,headshot:70,fireMs:68,reloadMs:1450,recoil:.019,spread:.018,price:2100,sound:"modern"},"sniper-rifle":{id:"sniper-rifle",name:"LONESTAR SNIPER",automatic:!1,magazine:5,reserve:25,damage:100,headshot:160,fireMs:1100,reloadMs:2300,recoil:.085,spread:8e-4,price:4200,sound:"frontier"},pistol:{id:"pistol",name:"RANGER PISTOL",automatic:!1,magazine:12,reserve:48,damage:25,headshot:75,fireMs:260,reloadMs:1250,recoil:.045,spread:.004,price:0,sound:"pistol"}};class sx{constructor(){me(this,"spec",yi.pistol);me(this,"ammo",this.spec.magazine);me(this,"reserve",this.spec.reserve);me(this,"reloading",!1);me(this,"lastShot",0);me(this,"reloadStartedAt",0);me(this,"reloadTimer");me(this,"reloadGeneration",0)}select(e){this.cancelReload(),this.spec=yi[e],this.ammo=this.spec.magazine,this.reserve=this.spec.reserve}canFire(e){return!this.reloading&&this.ammo>0&&e-this.lastShot>=this.spec.fireMs}fired(e){this.lastShot=e,this.ammo--}reloadProgress(e){return this.reloading?Math.min(1,(e-this.reloadStartedAt)/this.spec.reloadMs):0}cancelReload(){this.reloadGeneration++,this.reloadTimer!==void 0&&window.clearTimeout(this.reloadTimer),this.reloadTimer=void 0,this.reloading=!1,this.reloadStartedAt=0}reload(e){if(this.reloading)return"reloading";if(this.ammo>=this.spec.magazine)return"full";if(!this.reserve)return"empty";const t=++this.reloadGeneration,n=this.spec;return this.reloading=!0,this.reloadStartedAt=performance.now(),this.reloadTimer=window.setTimeout(()=>{if(t!==this.reloadGeneration||this.spec!==n)return;const s=Math.min(this.spec.magazine-this.ammo,this.reserve);this.ammo+=s,this.reserve-=s,this.reloadTimer=void 0,this.reloading=!1,this.reloadStartedAt=0,e()},this.spec.reloadMs),"started"}}const nd=["frontier-rifle","modern-rifle","smg","sniper-rifle","pistol"];function id(i,e){const t=yi[i];return`<button class="arena-shop-item" ${e==="buy"?"data-arena-loadout":"data-arena-equip"}="${i}" data-weapon="${i}"><span><b>${t.name}</b><small>${t.price?`$${t.price}`:"STANDARD ISSUE: INCLUDED"}</small></span><em data-weapon-state="${i}">AVAILABLE</em></button>`}function Po(i,e){return`<header><div><p class="eyebrow">${i}</p><h2>${e}</h2></div><button class="arena-panel-close" data-arena-close>CLOSE</button></header>`}function rx(i,e){return`<section class="arena-game" id="arena-game">
    <div class="arena-heading"><h1>IRON YARD</h1><p>Offline bot matches and private 1v1.</p></div>
    <div class="arena-menu" id="arena-menu">
      <div><p class="eyebrow">OFFLINE</p><h2>BOT MATCH</h2><label>MAP<select id="arena-map">${Io.map(t=>`<option value="${t}">${jt[t].name}</option>`).join("")}</select></label><p class="arena-map-note">${Io.map(t=>`<b>${jt[t].name}:</b> ${jt[t].description}`).join("<br />")}</p><label>BOT DIFFICULTY<select id="arena-difficulty"><option value="rookie" >ROOKIE</option><option value="standard" selected>STANDARD</option><option value="veteran" >VETERAN</option></select></label><label>BOTS<select id="arena-bot-count"><option value="1" selected>1 BOT</option><option value="2" >2 BOTS</option><option value="3" >3 BOTS</option></select></label><p class="arena-map-lock">MAP LOCKS WHEN THE MATCH STARTS.</p><div class="arena-menu-actions"><button id="arena-bot" class="primary">START BOT MATCH</button></div></div>
      <div><p class="eyebrow">ONLINE</p><h2>PRIVATE 1V1 & QUICK GAME</h2><p class="arena-muted">Choose a map for private rooms, or queue anonymously for the next available rival. The server locks the selected map for both players.</p>${i?`<label>PRIVATE MAP<select id="arena-online-map">${Io.map(t=>`<option value="${t}">${jt[t].name}</option>`).join("")}</select></label><div class="arena-menu-actions"><button id="arena-create" class="outline">CREATE ROOM</button><button id="arena-copy-room" class="outline" disabled>COPY CODE</button><button id="arena-share-room" class="outline" hidden>SHARE CODE</button></div><label>ROOM CODE <input id="arena-room-code" maxlength="6" autocomplete="off" /></label><button id="arena-join" class="outline">JOIN ROOM</button><label>QUICK GAME MAP<select id="arena-quick-map"><option value="any">ANY MAP</option>${Io.map(t=>`<option value="${t}">${jt[t].name}</option>`).join("")}</select></label><div class="arena-menu-actions"><button id="arena-quick-game" class="primary">QUICK GAME</button><button id="arena-cancel-queue" class="outline">CANCEL SEARCH</button></div><p id="arena-online-status" class="arena-muted" aria-live="polite">CREATE A ROOM, JOIN A CODE, OR SEARCH FOR A QUICK GAME RIVAL.</p>`:'<p class="arena-muted">Private 1v1 needs a separately deployed WebSocket service. A Vercel/static frontend cannot run this server; set VITE_ARENA_SERVER_URL after deploying server/.</p>'}<button id="arena-return" class="text-button">RETURN TO SITE</button></div>
    </div>
    <div class="arena-frame" aria-label="Iron Yard game view">
      <div id="arena-canvas"></div>
      <div class="arena-round-hud"><span id="arena-rival"></span><b id="arena-phase"></b><span id="arena-score"></span></div>
      <div class="arena-status"><span id="arena-health"></span><span id="arena-ammo"></span><span id="arena-cash"></span></div>
      <p class="arena-message" id="arena-message" aria-live="polite">SELECT A MATCH TYPE TO ENTER THE YARD.</p>
      <div class="arena-reticle" id="arena-crosshair" aria-hidden="true"><i></i><b></b><em></em></div>
       <p class="arena-feedback" id="arena-feedback" aria-live="polite"></p>
       
       <button class="arena-lock" id="arena-lock" hidden>CLICK TO DEPLOY</button>
       <div class="arena-rotate" id="arena-rotate" aria-live="polite"><span>↻</span><b>ROTATE YOUR DEVICE</b><small>Iron Yard plays best in landscape.</small></div>
       <div class="arena-touch-controls" id="arena-touch-controls" data-enabled="false" aria-label="Touch controls"><div class="touch-stick-area" id="touch-stick-area"><i class="touch-stick" id="touch-stick" data-x="0" data-y="0"></i></div><div class="touch-aim-area" id="touch-aim-area"></div><button class="touch-button touch-left-fire" data-touch-action="fire" aria-label="Left fire">FIRE</button><button class="touch-button touch-fire" data-touch-action="fire" aria-label="Fire">FIRE</button><button class="touch-button touch-ads" data-touch-action="ads" aria-label="Aim down sights">ADS</button><button class="touch-button touch-jump" data-touch-action="jump" aria-label="Jump">JUMP</button><button class="touch-button touch-crouch" data-touch-action="crouch" aria-label="Crouch">CROUCH</button><button class="touch-button touch-reload" data-touch-action="reload" aria-label="Reload">RLD</button></div>
       <div class="arena-pause" id="arena-pause" hidden><b>MOUSE RELEASED</b><span>CLICK THE YARD TO RESUME</span></div>
       <div class="arena-action-bar" aria-label="Game actions"><button data-arena-panel="buy">BUY WEAPONS <kbd>B</kbd></button><button data-arena-panel="loadout">CHANGE WEAPON</button><button data-arena-panel="settings">SETTINGS</button><button data-arena-panel="pause">PAUSE GAME</button><button id="arena-leave" hidden>LEAVE 1V1</button><button id="arena-fullscreen" aria-pressed="false">FULL SCREEN <kbd>F</kbd></button></div>
      <section class="arena-panel" id="arena-buy-panel" hidden>${Po("BUY","WEAPONS")}<div class="arena-buy-readout"><b id="arena-buy-cash"></b><span id="arena-buy-phase"></span><span id="arena-buy-zone"></span></div><p class="arena-panel-note" id="arena-buy-requirement"></p><div class="arena-shop-list">${nd.map(t=>id(t,"buy")).join("")}</div></section>
      <section class="arena-panel" id="arena-loadout-panel" hidden>${Po("LOADOUT","SELECT WEAPON")}<p class="arena-panel-note">Equip an owned weapon.</p><div class="arena-shop-list">${nd.map(t=>id(t,"equip")).join("")}</div></section>
       <section class="arena-panel arena-settings-panel" id="arena-settings-panel" hidden>${Po("SETTINGS","SETTINGS")}<div class="arena-settings-grid"><label>SENSITIVITY<input id="fps-sensitivity" type="range" min="0.0005" max="0.006" step="0.0001" /><output id="fps-sensitivity-value"></output></label><label>RETICLE COLOR<input id="cross-color" type="color" /></label><label>RETICLE SIZE<input id="cross-size" type="range" min="3" max="24" step="1" /></label><label>GRAPHICS<select id="graphics-quality"><option value="low">LOW</option><option value="medium">MEDIUM</option><option value="high">HIGH</option></select></label><label>RENDER SCALE<input id="graphics-pixel-ratio" type="range" min="1" max="2" step="0.1" /></label><label class="arena-check">SHADOWS<input id="graphics-shadows" type="checkbox" /></label><label>TOUCH CONTROLS<select id="touch-controls"><option value="auto">AUTO</option><option value="on">ON</option><option value="off">OFF</option></select></label><label>JOYSTICK<select id="touch-joystick"><option value="fixed">FIXED</option><option value="floating">FLOATING</option></select></label><label>TOUCH SIZE<input id="touch-size" type="range" min="56" max="112" step="2" /></label><label>BUTTON OPACITY<input id="touch-opacity" type="range" min="20" max="100" step="5" /></label><label>HORIZONTAL AIM<input id="touch-horizontal" type="range" min="0.4" max="2" step="0.1" /></label><label>VERTICAL AIM<input id="touch-vertical" type="range" min="0.4" max="2" step="0.1" /></label><label class="arena-check">HAPTICS<input id="touch-haptics" type="checkbox" /></label></div><div class="binding-grid">${["forward","back","left","right","reload","jump"].map(t=>`<button data-bind="${t}">${t.toUpperCase()} <b></b></button>`).join("")}</div><p id="binding-notice" class="arena-panel-note"></p><div class="arena-settings-actions"><button id="settings-reset" class="outline">RESET DEFAULTS</button><button id="cross-share" class="outline">COPY RETICLE</button><label>IMPORT RETICLE<input id="cross-import" /></label></div></section>
      <section class="arena-panel arena-pause-panel" id="arena-pause-panel" hidden>${Po("GAME","PAUSED")}<p class="arena-panel-note">The round timer is paused.</p><div class="arena-pause-actions"><button data-arena-close class="primary">RESUME</button><button id="arena-return-panel" class="outline">RETURN TO SITE</button></div></section>
    </div>
  </section>`}function ox(i,e){i.health.textContent=`HEALTH ${Math.ceil(e.health)}`,i.ammo.textContent=e.ammo,i.rival.textContent=e.rival,i.phase.textContent=e.phaseLabel,i.phase.dataset.phase=e.phase,i.cash.textContent=`$${e.cash}`,i.score.textContent=`${e.eliminations} ELIMS · ${e.deaths} DEATHS`}const ax={difficulty:"standard",botCount:1};class cx{constructor(){me(this,"phase","menu");me(this,"cash",3200);me(this,"eliminations",0);me(this,"deaths",0);me(this,"endsAt",0)}start(e){this.phase="buy",this.eliminations=0,this.deaths=0,this.endsAt=e+3e4}tick(e){if(this.phase==="buy"&&e>=this.endsAt)return this.phase="live",this.endsAt=e+9e4,this.phase;if(this.phase==="live"&&(e>=this.endsAt||this.eliminations>=8))return this.phase="round-end",this.endsAt=e+7e3,this.phase;if(this.phase==="round-end"&&e>=this.endsAt)return this.start(e),this.phase}canBuy(e){return!0}buy(e,t,n,s){return n.has(e)?"ALREADY OWNED.":t>this.cash?`NEED $${t-this.cash} MORE.`:(this.cash-=t,n.add(e),"")}elimination(){this.eliminations++,this.cash+=1e3}death(){this.deaths++,this.cash=Math.max(0,this.cash-300)}label(e){const t=Math.max(0,Math.ceil((this.endsAt-e)/1e3));return this.phase==="buy"?`BUY PHASE: ${t} SEC`:this.phase==="live"?`LIVE ROUND: ${t} SEC`:this.phase==="round-end"?`ROUND COMPLETE: ${t} SEC`:"MATCH NOT STARTED"}}let Ei;function lx(){return rx(!!Hc())}function ux(i){var on,an,Wt,Kt,Ss,Qn,Sl,xl,yl;Ei==null||Ei();const e=document.querySelector(".arena-frame"),t=document.querySelector("#arena-canvas"),n=document.querySelector("#arena-message"),s=document.querySelector("#arena-lock"),r=document.querySelector("#arena-health"),o=document.querySelector("#arena-ammo"),a=document.querySelector("#arena-rival"),c=document.querySelector("#arena-phase"),l=document.querySelector("#arena-cash"),u=document.querySelector("#arena-score"),d=document.querySelector("#arena-crosshair"),h=document.querySelector("#arena-pause"),p=document.querySelector("#arena-feedback"),g=document.querySelector("#arena-buy-cash"),_=document.querySelector("#arena-buy-phase"),m=document.querySelector("#arena-buy-zone"),f=document.querySelector("#arena-buy-requirement"),M=document.querySelector("#arena-fullscreen"),T=document.querySelector("#arena-online-status"),x=document.querySelector("#arena-copy-room"),w=document.querySelector("#arena-share-room"),C=document.querySelector("#arena-leave"),I=document.querySelector("#arena-net-debug");if(!e||!t||!n||!s||!r||!o||!a||!c||!l||!u||!d||!h||!p||!g||!_||!m||!f||!M)return;const A=tx(),y=new _p,S=new un(A.fov,16/9,.05,90),L=BS(t,A.graphics),U=[],H=td(y,"iron-yard"),W=new QS(S,U),V=new sx,Y=new ex,J=new JS,k=new cx;U.push(...H.colliders),S.position.copy(H.playerSpawn),y.add(S);const le=new Wp("#dce9ed","#343334",2),de=new Kd("#ffe0bb",3);de.castShadow=A.graphics.shadows,y.add(le,de);let Ae=Zu(S,V.spec.id),He=[],te,Xe,Oe=!1,X=!1,Q=!1,ye=0,ze=0,ge="",je="iron-yard",Ht=0,P=performance.now(),xt={...ax},Pe,Ne=0,Te,mt;const xe=[];let Ge=[];const bt=new Set(["pistol"]),It=new um,b=new dl("#ffbd72",0,4);S.add(b);let v=H;const B=R=>{const oe=R.atmosphere;y.background=new $e(oe.background),y.fog=new rl(oe.fog,oe.fogNear,oe.fogFar),le.color.set(oe.sky),le.groundColor.set(oe.ground),de.color.set(oe.light),de.position.set(...oe.lightPosition),de.intensity=oe.lightIntensity},Z=R=>{const oe=new Set,ke=new Set;R.group.traverse(it=>{it instanceof wt&&(it.geometry.dispose(),(Array.isArray(it.material)?it.material:[it.material]).forEach(gt=>oe.add(gt)))}),oe.forEach(it=>{Object.values(it).forEach(gt=>{gt instanceof kt&&ke.add(gt)}),it.dispose()}),ke.forEach(it=>it.dispose()),y.remove(R.group)},ee=R=>{Z(v),v=td(y,R),U.splice(0,U.length,...v.colliders),B(v)};B(v);const K=()=>S.position.distanceTo(v.playerSpawn)<v.buyRadius,Re={buy:document.querySelector("#arena-buy-panel"),loadout:document.querySelector("#arena-loadout-panel"),settings:document.querySelector("#arena-settings-panel"),pause:document.querySelector("#arena-pause-panel")},ae=(R=performance.now())=>{const oe=k.canBuy(K());g.textContent=`CASH $${k.cash}`,_.textContent=Oe?"ONLINE BUY ANYTIME":"BUY ANYTIME",m.textContent="BUY ANYWHERE",f.textContent=oe?"Select a weapon to buy and equip it at any time.":"BUYING IS TEMPORARILY UNAVAILABLE.",document.querySelectorAll("[data-weapon]").forEach(ke=>{const it=ke.dataset.weapon,gt=yi[it],ft=bt.has(it),pt=V.spec.id===it,Ze=ke.hasAttribute("data-arena-loadout"),Lt=pt?"EQUIPPED":ft?"OWNED · EQUIP":Ze?gt.price>k.cash?`NEED $${gt.price-k.cash}`:oe?"BUY":"LOCKED":"NOT OWNED";ke.querySelector("[data-weapon-state]").textContent=Lt,ke.disabled=Ze?!ft&&(!oe||gt.price>k.cash):!ft,ke.dataset.owned=String(ft),ke.dataset.equipped=String(pt)})},_e=(R=performance.now())=>{ox({health:r,ammo:o,rival:a,phase:c,cash:l,score:u},{health:W.health,ammo:V.reloading?"RELOADING":`${V.ammo} / ${V.reserve}`,rival:Oe?"RIVAL LIVE":`${He.length} BOT${He.length===1?"":"S"}`,phase:Oe?"live":k.phase,phaseLabel:Oe?`ONLINE 1V1${ge?` · ${ge}`:""}`:k.label(R),cash:k.cash,eliminations:Oe?ye:k.eliminations,deaths:Oe?ze:k.deaths}),ae(R)},we=R=>!Oe&&(R==="settings"||R==="pause"),se=()=>{Ne&&(k.endsAt+=performance.now()-Ne,Ne=0)},fe=()=>{Pe&&(we(Pe)&&se(),Re[Pe].hidden=!0,Pe=void 0,h.hidden=document.pointerLockElement===L.domElement||!X,_e())},Be=R=>{var oe;if(Pe===R){fe();return}Pe&&(we(Pe)&&!we(R)&&se(),Re[Pe].hidden=!0),X&&!Ne&&we(R)&&(Ne=performance.now()),Pe=R,(oe=document.exitPointerLock)==null||oe.call(document),Re[R].hidden=!1,h.hidden=!0,_e()},Le=()=>{He.forEach(R=>y.remove(R.group)),He=Array.from({length:xt.botCount},(R,oe)=>{const ke=Ju(oe?"#405e6a":"#6a4e47",oe%2?"character-f":"character-a"),it=v.botSpawns[oe%v.botSpawns.length];ke.position.copy(it),y.add(ke);const gt={group:ke,health:100,velocity:new D,spawn:ke.position.clone(),seed:439041101+oe,lastSeen:ke.position.clone(),nextDecision:0,reactionUntil:0,nextShot:0,reloadUntil:0,burstShots:0,strafe:oe%2?-1:1};return Gu(gt,performance.now()),gt})},ue=()=>{S.position.copy(v.playerSpawn),W.velocity.set(0,0,0),W.health=100},Ye=(R=!1,oe="iron-yard")=>{ee(oe),Oe=R,Ne=0,Oe?(He.forEach(ke=>y.remove(ke.group)),He=[],te==null||te.removeFromParent(),te=void 0,xe.splice(0),mt=void 0,Ge=[],ye=0,ze=0,bt.clear(),bt.add("pistol"),k.cash=3200,C.hidden=!1):(Le(),k.start(performance.now()),ue(),C.hidden=!0),X=!0,s.hidden=!1,document.querySelectorAll("#arena-fire,#arena-reload,#arena-ads").forEach(ke=>ke.disabled=!1),n.textContent=Oe?`RIVAL CONNECTED. ${v.name.toUpperCase()} IS LIVE. CLICK TO DEPLOY.`:`${v.name.toUpperCase()} READY. PRESS B TO BUY WEAPONS ANYTIME.`,_e()},N=(R,oe,ke="#ffd28a")=>{const it=new ta(new En().setFromPoints([R,oe]),new ll({color:ke}));y.add(it),window.setTimeout(()=>{y.remove(it),it.geometry.dispose(),it.material.dispose()},90)},re=(R,oe)=>{let ke=1/0;for(const it of U){const gt=new D;It.ray.set(R,oe).intersectBox(it,gt)&&(ke=Math.min(ke,gt.distanceTo(R)))}return ke},ce=R=>{p.textContent=R,window.setTimeout(()=>{p.textContent=""},380)},Me=()=>{var pt;const R=performance.now();if(!X||Pe||!We()||!V.canFire(R)||!Oe&&k.phase==="round-end")return;V.fired(R),kS(Ae,R),Y.kick(V.spec.recoil,V.spec.recoil*.55),b.intensity=5,window.setTimeout(()=>b.intensity=0,35);const oe=S.position.clone(),ke=new D;S.getWorldDirection(ke),ke.x+=(Math.random()-.5)*V.spec.spread,ke.y+=(Math.random()-.5)*V.spec.spread,ke.normalize(),It.set(oe,ke);const it=re(oe,ke),gt=He.flatMap(Ze=>{const Lt=It.intersectObject(Ze.group,!0)[0];return Lt&&Lt.distance<it?[{bot:Ze,hit:Lt}]:[]}).sort((Ze,Lt)=>Ze.hit.distance-Lt.hit.distance),ft=((pt=gt[0])==null?void 0:pt.hit.point)??oe.clone().addScaledVector(ke,Math.min(it,35));if(N(oe,ft),Oe)J.send({type:"shot",weapon:V.spec.id,yaw:W.yaw,pitch:W.pitch,shotTick:J.serverTick()});else if(gt[0]){const{bot:Ze,hit:Lt}=gt[0],_n=Lt.point.y-Ze.group.position.y>1.35;Ze.health-=_n?V.spec.headshot:V.spec.damage,ce(_n?"HEADSHOT":"HIT"),sn("impact"),Ze.health<=0&&(k.elimination(),Ze.health=100,Ze.group.position.copy(Ze.spawn),Gu(Ze,R),n.textContent="ELIMINATION. +$1000. TARGET REDEPLOYED.")}sn({frontier:"frontier-shot",modern:"modern-shot",pistol:"pistol-shot"}[V.spec.sound]),_e(R)},ne=new Zv(L.domElement,(R,oe)=>W.look(R,oe,A.sensitivity),Me,()=>Q=!Q,A.bindings);let j;const be=()=>!!(j!=null&&j.enabled),We=()=>document.pointerLockElement===L.domElement||be(),yt=()=>{if(!(!X||Pe)){if(be()){s.hidden=!0,h.hidden=!0;return}L.domElement.requestPointerLock().catch(()=>n.textContent="POINTER LOCK WAS BLOCKED. CLICK AGAIN.")}},ut=()=>{const R=t.getBoundingClientRect();L.setSize(R.width,R.height,!1),S.aspect=R.width/R.height,S.updateProjectionMatrix()},In=new ResizeObserver(ut);In.observe(t),ut(),br(d,A.crosshair);const Mn=()=>{if(!X||Pe||!We())return;const R=V.reload(()=>{sn("reload"),n.textContent="RELOAD COMPLETE.",_e()});R==="started"&&(n.textContent="RELOADING..."),R==="reloading"&&(n.textContent="RELOAD IN PROGRESS."),R==="full"&&(n.textContent="MAGAZINE FULL."),R==="empty"&&(n.textContent="NO RESERVE AMMO."),_e()},hr=document.querySelector("#arena-touch-controls"),Jn=document.querySelector("#touch-stick-area"),ms=document.querySelector("#touch-aim-area"),fr=document.querySelector("#touch-stick"),gs=()=>{if(!j)return;j.applyOptions(A.touch);const R=A.touch.controls==="on"||A.touch.controls==="auto"&&matchMedia("(pointer: coarse)").matches;j.setEnabled(R),e.dataset.touch=String(R),s.textContent=R?"TAP TO START":"CLICK TO DEPLOY"};hr&&Jn&&ms&&fr&&(j=new Jv(hr,Jn,ms,fr,A.touch,(R,oe)=>W.look(R,oe,A.sensitivity),Me,Mn),gs());const wi=R=>{V.select(R),S.remove(Ae),Ae=Zu(S,R),n.textContent=`${yi[R].name} EQUIPPED.`,_e()},pr=R=>{if(Oe){J.send({type:"purchase",weapon:R}),n.textContent=`BUYING ${yi[R].name}...`;return}if(!bt.has(R)){const oe=k.buy(R,yi[R].price,bt,K());if(oe){n.textContent=oe,_e();return}n.textContent=`${yi[R].name} PURCHASED.`}wi(R)},$i=R=>{S.position.set(R.x*8,1.7+R.y,1-R.z*12),W.yaw=R.yaw,W.pitch=R.pitch,W.velocity.set(0,0,0),W.health=R.health},Xt=R=>{T&&(T.textContent=R)},Ri=()=>{x&&(x.disabled=!ge),w&&(w.hidden=!ge||!navigator.share)},oa=R=>{I&&(I.textContent=`NET ${R.transport.toUpperCase()} ${R.rttMs}MS +/-${R.jitterMs} | SNAP ${R.snapshotsPerSecond}/S LOSS ${R.snapshotLoss} | TICK ${R.serverTick} LAG ${R.serverLagMs}MS | SIM DROP ${R.simulatedDrops}`)},mr=R=>{var oe,ke,it;if(R.type==="connection"){R.status==="connecting"&&Xt("CONNECTING TO THE PRIVATE 1V1 SERVER..."),R.status==="connected"&&Xt("CONNECTED. CONFIRMING YOUR ROOM..."),R.status==="reconnecting"&&(X=!1,(oe=document.exitPointerLock)==null||oe.call(document),n.textContent="CONNECTION DROPPED. RECONNECTING TO YOUR RESERVED SEAT...",Xt("RECONNECTING. YOUR SEAT IS RESERVED FOR 30 SECONDS.")),R.status==="closed"&&(X=!1,(ke=document.exitPointerLock)==null||ke.call(document),n.textContent="CONNECTION CLOSED. CREATE OR JOIN A ROOM TO TRY AGAIN.",Xt(R.reason?`CONNECTION CLOSED: ${R.reason}`:"CONNECTION CLOSED. THE PRIVATE SERVER MAY BE UNAVAILABLE."));return}if(R.type==="joined"){Xe=R.seat,ge=R.room,je=jt[R.map]?R.map:"iron-yard",ee(je),Ri(),n.textContent=`ROOM ${R.room}. ${jt[je].name.toUpperCase()} SELECTED. WAITING FOR RIVAL.`,Xt(R.seat==="host"?`ROOM ${R.room} CREATED ON ${jt[je].name.toUpperCase()}. SHARE THE CODE; PLAY STARTS AUTOMATICALLY WHEN THEY JOIN.`:`JOINED ROOM ${R.room} ON ${jt[je].name.toUpperCase()}. WAITING FOR THE HOST TO START.`);return}if(R.type==="queue-status"){Xt(R.searching?`QUICK GAME SEARCHING: ${(R.map??"any").replaceAll("-"," ").toUpperCase()}.`:"QUICK GAME SEARCH CANCELLED.");return}if(R.type==="state"&&!R.started){Xe&&Xt(`ROOM ${ge}. WAITING FOR THE OTHER PLAYER.`);return}if(R.type==="state"&&R.started&&!X&&Ye(!0,jt[R.map]?R.map:je),R.type==="state"&&X&&Xe){const gt=Xe,ft=R.players[gt],pt=R.players[gt==="host"?"guest":"host"],Ze=Number.isFinite(ft.y)?ft.y:0,Lt=Number.isFinite(pt.y)?pt.y:0;te||(te=Ju("#405e6a","character-k"),y.add(te),$i({...ft,y:Ze})),Ge=Ge.filter(Bn=>Bn>R.ack[gt]);const _n=new D(ft.x*8,1.7+Ze,1-ft.z*12);for(S.position.distanceTo(_n)>.12&&(mt=_n),xe.push({receivedAt:performance.now(),x:pt.x,y:Lt,z:pt.z,yaw:pt.yaw});xe.length>12;)xe.shift();Number.isFinite(ft.cash)&&(k.cash=ft.cash),Array.isArray(ft.owned)&&ft.owned.forEach(Bn=>bt.add(Bn)),W.health=ft.health,ye=ft.kills,ze=ft.deaths,Xt(`ROOM ${ge}. LIVE: ${ft.kills} ELIMS / ${ft.deaths} DEATHS.`),_e();return}if(R.type==="shot"){R.seat!==Xe&&te&&Qu(te,performance.now()),ce(R.hit?"HIT CONFIRMED":"SHOT WIDE");return}if(R.type==="elimination"){const gt=R.killer===Xe;gt&&k.elimination(),ce(gt?"ELIMINATION":"YOU WERE ELIMINATED"),n.textContent=gt?"ELIMINATION CONFIRMED. +$1000.":"YOU WERE ELIMINATED. RESPAWNING.";return}if(R.type==="respawn"){R.seat===Xe&&$i(R.player),n.textContent=R.seat===Xe?"YOU RESPAWNED":"RIVAL RESPAWNED";return}if(R.type==="purchase"){bt.add(R.weapon),k.cash=R.cash,wi(R.weapon),n.textContent=`${yi[R.weapon].name} EQUIPPED.`;return}if(R.type==="opponent-left"){X=!1,(it=document.exitPointerLock)==null||it.call(document),n.textContent=R.reconnecting?"RIVAL DISCONNECTED. THEIR SEAT IS HELD FOR 30 SECONDS.":"RIVAL LEFT THE PRIVATE ROOM.",Xt(R.reconnecting?"RIVAL DISCONNECTED. WAITING FOR THEIR RECONNECT.":"RIVAL LEFT. CREATE A NEW ROOM OR RETURN TO SITE.");return}if(R.type==="metrics"){oa(R.value);return}R.type==="error"&&(n.textContent=R.message,Xt(R.message))};let Xi=!1;const to=()=>{const R=document.pointerLockElement===L.domElement;h.hidden=R||be()||!X||!!Pe||Xi,s.hidden=R},_s=()=>{const R=document.querySelector("#fps-sensitivity"),oe=document.querySelector("#fps-sensitivity-value"),ke=document.querySelector("#cross-color"),it=document.querySelector("#cross-size"),gt=document.querySelector("#graphics-quality"),ft=document.querySelector("#graphics-pixel-ratio"),pt=document.querySelector("#graphics-shadows");R&&(R.value=String(A.sensitivity)),oe&&(oe.value=A.sensitivity.toFixed(4)),ke&&(ke.value=A.crosshair.color),it&&(it.value=String(A.crosshair.size)),gt&&(gt.value=A.graphics.quality),ft&&(ft.value=String(A.graphics.pixelRatio)),pt&&(pt.checked=A.graphics.shadows);const Ze=document.querySelector("#touch-controls"),Lt=document.querySelector("#touch-joystick"),_n=document.querySelector("#touch-size"),Bn=document.querySelector("#touch-opacity"),xs=document.querySelector("#touch-horizontal"),Yi=document.querySelector("#touch-vertical"),El=document.querySelector("#touch-haptics");Ze&&(Ze.value=A.touch.controls),Lt&&(Lt.value=A.touch.joystick),_n&&(_n.value=String(A.touch.size)),Bn&&(Bn.value=String(A.touch.opacity)),xs&&(xs.value=String(A.touch.horizontalSensitivity)),Yi&&(Yi.value=String(A.touch.verticalSensitivity)),El&&(El.checked=A.touch.haptics),document.querySelectorAll("[data-bind]").forEach(Ml=>{const yh=Ml.dataset.bind;Ml.querySelector("b").textContent=A.bindings[yh].replace("Key","")})},vs=()=>{(!Go[A.graphics.quality]||!Number.isFinite(A.graphics.pixelRatio))&&(A.graphics={...Go.medium}),A.graphics.pixelRatio=Nn.clamp(A.graphics.pixelRatio,.75,2),sh(L,A.graphics),de.castShadow=A.graphics.shadows,ut(),L.setClearColor(v.atmosphere.background,1),is(A)},E=document.querySelector("#fps-sensitivity"),O=document.querySelector("#fps-sensitivity-value"),z=document.querySelector("#cross-color"),G=document.querySelector("#cross-size"),F=document.querySelector("#graphics-quality"),ie=document.querySelector("#graphics-pixel-ratio"),he=document.querySelector("#graphics-shadows"),Ee=document.querySelector("#touch-controls"),ve=document.querySelector("#touch-joystick"),Ue=document.querySelector("#touch-size"),Fe=document.querySelector("#touch-opacity"),Ce=document.querySelector("#touch-horizontal"),Ke=document.querySelector("#touch-vertical"),lt=document.querySelector("#touch-haptics");E&&(E.oninput=()=>{A.sensitivity=Number(E.value),O&&(O.value=A.sensitivity.toFixed(4)),is(A)}),z&&(z.oninput=()=>{A.crosshair.color=z.value,br(d,A.crosshair),is(A)}),G&&(G.oninput=()=>{A.crosshair.size=Number(G.value),br(d,A.crosshair),is(A)}),F&&(F.onchange=()=>{const R=Go[F.value];R&&(A.graphics={...R},vs())}),ie&&(ie.oninput=()=>{A.graphics.pixelRatio=Number(ie.value),vs()}),he&&(he.onchange=()=>{A.graphics.shadows=he.checked,vs()});const vt=()=>{const R=Ee==null?void 0:Ee.value,oe=ve==null?void 0:ve.value;(R==="auto"||R==="on"||R==="off")&&(A.touch.controls=R),(oe==="fixed"||oe==="floating")&&(A.touch.joystick=oe),A.touch.size=Number((Ue==null?void 0:Ue.value)??A.touch.size),A.touch.opacity=Number((Fe==null?void 0:Fe.value)??A.touch.opacity),A.touch.horizontalSensitivity=Number((Ce==null?void 0:Ce.value)??A.touch.horizontalSensitivity),A.touch.verticalSensitivity=Number((Ke==null?void 0:Ke.value)??A.touch.verticalSensitivity),A.touch.haptics=(lt==null?void 0:lt.checked)??A.touch.haptics,gs(),is(A)};Ee==null||Ee.addEventListener("change",vt),ve==null||ve.addEventListener("change",vt),Ue==null||Ue.addEventListener("input",vt),Fe==null||Fe.addEventListener("input",vt),Ce==null||Ce.addEventListener("input",vt),Ke==null||Ke.addEventListener("input",vt),lt==null||lt.addEventListener("change",vt);const Et=J.simulationSettings(),ot=document.querySelector("#arena-net-latency"),Ie=document.querySelector("#arena-net-jitter"),ht=document.querySelector("#arena-net-loss");ot&&(ot.value=String(Et.latencyMs)),Ie&&(Ie.value=String(Et.jitterMs)),ht&&(ht.value=String(Et.lossPercent));const at=()=>J.setSimulation({latencyMs:Number(ot==null?void 0:ot.value),jitterMs:Number(Ie==null?void 0:Ie.value),lossPercent:Number(ht==null?void 0:ht.value)});ot==null||ot.addEventListener("change",at),Ie==null||Ie.addEventListener("change",at),ht==null||ht.addEventListener("change",at),(on=document.querySelector("#settings-reset"))==null||on.addEventListener("click",()=>{const R=structuredClone(Vo);A.sensitivity=R.sensitivity,A.fov=R.fov,Object.assign(A.crosshair,R.crosshair),Object.assign(A.graphics,R.graphics),Object.assign(A.touch,R.touch),Object.assign(A.bindings,R.bindings),br(d,A.crosshair),gs(),vs(),_s(),document.querySelector("#binding-notice").textContent="DEFAULT SETTINGS RESTORED."}),(an=document.querySelector("#cross-share"))==null||an.addEventListener("click",()=>{var R;return(R=navigator.clipboard)==null?void 0:R.writeText(nx(A.crosshair))}),(Wt=document.querySelector("#cross-import"))==null||Wt.addEventListener("change",R=>{const oe=ix(R.target.value);oe&&(A.crosshair=oe,br(d,oe),is(A),_s())}),_s(),_e(),(Kt=document.querySelector("#arena-bot"))==null||Kt.addEventListener("click",()=>{var oe,ke,it;xt={difficulty:((oe=document.querySelector("#arena-difficulty"))==null?void 0:oe.value)??"standard",botCount:Number(((ke=document.querySelector("#arena-bot-count"))==null?void 0:ke.value)??1)};const R=(it=document.querySelector("#arena-map"))==null?void 0:it.value;Ye(!1,jt[R]?R:"iron-yard")}),(Ss=document.querySelector("#arena-create"))==null||Ss.addEventListener("click",()=>{var oe;const R=(oe=document.querySelector("#arena-online-map"))==null?void 0:oe.value;jt[R]&&J.connect("create",R,mr)&&(ge="",Ri(),n.textContent=`CREATING ${jt[R].name.toUpperCase()} PRIVATE ROOM...`)}),(Qn=document.querySelector("#arena-join"))==null||Qn.addEventListener("click",()=>{var oe;const R=((oe=document.querySelector("#arena-room-code"))==null?void 0:oe.value.trim().toUpperCase())??"";if(!/^[A-Z0-9]{6}$/.test(R)){Xt("ENTER THE SIX-CHARACTER ROOM CODE.");return}J.connect("join",R,mr)&&(ge="",Ri(),n.textContent="JOINING PRIVATE ROOM...")}),(Sl=document.querySelector("#arena-quick-game"))==null||Sl.addEventListener("click",()=>{var oe;const R=(oe=document.querySelector("#arena-quick-map"))==null?void 0:oe.value;J.connect("queue",R,mr)&&(ge="",Ri(),n.textContent="SEARCHING FOR A QUICK GAME RIVAL...")}),(xl=document.querySelector("#arena-cancel-queue"))==null||xl.addEventListener("click",()=>J.cancelQueue()),x==null||x.addEventListener("click",()=>{!ge||!navigator.clipboard||navigator.clipboard.writeText(ge).then(()=>Xt(`ROOM CODE ${ge} COPIED.`)).catch(()=>Xt("THE BROWSER COULD NOT COPY THE ROOM CODE."))}),w==null||w.addEventListener("click",()=>{!ge||!navigator.share||navigator.share({title:"High Noon Showdown: Iron Yard",text:`Join my Iron Yard private 1v1 room: ${ge}`}).catch(()=>{})}),C==null||C.addEventListener("click",()=>{var R;J.close(),X=!1,Oe=!1,ge="",te==null||te.removeFromParent(),te=void 0,C.hidden=!0,Ri(),(R=document.exitPointerLock)==null||R.call(document),n.textContent="YOU LEFT THE PRIVATE ROOM.",Xt("YOU LEFT THE PRIVATE ROOM. CREATE OR JOIN ANOTHER CODE."),_e()}),document.querySelectorAll("[data-arena-panel]").forEach(R=>R.addEventListener("click",()=>Be(R.dataset.arenaPanel))),document.querySelectorAll("[data-arena-close]").forEach(R=>R.addEventListener("click",fe)),document.querySelectorAll("[data-arena-loadout]").forEach(R=>R.addEventListener("click",()=>pr(R.dataset.arenaLoadout))),document.querySelectorAll("[data-arena-equip]").forEach(R=>R.addEventListener("click",()=>{const oe=R.dataset.arenaEquip;bt.has(oe)&&(Oe?pr(oe):wi(oe))})),(yl=document.querySelector("#arena-return-panel"))==null||yl.addEventListener("click",()=>{var R;return(R=document.querySelector("#arena-return"))==null?void 0:R.click()});const Yt=()=>{const R=document.fullscreenElement===e;M.textContent=R?"EXIT FULL SCREEN (F)":"FULL SCREEN (F)",M.setAttribute("aria-pressed",String(R)),!R&&Xi&&(h.hidden=!0,window.setTimeout(()=>Xi=!1,0))},di=()=>{document.fullscreenElement===e?document.exitFullscreen().catch(()=>{}):!document.fullscreenElement&&document.fullscreenEnabled&&e.requestFullscreen().catch(()=>n.textContent="FULLSCREEN WAS BLOCKED BY THE BROWSER.")};M.addEventListener("click",di),document.addEventListener("fullscreenchange",Yt),Yt(),s.addEventListener("click",yt),L.domElement.addEventListener("click",yt),L.domElement.addEventListener("contextmenu",R=>R.preventDefault());const Qt=R=>{if(Te){const oe=Object.entries(A.bindings).find(([ke,it])=>ke!==Te&&it===R.code);oe?document.querySelector("#binding-notice").textContent=`${R.code.replace("Key","")} IS ALREADY ${oe[0].toUpperCase()}.`:(A.bindings[Te]=R.code,is(A),_s(),document.querySelector("#binding-notice").textContent="BINDING SAVED."),Te=void 0,R.preventDefault();return}if(R.code==="Escape"){if(document.fullscreenElement===e){Xi=!0,document.exitFullscreen().catch(()=>Xi=!1),R.preventDefault();return}document.pointerLockElement===L.domElement?Be("pause"):fe(),R.preventDefault();return}if(R.code==="KeyB"&&!R.repeat){Be("buy"),R.preventDefault();return}if(R.code==="KeyF"&&!R.repeat){di(),R.preventDefault();return}!R.repeat&&R.code===A.bindings.reload&&X&&document.pointerLockElement===L.domElement&&Mn()};document.querySelectorAll("[data-bind]").forEach(R=>R.addEventListener("click",()=>{Te=R.dataset.bind,document.querySelector("#binding-notice").textContent=`PRESS A KEY FOR ${Te.toUpperCase()}.`})),document.addEventListener("keydown",Qt),document.addEventListener("pointerlockchange",to);let hi=0;const Rt=R=>{const oe=Math.min(.05,(R-P)/1e3);if(P=R,X&&!Oe&&!Ne){const ke=k.tick(R);ke==="live"&&(n.textContent="LIVE ROUND STARTED."),ke==="round-end"&&(n.textContent="ROUND COMPLETE. BUY STARTS SOON."),ke==="buy"&&(ue(),n.textContent="BUY PHASE STARTED. PRESS B TO BUY WEAPONS.")}if(X&&Pe&&!Ne&&_e(R),X&&!Pe){const ke=be()?j.movement():ne.movement();if(be()&&(Q=j.aiming),We()&&W.update(oe,ke),Oe&&R-Ht>=1e3/60)for(Ht=R,Ge.push(J.sendInput({...ke,yaw:W.yaw,pitch:W.pitch}));Ge.length>180;)Ge.shift();mt&&(S.position.lerp(mt,Math.min(1,oe*12)),S.position.distanceTo(mt)<.02&&(mt=void 0)),(ne.firing||j!=null&&j.firing)&&V.spec.automatic&&Me(),Y.update(oe),Ae.rotation.x=-Y.pitch,Ae.rotation.y=Y.yaw,HS(Ae,R,W.velocity.length(),Q,V.reloadProgress(R));const it=Q?58:A.fov;S.fov+=(it-S.fov)*Math.min(1,oe*12),S.updateProjectionMatrix();const gt=xt.difficulty==="rookie"?"easy":xt.difficulty==="veteran"?"hard":"normal";if(He.forEach(ft=>jv(ft,S.position,R,oe,U,v.coverPoints,(pt,Ze)=>{if(k.phase!=="live")return;Qu(ft.group,R);const Lt=S.position.clone();Lt.y-=.45;const _n=Lt.clone().sub(pt).dot(Ze),Bn=re(pt,Ze),xs=pt.clone().addScaledVector(Ze,Math.max(0,_n)),Yi=_n>0&&_n<Bn&&xs.distanceTo(Lt)<.55;N(pt,Yi?Lt:pt.clone().addScaledVector(Ze,Math.min(Bn,28)),"#ff6957"),sn("modern-shot"),Yi&&(W.health=Math.max(0,W.health-12),ce("BOT HIT"),W.health||(k.death(),ue(),n.textContent="RESPAWNED. -$300."))},gt)),He.forEach(ft=>ed(ft.group,oe,R)),te){const ft=R-100;for(;xe.length>1&&xe[1].receivedAt<=ft;)xe.shift();const pt=xe[0],Ze=xe[1];if(pt){const Lt=Ze?Nn.clamp((ft-pt.receivedAt)/Math.max(1,Ze.receivedAt-pt.receivedAt),0,1):1,_n=Nn.lerp(pt.x,(Ze==null?void 0:Ze.x)??pt.x,Lt),Bn=Nn.lerp(pt.y,(Ze==null?void 0:Ze.y)??pt.y,Lt),xs=Nn.lerp(pt.z,(Ze==null?void 0:Ze.z)??pt.z,Lt),Yi=Nn.lerp(pt.yaw,(Ze==null?void 0:Ze.yaw)??pt.yaw,Lt);te.position.lerp(new D(_n*8,Bn,1-xs*12),Math.min(1,oe*16)),te.rotation.y+=Nn.euclideanModulo(Yi-te.rotation.y+Math.PI,Math.PI*2)-Math.PI}ed(te,oe,R)}_e(R)}L.render(y,S),hi=requestAnimationFrame(Rt)};return hi=requestAnimationFrame(Rt),Ei=()=>{var R;cancelAnimationFrame(hi),V.cancelReload(),J.close(),j==null||j.destroy(),ne.destroy(),In.disconnect(),(R=document.exitPointerLock)==null||R.call(document),document.removeEventListener("keydown",Qt),document.removeEventListener("pointerlockchange",to),document.removeEventListener("fullscreenchange",Yt),Z(v),L.dispose(),t.replaceChildren(),Ei=void 0},Ei}function dx(){Ei==null||Ei()}const hx=void 0,oh={url:hx??"",turnStatus:"not-configured"};class Bt extends Error{}const fx=null;let Se=null,zc=null,Do=null,Vs=null,Wo=typeof RTCPeerConnection>"u"?"unavailable":"fallback";const ah=new Map;let ch=0,sd;function px(){Vs==null||Vs.close(),Vs=null,Do==null||Do.close(),Do=null,ah.clear(),window.clearTimeout(sd),sd=void 0,ch=0,Wo=typeof RTCPeerConnection>"u"?"unavailable":"fallback"}function Vn(){throw new Bt("Multiplayer is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.")}function Oi(i){return{code:i.code,hostId:i.host_id,guestId:i.guest_id,mode:i.mode,status:i.status,roundState:{hostReady:!1,guestReady:!1,...i.round_state??{}},createdAt:i.created_at}}function mx(i){return{userId:i.user_id,mode:i.mode,roomCode:i.room_code,createdAt:i.created_at,matchedAt:i.matched_at}}function Pn(i){return i.code==="42P01"||/duel_rooms.*does not exist/i.test(i.message)?new Bt("The duel_rooms table is missing. Run the SQL setup in README.md."):i.code==="42883"||/quick_match_queue|quick_match/i.test(i.message)?new Bt("Quick Game is not set up. Run the matchmaking SQL in README.md."):i.code==="42501"||/row-level security|permission denied/i.test(i.message)?new Bt("Supabase denied this room action. Check the duel_rooms RLS policies in README.md."):new Bt(i.message)}async function An(){const i=Vn(),{data:{user:e}}=await i.auth.getUser();if(e)return zc=e.id;const{data:t,error:n}=await i.auth.signInAnonymously();if(n||!t.user)throw Pn(n??{message:"Anonymous sign-in did not return a user."});return zc=t.user.id}function gx(){const i="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",e=crypto.getRandomValues(new Uint32Array(6));return Array.from(e,t=>i[t%i.length]).join("")}async function Fs(i){if(!Se)throw new Bt("Create or join a room first.");const{data:e,error:t}=await Vn().from("duel_rooms").update(i).eq("code",Se.code).select().single();if(t)throw Pn(t);return Se=Oi(e),Se}const et={isConfigured:()=>!!fx,authenticate:An,async createRoom(i="original-quick-draw"){const e=await An(),t=Vn();for(let n=0;n<5;n++){const{data:s,error:r}=await t.from("duel_rooms").insert({code:gx(),host_id:e,mode:i,status:"lobby",round_state:{hostReady:!1,guestReady:!1}}).select().single();if(s)return Se=Oi(s);if((r==null?void 0:r.code)!=="23505")throw Pn(r)}throw new Bt("Could not find an unused room code. Please try again.")},async joinRoom(i){const e=await An(),t=i.trim().toUpperCase().replace(/[^A-Z0-9]/g,"");if(t.length!==6)throw new Bt("Enter the six-character room code.");const{data:n,error:s}=await Vn().from("duel_rooms").update({guest_id:e}).eq("code",t).is("guest_id",null).neq("host_id",e).select().maybeSingle();if(s)throw Pn(s);if(!n)throw new Bt("Room not found, already full, or you are its host.");return Se=Oi(n)},async setReady(i){const e=await An();if(!Se||Se.hostId!==e&&Se.guestId!==e)throw new Bt("You are not seated in this room.");const t={...Se.roundState,[Se.hostId===e?"hostReady":"guestReady"]:i},n=Se.guestId&&t.hostReady&&t.guestReady?"ready":"lobby";return Fs({round_state:t,status:n})},async setDisplayName(i){const e=await An();if(!Se||Se.hostId!==e&&Se.guestId!==e)throw new Bt("You are not seated in this room.");const t=i.trim().replace(/\s+/g," ").slice(0,24)||"Unnamed Drifter";return Fs({round_state:{...Se.roundState,[Se.hostId===e?"hostName":"guestName"]:t}})},async leaveRoom(){const i=Se;try{const e=await An();if(!i)return;const t=Vn();if(i.hostId===e){const{error:n}=await t.from("duel_rooms").delete().eq("code",i.code);if(n)throw Pn(n)}else if(i.guestId===e){const{error:n}=await t.from("duel_rooms").update({guest_id:null,status:"lobby",round_state:{...i.roundState,guestReady:!1}}).eq("code",i.code).eq("guest_id",e);if(n)throw Pn(n)}}finally{Se=null,px()}},subscribeToRoom(i,e){return()=>{}},async requestQuickMatch(i){await An();const{data:e,error:t}=await Vn().rpc("request_quick_match",{p_mode:i}).maybeSingle();if(t)throw Pn(t);return e?Se=Oi(e):null},async restoreQuickMatch(){const i=await An(),{data:e,error:t}=await Vn().from("quick_match_queue").select().eq("user_id",i).maybeSingle();if(t)throw Pn(t);if(!e)return null;const n=mx(e);if(!n.roomCode)return{mode:n.mode,room:null};const{data:s,error:r}=await Vn().from("duel_rooms").select().eq("code",n.roomCode).maybeSingle();if(r)throw Pn(r);return{mode:n.mode,room:s?Se=Oi(s):null}},async cancelQuickMatch(){await An();const{data:i,error:e}=await Vn().rpc("cancel_quick_match").maybeSingle();if(e)throw Pn(e);return i?Se=Oi(i):null},subscribeToQuickMatch(i,e){return()=>{}},async startRound(i){const e=await An(),t=Se==null?void 0:Se.roundState.round,n=(Se==null?void 0:Se.mode)==="showdown-series"&&(t!=null&&t.winner)?t.nextRoundHost??Se.hostId:Se==null?void 0:Se.hostId;if(!Se||n!==e||!Se.guestId||!Se.roundState.hostReady||!Se.roundState.guestReady||Se.status!=="ready"&&!(t!=null&&t.winner)||t!=null&&t.matchWinner)throw new Bt("Both players must be ready before the designated round controller starts a round.");return Fs({round_state:{...Se.roundState,round:i},status:"playing"})},async restartSeries(){var e;const i=await An();if(!Se||Se.mode!=="showdown-series"||Se.hostId!==i||!Se.guestId||!((e=Se.roundState.round)!=null&&e.matchWinner))throw new Bt("Only the host can start a rematch after a completed Showdown Series.");return Fs({round_state:{...Se.roundState,round:void 0},status:"ready"})},async submitRoundAction(i,e,t,n){const s=await An();if(!Se||Se.hostId!==s&&Se.guestId!==s)throw new Bt("You are not seated in this room.");const{data:r,error:o}=await Vn().from("duel_rooms").select().eq("code",Se.code).single();if(o)throw Pn(o);Se=Oi(r);const a=Se.roundState.round;if(Se.status!=="playing"||!a||a.id!==i||a.winner)throw new Bt("That round has already ended.");const c=a.gameMode??Se.mode;if(c==="trail-trace"&&(!Number.isFinite(n==null?void 0:n.score)||!Number.isFinite(n==null?void 0:n.progress)||!Number.isFinite(n==null?void 0:n.accuracy)||(n==null?void 0:n.reachedEnd)!==!0||n.score<0||n.score>108||n.progress<hd||n.progress>100||n.accuracy<fd||n.accuracy>100))throw new Bt("Finish the trail with a steady line before submitting.");if(c==="rock-paper-scissors"&&!["rock","paper","scissors"].includes((n==null?void 0:n.choice)??""))throw new Bt("Choose rock, paper, or scissors.");if(c==="bottle-shot"&&(!a.endAt||Date.now()<Date.parse(a.endAt)))throw new Bt("Bottle Shot scores unlock when the 30-second round ends.");const l=Se.hostId===s?"hostAction":"guestAction";if(a[l])throw new Bt("You already acted this round.");return Fs({round_state:{...Se.roundState,round:{...a,[l]:{at:new Date().toISOString(),reactionMs:e,...t?{falseStart:!0}:{},...n}}}})},async resolveRound(i,e=!1){const t=await An();if(!Se||Se.hostId!==t)throw new Bt("Only the host can resolve a round.");const{data:n,error:s}=await Vn().from("duel_rooms").select().eq("code",Se.code).single();if(s)throw Pn(s);Se=Oi(n);const r=Se.roundState.round;if(!r||r.id!==i||r.winner)return Se;const o=r.gameMode??Se.mode;if(o==="bottle-shot"&&(!r.endAt||Date.now()<Date.parse(r.endAt)))return Se;const a=r.hostAction,c=r.guestAction;if(!a&&!c)return Se;const l=ah.get(i),u=a??(l==null?void 0:l.hostAction),d=c??(l==null?void 0:l.guestAction);if((o==="trail-trace"||o==="bottle-shot"||o==="rock-paper-scissors")&&(!u||!d)||(o==="original-quick-draw"||o==="word-duel")&&(!u||!d)&&!e)return Se;const g=o==="trail-trace"||o==="bottle-shot"?(u.score??0)===(d.score??0)?"tie":(u.score??0)>(d.score??0)?"host":"guest":o==="rock-paper-scissors"?_x(u.choice,d.choice):u!=null&&u.falseStart&&(d!=null&&d.falseStart)?"tie":u!=null&&u.falseStart?"guest":d!=null&&d.falseStart?"host":d?u?Math.abs(u.reactionMs-d.reactionMs)<=3?"tie":u.reactionMs<d.reactionMs?"host":"guest":"guest":"host",_=(r.seriesHostWins??0)+(g==="host"?1:0),m=(r.seriesGuestWins??0)+(g==="guest"?1:0),f=Se.mode==="showdown-series"||o==="rock-paper-scissors",M=Se.mode==="showdown-series"?g==="tie"?"host":g:void 0;return Fs({round_state:{...Se.roundState,round:{...r,hostAction:u,guestAction:d,winner:g,resolvedAt:new Date().toISOString(),...f?{seriesHostWins:_,seriesGuestWins:m,matchWinner:_===3?"host":m===3?"guest":void 0}:{},...M?{nextRoundHost:M}:{}}}})},sendLiveAction(i){if(Wo!=="connected"||!Vs)return!1;try{return Vs.send(JSON.stringify({type:"action",event:i})),!0}catch{return Wo="fallback",!1}},onLiveEvent(i){return()=>{}},transportStatus:()=>Wo,turnStatus:()=>oh.turnStatus,localStartAt:i=>Date.parse(i)-((Se==null?void 0:Se.guestId)===zc?ch:0)};function _x(i,e){return i===e?"tie":{rock:"scissors",paper:"rock",scissors:"paper"}[i]===e?"host":"guest"}const vx="5.1.5";"serviceWorker"in navigator&&window.addEventListener("load",()=>void navigator.serviceWorker.register("/sw.js").catch(()=>{}));const De=document.querySelector("#app"),_l=window.matchMedia("(max-width: 700px)");let Qe="home",qe="original-quick-draw",Xn="normal",$={number:0,mode:"original-quick-draw",phase:"menu"},vn,Vc,nn=Sx(),Ct=xx();uh();const rd=new Set;let q=null,Gt=null,Jt="",$r=!1,Fn,us="original-quick-draw",Lr="casual",Ut="idle",ri="",fs,Xr,Nt,Zt=!1,qo=!1,dn=0,Dt,Gn=[],Rr=!1,xn=0,Yr=new Set,od="",rn=0,pn=0;const nr=["original-quick-draw","word-duel","trail-trace","bottle-shot","rock-paper-scissors"];let Vi,qi,cs;Ph();function Sx(){try{return JSON.parse(localStorage.getItem("high-noon-stats")??'{"wins":0,"losses":0,"best":null}')}catch{return{wins:0,losses:0,best:null}}}function sa(){try{localStorage.setItem("high-noon-stats",JSON.stringify(nn))}catch{}}function xx(){const i={displayName:"Unnamed Drifter",title:"Dusty Greenhorn",badges:[],winStreak:0,bestWinStreak:0,modes:{}};try{const e=JSON.parse(localStorage.getItem("high-noon-profile")??"null");return e?{...i,...e,displayName:typeof e.displayName=="string"?e.displayName:i.displayName,modes:e.modes??{}}:i}catch{return i}}function lh(){try{localStorage.setItem("high-noon-profile",JSON.stringify(Ct))}catch{}}function Pr(i){return i.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function uh(){const i=nn.wins;Ct.title=i>=50?"High Noon Legend":i>=20?"Bell Keeper":i>=5?"Trail Scout":"Dusty Greenhorn",Ct.badges=[...i>=1?["First Bell"]:[],...Ct.bestWinStreak>=3?["Steady Hand"]:[],...nn.best!==null?["Fastest Draw"]:[],...i>=20?["Town Known"]:[]]}function ir(i,e,t){const n=Ct.modes[i]??{played:0,wins:0,losses:0,bestReactionMs:null};n.played++,e==="win"?(n.wins++,nn.wins++,Ct.winStreak++,Ct.bestWinStreak=Math.max(Ct.bestWinStreak,Ct.winStreak)):(n.losses++,nn.losses++,Ct.winStreak=0),t!==void 0&&e==="win"&&(n.bestReactionMs=n.bestReactionMs===null?t:Math.min(n.bestReactionMs,t),nn.best=nn.best===null?t:Math.min(nn.best,t)),Ct.modes[i]=n,uh(),sa(),lh()}function ur(){window.clearTimeout(vn),window.clearTimeout(Vc),vn=void 0,Vc=void 0}function Bs(i){Qe==="game"&&qe==="arena-skirmish"&&dx(),ur();const e=i==="multiplayer"||i==="game"&&(q==null?void 0:q.status)==="playing";e||(Fn==null||Fn(),Fn=void 0,Nt==null||Nt(),Nt=void 0),Qe=i,i==="game"&&qe==="showdown-series"&&!q&&(Vi="intro",qi=void 0,cs=void 0),(!e||i!=="game")&&($=qe==="word-duel"?{number:$.number,mode:"word-duel",phase:"menu"}:qe==="trail-trace"?{number:$.number,mode:"trail-trace",phase:"menu",pathSeed:0}:qe==="bottle-shot"?{number:$.number,mode:"bottle-shot",phase:"menu",targetSeed:0}:qe==="rock-paper-scissors"?{number:$.number,mode:"rock-paper-scissors",phase:"menu"}:qe==="ghost-challenge"?{number:$.number,mode:"ghost-challenge",phase:"menu"}:qe==="arena-skirmish"?{number:$.number,mode:"arena-skirmish",phase:"menu"}:{number:$.number,mode:"original-quick-draw",phase:"menu"}),Ve(),i==="multiplayer"&&(q?ra():zx())}function dh(i){return i.replaceAll("-"," ").toUpperCase()}function yx(i){const e=i.roundState.round;return e!=null&&e.winner?e.winner==="tie"?"TIE ROUND: HOST CONTROLS THE REPLAY":oi(i)?"YOU CONTROL THE NEXT ROUND":"PRIOR-ROUND WINNER CONTROLS NEXT":"HOST OPENS THE SERIES"}function Ex(i,e,t,n,s,r){return`<section class="series-hud" aria-live="polite"><div><span>SHOWDOWN SERIES</span><b>FIRST TO THREE</b></div><div class="series-score"><span>YOU</span><b>${e}</b><i></i><b>${t}</b><span>RIVAL</span></div><div><span>ROUND ${String(n).padStart(2,"0")}</span><b>${dh(i)}</b></div>${s!==void 0?`<strong>ROUND STARTS IN ${s}</strong>`:""}${r?`<small>${r}</small>`:""}</section>`}function Mx(){const i=Vi==="reveal"&&qi,e=i&&cs?Math.max(0,Math.ceil((cs-Date.now())/1e3)):0;return gn(`<section class="series-stage" data-stage="${i?"reveal":"intro"}"><p class="eyebrow">THE FIVE-ROUND GAUNTLET</p><div class="series-stage-mark">HN</div><h1>${i?dh(qi):"SHOWDOWN<br>SERIES"}</h1><p>${i?"The next test has been drawn from the deck. Steel yourself.":"Five frontier tests. One champion. First gunslinger to three round wins owns the street."}</p>${i?`<div class="series-countdown"><b>${e}</b><span>ROUND ${String(rn+pn+1).padStart(2,"0")} BEGINS</span></div>`:'<button id="series-begin" class="primary">DEAL THE FIRST ROUND</button>'}<div class="series-stage-score"><span>YOU <b>${rn}</b></span><i>FIRST TO 3</i><span>ASH <b>${pn}</b></span></div></section>`)}function hh(i,e=!1,t=!0,n=rn,s=pn){return gn(`<section class="series-stage series-champion" data-stage="champion"><p class="eyebrow">SHOWDOWN SERIES COMPLETE</p><div class="series-stage-mark">${i?"III":"HN"}</div><h1>${i?"CHAMPION<br>OF THE STREET":`${e?"YOUR RIVAL":"ASH MERCER"}<br>TAKES THE STREET`}</h1><p>${i?"Three round wins. The town will remember your name.":"The dust settles, but another showdown is only one bell away."}</p><div class="series-stage-score"><span>YOU <b>${n}</b></span><i>FINAL</i><span>${e?"RIVAL":"ASH"} <b>${s}</b></span></div><div class="duel-actions">${t?'<button id="series-rematch" class="primary">REMATCH SERIES</button>':""}<button id="series-return" class="outline">${e?"RETURN TO LOBBY":"CHOOSE ANOTHER MODE"}</button></div></section>`)}function gn(i){const e=(t,n)=>`<button data-page="${t}"${Qe===t?' aria-current="page"':""}>${n}</button>`;return`<main class="shell">
    <header class="masthead"><button class="brand" data-page="home" aria-label="High Noon Showdown home"><span>HN</span> HIGH NOON SHOWDOWN</button><nav aria-label="Primary navigation">${e("home","HOME")}${e("mode-select","PLAY")}${e("multiplayer","MULTIPLAYER")}${e("profile","PROFILE")}<button id="sound-toggle" aria-pressed="${bl()}">${bl()?"UNMUTE":"MUTE"}</button>${e("how-to","HOW TO PLAY")}</nav></header>
    ${i}
    <footer><span>ORIGINAL WESTERN DUEL GAME</span><span>ONE BELL. ONE SHOT.</span><span>VERSION ${vx}</span></footer>
  </main>`}function sr(){const i=document.fullscreenElement!==null;return`<button id="fullscreen-toggle" class="outline fullscreen-toggle" aria-pressed="${i}">${i?"EXIT FULL SCREEN":"FULL SCREEN"}</button>`}function fh(){return _l.matches}function Tx(){if(!_l.matches)return!1;const i=(q==null?void 0:q.status)==="playing"?q.roundState.round:void 0;return i?(i.gameMode??q.mode)==="original-quick-draw"&&Date.now()<Date.parse(i.startAt):($.mode==="original-quick-draw"||$.mode==="ghost-challenge")&&$.phase==="waiting"}function bx(){const i=De.querySelector("#fullscreen-toggle");if(!i)return;const e=document.fullscreenElement!==null;i.textContent=e?"EXIT FULL SCREEN":"FULL SCREEN",i.setAttribute("aria-pressed",String(e))}function Ax(){if(document.fullscreenElement){const i=document.exitFullscreen;i&&i.call(document).catch(()=>{})}else{const i=document.documentElement.requestFullscreen;document.fullscreenEnabled&&i&&i.call(document.documentElement).catch(()=>{})}}function wx(){return gn(`<section class="hero"><div class="sun"></div><div class="mesa mesa-far"></div><div class="mesa mesa-near"></div><div class="dust"></div><div class="hero-copy"><p class="eyebrow">A QUICK-DRAW DUEL AT SUNSET</p><h1>HIGH NOON<br><i>SHOWDOWN</i></h1><div class="hero-actions"><div class="hero-primary-actions"><button class="primary" data-page="mode-select">PLAY VS AI</button><button class="primary" data-page="multiplayer">MULTIPLAYER</button></div><button class="outline hero-how-to" data-page="how-to">HOW TO PLAY</button></div></div><p class="corner-note">NO EXTERNAL ASSETS<br>ORIGINAL FRONTIER TALE</p></section>
  <section class="home-cards home-dispatch"><article><p class="eyebrow">THE BOARD</p><h2>Pick your test.</h2><p>Draw fast, type under pressure, trace a trail, break bottles, or settle it with Rock Paper Scissors.</p><button class="text-button" data-page="mode-select">VIEW AI MODES</button></article><article><p class="eyebrow">THE STREET</p><h2>Face a real rival.</h2><p>Use a private room for friends or enter Casual Quick Game to find another gunslinger.</p><button class="text-button" data-page="multiplayer">ENTER MULTIPLAYER</button></article><article><p class="eyebrow">YOUR LEGEND</p><h2>${Ct.title}</h2><p>Build streaks, earn badges, and challenge the Ghost with the best draw this browser has recorded.</p><button class="text-button" data-page="profile">VIEW PROFILE</button></article></section>`)}function Rx(){const i=Object.entries(Ct.modes).map(([e,t])=>{const n=t;return`<tr><th>${e.replaceAll("-"," ").toUpperCase()}</th><td>${n.played}</td><td>${n.wins} / ${n.losses}</td><td>${n.bestReactionMs===null?"--":`${n.bestReactionMs} MS`}</td></tr>`}).join("")||'<tr><td colspan="4">No rounds recorded yet. Practice against Ash to build your legend.</td></tr>';return gn(`<section class="page-header"><p class="eyebrow">LOCAL PLAYER PROFILE</p><h1>${Ct.title}</h1><p>Your profile stays on this device. No account or personal information is required.</p></section><section class="profile-card"><form id="profile-form"><label for="display-name">DISPLAY NAME <input id="display-name" maxlength="24" value="${Pr(Ct.displayName)}" autocomplete="nickname" /></label><button class="primary">SAVE NAME</button></form><div class="profile-stats"><div><span>WIN STREAK</span><b>${Ct.winStreak}</b></div><div><span>BEST STREAK</span><b>${Ct.bestWinStreak}</b></div><div><span>CAREER</span><b>${nn.wins} W / ${nn.losses} L</b></div></div><p class="eyebrow">BADGES</p><p class="badges">${Ct.badges.length?Ct.badges.map(e=>`<span>${e}</span>`).join(""):"Earn your first win to pin a badge here."}</p></section><section class="profile-history"><h2>Mode Record</h2><table><thead><tr><th>MODE</th><th>PLAYED</th><th>W / L</th><th>BEST DRAW</th></tr></thead><tbody>${i}</tbody></table></section>`)}function Cx(){const i=t=>qe===t?' data-selected="true"':"",e=t=>Xn===t?' data-selected="true" aria-pressed="true"':' aria-pressed="false"';return gn(`<section class="page-header"><p class="eyebrow">PLAY VS AI</p><h1>Choose Your Duel</h1><p>Choose an original duel and Ash Mercer's ability. Quick Draw and Word Duel retain their unpredictable wait.</p></section><section class="mode-cards"><article${i("original-quick-draw")}><p class="eyebrow">MODE 01</p><h2>Original Quick Draw</h2><p>Wait for DRAW!, then shoot once with a click, tap, or Space. Fastest reaction wins.</p><button class="outline" data-mode="original-quick-draw">${qe==="original-quick-draw"?"SELECTED":"SELECT QUICK DRAW"}</button></article><article${i("word-duel")}><p class="eyebrow">MODE 02</p><h2>Word Duel</h2><p>Wait for the signal, then type the one word shown: SHOOT, DRAW, or POW. Exact spelling wins the draw.</p><button class="outline" data-mode="word-duel">${qe==="word-duel"?"SELECTED":"SELECT WORD DUEL"}</button></article><article${i("trail-trace")}><p class="eyebrow">MODE 03</p><h2>Trail Trace</h2><p>Hold a mouse, finger, or pen on the canvas and follow the winding trail. Progress and line accuracy set your score.</p><button class="outline" data-mode="trail-trace">${qe==="trail-trace"?"SELECTED":"SELECT TRAIL TRACE"}</button></article></section><section class="difficulty-select" aria-labelledby="difficulty-title"><p class="eyebrow">ASH MERCER'S ABILITY</p><h2 id="difficulty-title">Choose Difficulty</h2><p>For Trail Trace, difficulty changes Ash's simulated tracing score. For the other duels, it changes reaction time.</p><div class="difficulty-options"><button data-ai-difficulty="easy"${e("easy")}><b>EASY</b><span>Forgiving trail or slow draw</span></button><button data-ai-difficulty="normal"${e("normal")}><b>NORMAL</b><span>Town-standard rival</span></button><button data-ai-difficulty="hard"${e("hard")}><b>HARD</b><span>Precise trail or fast draw</span></button></div><button class="primary start-ai-duel" id="start-ai-duel">PLAY ${qe==="trail-trace"?"TRAIL TRACE":qe==="word-duel"?"WORD DUEL":"QUICK DRAW"} · ${Xn.toUpperCase()}</button></section>`)}function Ix(i,e,t,n,s=!1,r=!1){return gn(`<section class="trace-game"><div class="trace-heading"><p class="eyebrow">${e}</p><h1>${n??"TRACE THE TRAIL"}</h1><p>${t}</p></div><canvas id="trail-canvas" class="trail-canvas" aria-label="Trace the glowing winding trail" data-seed="${i}" ${s?"data-disabled=true":""}></canvas><p class="trace-hint">PRESS, HOLD, AND FOLLOW THE GOLD LINE. RELEASE TO SUBMIT.</p>${r?'<button id="shot-button" class="primary">START TRAIL</button>':""}${sr()}</section>`)}function ph(i,e,t,n,s,r,o,a=!1){var f;const c=Date.now(),l=e!==void 0&&c<e,u=t!==void 0&&c>=t,d=e===void 0?-1:Math.floor((c-e)/qc),h=!l&&!u&&d>=0?dd(i).slice(d*Xs,(d+1)*Xs):[],p=t?Math.max(0,Math.ceil((t-c)/1e3)):30,g=n.startsWith("LIVE")&&(q==null?void 0:q.mode)==="showdown-series"&&o?((f=q.roundState.round)==null?void 0:f.winner)==="tie"?" Tie round: the host retains control for the replay.":oi()?" You won the prior round, so you control the next round.":" The prior-round winner controls the next round.":"",_=o?`You scored ${s}; ${r===void 0?"Ash":"your rival"} scored ${r??0}.${g}`:l?"Get set. The shared bottle run starts together.":u?a?"Score sent. Waiting for the host to settle the round.":"Time is up. Sending your score.":"Shoot green and blue bottles for +10. Red bottles and empty-range shots cost 10. Each bottle breaks after one hit.",m=h.filter(M=>!Yr.has(M.id)).map(M=>`<button class="bottle bottle-${M.kind}" data-bottle-id="${M.id}" style="left:${M.x}%;top:${M.y}%" aria-label="Shoot ${M.kind} bottle">${M.kind==="red"?"-10":"+10"}</button>`).join("");return gn(`<section class="bottle-game"><div class="bottle-heading"><p class="eyebrow">${n}</p><h1>${o??(l?"GET READY":u?"TIME":"BOTTLE SHOT")}</h1><p>${_}</p></div><div class="bottle-stats"><span><b>${p}</b> SEC</span><span><b>${s}</b> SCORE</span><span>GREEN / BLUE <b>+10</b></span><span>RED / MISS <b>-10</b></span></div><div class="bottle-range" aria-live="polite">${m}</div><p class="trace-hint">${l?"SIX TARGETS APPEAR ON THE BELL.":"TAP OR CLICK A BOTTLE ONCE. EMPTY-RANGE SHOTS COST 10. SIX TARGETS CHANGE EVERY 1.5 SECONDS."}</p>${e===void 0?'<button id="shot-button" class="primary">START BOTTLE SHOT</button>':o?`<div class="duel-actions">${n.startsWith("LIVE")&&oi()?'<button id="next-round" class="primary">NEXT ROUND</button>':""}${n.startsWith("LIVE")?'<button id="leave-duel" class="outline">LEAVE ROOM</button>':""}</div>`:""}${sr()}</section><section class="scoreboard"><div><span>YOUR SCORE</span><b>${s}</b></div><div><span>${r===void 0?"TARGET":"RIVAL SCORE"}</span><b>${r??"--"}</b></div><div><span>ROUND TIME</span><b>30 SEC</b></div><div><span>MODE</span><b>BOTTLE SHOT</b></div></section>`)}function Lx(){if((q==null?void 0:q.status)==="playing"&&q.roundState.round)return Px();if(qe==="arena-skirmish")return gn(lx());if(qe==="showdown-series"&&(rn===3||pn===3))return hh(rn===3);if(qe==="showdown-series"&&Vi)return Mx();if($.mode==="rock-paper-scissors")return mh($.playerChoice,$.opponentChoice,$.result,`ROCK PAPER SCISSORS · ${Xn.toUpperCase()}`,[rn,pn],$.decisionEndsAt,$.number,rn===3||pn===3);if($.mode==="trail-trace"){const h=$.result,p=h?`${h.message} You ${$.playerScore} points. Ash ${h.opponentReactionMs} points.`:"Start at the left marker, keep your pointer near the trail, and reach its far end.";return Ix($.pathSeed,`TRAIL TRACE · ${Xn.toUpperCase()} · ROUND ${String($.number||1).padStart(2,"0")}`,p,(h==null?void 0:h.outcome)==="win"?"YOU WIN":h?"ASH TAKES IT":void 0,!!h||$.phase==="menu",$.phase==="menu"||$.phase==="result")}if($.mode==="bottle-shot"){const h=$.result;return ph($.targetSeed,$.startAt,$.endAt,`BOTTLE SHOT · ${Xn.toUpperCase()} · ROUND ${String($.number||1).padStart(2,"0")}`,$.playerScore??xn,h==null?void 0:h.opponentReactionMs,(h==null?void 0:h.outcome)==="win"?"YOU WIN":h?"ASH TAKES IT":void 0)}const i=$.result,e=$.phase,t=$.mode==="word-duel",n=$.mode==="original-quick-draw"||$.mode==="ghost-challenge",s=$.mode==="ghost-challenge",r=nn.best,o=$.opponentReactionMs??r??Fr,a=$.mode==="word-duel"?$.word:void 0,c=e==="waiting"?"WAIT":t&&e==="word"?a:n&&e==="draw"?"DRAW!":i?i.outcome.toUpperCase().replace("-"," "):"THE STREET IS QUIET",l=e==="waiting"?s?`Wait for DRAW!. Beat ${o} MS; an early action loses.`:"Wait for the signal. An early action loses the round.":t&&e==="word"?"Type the word exactly, then press Enter.":n&&e==="draw"?s?`DRAW! Beat your ${r===null?"starter":"personal-best"} target of ${o} MS.`:"DRAW! Shoot once before Ash reacts.":i?s?i.outcome==="win"?`NEW GHOST RECORD: ${i.reactionMs} MS. Your next target is faster.`:i.outcome==="false-start"?"False start. Your Ghost does not draw before the bell.":`Your Ghost held at ${o} MS. Beat it to set the next record.`:i.message:s?r===null?`No Ghost record yet. Beat the approachable ${Fr} MS starter target; your first success becomes your record.`:`Your Ghost target is your ${r} MS personal best. Beat it to set a new record.`:"Face the challenger when you are ready.",d=e==="waiting"?`<p class="waiting-note">${n&&fh()?"WAIT FOR DRAW!":"SIGNAL INCOMING"}</p>`:t&&e==="word"?'<form id="word-form" class="word-entry"><label for="word-input">TYPE THE SIGNAL</label><input id="word-input" autocomplete="off" autocapitalize="off" inputmode="text" spellcheck="false" enterkeyhint="done" aria-label="Type the signal word and press Enter" /></form>':`<button id="shot-button" class="primary shot-button">${e==="menu"?"START DUEL":e==="result"?"REMATCH":n&&e==="draw"?"SHOOT":"FIRE"}</button><p class="key-hint">CLICK / TAP / <kbd>SPACE</kbd></p>`;return gn(`<section class="duel${s?" ghost-duel":""}" data-phase="${e}" data-result="${(i==null?void 0:i.outcome)??""}"><div class="duel-sky"><div class="duel-sun"></div><div class="cloud cloud-one"></div><div class="cloud cloud-two"></div></div><div class="horizon"></div><div class="street"></div><div class="opponent" aria-hidden="true"><span class="hat"></span><span class="head"></span><span class="torso"></span><span class="arm"></span></div><div class="gunslinger" aria-hidden="true"><span class="player-hat"></span><span class="player-body"></span><span class="hand"><i class="revolver"><b></b></i></span><span class="holster"></span><span class="flash"></span></div><div class="duel-panel"><p class="eyebrow">${s?"BEAT YOUR BEST · GHOST CHALLENGE":n?"ORIGINAL QUICK DRAW":"WORD DUEL"} · ${s?"AI ONLY":Xn.toUpperCase()} · ROUND ${String($.number||1).padStart(2,"0")}</p><h1>${c}</h1><p class="duel-prompt" aria-live="assertive">${l}</p>${s?`<p class="ghost-target">${r===null?"STARTER TARGET":"YOUR BEST"} <b>${o} MS</b></p>`:""}${i?`<div class="scoreline"><span>YOU ${i.reactionMs?`${i.reactionMs} MS`:"EARLY"}</span><span>${s?"GHOST TARGET":"RIVAL"} ${i.opponentReactionMs} MS</span></div>`:""}<div class="duel-controls">${d}${sr()}</div></div></section><section class="scoreboard"><div><span>WINS</span><b>${nn.wins}</b></div><div><span>LOSSES</span><b>${nn.losses}</b></div><div><span>${s?"GHOST RECORD":"LOCAL BEST"}</span><b>${s?r===null?"--":`${r} MS`:nn.best?`${nn.best} MS`:"--"}</b></div><div><span>${s?"TARGET":"DIFFICULTY"}</span><b>${s?`${o} MS`:Xn.toUpperCase()}</b></div></section>`)}function mh(i,e,t,n="ROCK PAPER SCISSORS",s=[rn,pn],r,o=$.number,a,c=!0,l){const u=r?Math.max(0,Math.ceil((r-Date.now())/1e3)):0,d=l!==void 0&&Date.now()<l,h=t?a?`${t.message} ${t.outcome==="win"?"You take the match.":"Your rival takes the match."}`:`${t.message} ${n.startsWith("SHOWDOWN")?t.outcome==="tie"?"Tie round: the host retains control for the replay.":c?"You won the prior round, so you control the next round.":"The prior-round winner controls the next round.":n.startsWith("LIVE")?"The host starts the next round.":"Start the next round."}`:d?"Hold your sign. Both hands reveal on the shared bell.":i?"Choice locked. Waiting for your rival to reveal.":"Choose simultaneously: Rock beats Scissors, Scissors beats Paper, Paper beats Rock.",p=n.startsWith("LIVE")||n.startsWith("SHOWDOWN"),g=t?a&&p?'<button id="leave-duel" class="outline">LEAVE ROOM</button>':p&&!c?`<p class="waiting-note">${n.startsWith("SHOWDOWN")?"PRIOR-ROUND WINNER STARTS NEXT":"HOST STARTS THE NEXT ROUND"}</p>`:`<button id="shot-button" class="primary">${a?"PLAY NEW MATCH":"NEXT ROUND"}</button>`:r?`<div class="rps-actions">${["rock","paper","scissors"].map(_=>`<button class="primary" data-rps-choice="${_}" ${i||u===0||d?"disabled":""}>${_.toUpperCase()}</button>`).join("")}</div>`:'<button id="shot-button" class="primary">START MATCH</button>';return gn(`<section class="rps-game"><p class="eyebrow">${n} · ROUND ${String(o).padStart(2,"0")}</p><h1>${t?t.outcome==="tie"?"TIE":a?t.outcome==="win"?"MATCH WON":"MATCH LOST":t.outcome==="win"?"ROUND WON":"ROUND LOST":"MAKE YOUR SIGN"}</h1><div class="rps-choices"><div><span>YOUR CHOICE</span><b>${(i==null?void 0:i.toUpperCase())??"HIDDEN"}</b></div><div><span>RIVAL'S CHOICE</span><b>${t?e==null?void 0:e.toUpperCase():"HIDDEN"}</b></div></div><p class="duel-prompt">${h}</p>${t?"":`<p class="waiting-note">DECISION TIME: ${u} SEC</p>`}${g}${sr()}</section><section class="scoreboard"><div><span>MATCH YOU</span><b>${s[0]}</b></div><div><span>MATCH RIVAL</span><b>${s[1]}</b></div><div><span>FIRST TO</span><b>3</b></div><div><span>ROUND</span><b>${o}</b></div></section>`)}function Px(){const i=q,e=i.roundState.round,t=i.hostId===Gt,n=t?e.hostAction:e.guestAction,s=t?e.guestAction:e.hostAction;i.mode,i.mode,i.mode;const r=e.gameMode??i.mode,o=!!e.winner,a=e.winner===(t?"host":"guest");if(i.mode==="showdown-series"&&e.matchWinner)return hh(a,!0,t,t?e.seriesHostWins??0:e.seriesGuestWins??0,t?e.seriesGuestWins??0:e.seriesHostWins??0);if(r==="rock-paper-scissors"){const g=`${i.mode==="showdown-series"?"SHOWDOWN SERIES":"LIVE ROCK PAPER SCISSORS"} · ROOM ${i.code}`,_=o?{outcome:e.winner==="tie"?"tie":a?"win":"loss",message:e.winner==="tie"?"Matching signs tie; the host controls the replay.":"Rock beats Scissors, Scissors beats Paper, Paper beats Rock."}:void 0;return mh(n==null?void 0:n.choice,s==null?void 0:s.choice,_,g,[t?e.seriesHostWins??0:e.seriesGuestWins??0,t?e.seriesGuestWins??0:e.seriesHostWins??0],e.decisionEndsAt?Date.parse(e.decisionEndsAt):void 0,e.seriesRound??1,!!e.matchWinner,oi(i),Date.parse(e.startAt)).replace('id="shot-button"','id="next-round"')}if(r==="bottle-shot"){const g=(n==null?void 0:n.score)??xn;return ph(e.targetSeed,Date.parse(e.startAt),Date.parse(e.endAt),`LIVE BOTTLE SHOT · ROOM ${i.code}`,g,s==null?void 0:s.score,o?e.winner==="tie"?"TIE":a?"YOU WIN":"YOU LOSE":void 0,!!n)}if(r==="trail-trace"){const g=n==null?void 0:n.score,_=s==null?void 0:s.score,m=oi(i),f=o?`You scored ${g??0}; your rival scored ${_??0}. ${i.mode==="showdown-series"?e.winner==="tie"?"Tie round: the host retains control for the replay.":m?"You won the prior round, so you control the next round.":"The prior-round winner controls the next round.":t?"Start the next round when ready.":"Wait for the host to start the next round."}`:Date.now()<Date.parse(e.startAt)?"Hold at the marker. The shared trail opens on the bell.":n?"Score submitted. Waiting for your rival's trace.":"Start at the left marker, hold your pointer on the canvas, and release after reaching the far end.",M=o?`<div class="duel-actions">${m?'<button id="next-round" class="primary">NEXT ROUND</button>':""}<button id="leave-duel" class="outline">LEAVE ROOM</button></div>`:"";return gn(`<section class="trace-game"><div class="trace-heading"><p class="eyebrow">LIVE TRAIL TRACE · ROOM ${i.code}</p><h1>${o?e.winner==="tie"?"TIE":a?"YOU WIN":"YOU LOSE":n?"SCORE LOCKED":"TRACE THE TRAIL"}</h1><p>${f}</p></div><canvas id="trail-canvas" class="trail-canvas" aria-label="Trace the shared winding trail" data-seed="${e.pathSeed}" ${n||o||Date.now()<Date.parse(e.startAt)?"data-disabled=true":""}></canvas><p class="trace-hint">BOTH PLAYERS TRACE THIS SAME SEEDED TRAIL. HIGHEST SCORE WINS.</p>${M}${sr()}</section><section class="scoreboard"><div><span>YOUR SCORE</span><b>${g??"--"}</b></div><div><span>RIVAL SCORE</span><b>${_??"--"}</b></div><div><span>YOUR PROGRESS</span><b>${(n==null?void 0:n.progress)??"--"}${n?"%":""}</b></div><div><span>YOUR ACCURACY</span><b>${(n==null?void 0:n.accuracy)??"--"}${n?"%":""}</b></div></section>`)}const c=!Dt||Dt.roundId!==e.id,l=o?e.winner==="tie"?"TIE":a?"YOU WIN":"YOU LOSE":c?"WAIT":r==="word-duel"?e.word:"DRAW!",u=oi(i),d=o?`${e.winner==="tie"?"Tie round.":n!=null&&n.falseStart?"False start.":a?"You were first on the signal.":"Your opponent was first on the signal."} ${e.matchWinner?"Series complete.":i.mode==="showdown-series"?e.winner==="tie"?"The host retains control for the replay.":u?"You won the prior round, so you control the next round.":"The prior-round winner controls the next round.":t?"Start the next round when ready.":"Wait for the host to start the next round."}`:c?"Shared signal incoming. An early action loses.":r==="word-duel"?"Type the shared word exactly, then press Enter.":"DRAW! Send your one shot.",h=o?`<div class="duel-actions">${u?'<button id="next-round" class="primary">NEXT ROUND</button>':`<p class="waiting-note">${i.mode==="showdown-series"?"PRIOR-ROUND WINNER CHOOSES NEXT":"HOST CHOOSES THE NEXT ROUND"}</p>`}<button id="leave-duel" class="outline" ${$r?"disabled":""}>LEAVE ROOM</button></div>`:c?r==="original-quick-draw"&&fh()?'<p class="waiting-note">WAIT FOR DRAW!</p>':`<button id="shot-button" class="outline mobile-wait-control" ${Zt||n?"disabled":""}>FALSE START</button><p class="key-hint">EARLY ACTION LOSES</p>`:r==="word-duel"?`<form id="word-form" class="word-entry"><label for="word-input">TYPE THE SIGNAL</label><input id="word-input" autocomplete="off" autocapitalize="off" inputmode="text" spellcheck="false" enterkeyhint="done" ${Zt||n?"disabled":""} aria-label="Type the shared signal word and press Enter" /></form>`:`<button id="shot-button" class="primary shot-button" ${Zt||n?"disabled":""}>SHOOT</button><p class="key-hint">CLICK / TAP / <kbd>SPACE</kbd></p>`,p=o||n||s?`<div class="scoreline multiplayer-score"><span>YOU ${n!=null&&n.falseStart?"EARLY":n?`${n.reactionMs} MS`:"--"}</span><span>RIVAL ${s!=null&&s.falseStart?"EARLY":s?`${s.reactionMs} MS`:"--"}</span></div>`:"";return gn(`<section class="duel" data-phase="${c?"waiting":r==="word-duel"?"word":"draw"}" data-result="${o?a?"win":"loss":""}"><div class="duel-sky"><div class="duel-sun"></div><div class="cloud cloud-one"></div><div class="cloud cloud-two"></div></div><div class="horizon"></div><div class="street"></div><div class="opponent" aria-hidden="true"><span class="hat"></span><span class="head"></span><span class="torso"></span><span class="arm"></span></div><div class="gunslinger" aria-hidden="true"><span class="player-hat"></span><span class="player-body"></span><span class="hand"><i class="revolver"><b></b></i></span><span class="holster"></span><span class="flash"></span></div><div class="duel-panel"><p class="eyebrow">LIVE ${r==="word-duel"?"WORD DUEL":"ORIGINAL QUICK DRAW"} · ROOM ${i.code}</p><h1>${l}</h1><p class="duel-prompt" aria-live="assertive">${d}</p>${p}<div class="duel-controls">${h}${sr()}</div></div></section><section class="scoreboard"><div><span>SERIES</span><b>${i.mode==="showdown-series"?`${e.seriesHostWins??0} - ${e.seriesGuestWins??0}`:o?a?"WIN":"LOSS":"LIVE"}</b></div><div><span>YOUR REACTION</span><b>${n!=null&&n.falseStart?"EARLY":n?`${n.reactionMs} MS`:"--"}</b></div><div><span>RIVAL REACTION</span><b>${s!=null&&s.falseStart?"EARLY":s?`${s.reactionMs} MS`:"--"}</b></div><div><span>ROOM</span><b>${i.code}</b></div></section>`)}function ad(i){return`<option value="original-quick-draw" ${i==="original-quick-draw"?"selected":""}>QUICK DRAW</option><option value="word-duel" ${i==="word-duel"?"selected":""}>WORD DUEL</option><option value="trail-trace" ${i==="trail-trace"?"selected":""}>TRAIL TRACE</option><option value="bottle-shot" ${i==="bottle-shot"?"selected":""}>BOTTLE SHOT</option><option value="rock-paper-scissors" ${i==="rock-paper-scissors"?"selected":""}>ROCK PAPER SCISSORS</option><option value="showdown-series" ${i==="showdown-series"?"selected":""}>SHOWDOWN SERIES</option>`}function Dx(){if(!et.isConfigured())return gn('<section class="page-header"><p class="eyebrow">TWO GUNSLINGERS. ONE STREET.</p><h1>Multiplayer</h1><p>Invite a friend to a live lobby, then ready up for the next duel.</p></section><section class="lobby"><div class="lobby-error" role="alert">SUPABASE CONFIGURATION REQUIRED</div><p>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> to your environment, then redeploy. See <code>.env.example</code> and README.md for setup.</p></section>');const i=q,e=(i==null?void 0:i.hostId)===Gt,t=e?i==null?void 0:i.roundState.hostReady:i==null?void 0:i.roundState.guestReady,n=$r?"disabled":"",s=i?e?`${Pr(Ct.displayName)} (HOST)`:Pr(i.roundState.hostName??"HOST CONNECTED"):"YOUR SEAT",r=i!=null&&i.guestId?Pr(e?i.roundState.guestName??"GUEST CONNECTED":Ct.displayName):"OPEN SEAT",o=et.transportStatus()==="connected"?"PEER LINK CONNECTED":et.transportStatus()==="connecting"?"PEER LINK CONNECTING":et.transportStatus()==="unavailable"?"PEER LINK UNAVAILABLE: DATABASE FALLBACK":"DATABASE FALLBACK",a={"not-configured":"TURN OFF: NO AUTHORITY URL","invalid-url":"TURN OFF: INVALID AUTHORITY URL","ticket-required":"TURN OFF: AUTH TICKET REQUIRED",requesting:"TURN: REQUESTING RELAY","relay-ready":"TURN: RELAY CREDENTIALS READY","ticket-rejected":"TURN OFF: TICKET REJECTED",unavailable:"TURN OFF: AUTHORITY UNAVAILABLE","invalid-response":"TURN OFF: INVALID AUTHORITY RESPONSE"}[et.turnStatus()],c=Jt||(i?i.status==="ready"?`Both gunslingers are ready. ${o}.`:i.guestId?`Both players must ready up. ${o}.`:"Share this code with your opponent, then wait for them to join.":"Create a private room or join your friend's code. Anonymous sign-in happens automatically."),l=fs?Math.floor((Date.now()-fs)/1e3):0,u=ri||(Ut==="searching"?`Searching for a ${us.replaceAll("-"," ")} rival. Your place is held while this screen is open.`:Ut==="matched"?"Match found. Your duel room is ready.":"Choose a mode, then search the public Quick Game queue."),d=i?`<div class="lobby-controls"><button class="primary" id="ready-room" ${n}>${t?"NOT READY":"READY UP"}</button><button class="outline" id="leave-room" ${n}>LEAVE ROOM</button></div><p class="lobby-message" aria-live="polite">${c}</p>`:`<div class="queue-tabs" role="tablist"><button data-queue="casual" aria-selected="${Lr==="casual"}">CASUAL</button><button data-queue="ranked" aria-selected="${Lr==="ranked"}">RANKED</button></div>${Lr==="ranked"?`<section class="ranked-notice"><p class="eyebrow">AUTHORITATIVE PLAY</p><h2>RANKED IS NOT LIVE</h2><p>Ranked requires a deployed authority service, verified player identity, and server-timed action validation. This client has no configured competitive endpoint, so it will not place or simulate ranked matches.</p><small>Authority URL: ${oh.url?"configured, but ranked client integration is intentionally disabled":"not configured"}.</small></section>`:`<section class="quick-match" data-searching="${Ut==="searching"}"><div><p class="eyebrow">CASUAL QUICK GAME</p><h2>${Ut==="searching"?"FINDING A RIVAL":"PICK A STREET"}</h2></div><div class="quick-match-controls"><label>DUEL MODE<select id="quick-match-mode" ${n||Ut==="searching"?"disabled":""}>${ad(us)}</select></label><button class="primary" id="quick-game" ${Ut==="searching"?"disabled":n}>${Ut==="searching"?"SEARCHING":"QUICK GAME"}</button><button class="outline" id="cancel-search" ${Ut==="idle"?"disabled":n}>CANCEL SEARCH</button></div><div class="queue-readout"><span>MODE <b>${us.replaceAll("-"," ").toUpperCase()}</b></span><span>SEARCH TIME <b>${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}</b></span><span>LINK <b>${o.replace("PEER LINK ","")}</b></span></div><p class="quick-match-status" data-status="${Ut}" aria-live="polite">${Ut.toUpperCase()} · ${u}</p></section><section class="private-room"><p class="eyebrow">PRIVATE ROOM</p><p>Keep it practical: create a code for a friend, or join theirs.</p><div class="lobby-controls"><button class="primary" id="create-room" ${n}>CREATE ROOM</button><label>DUEL MODE<select id="room-mode" ${n}>${ad("original-quick-draw")}</select></label></div><div class="lobby-controls"><label>ROOM CODE<input id="room-code" maxlength="6" autocomplete="off" placeholder="ABC123" ${n} /></label><button class="outline" id="join-room" ${n}>JOIN ROOM</button></div></section><p class="lobby-message" aria-live="polite">${c}</p>`}`;return gn(`<section class="page-header"><p class="eyebrow">TWO GUNSLINGERS. ONE STREET.</p><h1>Multiplayer</h1><p>Casual uses peer-assisted rooms and visible fallback status. Ranked is reserved for an authoritative service.</p></section><section class="lobby"><div class="lobby-status">${i?`ROOM ${i.code} · ${i.status.toUpperCase()}`:Lr==="casual"?"CASUAL LOBBY":"RANKED"}</div><div class="connection-badge" data-transport="${et.transportStatus()}">${o}</div><div class="authority-badge" data-turn-status="${et.turnStatus()}">${a}</div><p class="authority-note">TURN is optional for Casual connectivity. Without a valid short-lived ticket, this game uses STUN and the Supabase database fallback. Ranked is not enabled.</p><div class="slots"><div><span>PLAYER ONE</span><b>${s}</b><small>${i!=null&&i.roundState.hostReady?"READY":"WAITING"}</small></div><div><span>PLAYER TWO</span><b>${r}</b><small>${i!=null&&i.roundState.guestReady?"READY":"WAITING"}</small></div></div>${d}</section>`)}function Nx(){return gn(`<section class="page-header"><p class="eyebrow">KNOW THE RULES</p><h1>How to Play</h1><p>Three original versus-AI duels, plus their shared-path multiplayer counterparts.</p></section><section class="rules"><article><b>01</b><h2>Original Quick Draw</h2><p>After <strong>DRAW!</strong>, click, tap, or press Space once to shoot. Your reaction time races Ash's.</p></article><article><b>02</b><h2>Word Duel</h2><p>After a random wait, type the displayed <strong>SHOOT</strong>, <strong>DRAW</strong>, or <strong>POW</strong> exactly and press Enter.</p></article><article><b>03</b><h2>Trail Trace</h2><p>Press and hold on the left marker, follow the glowing path, then release. Score blends how far you travel and how closely you stay on line.</p></article></section>`)}function Ux(){var g;const i=(q==null?void 0:q.status)==="playing"?q.roundState.round:void 0,e=(q==null?void 0:q.hostId)===Gt,t=i==null?void 0:i.winner,n=t?t==="tie"?"tie":t===(e?"host":"guest")?"win":"loss":(g=$.result)==null?void 0:g.outcome;if(!n)return"";const s=$.result,r=i?e?i.hostAction:i.guestAction:void 0,o=i?e?i.guestAction:i.hostAction:void 0,a=(r==null?void 0:r.score)??(s==null?void 0:s.reactionMs),c=(o==null?void 0:o.score)??(s==null?void 0:s.opponentReactionMs),l=((i==null?void 0:i.gameMode)??(i?q.mode:$.mode)).replaceAll("-"," ").toUpperCase(),u=i?oi()&&!i.matchWinner?'<button id="result-next" class="primary">NEXT ROUND</button>':"":'<button id="result-rematch" class="primary">REMATCH</button>',d=i?'<button id="result-return" class="outline">RETURN TO LOBBY</button>':'<button id="result-return" class="outline">CHOOSE ANOTHER MODE</button>',p=qe==="showdown-series"||(q==null?void 0:q.mode)==="showdown-series"?n==="tie"?"ROUND TIED. THE HOST DEALS THE REPLAY.":n==="win"?"ROUND WON":"ROUND LOST":n==="win"?"YOUR STORY GROWS":n==="loss"?"THE DUST SETTLES":"HONORS EVEN";return`<section class="result-panel" data-outcome="${n}"><p class="eyebrow">ROUND REPORT · ${l}</p><h2>${p}</h2><p>${i?n==="tie"?"Neither side takes this round.":n==="win"?"You take the round.":"Your rival takes the round.":s==null?void 0:s.message}</p><div class="result-metrics"><span>YOU <b>${a===void 0?"--":`${a}${typeof a=="number"&&($.mode==="original-quick-draw"||$.mode==="word-duel"||$.mode==="ghost-challenge")?" MS":""}`}</b></span><span>RIVAL <b>${c===void 0?"--":c}</b></span><span>STREAK <b>${Ct.winStreak}</b></span><span>PROFILE <b>${Ct.title}</b></span></div><div class="duel-actions">${u}${d}</div></section>`}function Ve(){var e,t,n,s,r,o,a,c,l,u,d,h,p,g,_,m,f,M,T,x,w,C,I,A,y,S,L,U,H,W,V,Y,J,k,le,de,Ae,He;if(De.innerHTML=Qe==="home"?wx():Qe==="mode-select"?Cx():Qe==="game"?Lx():Qe==="multiplayer"?Dx():Qe==="profile"?Rx():Nx(),Qe==="multiplayer"&&((e=De.querySelector(".authority-note"))==null||e.insertAdjacentHTML("afterend",'<section class="private-room arena-card"><p class="eyebrow">IRON YARD</p><h2>FPS 1V1 & QUICK GAME</h2><p>Iron Yard needs the separately deployed WebSocket server before private 1v1 rooms can connect.</p><button id="enter-arena-multiplayer" class="primary">OPEN IRON YARD</button></section>')),Qe==="game"&&(qe==="showdown-series"||(q==null?void 0:q.mode)==="showdown-series")){const te=q==null?void 0:q.roundState.round,Xe=(q==null?void 0:q.hostId)===Gt,Oe=te?Xe?te.seriesHostWins??0:te.seriesGuestWins??0:rn,X=te?Xe?te.seriesGuestWins??0:te.seriesHostWins??0:pn,Q=$.mode==="word-duel"||$.mode==="trail-trace"||$.mode==="bottle-shot"||$.mode==="rock-paper-scissors"?$.mode:void 0,ye=(te==null?void 0:te.gameMode)??($.mode==="original-quick-draw"?qi:Q);ye&&!Vi&&!(Oe===3||X===3)&&((t=De.querySelector(".masthead"))==null||t.insertAdjacentHTML("afterend",Ex(ye,Oe,X,(te==null?void 0:te.seriesRound)??$.number,te!=null&&te.startAt?Math.max(0,Math.ceil((Date.parse(te.startAt)-Date.now())/1e3)):void 0,q?yx(q):"ASH DEALS THE NEXT TEST"))),(n=De.querySelector(".scoreboard"))==null||n.insertAdjacentHTML("afterbegin",`<div><span>SHOWDOWN SERIES</span><b>${Oe} - ${X} / FIRST TO 3</b></div>`)}if(Qe==="game"&&((s=De.querySelector(".scoreboard"))==null||s.insertAdjacentHTML("afterend",Ux())),Qe==="mode-select"){(r=De.querySelector(".mode-cards"))==null||r.insertAdjacentHTML("beforeend",`<article${qe==="bottle-shot"?' data-selected="true"':""}><p class="eyebrow">MODE 04</p><h2>Bottle Shot</h2><p>Thirty seconds of six-bottle waves. Green and blue add points; red bottles and empty-range shots subtract them.</p><button class="outline" data-mode="bottle-shot">${qe==="bottle-shot"?"SELECTED":"SELECT BOTTLE SHOT"}</button></article>`),(o=De.querySelector(".mode-cards"))==null||o.insertAdjacentHTML("beforeend",`<article${qe==="rock-paper-scissors"?' data-selected="true"':""}><p class="eyebrow">MODE 05</p><h2>Rock Paper Scissors</h2><p>A simultaneous best-of-five showdown. First gunslinger to three round wins takes the match.</p><button class="outline" data-mode="rock-paper-scissors">${qe==="rock-paper-scissors"?"SELECTED":"SELECT ROCK PAPER SCISSORS"}</button></article>`),(a=De.querySelector(".mode-cards"))==null||a.insertAdjacentHTML("beforeend",`<article class="ghost-card"${qe==="ghost-challenge"?' data-selected="true"':""}><p class="eyebrow">MODE 06 · AI ONLY</p><h2>Beat Your Best</h2><p>Ghost Challenge races your saved personal-best reaction. No record yet? Beat the clearly marked ${Fr} MS starter target to set one.</p><button class="outline" data-mode="ghost-challenge">${qe==="ghost-challenge"?"SELECTED":"CHALLENGE YOUR GHOST"}</button></article>`),(c=De.querySelector(".mode-cards"))==null||c.insertAdjacentHTML("beforeend",`<article class="series-card"${qe==="showdown-series"?' data-selected="true"':""}><p class="eyebrow">SERIES · FIRST TO THREE</p><h2>Showdown Series</h2><p>A cinematic five-test gauntlet. Each round reveals a new random direct duel; first to three wins takes the street.</p><button class="outline" data-mode="showdown-series">${qe==="showdown-series"?"SELECTED":"START SHOWDOWN SERIES"}</button></article>`),(l=De.querySelector(".mode-cards"))==null||l.insertAdjacentHTML("beforeend",`<article class="arena-card"${qe==="arena-skirmish"?' data-selected="true"':""}><p class="eyebrow">MODE 08 · LIVE 1V1</p><h2>Iron Yard</h2><p>A compact 1v1 arena skirmish. Create or join a room, then move, aim, reload, and outshoot a real rival.</p><button class="outline" data-mode="arena-skirmish">${qe==="arena-skirmish"?"SELECTED":"ENTER IRON YARD"}</button></article>`);const te=De.querySelector(".difficulty-select > p:not(.eyebrow)");if(te&&(te.textContent="Trail Trace and Bottle Shot change Ash's simulated score; Quick Draw and Word Duel change reaction time. Ghost Challenge always uses your saved best."),qe==="arena-skirmish"){const Xe=De.querySelector(".page-header");Xe&&(Xe.innerHTML='<p class="eyebrow">DESKTOP FPS</p><h1>Iron Yard</h1><p>Start with an offline training bot or create a lightweight private 1v1 room.</p>');const Oe=De.querySelector(".difficulty-select");Oe&&(Oe.innerHTML='<p class="eyebrow">DESKTOP CONTROLS</p><h2>Ready To Enter?</h2><p>Choose a weapon in the yard. Training works without a server; create a room for 1v1.</p><button class="primary start-ai-duel" id="start-ai-duel">ENTER IRON YARD</button>')}}if(Qe==="how-to"){const te=De.querySelector(".page-header > p:last-child");te&&(te.textContent="Six original versus-AI duels, including one personal Ghost Challenge, shared multiplayer counterparts, and a live 1v1 arena."),(u=De.querySelector(".rules"))==null||u.insertAdjacentHTML("beforeend","<article><b>04</b><h2>Bottle Shot</h2><p>For 30 seconds, six bottles appear every 1.5 seconds. Green and blue are <strong>+10</strong>; red bottles and shots that miss an active bottle are <strong>-10</strong>.</p></article>"),(d=De.querySelector(".rules"))==null||d.insertAdjacentHTML("beforeend","<article><b>05</b><h2>Rock Paper Scissors</h2><p>Choose simultaneously. Rock beats Scissors, Scissors beats Paper, and Paper beats Rock. First to three round wins takes the match.</p></article>"),(h=De.querySelector(".rules"))==null||h.insertAdjacentHTML("beforeend",`<article class="ghost-card"><b>06</b><h2>Beat Your Best / Ghost Challenge</h2><p>Wait for <strong>DRAW!</strong>, then shoot once. Your target is your saved fastest Ghost reaction; beat it to win and set a new record. Before your first win, beat the labeled <strong>${Fr} MS STARTER TARGET</strong>, which becomes your record after success. Early shots are false starts.</p></article>`),(p=De.querySelector(".rules"))==null||p.insertAdjacentHTML("beforeend",'<article class="series-card"><b>07</b><h2>Showdown Series</h2><p>First to three wins takes the street. Each round reveals one random direct duel before the bell; in multiplayer, the prior-round winner deals next, while a tie returns that control to the host.</p></article>'),(g=De.querySelector(".rules"))==null||g.insertAdjacentHTML("beforeend",'<article class="arena-card"><b>08</b><h2>Iron Yard</h2><p>A live 1v1 arena. Create or join a room, move with <strong>WASD</strong> or arrow keys, aim with the pointer, fire with click or the visible button, and reload with <strong>R</strong>.</p></article>')}De.querySelectorAll("[data-page]").forEach(te=>te.addEventListener("click",()=>Bs(te.dataset.page))),De.querySelectorAll("[data-mode]").forEach(te=>te.addEventListener("click",()=>{qe=te.dataset.mode,Ve()})),(_=De.querySelector("#sound-toggle"))==null||_.addEventListener("click",()=>{Dh(),Ve()}),De.querySelectorAll("[data-rps-choice]").forEach(te=>te.addEventListener("click",()=>vh(te.dataset.rpsChoice))),De.querySelectorAll("[data-ai-difficulty]").forEach(te=>te.addEventListener("click",()=>{Xn=te.dataset.aiDifficulty,Ve()})),(m=De.querySelector("#start-ai-duel"))==null||m.addEventListener("click",()=>Bs("game")),(f=De.querySelector("#shot-button"))==null||f.addEventListener("click",()=>xh(!Tx())),(M=De.querySelector(".bottle-range"))==null||M.addEventListener("click",te=>{(!(te.target instanceof Element)||!te.target.closest("[data-bottle-id]"))&&Yx()}),De.querySelectorAll("[data-bottle-id]").forEach(te=>te.addEventListener("click",Xe=>{Xe.stopPropagation(),Xx(Number(te.dataset.bottleId))})),(T=De.querySelector("#word-form"))==null||T.addEventListener("submit",te=>{te.preventDefault(),ty()}),(x=De.querySelector("#create-room"))==null||x.addEventListener("click",()=>void Fx()),(w=De.querySelector("#join-room"))==null||w.addEventListener("click",()=>void Bx()),(C=De.querySelector("#ready-room"))==null||C.addEventListener("click",()=>void kx()),(I=De.querySelector("#leave-room"))==null||I.addEventListener("click",()=>void Uo()),(A=De.querySelector("#leave-duel"))==null||A.addEventListener("click",()=>void Uo()),(y=De.querySelector("#next-round"))==null||y.addEventListener("click",()=>void jr()),(S=De.querySelector("#result-next"))==null||S.addEventListener("click",()=>void jr()),(L=De.querySelector("#result-rematch"))==null||L.addEventListener("click",()=>qe==="showdown-series"?Gc():vl()),(U=De.querySelector("#series-begin"))==null||U.addEventListener("click",Gc),(H=De.querySelector("#series-rematch"))==null||H.addEventListener("click",()=>(q==null?void 0:q.status)==="playing"?void Zx():jx()),(W=De.querySelector("#series-return"))==null||W.addEventListener("click",()=>(q==null?void 0:q.status)==="playing"?void Uo():Bs("mode-select")),(V=De.querySelector("#result-return"))==null||V.addEventListener("click",()=>(q==null?void 0:q.status)==="playing"?void Uo():Bs("mode-select")),(Y=De.querySelector("#quick-game"))==null||Y.addEventListener("click",()=>void Vx()),(J=De.querySelector("#enter-arena-multiplayer"))==null||J.addEventListener("click",()=>{qe="arena-skirmish",Bs("game")}),(k=De.querySelector("#cancel-search"))==null||k.addEventListener("click",()=>void Gx()),De.querySelectorAll("[data-queue]").forEach(te=>te.addEventListener("click",()=>{Lr=te.dataset.queue,Ve()})),(le=De.querySelector("#profile-form"))==null||le.addEventListener("submit",te=>{te.preventDefault();const Xe=De.querySelector("#display-name");Ct.displayName=(Xe==null?void 0:Xe.value.trim().replace(/\s+/g," ").slice(0,24))||"Unnamed Drifter",lh(),Ve()}),(de=De.querySelector("#fullscreen-toggle"))==null||de.addEventListener("click",Ax),(Ae=De.querySelector("#arena-return"))==null||Ae.addEventListener("click",()=>Bs("mode-select"));const i=De.querySelector("#trail-canvas");i&&Ox(i),Qe==="game"&&qe==="arena-skirmish"&&ux(),($.mode==="word-duel"&&$.phase==="word"||(q==null?void 0:q.status)==="playing"&&q.mode==="word-duel"&&(Dt==null?void 0:Dt.roundId)===((He=q.roundState.round)==null?void 0:He.id))&&window.setTimeout(()=>{var te;return(te=De.querySelector("#word-input"))==null?void 0:te.focus()},0)}function Ox(i){const e=Number(i.dataset.seed??0),t=Uh(e),n=i.dataset.disabled==="true",s=i.getContext("2d");if(!s)return;Gn=[],Rr=!1;const r=()=>{const c=i.getBoundingClientRect(),l=window.devicePixelRatio||1;i.width=Math.max(1,Math.round(c.width*l)),i.height=Math.max(1,Math.round(c.height*l)),s.setTransform(l,0,0,l,0,0),No(s,c.width,c.height,t,Gn)};r();const o=c=>{const l=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(c.clientX-l.left)/l.width)),y:Math.max(0,Math.min(1,(c.clientY-l.top)/l.height))}};i.onpointerdown=c=>{n||(Gn=[o(c)],Rr=!0,i.setPointerCapture(c.pointerId),No(s,i.clientWidth,i.clientHeight,t,Gn))},i.onpointermove=c=>{!Rr||n||(Gn.push(o(c)),No(s,i.clientWidth,i.clientHeight,t,Gn))};const a=()=>{if(!Rr||n)return;Rr=!1;const c=Oh(Gn,t);if(!pd(c)){Jt="Trace must reach the end with at least 55% accuracy. Try again.",Gn=[],No(s,i.clientWidth,i.clientHeight,t,Gn),Qe==="game"&&Ve();return}(q==null?void 0:q.status)==="playing"?$x(c):Qx(c)};i.onpointerup=a,i.onpointercancel=a,window.addEventListener("resize",r,{once:!0})}function No(i,e,t,n,s){i.clearRect(0,0,e,t);const r=(o,a,c)=>{o.length&&(i.beginPath(),i.moveTo(o[0].x*e,o[0].y*t),o.slice(1).forEach(l=>i.lineTo(l.x*e,l.y*t)),i.strokeStyle=a,i.lineWidth=c,i.lineCap="round",i.lineJoin="round",i.stroke())};r(n,"rgba(255, 201, 92, .24)",18),r(n,"#ffc95c",4),[n[0],n[n.length-1]].forEach(o=>{i.beginPath(),i.arc(o.x*e,o.y*t,9,0,Math.PI*2),i.fillStyle="#f7e4b7",i.fill()}),r(s,"#df573f",5)}function ra(){Fn==null||Fn();const i=dn;Fn=et.subscribeToRoom(e=>{if(i===dn){if(q=e,e||(Jt="The host left the room."),(e==null?void 0:e.status)==="ready"&&oi(e)&&jr(),(e==null?void 0:e.status)==="playing"&&e.roundState.round){const t=e.roundState.round;t.winner&&t.winner!=="tie"&&!rd.has(t.id)&&(rd.add(t.id),ir(t.gameMode??e.mode,t.winner===(e.hostId===Gt?"host":"guest")?"win":"loss")),gh(e.roundState.round),Qe!=="game"&&(qe=e.mode,Qe="game"),e.hostId===Gt&&(e.roundState.round.hostAction||e.roundState.round.guestAction)&&!e.roundState.round.winner&&eo(e.roundState.round.id)}(Qe==="multiplayer"||Qe==="game")&&Ve()}},e=>{i===dn&&(Jt=e,Qe==="multiplayer"&&Ve())})}async function dr(i){$r=!0,Jt="",Ve();try{await i()}catch(e){Jt=e instanceof Error?e.message:"Unable to update the room."}finally{$r=!1,(Qe==="multiplayer"||Qe==="game")&&Ve()}}function Fx(){var e;const i=(e=De.querySelector("#room-mode"))==null?void 0:e.value;return dr(async()=>{Gt=await et.authenticate(),q=await et.createRoom(i),q=await et.setDisplayName(Ct.displayName),Jt=`Room ${q.code} created. Share the code with your opponent.`,ra()})}function Bx(){var e;const i=((e=De.querySelector("#room-code"))==null?void 0:e.value)??"";return dr(async()=>{Gt=await et.authenticate(),q=await et.joinRoom(i),q=await et.setDisplayName(Ct.displayName),Jt=`Joined room ${q.code}. Ready up when you are set.`,ra()})}function kx(){return dr(async()=>{q=await et.setReady(!((q==null?void 0:q.hostId)===Gt?q!=null&&q.roundState.hostReady:q!=null&&q.roundState.guestReady)),q.status==="ready"&&oi(q)&&jr()})}function Hx(){dn++,ur(),Fn==null||Fn(),Fn=void 0,Nt==null||Nt(),Nt=void 0,q=null,Gt=null,Zt=!1,qo=!1,Dt=void 0,Ut="idle",fs=void 0,window.clearInterval(Xr),ri=""}function Uo(){if(!$r)return dr(async()=>{try{await et.leaveRoom()}finally{Hx(),Jt="You left the room.",Qe="multiplayer"}})}function Kr(i){q=i,Ut="matched",fs=void 0,window.clearInterval(Xr),ri=`Matched in room ${i.code}. Ready up when you are set.`,Nt==null||Nt(),Nt=void 0,ra()}async function zx(){if(!(!et.isConfigured()||q||Ut==="matched"))try{Gt??(Gt=await et.authenticate());const i=await et.restoreQuickMatch();if(!i)return;if(us=i.mode,i.room){Kr(i.room),Qe==="multiplayer"&&Ve();return}Ut="searching",fs??(fs=Date.now()),ri="Search restored. Looking for a gunslinger in your selected mode...",Nt||(Nt=et.subscribeToQuickMatch(Kr,e=>{Ut="error",ri=e,Qe==="multiplayer"&&Ve()})),Qe==="multiplayer"&&Ve()}catch(i){Ut="error",ri=i instanceof Error?i.message:"Unable to restore Quick Game search.",Qe==="multiplayer"&&Ve()}}function Vx(){var i;return us=((i=De.querySelector("#quick-match-mode"))==null?void 0:i.value)??us,dr(async()=>{try{Gt=await et.authenticate(),Ut="searching",fs=Date.now(),ri="",window.clearInterval(Xr),Xr=window.setInterval(()=>{Qe==="multiplayer"&&Ut==="searching"&&Ve()},1e3),Nt==null||Nt(),Nt=et.subscribeToQuickMatch(t=>{Kr(t),Qe==="multiplayer"&&Ve()},t=>{Ut="error",ri=t,Qe==="multiplayer"&&Ve()});const e=await et.requestQuickMatch(us);e&&Kr(e)}catch(e){Ut="error",ri=e instanceof Error?e.message:"Unable to start Quick Game."}})}function Gx(){return dr(async()=>{const i=await et.cancelQuickMatch();Nt==null||Nt(),Nt=void 0,i?Kr(i):(Ut="idle",fs=void 0,window.clearInterval(Xr),ri="Search cancelled.")})}function oi(i=q){if(!i)return!1;const e=i.roundState.round;return(i.mode==="showdown-series"&&(e!=null&&e.winner)?e.nextRoundHost??i.hostId:i.hostId)===Gt}function Wx(i){return new Promise(e=>window.setTimeout(e,i))}async function jr(){var t,n,s,r,o;const i=q;if(!i||!oi(i)||!i.guestId||!i.roundState.hostReady||!i.roundState.guestReady||i.status!=="ready"&&!((t=i.roundState.round)!=null&&t.winner)||qo)return;const e=dn;qo=!0,Zt=!1,Gn=[];try{if((n=i.roundState.round)!=null&&n.matchWinner)return;const a=Date.now()+1200;for(;et.transportStatus()==="connecting"&&Date.now()<a;)await Wx(100);const c=i.mode==="showdown-series"?nr[Math.floor(Math.random()*nr.length)]:i.mode,l=et.transportStatus()==="connected"?3e3:4500,u=new Date(Date.now()+(c==="trail-trace"||c==="bottle-shot"||c==="rock-paper-scissors"?l:l+wn(ls.minWaitMs,ls.maxWaitMs))).toISOString(),d={id:crypto.randomUUID(),startAt:u,...i.mode==="showdown-series"||c==="rock-paper-scissors"?{...i.mode==="showdown-series"?{gameMode:c}:{},seriesHostWins:((s=i.roundState.round)==null?void 0:s.seriesHostWins)??0,seriesGuestWins:((r=i.roundState.round)==null?void 0:r.seriesGuestWins)??0,seriesRound:(((o=i.roundState.round)==null?void 0:o.seriesRound)??0)+1}:{},...c==="word-duel"?{word:ud()}:{},...c==="trail-trace"?{pathSeed:crypto.getRandomValues(new Uint32Array(1))[0]}:{},...c==="bottle-shot"?{targetSeed:crypto.getRandomValues(new Uint32Array(1))[0],endAt:new Date(Date.parse(u)+Wc).toISOString()}:{},...c==="rock-paper-scissors"?{decisionEndsAt:new Date(Date.parse(u)+ld).toISOString()}:{}},h=await et.startRound(d);if(e!==dn)return;q=h,gh(d),qe=i.mode,Qe="game",Ve()}catch(a){if(e!==dn)return;Jt=a instanceof Error?a.message:"Unable to start the shared round.",(Qe==="multiplayer"||Qe==="game")&&Ve()}finally{e===dn&&(qo=!1)}}function gh(i){if(ur(),(Dt==null?void 0:Dt.roundId)!==i.id&&(Dt=void 0),(i.gameMode??(q==null?void 0:q.mode))==="rock-paper-scissors"&&i.decisionEndsAt){const s=Date.parse(i.decisionEndsAt),r=()=>{const o=q==null?void 0:q.roundState.round;if(!(!o||o.id!==i.id||o.winner)){if(Date.now()>=s){((q==null?void 0:q.hostId)===Gt?o.hostAction:o.guestAction)||Sh("rock");return}Qe==="game"&&Ve(),vn=window.setTimeout(r,250)}};r();return}if((i.gameMode??(q==null?void 0:q.mode))==="bottle-shot"&&i.endAt){od!==i.id&&(od=i.id,xn=0,Yr=new Set);const s=()=>{if(Qe==="game"&&!i.winner&&Ve(),Date.now()>=Date.parse(i.endAt)){Kx();return}vn=window.setTimeout(s,250)};vn=window.setTimeout(s,Math.max(0,Date.parse(i.startAt)-Date.now()));return}if((Dt==null?void 0:Dt.roundId)===i.id)return;const e=()=>{const s=q==null?void 0:q.roundState.round;!s||s.id!==i.id||s.winner||(Dt={roundId:i.id,at:0},Ve(),Dt.at=performance.now(),sn("signal"))},t=performance.now()+Math.max(0,et.localStartAt(i.startAt)-Date.now()),n=()=>{const s=t-performance.now();if(s>20){vn=window.setTimeout(n,s-12);return}if(s>0){vn=window.setTimeout(n,s);return}e()};i.winner||n()}async function eo(i){const e=dn;try{const t=await et.resolveRound(i);if(e===dn){q=t;const n=t.roundState.round;(((n==null?void 0:n.gameMode)??t.mode)==="original-quick-draw"||((n==null?void 0:n.gameMode)??t.mode)==="word-duel")&&n&&!n.winner&&!!n.hostAction!=!!n.guestAction&&qx(i)}}catch(t){e===dn&&(Jt=t instanceof Error?t.message:"Unable to resolve the round.")}}function qx(i){window.setTimeout(()=>{const e=q==null?void 0:q.roundState.round;(q==null?void 0:q.hostId)===Gt&&(e==null?void 0:e.id)===i&&!e.winner&&et.resolveRound(i,!0).then(t=>{q=t,Qe==="game"&&Ve()}).catch(()=>{})},1200)}async function _h(i=!1){const e=q,t=e==null?void 0:e.roundState.round;if(!e||!t||Zt||t.winner)return;const n=dn,s=e.hostId===Gt;if(!(s?t.hostAction:t.guestAction)){Zt=!0,Ve();try{const r=(Dt==null?void 0:Dt.roundId)===t.id?Dt:void 0,o=i||!r,a=o?0:Math.max(0,Math.round(performance.now()-r.at));et.sendLiveAction({roundId:t.id,reactionMs:a,falseStart:o});const c=await et.submitRoundAction(t.id,a,o);if(n!==dn)return;q=c,s&&await eo(t.id)}catch(r){n===dn&&(Jt=r instanceof Error?r.message:"Unable to send your action.")}finally{n===dn&&(Zt=!1,Qe==="game"&&Ve())}}}async function $x(i){const e=q,t=e==null?void 0:e.roundState.round;if(!e||!t||Zt||t.winner)return;const n=e.hostId===Gt;Zt=!0,Ve();try{if(!pd(i))throw new Error("Finish the trail with a steady line before submitting.");et.sendLiveAction({roundId:t.id,reactionMs:0,falseStart:!1,payload:i}),q=await et.submitRoundAction(t.id,0,!1,i),n&&await eo(t.id)}catch(s){Jt=s instanceof Error?s.message:"Unable to submit your trail score."}finally{Zt=!1,Qe==="game"&&Ve()}}function Xx(i){const e=(q==null?void 0:q.status)==="playing",t=e?q.roundState.round.targetSeed:$.mode==="bottle-shot"?$.targetSeed:0,n=e?Date.parse(q.roundState.round.startAt):$.mode==="bottle-shot"?$.startAt:0,s=e?Date.parse(q.roundState.round.endAt):$.mode==="bottle-shot"?$.endAt:0,o=Math.floor((Date.now()-n)/qc)*Xs;if(Date.now()<n||Date.now()>=s||i<o||i>=o+Xs||Yr.has(i))return;const a=dd(t)[i];a&&(Yr.add(i),xn+=Rh(a.kind),e&&et.sendLiveAction({roundId:q.roundState.round.id,reactionMs:0,falseStart:!1,payload:{score:xn}}),sn(a.kind==="red"?"negative":"bottle"),!e&&$.mode==="bottle-shot"&&($={...$,playerScore:xn}),Ve())}function Yx(){const i=(q==null?void 0:q.status)==="playing",e=i?Date.parse(q.roundState.round.startAt):$.mode==="bottle-shot"?$.startAt:0,t=i?Date.parse(q.roundState.round.endAt):$.mode==="bottle-shot"?$.endAt:0;Date.now()<e||Date.now()>=t||(xn+=cd,i&&et.sendLiveAction({roundId:q.roundState.round.id,reactionMs:0,falseStart:!1,payload:{score:xn}}),sn("negative"),!i&&$.mode==="bottle-shot"&&($={...$,playerScore:xn}),Ve())}async function Kx(){const i=q,e=i==null?void 0:i.roundState.round;if(!i||!e||Zt||e.winner||!e.endAt||Date.now()<Date.parse(e.endAt))return;const t=i.hostId===Gt;if(!(t?e.hostAction:e.guestAction)){Zt=!0;try{et.sendLiveAction({roundId:e.id,reactionMs:0,falseStart:!1,payload:{score:xn}}),q=await et.submitRoundAction(e.id,0,!1,{score:xn}),t&&await eo(e.id)}catch(n){Jt=n instanceof Error?n.message:"Unable to submit your Bottle Shot score."}finally{Zt=!1,Qe==="game"&&Ve()}}}function vl(){Gn=[],(qe==="showdown-series"||qe==="rock-paper-scissors")&&(rn===3||pn===3)&&(rn=0,pn=0,qe==="rock-paper-scissors"&&($={number:0,mode:"rock-paper-scissors",phase:"menu"}));const i=qe==="showdown-series"?qi??nr[Math.floor(Math.random()*nr.length)]:qe;if(qi=void 0,i==="rock-paper-scissors"){const t=Date.now()+ld;$={number:$.number+1,mode:"rock-paper-scissors",phase:"choosing",decisionEndsAt:t};const n=()=>{if(!($.mode!=="rock-paper-scissors"||$.phase!=="choosing")){if(Date.now()>=t){vh("rock");return}Ve(),vn=window.setTimeout(n,250)}};Ve(),vn=window.setTimeout(n,250);return}if(i==="bottle-shot"){const t=Date.now();xn=0,Yr=new Set,$={number:$.number+1,mode:"bottle-shot",phase:"playing",targetSeed:crypto.getRandomValues(new Uint32Array(1))[0],startAt:t,endAt:t+Wc,playerScore:0};const n=()=>{if(!($.mode!=="bottle-shot"||$.phase!=="playing")){if(Date.now()>=$.endAt){ey();return}Ve(),vn=window.setTimeout(n,250)}};Ve(),vn=window.setTimeout(n,250);return}if(i==="trail-trace"){$={number:$.number+1,mode:"trail-trace",phase:"tracing",pathSeed:crypto.getRandomValues(new Uint32Array(1))[0]},Ve();return}const e=i==="ghost-challenge"?{waitMs:wn(ls.minWaitMs,ls.maxWaitMs),opponentReactionMs:nn.best??Fr}:bh(Xn);$=i==="word-duel"?{number:$.number+1,mode:"word-duel",phase:"waiting",opponentReactionMs:e.opponentReactionMs}:i==="ghost-challenge"?{number:$.number+1,mode:"ghost-challenge",phase:"waiting",opponentReactionMs:e.opponentReactionMs}:{number:$.number+1,mode:"original-quick-draw",phase:"waiting",opponentReactionMs:e.opponentReactionMs},Ve(),vn=window.setTimeout(()=>{$.mode==="word-duel"?$={...$,phase:"word",word:ud()}:($.mode==="original-quick-draw"||$.mode==="ghost-challenge")&&($={...$,phase:"draw"}),Ve();const t=performance.now();$.mode==="word-duel"?$={...$,wordAt:t}:($.mode==="original-quick-draw"||$.mode==="ghost-challenge")&&($={...$,drawAt:t}),sn("signal"),Vc=window.setTimeout(()=>Qo($c($.opponentReactionMs,$.opponentReactionMs)),$.opponentReactionMs)},e.waitMs)}function Gc(){if(qe!=="showdown-series")return;sn("click"),qi=nr[Math.floor(Math.random()*nr.length)],Vi="reveal",cs=Date.now()+3e3;const i=()=>{if(!(Vi!=="reveal"||!cs)){if(Date.now()<cs){Ve(),vn=window.setTimeout(i,250);return}Vi=void 0,cs=void 0,vl()}};Ve(),vn=window.setTimeout(i,250)}function jx(){ur(),rn=0,pn=0,$={number:0,mode:"original-quick-draw",phase:"menu"},Vi="intro",qi=void 0,Ve()}async function Zx(){try{q=await et.restartSeries(),Jt="New series ready. The host deals round one.",await jr()}catch(i){Jt=i instanceof Error?i.message:"Unable to reset the series.",Ve()}}function vh(i){if(sn("click"),(q==null?void 0:q.status)==="playing"){Sh(i);return}if($.mode!=="rock-paper-scissors"||$.phase!=="choosing")return;const e=Ih();$={...$,playerChoice:i,opponentChoice:e,phase:"result"},Jx(Lh(i,e))}function Jx(i){ur(),i.outcome==="win"?(ir("rock-paper-scissors","win"),rn++):i.outcome==="loss"&&(ir("rock-paper-scissors","loss"),pn++),$={...$,phase:"result",result:i},sn(i.outcome==="win"?"win":i.outcome==="loss"?"loss":"click"),Ve()}async function Sh(i){const e=q,t=e==null?void 0:e.roundState.round;if(!(!e||!t||Zt||t.winner)){Zt=!0;try{et.sendLiveAction({roundId:t.id,reactionMs:0,falseStart:!1,payload:{choice:i}}),q=await et.submitRoundAction(t.id,0,!1,{choice:i}),e.hostId===Gt&&await eo(t.id)}catch(n){Jt=n instanceof Error?n.message:"Unable to lock your choice."}finally{Zt=!1,Ve()}}}function Qx(i){const e=Fh(Xn),t=i.score>=e;ir($.mode,t?"win":"loss"),qe==="showdown-series"&&(t?rn++:pn++),sa(),$={...$,phase:"result",playerScore:i.score,playerProgress:i.progress,playerAccuracy:i.accuracy,result:{outcome:t?"win":"loss",opponentReactionMs:e,message:t?"Your line held closer through the badlands.":"Ash held the steadier line."}},sn(t?"win":"loss"),Ve()}function ey(){if($.mode!=="bottle-shot")return;const i=Ch(Xn),e=xn>=i;ir("bottle-shot",e?"win":"loss"),qe==="showdown-series"&&(e?rn++:pn++),sa(),$={...$,phase:"result",playerScore:xn,result:{outcome:e?"win":"loss",opponentReactionMs:i,message:e?"You cleared the range.":"Ash cleared more bottles."}},sn(e?"win":"loss"),Ve()}function xh(i=!1){if(sn("click"),(q==null?void 0:q.status)==="playing"){const e=q.roundState.round,t=e&&(Dt==null?void 0:Dt.roundId)!==e.id;e&&(!t||i)&&_h(t);return}$.phase==="menu"||$.phase==="result"?qe==="showdown-series"?Gc():vl():$.phase==="waiting"&&i?Qo(Ah($.opponentReactionMs)):($.mode==="original-quick-draw"||$.mode==="ghost-challenge")&&$.phase==="draw"&&(sn("shot"),Qo($c(Math.round(performance.now()-$.drawAt),$.opponentReactionMs)))}function ty(){var e;if((q==null?void 0:q.status)==="playing"){const t=De.querySelector("#word-input");(t==null?void 0:t.value.trim().toUpperCase())===((e=q.roundState.round)==null?void 0:e.word)?_h():t==null||t.focus();return}if($.mode!=="word-duel"||$.phase!=="word")return;const i=De.querySelector("#word-input");if(!i||i.value.trim().toUpperCase()!==$.word){i==null||i.focus();return}Qo($c(Math.round(performance.now()-$.wordAt),$.opponentReactionMs))}function Qo(i){ur(),ir($.mode,i.outcome==="win"?"win":"loss",i.outcome==="win"?i.reactionMs:void 0),qe==="showdown-series"&&(i.outcome==="win"?rn++:pn++),sa(),$={...$,phase:"result",result:i},sn(i.outcome==="win"?"win":i.outcome==="false-start"?"negative":"loss"),Ve()}document.addEventListener("keydown",i=>{var e;i.code!=="Space"||i.repeat||Qe!=="game"||qe==="arena-skirmish"||((e=document.activeElement)==null?void 0:e.tagName)==="INPUT"||(i.preventDefault(),xh())});_l.addEventListener("change",()=>{Qe==="game"&&Ve()});document.addEventListener("fullscreenchange",bx);Ve();

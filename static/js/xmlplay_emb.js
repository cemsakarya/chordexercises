//~ Revision: 114, Copyright (C) 2016-2018: Willem Vree, contributions Stéphane David.
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ GNU General Public License as published by the Free Software Foundation; either version 2 of
//~ the License, or (at your option) any later version.
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the GNU General Public License for more details. <http://www.gnu.org/licenses/gpl.html>.
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,p){a!=Array.prototype&&a!=Object.prototype&&(a[b]=p.value)};$jscomp.getGlobal=function(a){a=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global,a];for(var b=0;b<a.length;++b){var p=a[b];if(p&&p.Math==Math)return p}return globalThis};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function a(p){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(p||"")+"_"+b++,p)}var b=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var p=0,m={next:function(){if(p<a.length){var c=p++;return{value:b(c,a[c]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(a,b,p,m){if(b){p=$jscomp.global;a=a.split(".");for(m=0;m<a.length-1;m++){var c=a[m];c in p||(p[c]={});p=p[c]}a=a[a.length-1];m=p[a];b=b(m);b!=m&&null!=b&&$jscomp.defineProperty(p,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.polyfill("Math.log10",function(a){return a?a:function(a){return Math.log(a)/Math.LN10}},"es6","es3");
$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function p(a){return a instanceof c?a:new c(function(t,b){t(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var t=this;this.asyncExecuteFunction(function(){t.executeBatch_()})}this.batch_.push(a)};var m=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){m(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var u=0;u<a.length;++u){var b=a[u];a[u]=null;try{b()}catch(K){this.asyncThrow_(K)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var c=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var t=this.createResolveAndReject_();try{a(t.resolve,t.reject)}catch(A){t.reject(A)}};c.prototype.createResolveAndReject_=function(){function a(a){return function(t){c||(c=!0,a.call(b,t))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var t=null!=a;break a;case "function":t=!0;break a;default:t=!1}t?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var t=void 0;try{t=a.then}catch(A){this.reject_(A);return}"function"==typeof t?
this.settleSameAsThenable_(t,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)L.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var L=new b;c.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};c.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(K){c.reject(K)}};c.prototype.then=function(a,b){function t(a,b){return"function"==typeof a?function(b){try{p(a(b))}catch(W){m(W)}}:b}var p,m,u=new c(function(a,b){p=a;m=b});this.callWhenSettled_(t(a,p),t(b,m));return u};
c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,b){function c(){switch(p.state_){case 1:a(p.result_);break;case 2:b(p.result_);break;default:throw Error("Unexpected state: "+p.state_);}}var p=this;null==this.onSettledCallbacks_?L.asyncExecute(c):this.onSettledCallbacks_.push(c)};c.resolve=p;c.reject=function(a){return new c(function(b,c){c(a)})};c.race=function(a){return new c(function(b,c){for(var t=$jscomp.makeIterator(a),m=t.next();!m.done;m=t.next())p(m.value).callWhenSettled_(b,
c)})};c.all=function(a){var b=$jscomp.makeIterator(a),t=b.next();return t.done?p([]):new c(function(a,c){function m(b){return function(c){u[b]=c;A--;0==A&&a(u)}}var u=[],A=0;do u.push(void 0),A++,p(t.value).callWhenSettled_(m(u.length-1),c),t=b.next();while(!t.done)})};return c},"es6","es3");var xmlplay_VERSION=114;
(function(){function a(a){console.log(a);y.innerHTML+=a+"<br>"}function b(a){console.log(a);y.innerHTML+='<div style="white-space: nowrap">'+a+"</div>"}function p(a,b,g){function f(a){var d,e,q,f,b,k={},g={},v=[18,20,22,24,26,28];a=a.split("\n");for(d=0;d<a.length;++d){var c=a[d];if(0<=c.indexOf("strings")&&(e=c.match(/V:\s*(\S+).*strings\s*=\s*(\S+)/))){var r=e[1];k[r]={};e[2].split(",").forEach(function(a,d){q=a[0];f=12*parseInt(a[1]);b=f+[0,2,4,5,7,9,11]["CDEFGAB".indexOf(q)]+12;k[r][v[d]]=b});
g[r]=0<=c.indexOf("diafret")}}return[k,g]}function k(a){var d,e,q={};a=a.split("\n");for(d=0;d<a.length;++d){var f=a[d];if(0<=f.indexOf("%%map")&&(e=f.match(/%%map *(\S+) *(\S+).*midi=(\d+)/))){f=e[1];var b=e[2];e=e[3];q[f+b]=parseInt(e)}}return q}function d(a){var d={diamond:1,triangle:1,square:1,normal:1},e=q,f,b="default",k={"default":[]},g={"default":[]};a=a.split("\n");for(f=0;f<a.length;++f){var c=a[f];if(0<=c.indexOf("I:percmap")){c=c.split(" ").map(function(a){return a.trim()});var v=c[4];
v in d&&(v=v+"+,"+v);c="%%map perc"+b+" "+c[1]+" print="+c[2]+" midi="+c[3]+" heads="+v;k[b].push(c)}0<=c.indexOf("%%MIDI")&&g[b].push(c);0<=c.indexOf("V:")&&(v=c.match(/V:\s*(\S+)/))&&(b=v[1],b in k||(k[b]=[],g[b]=[]))}d=Object.keys(k).sort();for(f=0;f<d.length;++f)e=e.concat(k[d[f]]);b="default";for(f=0;f<a.length;++f)c=a[f],0<=c.indexOf("I:percmap")||0<=c.indexOf("%%MIDI")||(0<=c.indexOf("V:")||0<=c.indexOf("K:")?((v=c.match(/V:\s*(\S+)/))&&(b=v[1]),e.push(c),b in g&&g[b].length&&(e=e.concat(g[b]),
delete g[b]),0<=c.indexOf("perc")&&-1==c.indexOf("map=")&&(c+=" map=perc"),0<=c.indexOf("map=perc")&&0<k[b].length&&e.push("%%voicemap perc"+b),0<=c.indexOf("map=off")&&e.push("%%voicemap")):e.push(c));return e.join("\n")}var q='%%beginsvg\n<defs>,<text id="x" x="-3" y="0">&#xe263;</text>,<text id="x-" x="-3" y="0">&#xe263;</text>,<text id="x+" x="-3" y="0">&#xe263;</text>,<text id="normal" x="-3.7" y="0">&#xe0a3;</text>,<text id="normal-" x="-3.7" y="0">&#xe0a3;</text>,<text id="normal+" x="-3.7" y="0">&#xe0a4;</text>,<g id="circle-x"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"></circle></g>,<g id="circle-x-"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"></circle></g>,<path id="triangle" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"></path>,<path id="triangle-" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"></path>,<path id="triangle+" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="fill:#000"></path>,<path id="square" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="square-" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="square+" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="fill:#000"></path>,<path id="diamond" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="diamond-" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="diamond+" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="fill:#000"></path>,</defs>\n%%endsvg'.split(",");
g&&(0<=a.indexOf("I:percmap")&&(a=d(a)),0<=a.indexOf("%%map")&&(pa=k(a)),0<=a.indexOf(" strings")&&f(a));C=b;X=0;var r=function(){c(a,b,g)};g?m(a,r):r()}function m(a,b){function f(a){var d=[];a.forEach(function(a,e){d[a.st]?d[a.st].push(e):d[a.st]=[e];a.clef.clef_octave&&(P[e]=a.clef.clef_octave);F[e]=a.midictl&&a.midictl[7];void 0==F[e]&&(F[e]=100);G[e]=a.midictl&&a.midictl[10];void 0==G[e]&&(G[e]=64);q[e]=a.instr?a.instr:0});return d}var c="",k=[3,0,4,1,5,2,6],d=[0,2,4,5,7,9,11];I=[];P=[];M=120;
F=[];G=[];var q=[];var r=new Abc({img_out:null,errmsg:function(a,d,f){c+=a+"\n"},read_file:function(a){return""},anno_start:null,get_abcmodel:function(e,c,g){function v(a,d){r[a]=[0,0,0,0,0,0,0];O[a]={};qa[a]=d;var e=0<=d;(e?k.slice(0,d):k.slice(d)).forEach(function(d){r[a][d]+=e?1:-1})}var r={},n={"-2":-2,"-1":-1,0:0,1:1,2:2,3:0},O={},qa={},D={},p={ppp:30,pp:45,p:60,mp:75,mf:90,f:105,ff:120,fff:127},t=[];g=c[0].meter.a_meter;g.length&&parseInt(g[0].top);for(w=0;w<c.length;++w)v(w,c[w].key.k_sf),
D[w]={};g={};ra=c.length;Y=f(c);for(var h=e;h;h=h.ts_next){var m=[],w;switch(h.type){case 14:e=h.tempo_notes.reduce(function(a,d){return a+d});M=h.tempo*e/384;break;case 10:var l={t:h.time,mnum:-1,dur:h.dur};m.push(l);I.push({t:h.time,ix:h.istart,v:h.v,ns:m,inv:h.invis,tmp:M});break;case 8:var z=q[h.v];"p"==h.p_v.clef.clef_type&&(z+=128);for(e=0;e<h.notes.length;++e){c=h.notes[e];var y=c.pit+19;w=h.v;h.a_dd&&h.a_dd.forEach(function(a){(B=p[a.name])&&Y[h.st].forEach(function(a){t[a]=B})});var B=t[w]||
60;P[w]&&(y+=P[w]);l=Math.floor(y/7);var u=y%7;void 0!=c.acc&&(O[w][y]=n[c.acc]);l=12*l+d[u]+(y in O[w]?O[w][y]:r[w][u]);u=h.p_v.map;c.midi&&(l=c.midi);if(128<=z&&"MIDIdrum"!=u){var A=a.substring(h.istart,h.iend);A=A.match(/[=_^]*[A-Ga-g]/)[0];(u=pa[u+A])&&(l=u)}l=128*z+l;g[l]=1;l={t:h.time,mnum:l,dur:h.dur,velo:B};y in D[w]?(D[w][y].dur+=h.dur,c.tie_ty||delete D[w][y],l.mnum=-1):c.tie_ty&&(D[w][y]=l);m.push(l)}if(0==m.length)break;I.push({t:h.time,ix:h.istart,v:h.v,ns:m,stf:h.st,tmp:M});break;case 5:v(h.v,
h.k_sf);break;case 0:v(h.v,qa[h.v]);I.push({t:h.time,ix:h.istart,v:h.v,bt:h.bar_type,tx:h.text});break;case 16:h.instr&&(q[h.v]=h.instr),7==h.ctrl&&(F[h.v]=h.val),10==h.ctrl&&(G[h.v]=h.val)}}Z.forEach(function(a){var d=a.parentNode;d&&d.removeChild(a)});Q=[];n="#f9f #3cf #c99 #f66 #fc0 #cc0 #ccc".split(" ");for(e=0;e<ra;++e)D=1<<e&0?"0":"",w=document.createElementNS("http://www.w3.org/2000/svg","rect"),w.setAttribute("fill",n[e%n.length]+D),w.setAttribute("fill-opacity","0.5"),w.setAttribute("width",
"0"),Z.push(w),Q.push(-1);b();aa=Object.keys(g);null!=x?na():alert("Your browser has no Web Audio API -> no playback.")}});r.tosvg("play","%%play");r.tosvg("abc2svg",a);""==c&&(c="no error");console.log(c.trim())}function c(a,c,b){function f(d){d.stopPropagation();var e=J.indexOf(this);if(!b||0>e)H(0),p(a,c,1);else{var f=d.clientX;f-=this.getBoundingClientRect().left;var q=f*ba;if(q<r||q>l)H(0);else{ca||H(1);var k=(d.clientY-this.getBoundingClientRect().top)*ba;f=da[e];for(d=0;d<f.length;d++)if(f[d]>
k){ea=d;break}for(d=0;d<z.length;++d)if(k=z[d].xy)if(f=z[d].vce,-1!=Y[ea].indexOf(f)){var g=k[0];f=k[1];k=k[3];if(!(g<e)&&q<parseFloat(f)+k){B=d;for(q=z[d].t;z[d]&&z[d].t==q;)t(z[d]),d+=1;break}}}}}var k="",d="",q=0;B=0;fa={};da=[];var g={},e,n,r=1E3,l=0;ea=0;if(a){var m=new Abc({imagesize:'width="100%"',img_out:function(a){-1!=a.indexOf("<svg")&&(da[q]=Object.keys(g),g={},q+=1,e<r&&(r=e),n>l&&(l=n));k+=a},errmsg:function(a,e,f){d+=a+"\n"},read_file:function(a){return""},anno_start:function(a,d,f,
c,b,k,r){if("note"==a||"rest"==a)c=m.ax(c).toFixed(2),b=m.ay(b).toFixed(2),r=m.ah(r),fa[d]=[q,c,b,k,r];"bar"==a&&(b=m.ay(b),r=m.ah(r),b=Math.round(b+r),g[b]=1,n=m.ax(c),e=m.ax(0))},get_abcmodel:null});m.tosvg("abc2svg",a);""==d&&(d="no error");console.log(d.trim());if(k){C.innerHTML=k;J=Array.prototype.slice.call(C.getElementsByTagName("svg"));var x=Array.prototype.slice.call(C.getElementsByClassName("g"));R=x.length?x:J;L();J.forEach(function(a){va(a,"click",f)});b&&u()}}}function L(){if(0!=J.length){var a=
J[0];var c=a.getBoundingClientRect().width;try{var b=a.viewBox.baseVal.width}catch(k){b=c}var v=(v=R[0].transform)?v.baseVal:[];v=v.length?v.getItem(0).matrix.a:1;ba=b/v/c}}function t(a){function c(a,e){f=a.getBoundingClientRect();d=e.getBoundingClientRect();if(f.top<d.top||0>f.top||f.bottom>d.bottom||f.bottom>p)e.scrollTop=e==m?f.top-d.top:e.scrollTop+(f.top-d.top)}var b,f,k,d;var q=Z[a.vce];if(b=a.xy){var l=b[0];var e=b[1];var n=b[2];var D=b[3];b=b[4];a.inv&&(b=D=0);if(l!=Q[a.vce]){(k=q.parentNode)&&
k.removeChild(q);k=R[l];k.insertBefore(q,k.firstChild);Q[a.vce]=l;a=R[l];var m=document.scrollingElement;var p=document.documentElement.clientHeight;C.scrollHeight>C.clientHeight&&c(a,C);c(a,m)}q.setAttribute("x",e);q.setAttribute("y",n);q.setAttribute("width",D);q.setAttribute("height",b)}else q.setAttribute("width",0),q.setAttribute("height",0)}function u(){var a=0<B?z[B].t:0;z=[];ha={};var b=1,c=0,v=0,k=0,d=0,q=0,l;for(l=0;l<I.length;++l){var e=I[l];if(e.bt&&0==e.v){if(e.t in ha&&":"==e.bt[0])continue;
if(1==b&&":"==e.bt[0]&&e.t>k){l=v-1;b=2;c+=e.t-k;continue}2==b&&":"==e.bt[0]&&e.t>k&&(b=1);1==b&&":"==e.bt[e.bt.length-1]&&(v=l,k=e.t);d&&(e.tx||"|"!=e.bt)&&(d=0,c-=e.t-q);2==b&&"1"==e.tx&&(d=1,q=e.t)}d||(e.bt?ha[e.t]=1:z.push({t:e.t+c,xy:fa[e.ix],ns:e.ns,vce:e.v,inv:e.inv,tmp:e.tmp}))}for(B=0;B<z.length&&(e=z[B],!(e.t>=a)||e.inv);++B);B==z.length&&--B;t(z[B])}function A(){if(x){for(var a=1E3*x.currentTime,b=0,c;0==b;){var v=z[B];c=156.25/v.tmp;B==z.length-1?(B=-1,b=v.ns[0].dur+1E3):(b=z[B+1].t,b=
(b-v.t)*c);v.ns.forEach(function(b,d){c=192>=b.dur?1.3*c:1.1*c;d=b.mnum;var f=b.dur*c,k=v.vce;b=b.velo;if(-1!=d){var e=d>>7;if(e in ia&&l.withRT){var n=d%128,g=a/1E3;d=(f-1)/1E3;if(f=ja[e][n]){var r=x.createBufferSource(),m=f.useflt,p=f.uselfo,t=f.useenv,y=F[k]/127;k=(G[k]-64)/64;r.buffer=f.buffer;f.loopStart&&(r.loop=!0,r.loopStart=f.loopStart,r.loopEnd=f.loopEnd);r.playbackRate.value=ka[e][n];if(p){var z=x.createOscillator();z.frequency.value=f.lfofreq;e=x.createGain();e.gain.value=f.lfo2vol;z.connect(e);
var u=x.createGain();u.gain.value=1;e.connect(u.gain);e=x.createGain();e.gain.value=f.lfo2ptc;z.connect(e);e.connect(r.detune)}if(m){var B=x.createBiquadFilter();B.type="lowpass";B.frequency.value=f.filter}if(t){var h=1;e=x.createGain();e.gain.setValueAtTime(0,g);e.gain.linearRampToValueAtTime(h,g+f.envatt);n=f.envhld;var A=f.envdec;if(d>n){e.gain.setValueAtTime(h,g+n);if(d<A){var w=d-n;A=w/(A-n)*f.envsus}else w=A-n,A=f.envsus;h*=A;e.gain.linearRampToValueAtTime(h,g+n+w)}e.gain.setValueAtTime(h,g+
d);n=g+d+h*f.envrel;e.gain.linearRampToValueAtTime(0,n);var E=x.createConstantSource();E.offset.value=f.env2flt;E.connect(e);e.connect(B.detune)}if(N){var C=x.createStereoPanner();C.pan.value=k}h=b*y*f.atten*wa;0==h&&(h=1E-5);b=x.createGain();b.gain.setValueAtTime(1E-5,g);b.gain.exponentialRampToValueAtTime(h,g+f.attack);n=f.hold;A=f.decay;d>n&&(b.gain.setValueAtTime(h,g+n),d<A?(w=d-n,A=Math.pow(10,w/(A-n)*Math.log10(f.sustain))):(w=A-n,A=f.sustain),h*=A,b.gain.exponentialRampToValueAtTime(h,g+n+
w));b.gain.setValueAtTime(h,g+d);n=g+d+(100+20*Math.log10(h))/100*f.release;b.gain.exponentialRampToValueAtTime(1E-5,n);m?(r.connect(B),B.connect(C||b)):r.connect(C||b);C&&C.connect(b);p?(b.connect(u),u.connect(x.destination)):b.connect(x.destination);r.start(g);p&&z.start(g+f.lfodel);t&&E.start(g);r.stop(n);p&&z.stop(n);t&&E.stop(n)}}else e in S&&0!=X&&(u=a/1E3,z=(f-1)/1E3,C=F[k]/127,B=(G[k]-64)/64,E=x.createBufferSource(),E.buffer=sa[d],d=x.createGain(),d.gain.setValueAtTime(1E-5,u),b=b*C*.015625,
0==b&&(b=1E-5),d.gain.exponentialRampToValueAtTime(b,u+.001),N&&(g=x.createStereoPanner(),g.pan.value=B),E.connect(g||d),g&&g.connect(d),d.connect(x.destination),E.start(u),u+=z,d.gain.setValueAtTime(b,u),d.gain.exponentialRampToValueAtTime(1E-5,u+.1),E.stop(u+.1))}});t(v);B+=1}clearTimeout(la);la=setTimeout(A,b)}else alert("Your browser has no Web Audio API -> no playback.")}function K(a){switch(a.key){case "t":y.style.display="none"==y.style.display?"block":"none"}}function H(a){z.length&&((ca=
a)?A():clearTimeout(la))}function oa(a){return new Promise(function(b,c){for(var f=atob(a),g=new ArrayBuffer(f.length),d=new Uint8Array(g),q=0;q<f.length;q++)d[q]=f.charCodeAt(q);x.decodeAudioData(g,function(a){b(a)},function(a){c("error dedoding audio sample")})})}function ua(a){return new Promise(function(b,c){function f(g){var d=instData[g];if(!d&&g<instData.length-1)f(g+1);else{var q={attack:d.attack,hold:d.hold,decay:d.decay,sustain:d.sustain,release:d.release,atten:d.atten,filter:d.filter,lfodel:d.lfodel,
lfofreq:d.lfofreq,lfo2ptc:d.lfo2ptc,lfo2vol:d.lfo2vol,envatt:d.envatt,envhld:d.envhld,envdec:d.envdec,envsus:d.envsus,envrel:d.envrel,env2flt:d.env2flt,uselfo:T&&.008<d.lfofreq&&(0!=d.lfo2ptc||0!=d.lfo2vol),useflt:U&&16E3>d.filter,useenv:V&&16E3>d.filter&&0!=d.env2flt};d.loopStart&&(q.loopStart=d.loopStart,q.loopEnd=d.loopEnd);var k=d.scale;var e=d.tune;for(var n=d.keyRangeLo;n<=d.keyRangeHi;n++)ka[a][n]=Math.pow(Math.pow(2,1/12),(n+e)*k),ja[a][n]=q;oa(d.sample).then(function(a){q.buffer=a;g<instData.length-
1?f(g+1):(instData="",b("ok"))}).catch(function(a){c(a)})}}ka[a]=[];ja[a]=[];f(0)})}function ma(a,b){return new Promise(function(c,f){var g=document.createElement("script");g.src=b;g.onload=function(){c("ok");document.head.removeChild(g)};g.onerror=function(b){f("could not load instrument "+a)};document.head.appendChild(g)})}function na(){function c(d,f,g,e){var n=f[d];d==f.length?e():n in ia?c(d+1,f,l.sf2url1,e):(b(d+" loading instrument: "+n+(g?" from: "+g:"")),ma(n,g+"instr"+n+"mp3.js").then(function(){return ua(n)}).then(function(){ia[n]=
1;c(d+1,f,l.sf2url1,e)}).catch(function(b){a(b);g==l.sf2url1&&l.sf2url2?c(d,f,l.sf2url2,e):(a(" ... switch to MIDI-js"),l.withRT=0,na())}))}function r(d,c,f,e){var g=c[d],k=g in l.instTab?l.instTab[g]:xa[g];if(d==c.length)e();else if(S[g])r(d+1,c,l.midijsUrl1,e);else{var m=f+k+"-mp3.js";b(d+" loading instrument: "+g+" from: "+m+"...");ma(g,m).then(function(){S[g]=MIDI.Soundfont[k];r(d+1,c,l.midijsUrl1,e)}).catch(function(b){a(b);f==l.midijsUrl1?r(d,c,l.midijsUrl2,e):a(" ... give up")})}}function g(a,
b){if(a==b.length)X=1,y.style.display="none",console.log("notes decoded"),H(1);else{var d=b[a],c=d>>7,f=d%128,k=S[c]["C Db D Eb E F Gb G Ab A Bb B".split(" ")[f%12]+(Math.floor(f/12)-1)].split(",")[1];oa(k).then(function(e){sa[d]=e;y.innerHTML+=", "+c+":"+f;ta[d]=1;g(a+1,b)})}}var m={};aa.forEach(function(a){m[a>>7]=1});y.innerHTML=l.withRT?"Loading SF2 fonts<br>":"Loading MIDI-js fonts<br>";y.style.display="block";y.style.top=document.scrollingElement.scrollTop+document.documentElement.clientHeight/
2.5+"px";if(l.withRT)c(0,Object.keys(m),l.sf2url1,function(){y.style.display="none";console.log("fonts geladen");H(1)});else{var k=aa.filter(function(a){return!(a in ta)});r(0,Object.keys(m),l.midijsUrl1,function(){console.log("fonts geladen");y.innerHTML+="decode notes:";g(0,k)})}}function W(){var a,b;if(a=document.getElementById("parms"))a.style.display="none";a=a?JSON.parse(a.innerText):{};for(c in a)l[c]=a[c];a=window.location.href.split("?");if(1<a.length)for(a=a[1].split("&"),b=0;b<a.length;b++){var c=
a[b];if("noRT"==c)l.withRT=0;else if("ios"==c)N=V=U=T=0;else if("keyt"==c)l.keyt=1;else if(c=c.match(/sf2=(\w+)/))l.sf2url2=c[1]+"/"}}function va(a,b,c){function f(b){a.removeEventListener("mousedown",f);a.removeEventListener("touchend",f);console.log("event listeners removed from "+a.nodeName);x&&"suspended"==x.state&&x.resume().then(function(){console.log("resuming audioContext")})}a.addEventListener("mousedown",f);a.addEventListener("touchend",f);a.addEventListener(b,c)}var l={withRT:1,sf2url1:"./",
sf2url2:"",instTab:{},midijsUrl1:"./",midijsUrl2:"https://rawgit.com/gleitz/midi-js-soundfonts/gh-pages/FluidR3_GM/"},I,Y,ra,B=0,ca=0,la,X=0,z=[],P=[],ha={},fa={},da=[],J=[],R=[],ba,ea=0,Q=[],Z=[],x=null,sa=[],ta={},aa=[],M=120,ia={},S=[],pa={},F=[],G=[],C=null,y=null,xa="acoustic_grand_piano bright_acoustic_piano electric_grand_piano honkytonk_piano electric_piano_1 electric_piano_2 harpsichord clavinet celesta glockenspiel music_box vibraphone marimba xylophone tubular_bells dulcimer drawbar_organ percussive_organ rock_organ church_organ reed_organ accordion harmonica tango_accordion acoustic_guitar_nylon acoustic_guitar_steel electric_guitar_jazz electric_guitar_clean electric_guitar_muted overdriven_guitar distortion_guitar guitar_harmonics acoustic_bass electric_bass_finger electric_bass_pick fretless_bass slap_bass_1 slap_bass_2 synth_bass_1 synth_bass_2 violin viola cello contrabass tremolo_strings pizzicato_strings orchestral_harp timpani string_ensemble_1 string_ensemble_2 synth_strings_1 synth_strings_2 choir_aahs voice_oohs synth_choir orchestra_hit trumpet trombone tuba muted_trumpet french_horn brass_section synth_brass_1 synth_brass_2 soprano_sax alto_sax tenor_sax baritone_sax oboe english_horn bassoon clarinet piccolo flute recorder pan_flute blown_bottle shakuhachi whistle ocarina lead_1_square lead_2_sawtooth lead_3_calliope lead_4_chiff lead_5_charang lead_6_voice lead_7_fifths lead_8_bass__lead pad_1_new_age pad_2_warm pad_3_polysynth pad_4_choir pad_5_bowed pad_6_metallic pad_7_halo pad_8_sweep fx_1_rain fx_2_soundtrack fx_3_crystal fx_4_atmosphere fx_5_brightness fx_6_goblins fx_7_echoes fx_8_scifi sitar banjo shamisen koto kalimba bagpipe fiddle shanai tinkle_bell agogo steel_drums woodblock taiko_drum melodic_tom synth_drum reverse_cymbal guitar_fret_noise breath_noise seashore bird_tweet telephone_ring helicopter applause gunshot".split(" ");
M=120;var ja=[],ka=[],wa=.5/60,N=1,T=1,U=1,V=1;document.addEventListener("DOMContentLoaded",function(){Array.prototype.slice.call(document.getElementsByClassName("abc")).forEach(function(a,b){var c=a.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");p("%%fullsvg _"+b+"\n"+c,a,0)});document.body.addEventListener("click",function(){ca&&H(0)},!1);window.addEventListener("resize",L,!1);y=document.getElementById("comp");W();var a=window.AudioContext||window.webkitAudioContext;x=
void 0!=a?new a:null;a=["Your browser does not support:"];var b=0;x?(x.createStereoPanner||(N=0),x.createOscillator||(T=0),x.createBiquadFilter||(U=0),x.createConstantSource||(V=0),N||a.push("* the StereoPanner element"),l.withRT&&!T&&(a.push("* the Oscillator element"),b=1),l.withRT&&!U&&(a.push("* the BiquadFilter element"),b=1),l.withRT&&!V&&(a.push("* the ConstantSource element"),b=1),b&&(a.push("You are probably on iOS, which does not support the Web Audio API."),a.push("Real time synthesis is switched off, falling back to MIDIjs"),
l.withRT=0)):a.push("* the Web Audio API -> no sound");1<a.length&&alert(a.join("\n"));l.keyt&&document.body.addEventListener("keydown",K)})})();

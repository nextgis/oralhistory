(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{156:function(e,n){var o=e.exports=function(e){return new t(e)};function t(e){this.value=e}function r(e,n,o){var t=[],r=[],f=!0;return function e(p){var h=o?u(p):p,v={},y=!0,b={node:h,node_:p,path:[].concat(t),parent:r[r.length-1],parents:r,key:t.slice(-1)[0],isRoot:0===t.length,level:t.length,circular:null,update:function(e,n){b.isRoot||(b.parent.node[b.key]=e),b.node=e,n&&(y=!1)},delete:function(e){delete b.parent.node[b.key],e&&(y=!1)},remove:function(e){c(b.parent.node)?b.parent.node.splice(b.key,1):delete b.parent.node[b.key],e&&(y=!1)},keys:null,before:function(e){v.before=e},after:function(e){v.after=e},pre:function(e){v.pre=e},post:function(e){v.post=e},stop:function(){f=!1},block:function(){y=!1}};if(!f)return b;function g(){if("object"==typeof b.node&&null!==b.node){b.keys&&b.node_===b.node||(b.keys=i(b.node)),b.isLeaf=0==b.keys.length;for(var e=0;e<r.length;e++)if(r[e].node_===p){b.circular=r[e];break}}else b.isLeaf=!0,b.keys=null;b.notLeaf=!b.isLeaf,b.notRoot=!b.isRoot}g();var s=n.call(b,b.node);return void 0!==s&&b.update&&b.update(s),v.before&&v.before.call(b,b.node),y?("object"!=typeof b.node||null===b.node||b.circular||(r.push(b),g(),l(b.keys,function(n,r){t.push(n),v.pre&&v.pre.call(b,b.node[n],n);var u=e(b.node[n]);o&&a.call(b.node,n)&&(b.node[n]=u.node),u.isLast=r==b.keys.length-1,u.isFirst=0==r,v.post&&v.post.call(b,u),t.pop()}),r.pop()),v.after&&v.after.call(b,b.node),b):b}(e).node}function u(e){if("object"==typeof e&&null!==e){var n;if(c(e))n=[];else if("[object Date]"===f(e))n=new Date(e.getTime?e.getTime():e);else if(function(e){return"[object RegExp]"===f(e)}(e))n=new RegExp(e);else if(function(e){return"[object Error]"===f(e)}(e))n={message:e.message};else if(function(e){return"[object Boolean]"===f(e)}(e))n=new Boolean(e);else if(function(e){return"[object Number]"===f(e)}(e))n=new Number(e);else if(function(e){return"[object String]"===f(e)}(e))n=new String(e);else if(Object.create&&Object.getPrototypeOf)n=Object.create(Object.getPrototypeOf(e));else if(e.constructor===Object)n={};else{var o=e.constructor&&e.constructor.prototype||e.__proto__||{},t=function(){};t.prototype=o,n=new t}return l(i(e),function(o){n[o]=e[o]}),n}return e}t.prototype.get=function(e){for(var n=this.value,o=0;o<e.length;o++){var t=e[o];if(!n||!a.call(n,t)){n=void 0;break}n=n[t]}return n},t.prototype.has=function(e){for(var n=this.value,o=0;o<e.length;o++){var t=e[o];if(!n||!a.call(n,t))return!1;n=n[t]}return!0},t.prototype.set=function(e,n){for(var o=this.value,t=0;t<e.length-1;t++){var r=e[t];a.call(o,r)||(o[r]={}),o=o[r]}return o[e[t]]=n,n},t.prototype.map=function(e){return r(this.value,e,!0)},t.prototype.forEach=function(e){return this.value=r(this.value,e,!1),this.value},t.prototype.reduce=function(e,n){var o=1===arguments.length,t=o?this.value:n;return this.forEach(function(n){this.isRoot&&o||(t=e.call(this,t,n))}),t},t.prototype.paths=function(){var e=[];return this.forEach(function(n){e.push(this.path)}),e},t.prototype.nodes=function(){var e=[];return this.forEach(function(n){e.push(this.node)}),e},t.prototype.clone=function(){var e=[],n=[];return function o(t){for(var r=0;r<e.length;r++)if(e[r]===t)return n[r];if("object"==typeof t&&null!==t){var f=u(t);return e.push(t),n.push(f),l(i(t),function(e){f[e]=o(t[e])}),e.pop(),n.pop(),f}return t}(this.value)};var i=Object.keys||function(e){var n=[];for(var o in e)n.push(o);return n};function f(e){return Object.prototype.toString.call(e)}var c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},l=function(e,n){if(e.forEach)return e.forEach(n);for(var o=0;o<e.length;o++)n(e[o],o,e)};l(i(t.prototype),function(e){o[e]=function(n){var o=[].slice.call(arguments,1),r=new t(n);return r[e].apply(r,o)}});var a=Object.hasOwnProperty||function(e,n){return n in e}}}]);
//# sourceMappingURL=npm.traverse-c273dec.js.map
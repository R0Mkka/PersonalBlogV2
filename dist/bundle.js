!function(t){var e={};function o(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);new class{constructor(){this.leftPistol=document.querySelector(".left-pistol"),this.rightPistol=document.querySelector(".right-pistol"),this.leftBoom=document.querySelector(".left-boom"),this.rightBoom=document.querySelector(".right-boom"),this.leftScore=document.querySelector(".score-first span"),this.rightScore=document.querySelector(".score-second span"),this.restartButton=document.querySelector(".actions__restart"),this._setEvents()}_setEvents(){this.leftPistol.onmousedown=(()=>{const t=this.leftScore.textContent;this._showBoomImage(this.leftBoom),this._updateScore(t,this.leftScore)}),this.rightPistol.onmousedown=(()=>{const t=this.rightScore.textContent;this._showBoomImage(this.rightBoom),this._updateScore(t,this.rightScore)}),this.restartButton.onclick=(()=>{this.restartButton.style.transform="rotate(-360deg)",this._updateScore(-1,this.leftScore),this._updateScore(-1,this.rightScore),setTimeout(()=>{this.restartButton.style.transform=""},300)})}_updateScore(t,e){t&&Number(t)?e.textContent=(Number(t)+1).toString():e.textContent="1"}_showBoomImage(t){t.style.display="inline-block",setTimeout(()=>{t.style.display="none"},80)}},new class{constructor(){this._setEvents()}_setEvents(){document.querySelector(".content__game"),console.log(window),window.onscroll=(t=>{console.log(t)})}}}]);
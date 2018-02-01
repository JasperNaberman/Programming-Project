/* mapLegend.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the color gradient legend of the map of Europe
*/

// initialize canvas
var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

// set color scale to the same scale as the map
var grd = ctx.createLinearGradient(0, 170, 0, 0);
grd.addColorStop(0, "#e9f5ef");
grd.addColorStop(1, "#16512f");

// fill the ctx of the canvas
ctx.fillStyle = grd;
ctx.fillRect(0, 0, 25, 200);

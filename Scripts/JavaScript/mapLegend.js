/* mapLegend.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the color gradient legend of the map of Europe
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var grd = ctx.createLinearGradient(0, 170, 0, 0);
grd.addColorStop(0, "#e9f5ef");
grd.addColorStop(1, "#16512f");

ctx.fillStyle = grd;
ctx.fillRect(0, 0, 25, 200);

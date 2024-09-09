"use strict";

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var width = canvas1.width,
    height = canvas1.height; // canvasのwidthとheightを取得

var a = width / 8; // 1マスの一辺の長さ

var b = height / 8;
var bg_color = "seagreen"; // ボードの色

var peaces = [];

for (var i = 0; i < 8; i++) {
  peaces[i] = [];

  for (var j = 0; j < 8; j++) {
    peaces[i][j] = 0;
  }
}

drawBoard(); // ボードの表示

function drawBoard() {
  var ctx = canvas1.getContext("2d"); // canvas1

  ctx.fillStyle = bg_color; // 塗る色をbg_colorに

  ctx.fillRect(0, 0, width, height); // ボードを塗る

  ctx.strokeStyle = "black"; // 線の色を黒に

  for (var _i = 0; _i <= 8; _i++) {
    // i番目の縦線
    // console.log(a * i);
    ctx.beginPath();
    ctx.moveTo(a * _i, 0);
    ctx.lineTo(a * _i, height);
    ctx.stroke(); // 線を引く
    // i番目の横線

    ctx.beginPath();
    ctx.moveTo(0, a * _i); // console.log(width);

    ctx.lineTo(width, a * _i);
    ctx.stroke(); // 線を引く
  }

  drawPochi(); // 謎の黒い点

  drawPeces(); // 最初の石の配置
}

function drawPochi() {
  var ctx = canvas1.getContext("2d"); // canvas1

  for (var _i2 = 2; _i2 <= 6; _i2 += 4) {
    for (var _j = 2; _j <= 6; _j += 4) {
      var x = a * _j; // x座標

      var y = a * _i2; // y座標

      var r = a * 0.08; // 半径

      ctx.beginPath(); // パスのリセット

      ctx.arc(x, y, r, 0, 2 * Math.PI, false); // 小さい円

      ctx.fillStyle = "black"; // 塗る色を黒に

      ctx.fill(); // 塗る
    }
  }
}

function drawPeces() {
  var ctx = canvas2.getContext("2d");

  for (var _i3 = 3; _i3 <= 4; _i3++) {
    for (var _j2 = 3; _j2 <= 4; _j2++) {
      var x = a * _j2 + a / 2; // x座標

      var y = a * _i3 + a / 2; // y座標

      var r = a * 0.4; // 半径
      // console.log(x, " ", y);

      ctx.beginPath(); // パスのリセット

      ctx.arc(x, y, r, 0, 2 * Math.PI, false); // 小さい円

      if (x === y) {
        ctx.fillStyle = "black"; // 塗る色を黒に

        peaces[_i3][_j2] = 1;
      } else {
        ctx.fillStyle = "white"; // 塗る色を黒に

        peaces[_i3][_j2] = -1;
      }

      console.log(peaces);
      ctx.fill(); // 塗る
    }
  }
} // export default { canvas1, canvas2 };
//# sourceMappingURL=script.dev.js.map

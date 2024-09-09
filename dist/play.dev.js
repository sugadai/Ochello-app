"use strict";

// import canvas1 from "./script/canvas1";
// import canvas2 from "./script/canvas2";
// const canvas1 = document.getElementById("canvas1");
// const canvas2 = document.getElementById("canvas2");
// let { width, height } = canvas1; // canvasのwidthとheightを取得
// let a = width / 8; // 1マスの一辺の長さ
canvas2.addEventListener("click", function (e) {
  console.log(e.layerX + " ", e.layerY);
  var judge = false;

  for (var i = 0; i < 8; i++) {
    console.log("i\u306F".concat(i));

    for (var j = 0; j < 8; j++) {
      var judgeX = a * j;
      var judgeY = a * i;
      console.log("j\u306F".concat(j));

      if (judgeX < e.layerX && judgeX + a > e.layerX) {
        console.log("X\u8EF8\u306F".concat(e.layerX, "\u306E\u4F4D\u7F6E\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3057\u305F"));

        if (judgeY < e.layerY && judgeY + b > e.layerY) {
          console.log("Y\u8EF8\u306F".concat(e.layerY, "\u306E\u4F4D\u7F6E\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3057\u305F"));
          judge = true;
          console.log(judgeX, "< おいた石 <", judgeX + a);
          console.log(judgeY, "< おいた石 <", judgeY + b); // console.log(`${judgeX} ${judgeY}`);

          peaces[i][j] = 1;
          console.log(peaces);
          drawPeace(judgeX, judgeY, i, j);
          break;
        }
      } else {
        continue;
      }
    }

    if (judge) break;
  }
});

function drawPeace(judgeX, judgeY, i, j) {
  // console.log(i, j);
  var ctx = canvas2.getContext("2d");
  var x = judgeX + a / 2; //X軸

  var y = judgeY + b / 2; //Y軸

  var r = a * 0.4; // 半径

  console.log(x, " ", y);
  ctx.beginPath(); // パスのリセット

  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black"; // 塗る色を黒に

  ctx.fill(); // 塗る

  turnStone(i, j);
}

function turnStone(i, j) {
  // console.log(i, j);
  var c = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  console.log(peaces[(i - 1, j - 1)]); // let returnStones = [];
  // for (let i = 0; i < 8; i++) {
  //   returnStones[i] = 0;
  // }
  // console.log(c[3][1]);

  var judge = 0;

  if (peaces[i][j] === 1) {
    judge = -1;
  } else if (peaces[i][j] === -1) {
    judge = 1;
  }

  for (var n = 0; n < 8; n++) {
    var ia = c[n][0];
    var jb = c[n][1];

    if (peaces[ia][jb] !== 0 && peaces[ia][jb] !== peaces[i][j]) {
      // peacePraceReturn(c[0]);
      console.log(i, " ", j, " ", c[n]);
    } else {
      console.log(i, " ", j, " ", c[n]);
    }
  }
}

function peacePraceReturn(c) {
  console.log(c);
}
//# sourceMappingURL=play.dev.js.map

"use strict";

// import canvas1 from "./script/canvas1";
// import canvas2 from "./script/canvas2";
// const canvas1 = document.getElementById("canvas1");
// const canvas2 = document.getElementById("canvas2");
// let { width, height } = canvas1; // canvasのwidthとheightを取得
// let a = width / 8; // 1マスの一辺の長さ
canvas2.addEventListener("click", function (e) {
  // console.log(e.layerX + " ", e.layerY);
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

          if (peaces[i][j] !== 0) {
            console.log("\u30AF\u30EA\u30C3\u30AF\u4F4D\u7F6E[".concat(i, ",").concat(j, "]\u306B\u306F\u65E2\u306B\u77F3\u304C\u3042\u308A\u307E\u3059"));
            return;
          }

          console.log(i, j);
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
  var returnStones = [];
  var judge = 0;
  var ia = 0;
  var jb = 0;

  if (peaces[i][j] === 1) {
    judge = -1;
  } else if (peaces[i][j] === -1) {
    judge = 1;
  }

  for (var n = 0; n < 8; n++) {
    ia = i + c[n][0];
    jb = j + c[n][1];
    console.log(ia, " ", jb);

    if (peaces[ia][jb] === 0) {
      // peacePraceReturn(c[0]);
      console.log("\u5EA7\u6A19[".concat(ia, ",").concat(jb, "]\u306F\u7A7A\u3067\u3059\u3002"));
    } else if (peaces[ia][jb] === judge) {
      console.log(ia, " ", jb, "石の色が違います。");

      do {
        returnStones.push([ia, jb]);
        ia += c[n][0];
        jb += c[n][1]; // if (peaces[ia][jb] === 0) d = "";
      } while (peaces[ia][jb] === judge);

      if (peaces[ia][jb] === 0) {
        returnStones = [];
        console.log(returnStones);
      } else if (peaces[ia][jb] !== judge) {
        returnStones.forEach(function (element) {
          if (peaces[element[0]][element[1]] === 1) {
            peaces[element[0]][element[1]] = -1;
          } else if (peaces[element[0]][element[1]] === -1) {
            peaces[element[0]][element[1]] = 1;
          }
        });
        peacePraceReturn(returnStones);
      }

      continue;
    } else {
      console.log("石色が同じです。");
    }
  }
}

function peacePraceReturn(returnStones) {
  returnStones.forEach(function (element) {
    console.log(peaces[element[0]][element[1]]);
    var judgeX = a * element[1];
    var judgeY = a * element[0];
    var ctx = canvas2.getContext("2d");
    var x = judgeX + a / 2; //X軸

    var y = judgeY + b / 2; //Y軸

    var r = a * 0.4; // 半径
    // console.log(x, " ", y);

    ctx.beginPath(); // パスのリセット

    ctx.arc(x, y, r, 0, 2 * Math.PI, false);

    if (peaces[element[0]][element[1]] === 1) {
      ctx.fillStyle = "black"; // 塗る色を黒に
    } else if (peaces[element[0]][element[1]] === -1) {
      ctx.fillStyle = "white";
    }

    ctx.fill(); // 塗る

    console.log(peaces);
    turnStone(element[0], element[1]);
  });
}
//# sourceMappingURL=play.dev.js.map

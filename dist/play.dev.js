"use strict";

// import canvas1 from "./script/canvas1";
// import canvas2 from "./script/canvas2";
// const canvas1 = document.getElementById("canvas1");
// const canvas2 = document.getElementById("canvas2");
// let { width, height } = canvas1; // canvasのwidthとheightを取得
// let a = width / 8; // 1マスの一辺の長さ
var turnPlarer = 1; //出番の初期化（黒の番から始まる）

var plaer = document.getElementById("turn-player");
plaer.textContent = "黒のターンです";
var optionmsg = document.getElementById("error-msg");
console.log(optionmsg);

function playerChange(turnPlarer) {
  var plaer = document.getElementById("turn-player");

  if (turnPlarer === 1) {
    plaer.textContent = "黒のターンです";
  } else if (turnPlarer === -1) {
    plaer.textContent = "白のターンです";
  }
}

canvas2.addEventListener("click", function (e) {
  console.log(turnPlarer);
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

          console.log(judgeX, " ", judgeY);
          judge = true;
          console.log(judgeX, "< おいた石 <", judgeX + a);
          console.log(judgeY, "< おいた石 <", judgeY + b); // console.log(`${judgeX} ${judgeY}`);
          // if (turnPlarer === 1) {
          //   peaces[i][j] = 1;
          // } else if (turnPlarer === -1) {
          //   peaces[i][j] = -1;
          // }

          turnStone(i, j, judgeX, judgeY, turnPlarer); // console.log(peaces);
          // console.log(turnPlarer);
          // drawPeace(judgeX, judgeY, i, j, turnPlarer);

          break;
        }
      } else {
        continue;
      }
    }

    if (judge) break;
  }
});

function drawPeace(judgeX, judgeY, turnPlarer) {
  // console.log(i, j);
  var ctx = canvas2.getContext("2d");
  var x = judgeX + a / 2; //X軸

  var y = judgeY + b / 2; //Y軸

  var r = a * 0.4; // 半径

  console.log(x, " ", y);
  ctx.beginPath(); // パスのリセット

  ctx.arc(x, y, r, 0, 2 * Math.PI, false);

  if (turnPlarer === 1) {
    ctx.fillStyle = "black"; // 塗る色を黒に
  } else if (turnPlarer === -1) {
    ctx.fillStyle = "white"; // 塗る色を白に
  }

  ctx.fill(); // 塗る
  // turnStone(i, j);
}

function turnStone(i, j, judgeX, judgeY, turnPlarer) {
  var c = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var returnStones = [];
  var judge = 0;
  var ia = 0;
  var jb = 0;
  console.log(peaces[i][j]);

  if (turnPlarer === 1) {
    judge = -1;
  } else if (turnPlarer === -1) {
    judge = 1;
  }

  for (var n = 0; n < 8; n++) {
    ia = i + c[n][0];
    jb = j + c[n][1];
    console.log(ia, " ", jb);

    if (ia < 0 || jb < 0 || ia > 7 || jb > 7) {
      console.log(ia, " ", jb, " この座標はありません。");
      continue;
    } else {
      if (peaces[ia][jb] === 0) {
        // peacePraceReturn(c[0]);
        console.log("\u5EA7\u6A19[".concat(ia, ",").concat(jb, "]\u306F\u7A7A\u3067\u3059\u3002"));
      } else if (peaces[ia][jb] === judge) {
        console.log(ia, " ", jb, "石の色が違います。");

        do {
          returnStones.push([ia, jb]);
          console.log(ia, " ", jb);
          ia += c[n][0];
          jb += c[n][1];

          if (ia < 0 || jb < 0 || ia > 7 || jb > 7) {
            console.log(ia, " ", jb, " この座標はありません。");
            return;
          }
        } while (peaces[ia][jb] === judge);

        console.log(returnStones);

        if (peaces[ia][jb] === 0) {
          returnStones = [];
          console.log(returnStones);
        } else if (peaces[ia][jb] !== judge) {
          console.log(ia, " ", jb, " ", peaces[ia][jb]); // if (judge === 1) {
          //   turnPlarer = -1;
          // } else if (judge === 1) {
          //   turnPlarer = -1;
          // }

          returnStones.forEach(function (element) {
            console.log(element[0], " ", element[1]);

            if (peaces[element[0]][element[1]] === 1) {
              peaces[element[0]][element[1]] = -1;
              console.log(element[0], " ", element[1], " ", peaces[element[0]][element[1]]);
            } else if (peaces[element[0]][element[1]] === -1) {
              console.log(peaces[element[0]][element[1]]);
              console.log(element[0], " ", element[1], " ", peaces[element[0]][element[1]]);
              peaces[element[0]][element[1]] = 1;
            }
          });

          if (turnPlarer === 1) {
            peaces[i][j] = 1;
          } else if (turnPlarer === -1) {
            peaces[i][j] = -1;
          }

          console.log("a");
          drawPeace(judgeX, judgeY, turnPlarer);
          turnPlarer = judge;
          playerChange(turnPlarer);
          console.log("次は", turnPlarer, "の番です。");
          console.log(turnPlarer);
          peacePraceReturn(returnStones, turnPlarer);
          returnStones = [];
        }

        continue;
      } else {
        console.log("石色が同じです。");
      }
    }
  }
}

function peacePraceReturn(returnStones, turnPlarer) {
  console.log(turnPlarer);
  returnStones.forEach(function (element) {
    // console.log(
    //   element[0],
    //   " ",
    //   element[1],
    //   " ",
    //   peaces[element[0]][element[1]]
    // );
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

    console.log(turnPlarer);
    winnerCheck(turnPlarer); // turnStone(element[0], element[1]);
  });
}

function winnerCheck(turnPlarer) {
  console.log(turnPlarer);
  var winnerJudge = 0;

  winnerJudgeCheckFinish: for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (peaces[i][j] === 1) {
        winnerJudge = 1;
        break winnerJudgeCheckFinish;
      } else if (peaces[i][j] === -1) {
        winnerJudge = -1;
        break winnerJudgeCheckFinish;
      }
    }
  } // console.log(winnerJudge);


  winnerCheckFinish: for (var _i = 0; _i < 8; _i++) {
    for (var _j = 0; _j < 8; _j++) {
      if (peaces[_i][_j] !== winnerJudge && peaces[_i][_j] !== 0) {
        console.log(_i, " ", _j, "石が埋まっていませんゲームを続行してください");
        winnerJudge = 0;
        break winnerCheckFinish;
      }
    }
  }

  if (winnerJudge !== 0) {
    console.log("石が全て", winnerJudge, "で埋まりました。");
  }
}
//# sourceMappingURL=play.dev.js.map

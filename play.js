// import canvas1 from "./script/canvas1";
// import canvas2 from "./script/canvas2";
// const canvas1 = document.getElementById("canvas1");
// const canvas2 = document.getElementById("canvas2");
// let { width, height } = canvas1; // canvasのwidthとheightを取得
// let a = width / 8; // 1マスの一辺の長さ
let turnPlarer = 1; //出番の初期化（黒の番から始まる）
let plaer = document.getElementById("turn-player");
plaer.textContent = "黒のターンです";
let optionmsg = document.getElementById("error-msg");
console.log(optionmsg);

function playerChange(turnPlarer) {
  let plaer = document.getElementById("turn-player");
  if (turnPlarer === 1) {
    plaer.textContent = "黒のターンです";
  } else if (turnPlarer === -1) {
    plaer.textContent = "白のターンです";
  }
}

canvas2.addEventListener("click", function (e) {
  // console.log(e.layerX + " ", e.layerY);
  let judge = false;
  for (let i = 0; i < 8; i++) {
    console.log(`iは${i}`);
    for (let j = 0; j < 8; j++) {
      let judgeX = a * j;
      let judgeY = a * i;
      console.log(`jは${j}`);

      if (judgeX < e.layerX && judgeX + a > e.layerX) {
        console.log(`X軸は${e.layerX}の位置をクリックしました`);
        if (judgeY < e.layerY && judgeY + b > e.layerY) {
          console.log(`Y軸は${e.layerY}の位置をクリックしました`);
          if (peaces[i][j] !== 0) {
            console.log(`クリック位置[${i},${j}]には既に石があります`);
            return;
          }
          console.log(i, j);
          judge = true;
          console.log(judgeX, "< おいた石 <", judgeX + a);
          console.log(judgeY, "< おいた石 <", judgeY + b);
          // console.log(`${judgeX} ${judgeY}`);
          if (turnPlarer === 1) {
            peaces[i][j] = 1;
          } else if (turnPlarer === -1) {
            peaces[i][j] = -1;
          }

          console.log(peaces);
          console.log(turnPlarer);
          drawPeace(judgeX, judgeY, i, j, turnPlarer);

          break;
        }
      } else {
        continue;
      }
    }
    if (judge) break;
  }
});

function drawPeace(judgeX, judgeY, i, j, turnPlarer) {
  // console.log(i, j);

  let ctx = canvas2.getContext("2d");
  let x = judgeX + a / 2; //X軸
  let y = judgeY + b / 2; //Y軸
  let r = a * 0.4; // 半径
  console.log(x, " ", y);
  ctx.beginPath(); // パスのリセット
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  if (turnPlarer === 1) {
    ctx.fillStyle = "black"; // 塗る色を黒に
  } else if (turnPlarer === -1) {
    ctx.fillStyle = "white"; // 塗る色を白に
  }

  ctx.fill(); // 塗る
  turnStone(i, j);
}

function turnStone(i, j) {
  // console.log(i, j);
  let c = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let returnStones = [];
  let judge = 0;
  let ia = 0;
  let jb = 0;
  console.log(peaces[i][j]);
  if (peaces[i][j] === 1) {
    judge = -1;
  } else if (peaces[i][j] === -1) {
    judge = 1;
  }
  for (let n = 0; n < 8; n++) {
    ia = i + c[n][0];
    jb = j + c[n][1];
    console.log(ia, " ", jb);
    if (peaces.hasOwnProperty(ia, jb) === false) {
      console.log(ia, " ", jb, " この座標はありません。");
      continue;
    } else {
      if (peaces[ia][jb] === 0) {
        // peacePraceReturn(c[0]);
        console.log(`座標[${ia},${jb}]は空です。`);
      } else if (peaces[ia][jb] === judge) {
        console.log(ia, " ", jb, "石の色が違います。");

        do {
          returnStones.push([ia, jb]);
          console.log(ia, " ", jb);
          ia += c[n][0];
          jb += c[n][1];
          if (peaces.hasOwnProperty(ia, jb) === false) {
            console.log(ia, " ", jb, " この座標はありません。");
            return;
          }
        } while (peaces[ia][jb] === judge);
        console.log(returnStones);
        if (peaces[ia][jb] === 0) {
          returnStones = [];
          console.log(returnStones);
        } else if (peaces[ia][jb] !== judge) {
          console.log(ia, " ", jb, " ", peaces[ia][jb]);
          // if (judge === 1) {
          //   turnPlarer = -1;
          // } else if (judge === 1) {
          //   turnPlarer = -1;
          // }
          turnPlarer = judge;
          playerChange(turnPlarer);
          console.log("次は", turnPlarer, "の番です。");
          returnStones.forEach((element) => {
            console.log(element[0], " ", element[1]);
            if (peaces[element[0]][element[1]] === 1) {
              peaces[element[0]][element[1]] = -1;
              console.log(
                element[0],
                " ",
                element[1],
                " ",
                peaces[element[0]][element[1]]
              );
            } else if (peaces[element[0]][element[1]] === -1) {
              console.log(peaces[element[0]][element[1]]);
              console.log(
                element[0],
                " ",
                element[1],
                " ",
                peaces[element[0]][element[1]]
              );
              peaces[element[0]][element[1]] = 1;
            }
          });

          console.log(peaces);
          peacePraceReturn(returnStones);
          returnStones = [];
        }

        continue;
      } else {
        console.log("石色が同じです。");
      }
    }
  }
}

function peacePraceReturn(returnStones) {
  returnStones.forEach((element) => {
    console.log(
      element[0],
      " ",
      element[1],
      " ",
      peaces[element[0]][element[1]]
    );
    let judgeX = a * element[1];
    let judgeY = a * element[0];
    let ctx = canvas2.getContext("2d");
    let x = judgeX + a / 2; //X軸
    let y = judgeY + b / 2; //Y軸
    let r = a * 0.4; // 半径
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
    winnerCheck();
    // turnStone(element[0], element[1]);
  });
}

function winnerCheck() {
  let winnerJudge = 0;
  winnerJudgeCheckFinish: for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (peaces[i][j] === 1) {
        winnerJudge = 1;
        break winnerJudgeCheckFinish;
      } else if (peaces[i][j] === -1) {
        winnerJudge = -1;
        break winnerJudgeCheckFinish;
      }
    }
  }
  console.log(winnerJudge);
  winnerCheckFinish: for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (peaces[i][j] !== winnerJudge && peaces[i][j] !== 0) {
        console.log(i, " ", j, "石が埋まっていませんゲームを続行してください");
        winnerJudge = 0;
        break winnerCheckFinish;
      }
    }
  }
  if (winnerJudge !== 0) {
    console.log("石が全て", winnerJudge, "で埋まりました。");
  }
}

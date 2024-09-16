// import canvas1 from "./script/canvas1";
// import canvas2 from "./script/canvas2";
// const canvas1 = document.getElementById("canvas1");
// const canvas2 = document.getElementById("canvas2");
// let { width, height } = canvas1; // canvasのwidthとheightを取得
// let a = width / 8; // 1マスの一辺の長さ

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

  let ctx = canvas2.getContext("2d");
  let x = judgeX + a / 2; //X軸
  let y = judgeY + b / 2; //Y軸
  let r = a * 0.4; // 半径
  console.log(x, " ", y);
  ctx.beginPath(); // パスのリセット
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black"; // 塗る色を黒に
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
  if (peaces[i][j] === 1) {
    judge = -1;
  } else if (peaces[i][j] === -1) {
    judge = 1;
  }
  for (let n = 0; n < 8; n++) {
    ia = i + c[n][0];
    jb = j + c[n][1];
    console.log(ia, " ", jb);
    if (peaces[ia][jb] === 0) {
      // peacePraceReturn(c[0]);
      console.log(`座標[${ia},${jb}]は空です。`);
    } else if (peaces[ia][jb] === judge) {
      console.log(ia, " ", jb, "石の色が違います。");

      do {
        returnStones.push([ia, jb]);
        ia += c[n][0];
        jb += c[n][1];
        // if (peaces[ia][jb] === 0) d = "";
      } while (peaces[ia][jb] === judge);
      if (peaces[ia][jb] === 0) {
        returnStones = [];
        console.log(returnStones);
      } else if (peaces[ia][jb] !== judge) {
        returnStones.forEach((element) => {
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
  returnStones.forEach((element) => {
    console.log(peaces[element[0]][element[1]]);
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
    turnStone(element[0], element[1]);
  });
}

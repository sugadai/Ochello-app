const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
let { width, height } = canvas1; // canvasのwidthとheightを取得
let a = width / 8; // 1マスの一辺の長さ
let b = height / 8;
let bg_color = "seagreen"; // ボードの色
let peaces = [];
for (let i = 0; i < 8; i++) {
  peaces[i] = [];
  for (let j = 0; j < 8; j++) {
    peaces[i][j] = 0;
  }
}

drawBoard(); // ボードの表示

function drawBoard() {
  let ctx = canvas1.getContext("2d"); // canvas1
  ctx.fillStyle = bg_color; // 塗る色をbg_colorに
  ctx.fillRect(0, 0, width, height); // ボードを塗る
  ctx.strokeStyle = "black"; // 線の色を黒に
  for (let i = 0; i <= 8; i++) {
    // i番目の縦線
    // console.log(a * i);
    ctx.beginPath();
    ctx.moveTo(a * i, 0);
    ctx.lineTo(a * i, height);
    ctx.stroke(); // 線を引く
    // i番目の横線
    ctx.beginPath();
    ctx.moveTo(0, a * i);
    // console.log(width);
    ctx.lineTo(width, a * i);
    ctx.stroke(); // 線を引く
  }
  drawPochi(); // 謎の黒い点
  drawPeces(); // 最初の石の配置
}

function drawPochi() {
  let ctx = canvas1.getContext("2d"); // canvas1
  for (let i = 2; i <= 6; i += 4) {
    for (let j = 2; j <= 6; j += 4) {
      let x = a * j; // x座標
      let y = a * i; // y座標
      let r = a * 0.08; // 半径
      ctx.beginPath(); // パスのリセット
      ctx.arc(x, y, r, 0, 2 * Math.PI, false); // 小さい円
      ctx.fillStyle = "black"; // 塗る色を黒に
      ctx.fill(); // 塗る
    }
  }
}

function drawPeces() {
  let ctx = canvas2.getContext("2d");
  for (let i = 3; i <= 4; i++) {
    for (let j = 3; j <= 4; j++) {
      let x = a * j + a / 2; // x座標
      let y = a * i + a / 2; // y座標
      let r = a * 0.4; // 半径
      // console.log(x, " ", y);
      ctx.beginPath(); // パスのリセット
      ctx.arc(x, y, r, 0, 2 * Math.PI, false); // 小さい円
      if (x === y) {
        ctx.fillStyle = "black"; // 塗る色を黒に
        peaces[i][j] = 1;
      } else {
        ctx.fillStyle = "white"; // 塗る色を黒に
        peaces[i][j] = -1;
      }
      console.log(peaces);
      ctx.fill(); // 塗る
    }
  }
}

// export default { canvas1, canvas2 };

const bigCanvas = document.getElementById("bigCanvas");
const bigCanvasContext = bigCanvas.getContext("2d");

const smallCanvas = document.getElementById("smallCanvas");
const smallCanvasContext = smallCanvas.getContext("2d");
smallCanvasContext.rect(0, 0, 50, 600);

const stars = [
    { cx: 140, cy: 120, color: 'red' },
    { cx: 460, cy: 120, color: 'blue' },
    { cx: 290, cy: 300, color: 'green' },
    { cx: 140, cy: 480, color: 'yellow' },
    { cx: 460, cy: 480, color: 'black' },
]

function drawStar(cx, cy, color) {
    const spikes = 5;
    const outerRadius = 100;
    const innerRadius = 40;
    const step = Math.PI / spikes;

    let rot = Math.PI / 2 * 3;
    let x, y;

    bigCanvasContext.beginPath();
    bigCanvasContext.moveTo(cx, cy - outerRadius)

    const drawLine = (radius) => {
        x = cx + Math.cos(rot) * radius;
        y = cy + Math.sin(rot) * radius;
        bigCanvasContext.lineTo(x, y)
        rot += step
    }

    for (let i = 0; i < spikes; i++) {
        drawLine(outerRadius)
        drawLine(innerRadius)
    }

    bigCanvasContext.lineTo(cx, cy - outerRadius)
    bigCanvasContext.closePath();

    bigCanvasContext.fillStyle = color;
    bigCanvasContext.fill();
}

stars.forEach(({ cx, cy, color }) => drawStar(cx, cy, color))

bigCanvas.onclick = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const img_data = bigCanvasContext.getImageData(x, y, 1, 1);
    const rgba = img_data.data;

    const isWhite = rgba.every(v => v === 0);
    const color = isWhite ? 'white' : `rgba(${[...rgba]})`

    smallCanvasContext.fillStyle = color
    smallCanvasContext.fill();
}

import { useEffect, useRef } from "react";

export default function LineTemp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawCurve(
    ctx: CanvasRenderingContext2D,
    ptsa: number[],
    canvasWidth: number,
    tension?: number,
    isClosed?: boolean,
    numOfSegments?: number,
    showPoints?: boolean
  ) {
    ctx.beginPath();

    drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));

    if (showPoints) {
      ctx.beginPath();
      // ctx.setLineDash([1, 1]);
      for (var i = 0; i < ptsa.length - 1; i += 2)
        ctx.rect(ptsa[i] - 2, ptsa[i + 1] - 2, 4, 4);
    }
    var gradient = ctx.createLinearGradient(20, 0, canvasWidth, 0);

    // Add three color stops
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.25, "#f97f29");
    gradient.addColorStop(0.75, "#f97f29");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    // Set the fill style and draw a rectangle
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  function getCurvePoints(
    pts: number[],
    tension?: number,
    isClosed?: boolean,
    numOfSegments?: number
  ) {
    // use input value if provided, or use a default value
    tension = typeof tension != "undefined" ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [],
      res = [], // clone array
      x,
      y, // our x,y coords
      t1x,
      t2x,
      t1y,
      t2y, // tension vectors
      c1,
      c2,
      c3,
      c4, // cardinal points
      st,
      t,
      i; // steps based on num. of segments

    // clone array so we don't change the original
    //
    _pts = pts.slice(0);

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
      _pts.unshift(pts[pts.length - 1]);
      _pts.unshift(pts[pts.length - 2]);
      _pts.unshift(pts[pts.length - 1]);
      _pts.unshift(pts[pts.length - 2]);
      _pts.push(pts[0]);
      _pts.push(pts[1]);
    } else {
      _pts.unshift(pts[1]); //copy 1. point and insert at beginning
      _pts.unshift(pts[0]);
      _pts.push(pts[pts.length - 2]); //copy last point and append
      _pts.push(pts[pts.length - 1]);
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i = 2; i < _pts.length - 4; i += 2) {
      for (t = 0; t <= numOfSegments; t++) {
        // calc tension vectors
        t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
        t2x = (_pts[i + 4] - _pts[i]) * tension;

        t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
        t2y = (_pts[i + 5] - _pts[i + 1]) * tension;

        // calc step
        st = t / numOfSegments;

        // calc cardinals
        c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
        c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
        c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
        c4 = Math.pow(st, 3) - Math.pow(st, 2);

        // calc x and y cords with common control vectors
        x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
        y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;

        //store points in array
        res.push(x);
        res.push(y);
      }
    }

    return res;
  }

  function drawLines(ctx: CanvasRenderingContext2D, pts: number[]) {
    ctx.moveTo(pts[0], pts[1]);
    for (var i = 2; i < pts.length - 1; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
  }

  function redraw(
    ctx: CanvasRenderingContext2D,
    width: number,
    hoverX?: number
  ) {
    let points: number[][] = [];
    const diff = width / 4;
    const diffSpace = diff / 2;
    [55, 20, 30, 60].map((point, idx) => {
      points.push([diff * (idx + 0.5), point]);
    });
    let myPoints: number[] = [];
    const yshift = 30;
    myPoints.push(0, 50);
    points.map((coord, idx) => {
      myPoints.push(coord[0], coord[1] + yshift);

      if (idx === 3) return false;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.strokeStyle = "#ccc";
      ctx.lineDashOffset = 1;
      ctx.moveTo(coord[0] + diffSpace, 0);
      ctx.lineTo(coord[0] + diffSpace, 200);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    myPoints.push(width, 50);

    ctx.setLineDash([]);
    drawCurve(ctx, myPoints, width, 0.5); //default tension=0.5
    points.map((coord) => {
      ctx.beginPath();
      ctx.arc(coord[0], coord[1] + yshift, 8, 0, 2 * Math.PI, false);
      if (
        hoverX &&
        coord[0] - diffSpace < hoverX &&
        coord[0] + diffSpace > hoverX
      ) {
        ctx.fillStyle = "#222";
      } else {
        ctx.fillStyle = "#f97f29";
      }
      ctx.fill();
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        canvas.onmousemove = function (e) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          redraw(ctx, canvas.getBoundingClientRect().width, e.offsetX);
        };

        redraw(ctx, canvas.getBoundingClientRect().width);
      }
    }
  }, []);

  return (
    <canvas
      id="myCanvas"
      width="100%"
      style={{
        marginTop: "1rem",
        width: "100%",
        display: "block",
        cursor: "pointer",
      }}
      ref={canvasRef}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
}

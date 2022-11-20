import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Point = {
  id: number;
  x: number;
  y: number;
  trained: boolean;
  type: number;
};

type Line = {
  visible: boolean;
  greaterThan?: boolean;
  bottom?: number;
  degrees?: number;
};

type DotProps = {
  point: Point;
  rect: DOMRect;
};

const Home: NextPage = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [bias, setBias] = useState<number[]>([0, 0, 0]);
  const [type, setType] = useState(0);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState<DOMRect>();
  const [boundary, setBoundary] = useState<Line>();
  const [pointsRemaining, setPointsRemaining] = useState(0);
  const [makingBound, setMakingBound] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) return () => {};
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setRect(entries[0].contentRect);
      }
    });
    observer.observe(canvasRef.current);
    return () => canvasRef.current && observer.unobserve(canvasRef.current);
  }, []);

  const translateToOrigin = (x: number, y: number, rect: DOMRect) => {
    let newX = Math.round(x - (rect.left + rect.width / 2));
    let newY = Math.round(y - (rect.top + rect.height / 2));
    return { x: newX, y: newY };
  };

  const handleSetBounds = () => {
    setPointsRemaining(2);
    setMakingBound(true);
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (!rect) return;
    const coords = translateToOrigin(e.pageX, e.pageY, rect);
    coords.x = coords.x - 192;
    setMouseData(coords);
  };

  const handleClear = () => {
    console.log("test");
    setPoints([]);
    setBias([0, 0, 0]);
    setBoundary({
      visible: false,
      bottom: 0,
      degrees: 0,
      greaterThan: true,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let rect = e.currentTarget.getBoundingClientRect();
    const coords = translateToOrigin(e.pageX, e.pageY, rect);
    console.log(e);
    if (makingBound) {
      if (pointsRemaining == 1) setMakingBound(false);
      setPointsRemaining((current) => current - 1);
    } else {
      const newPoint = {
        ...coords,
        id: points.length,
        trained: false,
        type: type,
      };
      setPoints((current) => [...current, newPoint]);
    }
  };

  const makeBoundary = (weights: number[]) => {
    let minX = 0;
    let maxX = 0;
    points.forEach((point) => {
      if (point.x > maxX) maxX = point.x;
      if (point.x < minX) minX = point.x;
    });
    if (weights[0] && weights[1] && weights[2]) {
      let slope = -(weights[2] / weights[1]) / (weights[2] / weights[0]);
      let minX_y = (weights[0] * minX + weights[2]) / (-1 * weights[1]);

      let intercept = -slope * minX + minX_y;
      let theta = Math.atan(slope) * (180 / Math.PI);
      console.log(`(slope, int), (${slope}, ${intercept}, ${theta})`);
      console.log(`((min/max), weights), (${minX}, ${maxX}, ${weights})`);
      if (rect) {
        setBoundary({
          visible: true,
          bottom: rect?.height / 2 - intercept,
          degrees: theta,
          greaterThan: true,
        });
      }
    }
  };

  const handleType = (type: number) => {
    setType(type);
  };

  const handleTrain = async () => {
    let weights = bias.filter(() => true);

    function classify(weight: number[], feature: number[]) {
      let sum = 0;
      let zip = weight.map((w, i) => {
        return [w, feature[i]];
      });
      zip.forEach(([w, f]) => {
        if (w && f) {
          sum += w * f;
        }
      });
      if (sum > 0) return 1;
      return 0;
    }

    let promise = Promise.resolve();
    points.forEach(async (point) => {
      promise = promise.then(function () {
        if (point.trained) return;
        setPoints((current) => {
          return current.map((tPoint) => {
            if (tPoint.id == point.id) {
              return { ...point, trained: true };
            }
            return tPoint;
          });
        });
        return new Promise(function (resolve) {
          setTimeout(resolve, 20);
        });
      });
    });
    promise.then(() => {
      let incorrect = true;
      while (incorrect) {
        incorrect = false;
        points.forEach((point) => {
          const feature = [point.x, point.y, 1];
          const type = classify(weights, feature);
          if (type !== point.type) {
            incorrect = true;
            if (weights.length == feature.length) {
              if (type == 1) weights = weights.map((w, i) => w - feature[i]);
              if (type == 0) weights = weights.map((w, i) => w + feature[i]);
            }
          }
        });
      }
      console.log("hmm not running");
      setBias(weights);
      makeBoundary(weights);
    });
  };

  return (
    <>
      <Head>
        <title>2D Classifier</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen  flex min-h-screen">
        <Sidebar
          handleSetBounds={handleSetBounds}
          handleTrain={handleTrain}
          handleType={handleType}
          handleClear={handleClear}
          type={type}
          mouseData={mouseData}
        />
        <div
          className=" relative flex grow items-center justify-center overflow-hidden bg-[#1f2725]"
          ref={canvasRef}
          onClick={handleClick}
          onMouseMove={handleMouse}
          style={{
            backgroundColor: `${makingBound ? "hsl(191,19%,32%)" : "#1f2725"}`,
          }}
        >
          {makingBound && (
            <p className="absolute bottom-4 right-4 z-20 font-bold text-white">
              Click Two areas to make a line
            </p>
          )}
          <div className="absolute h-[1px] min-w-full bg-white"></div>
          <div className="absolute min-h-full w-[1px] bg-white"></div>
          <div
            className="absolute min-h-[3000px] min-w-[9999px] origin-bottom border-b-4 border-solid border-red-700 bg-[hsla(202,37%,46%,.4)]"
            style={{
              opacity: `${boundary?.visible ? "100%" : "0%"}`,
              bottom: `${boundary?.bottom}px`,
              transform: `rotate(${boundary?.degrees}deg)`,
            }}
          ></div>
          {rect &&
            points.map((point) => {
              return <Dot point={point} rect={rect} key={point.id} />;
            })}
        </div>
        <div
          className="0 absolute bottom-3 right-0 z-[1] box-border min-w-max bg-orange-100 p-4 text-orange-700"
          role="alert"
        >
          <div className="absolute top-0 left-0 h-full w-[10%] bg-orange-500 bg-opacity-30"></div>
          <p className="font-bold">Be Warned</p>
          <p>Something not ideal might be happening.</p>
        </div>
      </main>
    </>
  );
};

const Dot: React.FC<DotProps> = ({ point, rect }) => {
  const translateFromCoord = () => {
    const newX = point.x + rect.width / 2;
    const newY = point.y + rect.height / 2;

    // let newX = Math.round(point.x - (rect.left + rect.width / 2));
    // let newY = Math.round(point.y - (rect.top + rect.height / 2));
    return { x: newX, y: newY };
  };
  const { x, y } = translateFromCoord();
  const borderColor = point.type ? "#175E77" : "#C22D30";
  const backgroundColor = point.trained ? "#FFFFFF" : "#000000";
  if (point.trained) {
    return (
      <div
        id={`point-${point.id}`}
        className="absolute h-3 w-3 animate-[ping_0.2s_cubic-bezier(0,0,0.2,1)_1] rounded-full border-4 border-solid transition-all  hover:scale-[3]  hover:transform"
        style={{
          top: `${y - 6}px`,
          left: `${x - 6}px`,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        }}
      />
    );
  }
  return (
    <div
      id={`point-${point.id}`}
      className="absolute h-3 w-3 rounded-full border-4 border-solid"
      style={{
        top: `${y - 6}px`,
        left: `${x - 6}px`,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }}
    />
  );
};

export default Home;

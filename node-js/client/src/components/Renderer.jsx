import React, { useRef, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
// import { $, jQuery } from "jquery"; // to do: fix this so that $ and jQuery are always defined and loaded
const $ = require("jquery"); // temporary fix for loading jQuery and $ for arbor methods
const jQuery = require("jquery");

export const GraphRenderer = (props) => {
  const canvasRef = useRef(null); // uses react hooks to create a reference to the canvas element
  // to do: split responsibility for DOM control between React and jQuery better
  const windowSize = useWindowSize();
  const { arbor, robotStates } = props || {};

  const Renderer = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    let particleSystem;

    const that = {
      init(system) {
        particleSystem = system;
        particleSystem.screenSize(canvas.width, canvas.height);
        particleSystem.screenPadding(80);
        that.initMouseHandling();
      },

      redraw() {
        ctx.fillStyle = "#282c34";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particleSystem.eachEdge((edge, pt1, pt2) => {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        });

        particleSystem.eachNode((node, pt) => {
          const w = 30;
          // shows if a robot is operational or non-operational based on the current value
          ctx.fillStyle = node.data.values.current < 0.5 ? "red" : "green";

          // uses a circle for nodes instead of the default useRect
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, w / 2, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();

          // creates an offset label for the node
          ctx.font = "12px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText(node.name, pt.x + 40, pt.y + 5);
        });
      },

      // nodes don't move, but i left this in for fun
      // to do: update nearest neighbors and edges between nodes if nodes move
      initMouseHandling() {
        let dragged = null;

        const handler = {
          clicked(e) {
            const pos = $(canvas).offset();
            const _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null) {
              dragged.node.fixed = true;
            }

            $(canvas).on("mousemove", handler.dragged);
            $(window).on("mouseup", handler.dropped);

            return false;
          },
          dragged(e) {
            const pos = $(canvas).offset();
            const s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);

            if (dragged && dragged.node !== null) {
              const p = particleSystem.fromScreen(s);
              dragged.node.p = p;
            }

            return false;
          },

          dropped(e) {
            if (dragged === null || dragged.node === undefined) return;
            if (dragged.node !== null) dragged.node.fixed = false;
            dragged.node.tempMass = 1000;
            dragged = null;
            $(canvas).off("mousemove", handler.dragged);
            $(window).off("mouseup", handler.dropped);
            const _mouseP = null;
            return false;
          },
        };

        $(canvas).mousedown(handler.clicked);
      },
    };
    return that;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (arbor && Object.keys(arbor).length !== 0) {
      // initializes the arbor canvas and system without repulsion, gravity, and friction so points remain fixed
      const sys = arbor.ParticleSystem(0, 0, 0);
      sys.parameters({ gravity: false });
      sys.renderer = Renderer("#viewport");

      // adds nodes to the arbor system
      const nodes = {};
      robotStates.forEach(function (robot) {
        const node = sys.addNode(robot.id, {
          label: "Node " + robot.id.slice(-1),
          values: robot.values,
          fixed: true, // fixed position so that nodes don't move
          x: parseFloat(robot.pose_x),
          y: parseFloat(robot.pose_y),
        });
        nodes[robot.id] = node;
      });

      // computes distance between each pair of robots once and stores it an object
      const closestRobots = {};
      robotStates.forEach(function (robot1) {
        let closestDistance = Infinity;
        let closestRobot;
        robotStates.forEach(function (robot2) {
          if (robot1.id !== robot2.id) {
            const distance = Math.sqrt(
              Math.pow(robot1.pose_x - robot2.pose_x, 2) +
                Math.pow(robot1.pose_y - robot2.pose_y, 2)
            );
            if (distance < closestDistance) {
              closestDistance = distance;
              closestRobot = robot2;
            }
          }
        });
        closestRobots[robot1.id] = closestRobot;
      });

      // adds edges between closest nodes
      Object.keys(closestRobots).forEach(function (robotId) {
        const closestRobotId = closestRobots[robotId].id;
        sys.addEdge(nodes[robotId], nodes[closestRobotId]);
      });
    }
  }, [arbor]);

  return (
    <canvas
      ref={canvasRef}
      width={windowSize.width - 100}
      height={windowSize.height - 100}
    />
  );
};

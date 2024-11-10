import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import React, { memo } from 'react';

export const ParticlesContainer = memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      container.canvas.element?.addEventListener('click', () => {
        if (container.particles.count >= 500) {
          console.log("Maximum particles count reached");
        }
      });
    }
  };

  const options: ISourceOptions = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "#000000",
      //   },
      // },
      fpsLimit: 60,
      interactivity: {
        events: {
          // onClick: {
          //   enable: true,
          //   mode: "push",
          // },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
            particles_nb: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#BEBEBE", "#BEBEBE", "#D3D3D3"],
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: true,
          speed: { min: 0.1, max: 1 },
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            startValue: "random",
            // destroy: "min",
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            startValue: "random",
            // destroy: "min",
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
  }

  return <></>;
});
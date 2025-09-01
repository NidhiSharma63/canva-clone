const RenderShapes = ({ el }) => {
  switch (el.shapeId) {
    case "rectangle":
      return (
        <div
          key={el.id}
          className="relative"
          style={{
            width: el.width,
            height: el.height,
            backgroundColor: el.fill,
          }}
        />
      );

    case "circle":
      return (
        <div
          className="rounded-full"
          style={{
            width: el.r * 2,
            height: el.r * 2,
            backgroundColor: el.fill,
          }}
        />
      );

    case "triangle":
      return (
        <div
          key={el.id}
          className="relative w-0 h-0"
          style={{
            borderLeft: `${el.width / 2}px solid transparent`,
            borderRight: `${el.width / 2}px solid transparent`,
            borderBottom: `${el.height}px solid ${el.fill}`,
          }}
        />
      );

    case "star":
      return (
        <div
          key={el.id}
          className="relative"
          style={{
            width: el.size,
            height: el.size,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            backgroundColor: el.fill,
          }}
        />
      );

    case "line":
      return (
        <div
          key={el.id}
          className="relative"
          style={{
            width: el.width,
            height: el.height,
            backgroundColor: el.fill,
          }}
        />
      );

    default:
      return null;
  }
};

export default RenderShapes;

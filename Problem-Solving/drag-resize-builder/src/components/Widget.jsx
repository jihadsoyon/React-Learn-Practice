import { Rnd } from "react-rnd";

const Widget = ({ widget }) => {
  return (
    <Rnd
      default={{
        x: widget.x,
        y: widget.y,
        width: 250,
        height: 150,
      }}
      bounds="parent"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      minWidth={200}
      minHeight={120}
    >
      <div className="widget">
        <div className="widget-header">
          <span>{widget.title}</span>
        </div>

        <div className="widget-content">
          Widget Content
        </div>
      </div>
    </Rnd>
  );
};

export default Widget;
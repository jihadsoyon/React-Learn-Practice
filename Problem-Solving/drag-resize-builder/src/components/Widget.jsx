import React from "react";
import { Rnd } from "react-rnd";

const Widget = ({
  widget,
  onDragStop,
  onResizeStop,
}) => {
  return (
    <Rnd
      size={{
  width: widget.width || 250,
  height: widget.height || 150,
}}
      position={{
  x: widget.x || 0,
  y: widget.y || 0,
}}
      bounds="parent"
      minWidth={200}
      minHeight={120}
      onDragStop={(e, d) =>
        onDragStop(widget.id, d)
      }
      onResizeStop={(
        e,
        direction,
        ref,
        delta,
        position
      ) =>
        onResizeStop(
          widget.id,
          ref,
          position
        )
      }
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

export default React.memo(Widget);
import { Rnd } from "react-rnd";

const Widget = ({
  widget,
  widgets,
  setWidgets,
}) => {
  const updateWidget = (id, updates) => {
    const updatedWidgets = widgets.map((item) =>
      item.id === id
        ? { ...item, ...updates }
        : item
    );

    setWidgets(updatedWidgets);
  };

  return (
    <Rnd
      size={{
        width: widget.width || 250,
        height: widget.height || 150,
      }}
      position={{
        x: widget.x,
        y: widget.y,
      }}
      bounds="parent"
      minWidth={200}
      minHeight={120}
      onDragStop={(e, d) => {
        updateWidget(widget.id, {
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(
        e,
        direction,
        ref,
        delta,
        position
      ) => {
        updateWidget(widget.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        });
      }}
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
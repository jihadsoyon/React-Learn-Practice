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
      enableResizing={false}
    >
      <div className="widget">
        <h3>{widget.title}</h3>
      </div>
    </Rnd>
  );
};

export default Widget;
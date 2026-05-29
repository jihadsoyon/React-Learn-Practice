import { FixedSizeList as List } from "react-window";
import items from "../data/items";

const Row = ({ index, style }) => (
  <div style={style} className="row">
    {items[index].name}
  </div>
);

const VirtualizedList = () => {
  return (
    <List
      height={500}
      itemCount={items.length}
      itemSize={60}
      width={"100%"}
    >
      {Row}
    </List>
  );
};

export default VirtualizedList;
import { memo } from "react";
import { FixedSizeList as List } from "react-window";
import items from "../data/items";

const Row = memo(({ index, style }) => (
  <div style={style}>
    <div className="row">
      #{items[index].id} - {items[index].name}
    </div>
  </div>
));

const VirtualizedList = () => {
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={70}
      width={700}
    >
      {Row}
    </List>
  );
};

export default VirtualizedList;
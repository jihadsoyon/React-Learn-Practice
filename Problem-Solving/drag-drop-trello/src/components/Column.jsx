import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card";

const Column = ({ columnId, column }) => {
    return (
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column"
                >
                    <h3 className="column-title">{column.name}</h3>

                    {column.items.map((item, index) => (
                        <Card key={item.id} item={item} index={index} />
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;
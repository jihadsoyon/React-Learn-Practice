import { Draggable } from "@hello-pangea/dnd";

const Card = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card"
                    style={provided.draggableProps.style}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    );
};

export default Card;
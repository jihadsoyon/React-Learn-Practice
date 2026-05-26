import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import initialData from "../data/initialData";
import Column from "./Column";

const Board = () => {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceCol = data[source.droppableId];
        const destCol = data[destination.droppableId];

        if (sourceCol === destCol) {
            const items = [...sourceCol.items];
            const [removed] = items.splice(source.index, 1);
            items.splice(destination.index, 0, removed);

            setData({
                ...data,
                [source.droppableId]: {
                    ...sourceCol,
                    items
                }
            });
        } else {
            const sourceItems = [...sourceCol.items];
            const destItems = [...destCol.items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setData({
                ...data,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems
                }
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {Object.entries(data).map(([key, column]) => (
                    <Column key={key} columnId={key} column={column} />
                ))}
            </div>
        </DragDropContext>
    );
};

export default Board;
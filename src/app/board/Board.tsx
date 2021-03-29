import React from 'react';
import Column from './columns/Column';
import { cardReordered } from './columns/columnsSlice';
import { boardAction } from './boardReducer';
import { useSelector, useDispatch } from 'react-redux';
import { selectColumns } from './columns/columnsSlice';
import style from './board.module.css';
import StyledButton from 'app/common/styled-button';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column as ColumnType } from 'app/common/types';

const Board:React.FunctionComponent = () => {
    const dispatch = useDispatch();
    function onDragEnd(result: DropResult) {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'Bin') {
            dispatch(
                boardAction('cardRemoved')({
                    columnId: source.droppableId,
                    cardId: draggableId,
                }),
            );
        } else if (source.droppableId === destination.droppableId) {
            dispatch(
                cardReordered({ columnId: source.droppableId, startIndex: source.index, endIndex: destination.index }),
            );
        } else {
            dispatch(
                boardAction('cardMoved')({
                    sourceId: source.droppableId,
                    destinationId: destination.droppableId,
                    droppableSource: source,
                    droppableDestination: destination,
                    cardId: draggableId,
                }),
            );
        }
    }

    const columns = useSelector(selectColumns);
    return (
        <div className={style.board}>
            <StyledButton
                onClick={() => dispatch(boardAction('dataCleared')({ cardId: '' }))}
                className="reset"
                title="Clear board and reset to initial settings"
            />
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((col: ColumnType) => (
                    <Column {...col} columnsCount={columns.length} key={col.id} />
                ))}
                <Column columnsCount={columns.length} />
            </DragDropContext>
        </div>
    );
};

export default Board;

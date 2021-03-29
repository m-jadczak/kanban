import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'app/board/cards/Card';
import { boardAction } from 'app/board/boardReducer';
import { selectDefalutColor } from 'app/board/globals/globalsSlice';

import styles from './droppable-area.module.css';

interface Props {
    id: string;
    cardsIds?: string[];
}

const DroppableArea: React.FunctionComponent<Props> = (props) => {
    const { id, cardsIds } = { ...props };
    const dispatch = useDispatch();
    const color = useSelector(selectDefalutColor);

    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <>
                    <div
                        {...provided.droppableProps}
                        onClick={(e) => {
                            e.preventDefault();
                            e.currentTarget.blur();
                        }}
                        onMouseDown={() => dispatch(boardAction('cardAdded')({ columnId: id, color: color }))}
                        ref={provided.innerRef}
                        className={styles['area']}
                        title="Click here to add a card"
                        aria-label="Click here to add a card"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') dispatch(boardAction('cardAdded')({ columnId: id, color: color }));
                        }}
                    >
                        {cardsIds !== undefined
                            ? cardsIds.map((cardId, index) => (
                                  <Card key={cardId} columnId={id} id={cardId} index={index} />
                              ))
                            : ''}
                        <div className={styles.background} />
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Droppable>
    );
};

export default DroppableArea;

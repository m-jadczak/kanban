import React, { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styles from './bin.module.css';


const Bin: FunctionComponent = () => {

    return (
        <Droppable droppableId={'Bin'}>
            {(provided, snapshot) => (
                <>
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${styles['bin-body']} ${snapshot.isDraggingOver ? styles['bin-over'] : ""}`}
                    >
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Droppable>
    );
};

export default Bin;

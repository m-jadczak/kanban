import React, { FunctionComponent, useState, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import StyledTextarea from 'app/common/styled-textarea';
import StyledButton from 'app/common/styled-button';
import ReactColorPicker from '@super-effective/react-color-picker';
import { cardUpdated, selectCardByID } from './cardsSlice';
import contrast from 'app/common/utils/contrast';
import { RootState } from 'app/store';

import styles from './card.module.css';

interface Props {
    id: string;
    index: number;
    columnId?: string;
    createdByClick?: boolean;
}

type ClassState = 'appear' | 'ready';

const getItemStyle = (provided: DraggableProvided, snapshot: DraggableStateSnapshot): Record<string, unknown> => {
    const draggableStyle = provided.draggableProps.style;
    const transform = draggableStyle ? draggableStyle.transform : undefined;
    return {
        ...draggableStyle,
        opacity: snapshot.draggingOver === 'Bin' ? '0.5' : undefined,
        transformOrigin: snapshot.isDropAnimating && snapshot.draggingOver === 'Bin' ? 'top' : undefined,
        transform: snapshot.isDropAnimating && snapshot.draggingOver === 'Bin' ? transform + 'scale(0.5)' : transform,
    };
};

const Card: FunctionComponent<Props> = (props) => {
    const { columnId, id, index } = { ...props };
    const card = useSelector((state: RootState) => selectCardByID(state, id));
    const [className, setClassName] = useState<ClassState>(card && card.lastColumn === columnId ? 'appear' : 'ready');
    const dispatch = useDispatch();
    const [colorPickerVisable, setColorPickerVisable] = useState<boolean>(false);
    const color = card ? card.color : '';

    useEffect(() => {
        const timeout = setTimeout(() => setClassName('ready'), 5);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Draggable isDragDisabled={colorPickerVisable} draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={{
                        marginBottom: '10px',
                        backgroundColor: color,
                        ...getItemStyle(provided, snapshot),
                        color: contrast(color, '#424342', undefined),
                    }}
                    className={`${styles['card-body']} ${styles[className]}`}
                    title={colorPickerVisable ? "First, close the color palette" :"Grab here to move the card"}
                >
                    <div
                        className={styles['card-header']}
                        onClick={(e) => e.target}
                        style={{ cursor: colorPickerVisable ? "not-allowed" : undefined }}
                    >
                        <div className={styles['header-item']}>
                            <StyledButton
                                className="color-picker"
                                onClick={(e:MouseEvent<HTMLElement>) => {
                                    e && e.currentTarget ? e.currentTarget.blur() : null;
                                    setColorPickerVisable((bool) => !bool);
                                }}
                                title="Choose a color for this card"
                            />
                        </div>
                        <div className={`${styles['header-item']} ${styles['draggable-icon']}`} />
                    </div>
                    <div className={styles['card-main']} onClick={(e) => e.stopPropagation}>
                        <StyledTextarea
                            id={id}
                            titleUpdated={cardUpdated}
                            value={card ? card.content : ''}
                            title="Enter the content"
                        />
                        {colorPickerVisable ? (
                            <div className={styles['color-picker']}>
                                <ReactColorPicker
                                    showSwatch={false}
                                    showHex={false}
                                    color={color}
                                    onChange={(newColor) => {
                                        dispatch(cardUpdated({ id: id, color: newColor, content: undefined }));
                                    }}
                                />
                            </div>
                        ) : undefined}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;

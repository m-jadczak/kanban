import React, { useState, useEffect, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { columnAdded, columnRemoved, titleUpdated } from './columnsSlice';
import StyledButton from 'app/common/styled-button';
import StyledInput from 'app/common/styled-input';
import DroppableArea from './DroppableArea';
import RightPanel from './RightPanel';

import styles from './column.module.css';

interface ColumnProps {
    id?: string;
    title?: string;
    cardsIds?: string[];
    columnsCount: number;
}

type ColumnAction = typeof columnAdded | typeof columnRemoved;
type ColumnState = 'ready' | 'appear' | 'fade' | 'disappear';

const Column: FunctionComponent<ColumnProps> = (props) => {
    const dispatch = useDispatch();
    const [className, setClassName] = useState<ColumnState>('appear');
    const { id, title, columnsCount, cardsIds } = props;
    const transitionTime = 500;

    const widthCalc = {
        ready: 100 / (columnsCount + 1),
        appear: 0,
        fade: 0,
        disappear: 100 / (columnsCount + 1),
    };

    const onClassNameUpdated = (action: ColumnAction, payload: string) => {
        const time1 = setTimeout(() => {
            dispatch(action(payload));
        }, transitionTime);
        const time2 = setTimeout(() => {
            setClassName('ready');
        }, 2 * transitionTime);
        return [time1, time2];
    };

    useEffect(() => {
        const timeout = setTimeout(() => setClassName('ready'), 5);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        let time: ReturnType<typeof onClassNameUpdated>;

        switch (className) {
            case 'fade':
                if (id !== undefined) {
                    time = onClassNameUpdated(columnRemoved, id);
                }
                break;
            case 'disappear':
                onClassNameUpdated(columnAdded, '');
                break;
        }
        return () => {
            if (time !== undefined) clearTimeout(time[0]), clearTimeout(time[1]);
        };
    }, [className]);

    return (
        <div
            className={`${styles['column-body']} ${styles[className]}`}
            style={{ maxWidth: `${widthCalc[className]}vw` }}
        >
            {id !== undefined ? (
                <div className={styles['column-header']}>
                    <div className={styles['remove-button']}>
                        <StyledButton
                            className="remove"
                            onClick={() => setClassName('fade')}
                            title="Remove the column"
                        />
                    </div>
                    <div className={styles['title']}>
                        <StyledInput id={id} titleUpdated={titleUpdated} value={title} title="Type the column header" />
                    </div>
                </div>
            ) : (
                <RightPanel onClick={() => setClassName('disappear')} />
            )}
            {id !== undefined ? <DroppableArea id={id} cardsIds={cardsIds} /> : ''}
        </div>
    );
};

export default Column;

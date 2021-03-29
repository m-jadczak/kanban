import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bin from './Bin';
import ReactColorPicker from '@super-effective/react-color-picker';
import { defaultColorChanged, selectDefalutColor } from 'app/board/globals/globalsSlice';
import StyledButton from 'app/common/styled-button';

import styles from './right-panel.module.css';
import columnStyles from "../column.module.css"
interface Props {
    onClick: () => void;
}

const RightPanel: React.FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const color = useSelector(selectDefalutColor);

    return (
        <div className={`${styles['right-panel']}`}>
            <div className={columnStyles['column-header']}>
                <div className={columnStyles['title']}>
                    <span className={styles['add-title']}>add column</span>
                </div>
            </div>
            <StyledButton className="add-column" onClick={props.onClick} title="Add new column"/>
            <div className={columnStyles['title']}>
                <span className={styles['add-title']}>drop to remove</span>
            </div>
            <Bin />
            <div className={columnStyles['title']}>
                <span className={styles['add-title']}>default color</span>
            </div>
            <ReactColorPicker
                showSwatch={false}
                showHex={false}
                color={color}
                className={styles['color-picker']}
                onChange={(newColor) => {
                    dispatch(defaultColorChanged(newColor));
                }}
            />
            <div className={columnStyles['title']}>
                <span className={styles['add-title']}>instruction</span>
                <ol className={styles.ol}>
                  <li>Click on the empty space below the column title to add a card.</li>
                  <li>You can drag and drop cards.</li>
                  <li>To remove a card move it to the bin.</li>
                  <li>To add a column click add column :) </li>
                  <li>You can change the default color of new tabs - just pick one from the picker.</li>
                  <li>To change the color of an existing card, click the button in the upper left corner of the card.</li>
                </ol>
            </div>
        </div>
    );
};

export default RightPanel;

// @flow

import React from 'react';
import { Input } from 'reactstrap';
import { createUseStyles } from 'react-jss';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = createUseStyles({
    cardEnumOption: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '.5em',
        '& input': { width: '80%', marginRight: '1em', marginBottom: 0 },
        '& .delete-button': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
    },
});

// Input field corresponding to an array of values, add and remove
export default function CardEnumOptions({
    initialValues,
    onChange,
}: {
    initialValues: Array<any>,
    onChange: (newEnums: Array<any>) => void,
}) {
    const classes = useStyles();

    const possibleValues = [];
    for (let index = 0; index < initialValues.length; index += 1) {
        const value = initialValues[index];
        possibleValues.push(
            <div key={index} className={classes.cardEnumOption}>
                <Input
                    value={value === undefined || value === null ? '' : value}
                    placeholder='Value'
                    key={`val-${index}`}
                    type={'text'}
                    onChange={(ev: any) => {
                        let newVal = ev.target.value;
                        onChange(
                            [
                                ...initialValues.slice(0, index),
                                newVal,
                                ...initialValues.slice(index + 1),
                            ],
                        );
                    }}
                    className='card-text'
                />
                <div className='delete-button'>
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => {
                            // remove this value
                            onChange(
                                [
                                    ...initialValues.slice(0, index),
                                    ...initialValues.slice(index + 1),
                                ],
                            );
                        }}
                    />
                </div>
            </div>,
        );
    }

    return (
        <React.Fragment>
            <h5>Examples</h5>
            {possibleValues}
            <div style={{"display": "flex", padding: 4}}>
            <FontAwesomeIcon
                icon={faPlus}
                onClick={() => {
                    // add a new dropdown option
                    onChange(
                        [...initialValues, ''],
                    );
                }}
            />
            </div>
        </React.Fragment>
    );
}
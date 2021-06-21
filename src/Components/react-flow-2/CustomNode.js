import React from 'react';
import { Handle } from 'react-flow-renderer';

const customNodeStyles = {
    background: '#FFF',
    borderColor: '#32CD32',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    fontSize: '12px',
    width: '150px',
    textAlign: 'center',
    padding: 10
};

const CustomNode = (data) => {
    console.log(data)
    return (
        Object.keys(data) > 0 && <div style={customNodeStyles}>
            <div>{data.label}</div>
            {data.handles.map((handle, i) => (
                <Handle
                key={data.label + i}
                    type={handle.type}
                    position={handle.position}
                    style={handle.style}
                />
            ))}
        </div>
    );
};

export default CustomNode
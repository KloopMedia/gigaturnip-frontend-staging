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

const CustomLogicNode = ({ data }) => {
    return (
      <div style={customNodeStyles}>
        <div>{data.label}</div>
        <Handle
          type="target"
          position="top"
          style={{ borderRadius: '100%' }}
        />
        <Handle
          type="source"
          position="bottom"
          style={{ borderRadius: '100%' }}
        />
      </div>
    );
  };

  export default CustomLogicNode
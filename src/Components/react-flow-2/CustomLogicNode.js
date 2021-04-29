import React from 'react';
import { Handle } from 'react-flow-renderer';

const customNodeStyles = {
  background: '#FFF',
  borderColor: '#0041d0',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '3px',
  fontSize: '12px',
  width: '150px',
  textAlign: 'center',
  padding: 10
};

const CustomLogicNode = ({ data }) => {

  const isValidConnection = (connection) => connection.target === 'testA';

  return (
    <div style={customNodeStyles}>
      <div>{data.label}</div>
      <Handle
        type="target"
        position="top"
        isValidConnection={isValidConnection}
        style={{ borderRadius: '100%' }}
      />
      <Handle
        type="source"
        position="bottom"
        isValidConnection={isValidConnection}
        style={{ borderRadius: '100%' }}
      />
    </div>
  );
};

export default CustomLogicNode
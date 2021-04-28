import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const customNodeStyles = {
  background: '#FFF',
  borderColor: '#1a192b',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '3px',
  fontSize: '12px',
  width: '150px',
  textAlign: 'center',
  padding: 10
};

const CustomNodeComponent = ({ data }) => {
    return (
      <div style={customNodeStyles}>
        <div>Conditional Node</div>
        <Handle
          type="source"
          position="top"
          style={{ borderRadius: '100%' }}
        />
        <Handle
          type="target"
          position="bottom"
          style={{ borderRadius: '100%' }}
        />
      </div>
    );
  };

  export default CustomNodeComponent
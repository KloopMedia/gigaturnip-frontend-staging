import React from 'react';
import CustomNode from "./CustomNode";

const customNodeStyles = {
  borderColor: '#0041d0'
};

type NodeProps = { data: {label: string} }

const CustomLogicNode = ({ data }: NodeProps) => <CustomNode data={data} style={customNodeStyles} />;

export default CustomLogicNode
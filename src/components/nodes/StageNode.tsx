import React from 'react';
import CustomNode from "./CustomNode";

const customNodeStyles = {
  borderColor: '#32CD32'
};

type NodeProps = { data: {label: string} }

const CustomStageNode = ({ data }: NodeProps) => <CustomNode data={data} style={customNodeStyles} />;

export default CustomStageNode
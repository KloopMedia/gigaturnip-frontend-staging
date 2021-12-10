import React from 'react';
import BaseNode from "./BaseNode";
import {NodeType} from "./Node.types";

const customNodeStyles = {
  borderColor: '#32CD32'
};

const CustomStageNode = ({ data }: NodeType) => <BaseNode data={data} style={customNodeStyles} />;

export default CustomStageNode
import React from 'react';
import BaseNode from "./BaseNode";
import {NodeType} from "./Node.types";

const customNodeStyles = {
  borderColor: '#0041d0'
};

const CustomLogicNode = ({ data }: NodeType) => <BaseNode data={data} style={customNodeStyles} />;

export default CustomLogicNode
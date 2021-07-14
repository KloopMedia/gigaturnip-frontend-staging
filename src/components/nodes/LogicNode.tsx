import React from 'react';
import CustomNode from "./CustomNode";
import {NodeParams} from "../../util/Types";

const customNodeStyles = {
  borderColor: '#0041d0'
};

const CustomLogicNode = ({ data }: NodeParams) => <CustomNode data={data} style={customNodeStyles} />;

export default CustomLogicNode
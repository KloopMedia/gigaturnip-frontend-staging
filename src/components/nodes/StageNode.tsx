import React from 'react';
import CustomNode from "./CustomNode";
import {NodeParams} from "../../util/Types";

const customNodeStyles = {
  borderColor: '#32CD32'
};

const CustomStageNode = ({ data }: NodeParams) => <CustomNode data={data} style={customNodeStyles} />;

export default CustomStageNode
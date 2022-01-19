import React from 'react';
import Box, {BoxProps} from "@mui/material/Box";
import {styled} from "@mui/material/styles";

const BuilderLayout = styled(Box)<BoxProps>(() => ({
    width: '70%',
    minWidth: '400px',
    margin: '0 auto'
}));

export default BuilderLayout
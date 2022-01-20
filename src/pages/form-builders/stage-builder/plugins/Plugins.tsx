import React from 'react';
import ExpandableCard from "../../../../components/card/ExpandableCard";


type Props = {};

const Plugins = (props: Props) => {
    const {} = props;

    return (
        <ExpandableCard data={{name: "test"}} showExpandButton={true}>
            <p>test</p>
        </ExpandableCard>
    );
};

export default Plugins
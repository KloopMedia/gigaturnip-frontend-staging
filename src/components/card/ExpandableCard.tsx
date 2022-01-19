import React, {useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import {Stack} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {styled} from "@mui/material/styles";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";

type Props = {
    title: string,
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ExpandableCard: React.FC<Props> = (props) => {
    const {title, children} = props;
    const [expand, setExpand] = useState(false);

    const handleToggle = () => {
        setExpand(!expand)
    }

    return (
        <Card sx={{m: 1}}>
            <CardHeader
                action={
                    <Stack direction="row" spacing={1}>
                        <ExpandMore
                            expand={expand}
                            onClick={handleToggle}
                            aria-expanded={expand}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </Stack>
                }
                title={title}
                titleTypographyProps={{variant: "h6"}}
            />
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <CardContent>
                    {children}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ExpandableCard
import React from 'react';
import {Box, Button, Grid, Switch, TextField} from "@mui/material";

type Props = {
    isEditable: boolean,
    schema: string,
    ui: string,
    onSchemaChange: (schema: string) => void,
    onUiChange: (ui: string) => void,
    onIsEditableChange: () => void,
    onSave: () => void,
    onUndo: () => void,
};

const SchemaEditor = (props: Props) => {
    const {isEditable, schema, ui, onSchemaChange, onUiChange, onIsEditableChange, onSave, onUndo} = props;

    const handleIsEditableChange = () => {
        onIsEditableChange();
    }

    const handleSchemaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSchemaChange(event.target.value);
    }

    const handleUiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUiChange(event.target.value);
    }

    const handleSave = () => {
        onSave();
    }

    const handleUndo = () => {
        onUndo();
    }

    return (
        <Box>
            <Box>
                <Switch
                    checked={isEditable}
                    onChange={handleIsEditableChange}
                    name="edit"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                {isEditable &&
                    <Button sx={{mx: 1}} color={"primary"} variant={"contained"} onClick={handleSave}>Сохранить изменения</Button>
                }
                {isEditable &&
                    <Button sx={{mx: 1}} color={"primary"} variant={"contained"} onClick={handleUndo}>Отменить изменения</Button>
                }
            </Box>
            <Grid container>
                <Grid item xs={12} md={6} p={1}>
                    <TextField
                        label="Schema"
                        multiline
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: !isEditable,
                        }}
                        value={schema}
                        onChange={handleSchemaChange}
                        style={{marginTop: 15, marginBottom: 15}}
                    />
                </Grid>
                <Grid item xs={12} md={6} p={1}>
                    <TextField
                        label="Ui"
                        multiline
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: !isEditable,
                        }}
                        value={ui}
                        onChange={handleUiChange}
                        style={{marginTop: 15, marginBottom: 30}}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SchemaEditor
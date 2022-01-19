import React from 'react';
import Form from "../../../components/form/Form";
import schema from './CreateChainSchema.json';
import ui from './CreateChainSchemaUi.json';
import BuilderLayout from "../../../components/layout/common-layouts/BuilderLayout";
import useAxios from "../../../services/api/useAxios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useHelpers from "../../../utils/hooks/UseHelpers";


const CreateChain = () => {
    const {createChain} = useAxios();
    const navigate = useNavigate();
    const location: any = useLocation();
    const {campaignId} = useParams();
    const {parseId} = useHelpers();


    const parsedId = parseId(campaignId);
    const from = location?.state?.from?.pathname || "/";

    const handleSubmit = (formData: any) => {
        console.log(formData)
        if (campaignId) {
            createChain({campaign: parsedId, ...formData})
                .then(() => {
                    navigate(from)
                })
        } else {
            alert("Error: No campaign id")
        }
    }

    return (
        <BuilderLayout py={2}>
            <Form schema={schema} uiSchema={ui} onSubmit={handleSubmit}/>
        </BuilderLayout>
    );
};

export default CreateChain
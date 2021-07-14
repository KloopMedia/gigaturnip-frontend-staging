import {retrieveSchema, toPathSchema} from "@rjsf/core/lib/utils";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

const getFormFields = (schema, formData = {}, uiSchema) => {
    const retrievedSchema = retrieveSchema(
        schema
    );

    const pathSchema = toPathSchema(
        retrievedSchema,
        "",
        schema,
        formData
    );
    // let resolvedSchema = resolveSchema(schema);
    // console.log("resolvedSchema: ", resolvedSchema)
    // const idSchema = toIdSchema(
    //   retrievedSchema,
    //   uiSchema["ui:rootFieldId"],
    //   schema,
    //   formData,
    //   'root_newInput1_newInput1_test2'
    // );
    //
    // console.log(idSchema)

    const getFieldNames = (pathSchema, formData) => {
        const getAllPaths = (_obj, acc = [], paths = [""]) => {
            Object.keys(_obj).forEach(key => {
                if (typeof _obj[key] === "object") {
                    let newPaths = paths.map(path => `${path}.${key}`);
                    // If an object is marked with additionalProperties, all its keys are valid
                    if (_obj[key].__rjsf_additionalProperties && _obj[key].$name !== "") {
                        acc.push(_obj[key].$name);
                    } else {
                        getAllPaths(_obj[key], acc, newPaths);
                    }
                } else if (key === "$name" && _obj[key] !== "") {
                    paths.forEach(path => {
                        path = path.replace(/^\./, "");
                        const formValue = _get(formData, path);
                        // adds path to fieldNames if it points to a value
                        // or an empty object/array
                        if (typeof formValue !== "object" || _isEmpty(formValue)) {
                            acc.push(path);
                        }
                    });
                }
            });
            return acc;
        };
        return getAllPaths(pathSchema);
    };

    return getFieldNames(pathSchema, formData);
}

export default getFormFields
import {useState, useContext} from "react"
import { CVContext } from "./cv"

export const CVForm = () => {

    return (
        <div className="cv-form">
            <FormItem title="Etunimi" name="first_name" type="Text"/>
            <FormItem title="Sukunimi" name="last_name" type="Text"/>
            <FormItem title="Puhelin" name="phone" type="Text"/>
            <FormItem title="Sähköposti" name="email" type="Text"/>
            <FormItem title="Titteli" name="title" type="Text"/>
            <FormItem title="Kerro itsestäsi" name="description" type="Textarea"/>
            <RepeatorField title="Työkokemus" name="experience" 
                fields={[
                    { title: 'Yritys', name: 'job_experience_company', type: "Text" },
                    { title: 'Titteli', name: 'job_experience_title', type: "Text" },
                    { title: 'Milloin työskentelit yrityksessä?', name: 'job_experience_era', type: "Text" },
                    { title: 'Kuvaus työstäsi', name: 'job_experience_description', type: "Textarea" }
                ]}
            />
            <RepeatorField title="Koulutus" name="education"
                fields={[
                    { title: 'Koulutuksen nimi / Koulu', name: 'education_title', type: "Text" },
                    { title: 'Ajankohta', name: 'education_era', type: "Text" },
                ]}
            />
            <RepeatorField title="Kielitaito" name="languages"
                fields={[
                    { title: 'Kieli', name: 'language', type: "Text" },
                    { title: 'Taitotaso', name: 'language_skills', type: "Select", 
                        options: ["Äidinkieli", "Hyvä", "Tyydyttävä", "Perusteet"]
                    },
                ]}
            />
            <FormItem title="Harrastukset" name="hobbies" type="Textarea"/>
            <RepeatorField title="Suosittelijat" name="recommenders"
                fields={[
                    { title: 'Suosittelijan nimi', name: 'recommender_name', type: "Text" },
                    { title: 'Suosittelijan yhteystiedot', name: 'recommender_contact_info', type: "Text" }
                ]}
            />
        </div>
    )
}

const FormItem = ({ type, name, title, options }) => {

    const { formData, setFormData } = useContext(CVContext);

    const updateFormData = (event) => {
        var newFormData = { ...formData, [event.target.name] : [event.target.value] }
        setFormData(newFormData)
    }

    var inputField = <input type={type} name={name} onChange={updateFormData}></input>;
    if( type === 'Textarea') {
        inputField = <textarea rows="5" name={name} onChange={updateFormData}></textarea>;
    } else if( type === 'Select' ) {
        if(options) {
            options = options.map((option, index) => <option key={index}>{option}</option>);
            inputField = <select name={name} onChange={updateFormData}><option>Valitse vaihtoehto</option>{options}</select>;
        }
    }
    return (
        <div className="form-item">
            <label htmlFor={name}>{title}:</label>
            {inputField}
        </div>
    )
}

const RepeatorField = ({title, name, fields}) => {

    const [fieldList, setFieldList] = useState([]);
    const { formData, setFormData } = useContext(CVContext);

    const addNewRow = () => {
        var new_field = {
            key: fieldList.length + 1,
            fields: fields
        }
        setFieldList([...fieldList, new_field]);
    };

    const removeField = (key) => {
        var new_fieldList = fieldList.filter((field) => {
            return field.key !== key
        } )
        setFieldList(new_fieldList);
    };

    const updateFormData = (event, key) => {
        var newFormData = { ...formData }
        newFormData[name] = newFormData[name] || [];
        newFormData[name][key] = newFormData[name][key] || {};
        newFormData[name][key][event.target.name] = event.target.value;
        setFormData(newFormData)
    }

    return (
        <div className="repeator-field">
            <label htmlFor={name}>{title}:</label>
            {
                fieldList.map((row, key) => {
                    var fields = row.fields.map((field, index) => {
                        var inputField = <input type={field.type} name={field.name} onChange={(event) => updateFormData(event, key)}></input>
                        if( field.type === 'Textarea') {
                            inputField = <textarea rows="5" name={field.name} onChange={(event) => updateFormData(event, key)}></textarea>;
                        } else if( field.type === 'Select' ) {
                            if(field.options) {
                                inputField = <select name={field.name} onChange={(event) => updateFormData(event, key)}>
                                    <option>Valitse vaihtoehto</option>
                                    {field.options.map((option, index) => <option key={index}>{option}</option>)}
                                </select>
                            }
                        }
                        return (
                            <div className="form-item" key={index}>
                                <label htmlFor={field.name}>{field.title}:</label>
                                {inputField}
                            </div>
                        )
                    })
                    return (
                        <div className="repeator-fields-container" key={row.key}>
                            <button className="remove-field" onClick={() => removeField(row.key)}>X</button>
                            {fields}
                        </div>
                    )
                })
            }
            <button className="add-new-row" onClick={addNewRow}>Lisää</button>
        </div>
    )
}
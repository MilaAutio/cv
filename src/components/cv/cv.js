import {useState, createContext} from "react"

import {CVForm} from './cv-form'
import {CVPreview} from './cv-preview'

export const CVContext = createContext()

export const CV = () => {

    const [formData, setFormData] = useState({});

    return (
        <div className='cv-container'>
            <CVContext.Provider value={{formData, setFormData}}>
                <CVForm />
                <CVPreview />
            </CVContext.Provider>
        </div>
    )
}
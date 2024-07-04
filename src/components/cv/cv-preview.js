import { useContext } from "react"
import { CVContext } from "./cv"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export const CVPreview = () => {

    const { formData } = useContext(CVContext);

    return (
        <div>
            <div className="cv-preview">
                <CvPdf formData={formData}/>
            </div>
            <div className="download-button">
                <PDFDownloadLink document={<CvPdf formData={formData} />} fileName="cv.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Tiedostoa ladataan...' : 'Lataa CV'
                    }
                </PDFDownloadLink>
            </div>
        </div>
    )
}

const CvPdf = ({formData}) => {

    const styles = StyleSheet.create({
        document: {
            title: 'cv',
            pageMode: 'fullScreen',
        },
        page: {
          flexDirection: 'column',
          backgroundColor: '#fff',
          fontSize: '12pt',
          color: '#000',
          fontFamily: 'Helvetica',
          fontWeight: 400
        },
        header: {
            backgroundColor: '#000',
            color: '#fff',
            padding: '20pt',
            fontSize: '12pt',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: '25pt'
        },
        container: {
          paddingLeft: '25pt',
          paddingRight: '25pt',
          display: 'block',
          marginBottom: '30pt'
        },
        flexContainer: {
            display: "flex",
            gap: '50pt',
            flexDirection: 'row',
        },
        title: {
            fontFamily: 'Helvetica-Bold',
            fontSize: '12pt',
            display: 'block',
            marginTop: 0,
            marginBottom: '15pt',
            textTransform: 'uppercase'
        },
        childContainer: {
            display: 'block',
            marginBottom: '15pt'
        },
        block: {
            display: 'block',
        }
    });

    return (
        <Document style={styles.document}>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.rightFloat}>
                        <Text style={{fontFamily: 'Helvetica-Bold', marginBottom: '5pt', display: 'block'}}> {formData.first_name ?? ''} {formData.last_name ?? ''} </Text>
                        <Text style={{display: 'block'}}> {formData.title ?? ''} </Text>
                    </View>
                    <View style={{display: "flex", flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Text style={{display: 'block', marginBottom: '5pt'}}> {formData.phone ?? ''} </Text>
                        <Text style={{display: 'block'}}> {formData.email ?? ''} </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text>{formData.description ?? ''}</Text>
                </View>
                { formData.experience && (
                    <View style={styles.container}>
                        <Text style={styles.title}>Työkokemus:</Text>
                        {
                            formData.experience.map((experience, key) => (
                                <View key={key} style={styles.childContainer}>
                                    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: '11pt', marginBottom: 0, display: 'block'}}>{experience.job_experience_company}, {experience.job_experience_title}</Text>
                                    <Text style={{marginBottom: '7pt', fontSize: '10pt', display: 'block', marginTop: '3pt'}}>
                                        {experience.job_experience_era}
                                    </Text>
                                    <Text style={{display: 'block'}}>{experience.job_experience_description}</Text>
                                </View>
                            ))
                        }
                    </View>
                )}
                { formData.education && ( 
                    <View style={styles.container}>
                        <Text style={styles.title}>Koulutus:</Text>
                        {
                            formData.education.map((education, key) => (
                                <View key={key} style={styles.childContainer}>
                                    <Text>{education.education_title} {education.education_era}</Text>
                                </View>
                            ))
                        }
                    </View> 
                )}
                { formData.languages && (
                    <View style={styles.container}>
                        <Text style={styles.title}>Kielitaito:</Text>
                        <View style={styles.flexContainer}>
                            {
                                formData.languages.map((language, key) => (
                                    <View key={key} style={styles.childContainer}>
                                        <Text style={{display: "block"}}>{language.language}</Text>
                                        <Text>{language.language_skills}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                )}
                { formData.hobbies && (
                    <View style={styles.container}>
                        <Text style={styles.title}>Harrastukset:</Text>
                        <Text>{formData.hobbies}</Text>
                    </View>
                )}
                { formData.recommenders && (
                    <View style={styles.container}>
                        <Text style={styles.title}>Suosittelijat:</Text>
                        {
                            formData.recommenders.map((recommender, key) => (
                                <View key={key} style={styles.childContainer}>
                                    <Text style={{display: "block"}}>{recommender.recommender_name}</Text>
                                    <Text>{recommender.recommender_contact_info}</Text>
                                </View>
                            ))
                        }
                    </View>
                )}
            </Page>
        </Document>
    )
}
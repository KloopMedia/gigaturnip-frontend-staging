import firebase from './Firebase'
import form from '../forms/complaintCreation.json'
import ui from '../forms/complaintCreationUI.json'

const Loader = () => {
    console.log("LOADED")
    firebase.firestore().collection('presets').doc('complaintCreation').set({
        end: JSON.stringify(form),
        end_ui: JSON.stringify(ui)
    })

}

export default Loader
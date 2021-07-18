import axios from "axios";
import {baseUrl} from "../config/server"

export const step1Submission = (data, id) => {
    return new Promise ((resolve, reject) => {

        let path = baseUrl + 'api/step1/' + id;
        axios.post(path, data).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
    
}

export const step2Submission = (data, id) => {
    const formData = new FormData();
    if(data.resume?.length) {
        for (let i = 0 ; i < data.resume.length ; i++) {
            formData.append("resume", data.resume[i]);
        }
    }
    
    formData.append('totalExperience', data.totalExperience);
    formData.append('organiztionName', data.organiztionName);

    return new Promise ((resolve, reject) => {

        let path = baseUrl + 'api/step2/' + id;
        axios.post(path, formData).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
    
}

export const step3Submission = (data, id, step) => {
    console.log("doc===>", data);
    const formData = new FormData();
    let name;
    switch (step) {
        case 'step3':
            name = 'ssn'
            break;
            case 'step4':
            name = 'id'
            break;
            case 'step5':
            name = 'selfie'
            break;
    
        default:
            break;
    }
    if(data.length) {
        for (let i = 0 ; i < data.length ; i++) {
            formData.append(name, data[i]);
        }
    }

    return new Promise ((resolve, reject) => {

        let path = baseUrl + `api/${step}/` + id;
        axios.post(path, formData).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
    
}
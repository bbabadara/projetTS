import { Patient } from './Patient';
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 let patients: Patient[] = [];

function addPatient() {
    rl.question("Entrez le nom du patient : ", (nom) => {
        rl.question("Entrez le prénom du patient : ", (prenom) => {
            rl.question("Entrez l'adresse du patient : ", (adresse) => {
                rl.question("Entrez le téléphone du patient : ", (telephone) => {
                const patient: Patient = {
                    id: patients.length + 1,
                    nom,
                    prenom,
                    adresse,
                    telephone
                };
                patients.push(patient);
                console.log("Patient ajouté avec succès.");
                listPatients();
                rl.close();
             });
            });
        });
    });
}

function listPatients() {
    console.log("Liste des Patients:");
    patients.forEach((patient) => {
        console.log(`${patient.id} - ${patient.nom} - ${patient.prenom} - ${patient.adresse} - ${patient.telephone})`);
    });
}
addPatient()

export {
    patients,
    addPatient,
    listPatients,
}
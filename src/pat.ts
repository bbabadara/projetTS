import { Patient } from './Patient';
import * as readline from "readline";

export let patients: Patient[] = [];

export function addPatient(rl: readline.Interface): Promise<void> {
    return new Promise((resolve) => {
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
                        resolve();
                    });
                });
            });
        });
    });
}

export function listPatients(): void {
    console.log("\nListe des Patients:");
    if (patients.length === 0) {
        console.log("Aucun patient enregistré.");
        return;
    }
    patients.forEach((patient) => {
        console.log(`ID: ${patient.id} - ${patient.nom} ${patient.prenom} - Adresse: ${patient.adresse} - Tél: ${patient.telephone}`);
    });
}
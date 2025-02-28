"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPatients = exports.addPatient = exports.patients = void 0;
exports.patients = [];
function addPatient(rl) {
    return new Promise((resolve) => {
        rl.question("Entrez le nom du patient : ", (nom) => {
            rl.question("Entrez le prénom du patient : ", (prenom) => {
                rl.question("Entrez l'adresse du patient : ", (adresse) => {
                    rl.question("Entrez le téléphone du patient : ", (telephone) => {
                        const patient = {
                            id: exports.patients.length + 1,
                            nom,
                            prenom,
                            adresse,
                            telephone
                        };
                        exports.patients.push(patient);
                        console.log("Patient ajouté avec succès.");
                        listPatients();
                        resolve();
                    });
                });
            });
        });
    });
}
exports.addPatient = addPatient;
function listPatients() {
    console.log("\nListe des Patients:");
    if (exports.patients.length === 0) {
        console.log("Aucun patient enregistré.");
        return;
    }
    exports.patients.forEach((patient) => {
        console.log(`ID: ${patient.id} - ${patient.nom} ${patient.prenom} - Adresse: ${patient.adresse} - Tél: ${patient.telephone}`);
    });
}
exports.listPatients = listPatients;

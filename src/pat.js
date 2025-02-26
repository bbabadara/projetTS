"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patients = void 0;
exports.addPatient = addPatient;
exports.listPatients = listPatients;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var patients = [];
exports.patients = patients;
function addPatient() {
    rl.question("Entrez le nom du patient : ", function (nom) {
        rl.question("Entrez le prénom du patient : ", function (prenom) {
            rl.question("Entrez l'adresse du patient : ", function (adresse) {
                rl.question("Entrez le téléphone du patient : ", function (telephone) {
                    var patient = {
                        id: patients.length + 1,
                        nom: nom,
                        prenom: prenom,
                        adresse: adresse,
                        telephone: telephone
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
    patients.forEach(function (patient) {
        console.log("".concat(patient.id, " - ").concat(patient.nom, " - ").concat(patient.prenom, " - ").concat(patient.adresse, " - ").concat(patient.telephone, ")"));
    });
}
addPatient();

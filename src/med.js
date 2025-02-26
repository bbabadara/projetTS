"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var medecins = [];
function addMedecin() {
    rl.question("Entrez le nom du médecin : ", function (nom) {
        rl.question("Entrez le prénom du médecin : ", function (prenom) {
            rl.question("Entrez la spécialité du médecin : ", function (specialite) {
                var medecin = {
                    id: medecins.length + 1,
                    nom: nom,
                    prenom: prenom,
                    specialite: specialite
                };
                medecins.push(medecin);
                console.log("Médecin ajouté avec succès.");
                listMedecins();
            });
        });
    });
}
function listMedecins() {
    console.log("Liste des médecins:");
    medecins.forEach(function (medecin) {
        console.log("".concat(medecin.id, " - ").concat(medecin.nom, " ").concat(medecin.prenom, " (").concat(medecin.specialite, ")"));
    });
}
addMedecin();

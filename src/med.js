"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMedecins = exports.addMedecin = exports.medecins = void 0;
exports.medecins = [];
function addMedecin(rl) {
    return new Promise((resolve) => {
        rl.question("Entrez le nom du médecin : ", (nom) => {
            rl.question("Entrez le prénom du médecin : ", (prenom) => {
                rl.question("Entrez la spécialité du médecin : ", (specialite) => {
                    const medecin = {
                        id: exports.medecins.length + 1,
                        nom,
                        prenom,
                        specialite
                    };
                    exports.medecins.push(medecin);
                    console.log("Médecin ajouté avec succès.");
                    listMedecins();
                    resolve();
                });
            });
        });
    });
}
exports.addMedecin = addMedecin;
function listMedecins() {
    console.log("\nListe des médecins:");
    if (exports.medecins.length === 0) {
        console.log("Aucun médecin enregistré.");
        return;
    }
    exports.medecins.forEach((medecin) => {
        console.log(`ID: ${medecin.id} - Dr. ${medecin.prenom} ${medecin.nom} (${medecin.specialite})`);
    });
}
exports.listMedecins = listMedecins;

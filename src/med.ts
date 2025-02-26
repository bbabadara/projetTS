import { Medecin } from './Medecin';
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let medecins: Medecin[] = [];

function addMedecin() {
    rl.question("Entrez le nom du médecin : ", (nom) => {
        rl.question("Entrez le prénom du médecin : ", (prenom) => {
            rl.question("Entrez la spécialité du médecin : ", (specialite) => {
                const medecin: Medecin = {
                    id: medecins.length + 1,
                    nom,
                    prenom,
                    specialite
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
    medecins.forEach((medecin) => {
        console.log(`${medecin.id} - ${medecin.nom} ${medecin.prenom} (${medecin.specialite})`);
    });
}
addMedecin()
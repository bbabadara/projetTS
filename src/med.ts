import { Medecin } from './Medecin';
import * as readline from "readline";

export let medecins: Medecin[] = [];

export function addMedecin(rl: readline.Interface): Promise<void> {
    return new Promise((resolve) => {
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
                    resolve();
                });
            });
        });
    });
}

export function listMedecins(): void {
    console.log("\nListe des médecins:");
    if (medecins.length === 0) {
        console.log("Aucun médecin enregistré.");
        return;
    }
    medecins.forEach((medecin) => {
        console.log(`ID: ${medecin.id} - Dr. ${medecin.prenom} ${medecin.nom} (${medecin.specialite})`);
    });
}
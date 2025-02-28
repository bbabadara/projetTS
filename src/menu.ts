import * as readline from "readline";
import { Patient } from "./Patient";
import { Medecin } from "./Medecin";
import { RendezVous } from "./RendezVous";
import { addPatient, listPatients, patients } from "./pat";
import { addMedecin, listMedecins, medecins } from "./med";
import { 
  addRendezVous, 
  listRendezVous,
  displayRendezVousByMedecin,
  checkPatientAppointment
} from "./rv";

// Création d'une seule interface readline partagée
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialisation du tableau des rendez-vous
let rendezVous: RendezVous[] = [];

// Fonction pour afficher le menu principal
function afficherMenu(): void {
  console.log("\n===== SYSTÈME DE GESTION MÉDICALE =====");
  console.log("1. Ajouter un médecin");
  console.log("2. Lister les médecins");
  console.log("3. Ajouter un patient");
  console.log("4. Lister les patients");
  console.log("5. Ajouter un rendez-vous");
  console.log("6. Lister tous les rendez-vous");
  console.log("7. Afficher les rendez-vous d'un médecin");
  console.log("8. Vérifier rendez-vous d'un patient");
  console.log("0. Quitter l'application");
  console.log("======================================");

  rl.question("Choisissez une option (0-8) : ", async (choix) => {
    switch (choix) {
      case "1":
        await addMedecin(rl);
        afficherMenu();
        break;
      case "2":
        listMedecins();
        afficherMenu();
        break;
      case "3":
        await addPatient(rl);
        afficherMenu();
        break;
      case "4":
        listPatients();
        afficherMenu();
        break;
      case "5":
        await addRendezVous(rl, rendezVous, patients, medecins);
        afficherMenu();
        break;
      case "6":
        listRendezVous(rendezVous, patients, medecins);
        afficherMenu();
        break;
      case "7":
        rl.question("Entrez l'ID du médecin : ", async (medecinIdStr) => {
          const medecinId = parseInt(medecinIdStr);
          await displayRendezVousByMedecin(medecinId, rendezVous, patients, medecins);
          afficherMenu();
        });
        break;
      case "8":
        await checkPatientAppointment(rl, rendezVous, patients);
        afficherMenu();
        break;
      case "0":
        console.log("Au revoir !");
        rl.close();
        process.exit(0);
        break;
      default:
        console.log("Option invalide. Veuillez réessayer.");
        afficherMenu();
    }
  });
}

// Lancer l'application
console.log("Bienvenue dans le système de gestion médicale");
afficherMenu();
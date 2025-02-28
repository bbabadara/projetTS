import * as readline from "readline";
import { patients, initPatients } from "./src/pat";
import { medecins, initMedecins } from "./src/med";
import { showMenu } from "./src/menu";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Initialiser quelques données d'exemple
initPatients();
initMedecins();
// Démarrer l'application
console.log("Bienvenue dans le système de gestion de rendez-vous");
showMenu(rl, [], patients, medecins);

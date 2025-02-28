"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const pat_1 = require("./pat");
const med_1 = require("./med");
const rv_1 = require("./rv");
// Création d'une seule interface readline partagée
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Initialisation du tableau des rendez-vous
let rendezVous = [];
// Fonction pour afficher le menu principal
function afficherMenu() {
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
    rl.question("Choisissez une option (0-8) : ", (choix) => __awaiter(this, void 0, void 0, function* () {
        switch (choix) {
            case "1":
                yield (0, med_1.addMedecin)(rl);
                afficherMenu();
                break;
            case "2":
                (0, med_1.listMedecins)();
                afficherMenu();
                break;
            case "3":
                yield (0, pat_1.addPatient)(rl);
                afficherMenu();
                break;
            case "4":
                (0, pat_1.listPatients)();
                afficherMenu();
                break;
            case "5":
                yield (0, rv_1.addRendezVous)(rl, rendezVous, pat_1.patients, med_1.medecins);
                afficherMenu();
                break;
            case "6":
                (0, rv_1.listRendezVous)(rendezVous, pat_1.patients, med_1.medecins);
                afficherMenu();
                break;
            case "7":
                rl.question("Entrez l'ID du médecin : ", (medecinIdStr) => __awaiter(this, void 0, void 0, function* () {
                    const medecinId = parseInt(medecinIdStr);
                    yield (0, rv_1.displayRendezVousByMedecin)(medecinId, rendezVous, pat_1.patients, med_1.medecins);
                    afficherMenu();
                }));
                break;
            case "8":
                yield (0, rv_1.checkPatientAppointment)(rl, rendezVous, pat_1.patients);
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
    }));
}
// Lancer l'application
console.log("Bienvenue dans le système de gestion médicale");
afficherMenu();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRendezVous = exports.checkPatientAppointment = exports.addRendezVous = exports.displayRendezVousByMedecin = exports.getRendezVousByMedecin = exports.patientHasAppointmentOnDate = exports.findMedecinById = exports.findPatientById = void 0;
// Fonctions d'utilitaire
function findPatientById(id, patientsArray) {
    const patient = patientsArray.find(p => p.id === id);
    if (!patient) {
        console.log(`Patient avec l'ID ${id} non trouvé.`);
        return null;
    }
    return patient;
}
exports.findPatientById = findPatientById;
function findMedecinById(id, medecinsArray) {
    const medecin = medecinsArray.find(m => m.id === id);
    if (!medecin) {
        console.log(`Médecin avec l'ID ${id} non trouvé.`);
        return null;
    }
    return medecin;
}
exports.findMedecinById = findMedecinById;
// Fonction pour vérifier si un patient a déjà un rendez-vous à la même date
function patientHasAppointmentOnDate(patientId, date, rendezVousList) {
    // On filtre les rendez-vous du patient
    const patientAppointments = rendezVousList.filter(rdv => rdv.patientId === patientId);
    // On vérifie si l'un de ces rendez-vous est à la même date (même jour)
    return patientAppointments.some(rdv => {
        // On compare seulement l'année, le mois et le jour
        return (rdv.date.getFullYear() === date.getFullYear() &&
            rdv.date.getMonth() === date.getMonth() &&
            rdv.date.getDate() === date.getDate());
    });
}
exports.patientHasAppointmentOnDate = patientHasAppointmentOnDate;
// Fonction qui filtre les rendez-vous d'un médecin et les regroupe par date
function getRendezVousByMedecin(medecinId, rendezVousList, patientsArray) {
    // Filtre les rendez-vous du médecin spécifié
    const medecinAppointments = rendezVousList.filter(rdv => rdv.medecinId === medecinId);
    // Initialise l'objet pour regrouper par date
    const appointmentsByDate = {};
    // Parcourt tous les rendez-vous du médecin
    medecinAppointments.forEach(rdv => {
        // Formatage de la date (YYYY-MM-DD)
        const dateKey = rdv.date.toISOString().split('T')[0];
        // Formatage de l'heure (HH:MM)
        const timeStr = rdv.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        // Trouve le patient correspondant
        const patient = findPatientById(rdv.patientId, patientsArray);
        if (patient) {
            // Si la date n'existe pas encore dans l'objet, l'initialiser
            if (!appointmentsByDate[dateKey]) {
                appointmentsByDate[dateKey] = [];
            }
            // Ajouter le rendez-vous au tableau de cette date
            appointmentsByDate[dateKey].push({
                time: timeStr,
                patient: patient
            });
        }
    });
    return appointmentsByDate;
}
exports.getRendezVousByMedecin = getRendezVousByMedecin;
// Fonction pour afficher les rendez-vous d'un médecin regroupés par date
function displayRendezVousByMedecin(medecinId, rendezVousList, patientsArray, medecinsArray) {
    return new Promise((resolve) => {
        const medecin = findMedecinById(medecinId, medecinsArray);
        if (!medecin) {
            console.log(`Médecin avec l'ID ${medecinId} non trouvé.`);
            resolve();
            return;
        }
        console.log(`\nRendez-vous du Dr. ${medecin.prenom} ${medecin.nom} (${medecin.specialite}):`);
        const rdvByDate = getRendezVousByMedecin(medecinId, rendezVousList, patientsArray);
        // Trier les dates
        const sortedDates = Object.keys(rdvByDate).sort();
        if (sortedDates.length === 0) {
            console.log("Aucun rendez-vous trouvé pour ce médecin.");
            resolve();
            return;
        }
        // Afficher les rendez-vous pour chaque date
        sortedDates.forEach(dateStr => {
            // Formatage de la date pour l'affichage
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            console.log(`\n${formattedDate}:`);
            // Trier les rendez-vous par heure
            const sortedAppointments = rdvByDate[dateStr].sort((a, b) => a.time.localeCompare(b.time));
            // Afficher chaque rendez-vous
            sortedAppointments.forEach(rdv => {
                console.log(`  ${rdv.time} - ${rdv.patient.prenom} ${rdv.patient.nom}`);
            });
        });
        resolve();
    });
}
exports.displayRendezVousByMedecin = displayRendezVousByMedecin;
// Fonction pour ajouter un rendez-vous, modifiée pour utiliser des promesses
function addRendezVous(rl, rendezVousList, patientsArray, medecinsArray) {
    return new Promise((resolve) => {
        rl.question("Entrez l'ID du patient : ", (patientIdStr) => {
            const patientId = parseInt(patientIdStr);
            const patient = findPatientById(patientId, patientsArray);
            if (!patient) {
                console.log(`Le patient avec l'ID ${patientId} n'existe pas.`);
                resolve();
                return;
            }
            rl.question("Entrez l'ID du médecin : ", (medecinIdStr) => {
                const medecinId = parseInt(medecinIdStr);
                const medecin = findMedecinById(medecinId, medecinsArray);
                if (!medecin) {
                    console.log(`Le médecin avec l'ID ${medecinId} n'existe pas.`);
                    resolve();
                    return;
                }
                rl.question("Entrez la date du rendez-vous (YYYY-MM-DD) : ", (dateStr) => {
                    rl.question("Entrez l'heure du rendez-vous (HH:MM) : ", (timeStr) => {
                        const dateTime = new Date(`${dateStr}T${timeStr}:00`);
                        if (isNaN(dateTime.getTime())) {
                            console.log("Format de date ou d'heure invalide.");
                            resolve();
                            return;
                        }
                        // Vérifier si le patient a déjà un rendez-vous ce jour-là
                        if (patientHasAppointmentOnDate(patientId, dateTime, rendezVousList)) {
                            console.log(`Le patient a déjà un rendez-vous prévu le ${dateStr}. Un patient ne peut pas avoir plusieurs rendez-vous le même jour.`);
                            resolve();
                            return;
                        }
                        const rdv = {
                            id: rendezVousList.length + 1,
                            date: dateTime,
                            medecinId,
                            patientId
                        };
                        rendezVousList.push(rdv);
                        console.log("Rendez-vous ajouté avec succès.");
                        listRendezVous(rendezVousList, patientsArray, medecinsArray);
                        resolve();
                    });
                });
            });
        });
    });
}
exports.addRendezVous = addRendezVous;
// Fonction pour vérifier si un patient a un rendez-vous à une date spécifique
function checkPatientAppointment(rl, rendezVousList, patientsArray) {
    return new Promise((resolve) => {
        rl.question("Entrez l'ID du patient : ", (patientIdStr) => {
            const patientId = parseInt(patientIdStr);
            const patient = findPatientById(patientId, patientsArray);
            if (!patient) {
                console.log(`Patient avec l'ID ${patientId} non trouvé.`);
                resolve();
                return;
            }
            rl.question("Entrez la date à vérifier (YYYY-MM-DD) : ", (dateStr) => {
                const date = new Date(dateStr);
                if (isNaN(date.getTime())) {
                    console.log("Format de date invalide.");
                    resolve();
                    return;
                }
                const hasAppointment = patientHasAppointmentOnDate(patientId, date, rendezVousList);
                console.log(`Le patient ${patient.prenom} ${patient.nom} ${hasAppointment ? 'a' : 'n\'a pas'} de rendez-vous le ${dateStr}.`);
                resolve();
            });
        });
    });
}
exports.checkPatientAppointment = checkPatientAppointment;
// Fonction pour la liste de tous les rendez-vous
function listRendezVous(rendezVousList, patientsArray, medecinsArray) {
    console.log("\nListe des rendez-vous:");
    if (rendezVousList.length === 0) {
        console.log("Aucun rendez-vous enregistré.");
        return;
    }
    rendezVousList.forEach((rdv) => {
        const patient = findPatientById(rdv.patientId, patientsArray);
        const medecin = findMedecinById(rdv.medecinId, medecinsArray);
        if (patient && medecin) {
            const dateFormatee = rdv.date.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            console.log(`ID: ${rdv.id} - Date: ${dateFormatee} - Médecin: ${medecin.nom} ${medecin.prenom} - Patient: ${patient.nom} ${patient.prenom}`);
        }
    });
}
exports.listRendezVous = listRendezVous;

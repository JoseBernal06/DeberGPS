import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class GpsService {
    constructor(private firestore: Firestore) {}

    guardarCoordenadas(nombre: string, latitud: number, longitud: number, url: string) {
        const ref = collection(this.firestore, 'coordenadas');
        return addDoc(ref, {
            nombre,
            latitud,
            longitud,
            url,
            fecha: new Date()
        });
    }
}
import { Component } from '@angular/core';
import { GpsService } from '../services/gps.services';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonCardContent,
  IonButton, // Asegúrate de importar IonButton
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonCardContent,
    IonButton, // Incluye IonButton aquí
  ],
})
export class HomePage {
  nombre: string = 'Mateo Bernal';
  latitude: number | null = null;
  longitude: number | null = null;

  url: string = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
  constructor(private gpsService: GpsService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  guardarUbicacionActual() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        this.gpsService.guardarCoordenadas(this.nombre, lat, lng, url)
          .then(() => alert('Coordenadas guardadas'))
          .catch(err => alert('Error al guardar: ' + err));
      },
      (error) => {
        alert('No se pudo obtener la ubicación');
      }
    );
  }

  getCurrentLocation() {
  if (!navigator.geolocation) {
    console.error('Geolocalización no está soportada en este navegador.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    (error) => {
      if (error.code === 1) {
        alert('Debes permitir el acceso a la ubicación para usar esta función.');
      } else {
        alert('Error obteniendo ubicación: ' + error.message);
      }
      console.error('Error obteniendo ubicación:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

  openInGoogleMaps() {
    if (this.latitude !== null && this.longitude !== null) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('Coordenadas no disponibles. Asegúrate de que la ubicación esté habilitada.');
    }
  }
}


import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environment';
 
@Injectable({ providedIn: 'root' })
export class FcmService {
  currentMessage = new BehaviorSubject<any>(null);
 
  constructor(private messaging: Messaging) {}
 
  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(this.messaging, { vapidKey: environment.firebase.vapidKey })
          .then((token) => {
            console.log('FCM token:', token);
          })
          .catch((err) => {
            console.error('FCM token error:', err);
          });
      }
    });
  }
 
  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Push message received:', payload);
      this.currentMessage.next(payload);
    });
  }
}
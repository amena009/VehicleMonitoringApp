import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Vehicle } from '../models/VehicleModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
    vehicleList() {
      return this.http.get<Vehicle[]>('https://localhost:7018/api/vehicles');
    }

    customerList() {
      return this.http.get<Customer[]>('https://localhost:7018/api/customers');
    }

    filterVehicleById(vehicle_id: number) {
      return this.http.get<Vehicle[]>('https://localhost:7018/api/vehicles/by-customer/'+ vehicle_id);
    }

    filterVehicleByStatus(status:string){
      return this.http.get<Vehicle[]>('https://localhost:7018/api/vehicles/by-status/'+ status);
    }
}

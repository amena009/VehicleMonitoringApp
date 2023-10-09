import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Customer, Vehicle } from './models/VehicleModel';
import { interval } from 'rxjs/internal/observable/interval';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  //declaring and initializing variables
  title = 'VehicleMonitoring';

  notificationMessage = '';
  isNotificationVisible = false;
  showErrorModal: boolean = false;
  errorModalMessage: any;

  vehicleList: Vehicle[] = [];
  customerList: Customer[] = [];

  customerSelectedValue: number = 0;
  statusSelectedValue : string = '';

  filteredVehiclesByCustomer: Vehicle[] = [];
  filteredVehiclesByStatus: Vehicle[] = [];

  isLoading: boolean = false;

  vehicleListSubscription = new Subject<Vehicle[]>();
  customerListSubscription = new Subject<Customer[]>();
  filterbyIdSubscription = new Subject<Vehicle[]>();
  filterbyStatusSubscription = new Subject<Vehicle[]>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //to get all vehicles list for first time to display on screen
    this.getVehicleList();


    //Call the backend every 1 minute
    interval(60000).subscribe(() => {
      this.getVehicleList();
    })

    this.getCustomerList();
  }

  getVehicleList() {
    this.isLoading = true;
    this.vehicleList = [];

    //getting all vehicles list.
    this.dataService.vehicleList()
      .pipe(takeUntil(this.vehicleListSubscription))
      .subscribe(
        {
          next: (data: Vehicle[]) => {
            if(data) {
              this.vehicleList = data
              if(this.statusSelectedValue != '' && this.customerSelectedValue != 0){
                this.onStatusSelectionChange(this.statusSelectedValue);
                this.onCustomerSelectionChange(this.customerSelectedValue);
                this.showNotification("New signals received.")
              }
            }
            this.isLoading = false;
          },
          error: err => {
            if (err) {
              this.showErrorModal = true;
              this.errorModalMessage = err;
              this.isLoading = false;
            }
          }
        })
  }

  //to get all customers list required for the dropdown
  getCustomerList() {
    this.isLoading = true;
    this.dataService.customerList()
    .pipe(takeUntil(this.customerListSubscription))
      .subscribe(
        {
          next: (data: Customer[]) => {
            if(data) {
            this.customerList = data;
            }
            this.isLoading = false;
          },
          error: err => {
            if (err) {
              this.showErrorModal = true;
              this.errorModalMessage = err;
              this.isLoading = false;
            }
          }
        })
  }

  onCustomerSelectionChange(selectedValue :  any) {
    this.customerSelectedValue = parseInt(selectedValue);
    //Method 1 - performing filter on the vehicle list data already received on ngOnIt call.
    
    this.filteredVehiclesByCustomer = this.vehicleList.filter(a => a.customerId == this.customerSelectedValue);

    //Method 2- Or we can call the below function for separate filter api call.
    //Commenting the call to method 2 because making api call is costly and too many api calls makes app slow.
   // this.getCustomerFilteredVehicles(selectedValue);
  }

  //below function can be used to call filter by customer api separately 
  getCustomerFilteredVehicles(selectedValue: number) {
    this.isLoading = true;
    this.dataService.filterVehicleById(selectedValue)
    .pipe(takeUntil(this.filterbyIdSubscription))
      .subscribe(
        {
          next: (data: Vehicle[]) => {
            if(data) {
            this.filteredVehiclesByCustomer = data;
            }
            this.isLoading = false;
          },
          error: err => {
            if (err) {
              this.showErrorModal = true;
              this.errorModalMessage = err;
              this.isLoading = false;
            }
          }
        })
  }

  onStatusSelectionChange(selectedValue: string) {
    this.statusSelectedValue = selectedValue;
    //Method 1 -performing filter on the vehicle list data already received on ngOnIt call.
    this.filteredVehiclesByStatus = this.vehicleList.filter(a => a.status.toLocaleLowerCase() == this.statusSelectedValue);
    
    //Method 2- Or we can call the below function for separate filter api call
    //Commenting the call to method 2 because making api call is costly and too many api calls makes app slow.
    //this.getStatusFilteredVehicles(selectedValue);
  }
  //below function can be used to call filter by status api separately 
  getStatusFilteredVehicles(selectedValue: string) {
    this.isLoading = true;
    this.dataService.filterVehicleByStatus(selectedValue)
    .pipe(takeUntil(this.filterbyStatusSubscription))
      .subscribe(
        {
          next: (data: Vehicle[]) => {
            if(data) {
            this.filteredVehiclesByStatus = data;
            }
            this.isLoading = false;
          },
          error: err => {
            if (err) {
              this.showErrorModal = true;
              this.errorModalMessage = err;
              this.isLoading = false;
            }
          },
        })
  }

  showNotification(message: string) {
    this.notificationMessage = message;
    this.isNotificationVisible = true;
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  closeNotification() {
    this.isNotificationVisible = false;
  }

  //destroying all subscription on page close
  ngOnDestroy() {
    this.isLoading = false;
    this.vehicleListSubscription.complete();
    this.customerListSubscription.complete();
    this.filterbyStatusSubscription.complete();
    this.filterbyIdSubscription.complete();
  }
}

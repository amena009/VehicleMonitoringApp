import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should fetch vehicle lists', () => {
    // Mock DataService to return sample data
    const dataService = TestBed.inject(DataService);
    const vehicleList = [{ 'id' : 1, 'vin' : "YS2R4X20005399401", 'registrationNumber' : "ABC123", 'status' : "Connected", 'customerId' : 1}];
    spyOn(dataService, 'vehicleList').and.returnValue(of(vehicleList));
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    app.ngOnInit(); // Trigger data fetching
  
    expect(app.vehicleList).toEqual(vehicleList);
  });

   it('should fetch customer lists', () => {
    // Mock DataService to return sample data
    const dataService = TestBed.inject(DataService);
    const customerList = [{'id' : 1, 'name' : "Kalles Grustransporter AB", 'address' : "Cementvägen 8, 111 11 Södertälje" }]; 
    spyOn(dataService, 'customerList').and.returnValue(of(customerList));
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    app.ngOnInit(); // Trigger data fetching
  
    expect(app.customerList).toEqual(customerList);
  });

  //filtering output test
  it('should update filtered vehicles by customer in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.vehicleList = [{ 'id' : 1, 'vin' : "YS2R4X20005399401", 'registrationNumber' : "ABC123", 'status' : "Connected", 'customerId' : 1},
    { 'id' : 2, 'vin' : "VLUR4X20009093588", 'registrationNumber' : "DEF456", 'status' : "Disconnected", 'customerId' : 2}];
    app.onCustomerSelectionChange(1); // Apply filter for customer with ID 1
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    const filteredVehicleCount = app.filteredVehiclesByCustomer.length;
  
    // Check if the template displays the filtered vehicles
    const vehicleElements = compiled.querySelectorAll('.status-dot');
    expect(vehicleElements.length).toBe(filteredVehicleCount);
  });
  
  it('should update filtered vehicles by status in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.vehicleList = [{ 'id' : 1, 'vin' : "YS2R4X20005399401", 'registrationNumber' : "ABC123", 'status' : "Connected", 'customerId' : 1},
    { 'id' : 2, 'vin' : "VLUR4X20009093588", 'registrationNumber' : "DEF456", 'status' : "Disconnected", 'customerId' : 2}];
    app.onStatusSelectionChange('Connected'); // Apply filter for 'Connected' status
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    const filteredVehicleCount = app.filteredVehiclesByStatus.length;
  
    // Check if the template displays the filtered vehicles
    const vehicleElements = compiled.querySelectorAll('.status-dot');
    expect(vehicleElements.length).toBe(filteredVehicleCount);
  });
  

  it('should filter vehicles by customer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.vehicleList = [{ 'id' : 1, 'vin' : "YS2R4X20005399401", 'registrationNumber' : "ABC123", 'status' : "Connected", 'customerId' : 1},
    { 'id' : 2, 'vin' : "VLUR4X20009093588", 'registrationNumber' : "DEF456", 'status' : "Disconnected", 'customerId' : 2}];
    app.onCustomerSelectionChange(1); // Apply filter for customer with ID 1
  
    // Check if filteredVehiclesByCustomer contains vehicles for customer with ID 1
    expect(app.filteredVehiclesByCustomer.every(vehicle => vehicle.customerId === 1)).toBeTrue();
  });
  
  it('should filter vehicles by status', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.vehicleList = [{ 'id' : 1, 'vin' : "YS2R4X20005399401", 'registrationNumber' : "ABC123", 'status' : "Connected", 'customerId' : 1},
    { 'id' : 2, 'vin' : "VLUR4X20009093588", 'registrationNumber' : "DEF456", 'status' : "Disconnected", 'customerId' : 2}];
    app.onStatusSelectionChange('Connected'); // Apply filter for 'Connected' status
  
    // Check if filteredVehiclesByStatus contains vehicles with 'Connected' status
    expect(app.filteredVehiclesByStatus.every(vehicle => vehicle.status === 'Connected')).toBeTrue();
  });
  

  //dropdown test cases
  it('should initially have a default selected value for the dropdown', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const selectedValue = app.customerSelectedValue;
    expect(selectedValue).toEqual(0); // Replace with the actual default value
  });

  it('should change the selected value when customer dropdown option is selected', () => {
    const newValue = 1;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onCustomerSelectionChange(newValue);
    const selectedValue = app.customerSelectedValue;
    expect(selectedValue).toEqual(newValue);
  });

  it('should change the selected value when status dropdown option is selected', () => {
    const newValue = 'connected';
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onStatusSelectionChange(newValue);
    const selectedValue = app.statusSelectedValue;
    expect(selectedValue).toEqual(newValue);
  });

});

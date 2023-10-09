
namespace VehicleMonitoring.Models
{
    public class DataStore 
    {
        public static List<Vehicle> Vehicles { get; set; } = new List<Vehicle>
   {
        new Vehicle { Id = 1, Vin = "YS2R4X20005399401", RegistrationNumber = "ABC123", Status = "Connected", CustomerId = 1 },
        new Vehicle { Id = 2, Vin = "VLUR4X20009093588", RegistrationNumber = "DEF456", Status = "Disconnected", CustomerId = 1 },
        new Vehicle { Id = 3, Vin = "VLUR4X20009048066", RegistrationNumber = "GHI789", Status = "Connected", CustomerId = 1 },
        new Vehicle { Id = 4, Vin = "YS2R4X20005388011", RegistrationNumber = "JKL012", Status = "Connected", CustomerId = 2 },
        new Vehicle { Id = 5, Vin = "YS2R4X20005387949", RegistrationNumber = "MNO345", Status = "Disconnected", CustomerId = 2 },
        new Vehicle { Id = 6, Vin = "YS2R4X20005387765", RegistrationNumber = "PQR678", Status = "Connected", CustomerId = 3 },
        new Vehicle { Id = 7, Vin = "YS2R4X20005387055", RegistrationNumber = "STU901", Status = "Disconnected", CustomerId = 3 },
    };

        public static List<Customer> Customers { get; set; } = new List<Customer>
    {
        new Customer { Id = 1, Name = "Kalles Grustransporter AB", Address = "Cementvägen 8, 111 11 Södertälje" },
        new Customer { Id = 2, Name = "Johans Bulk AB", Address = "Balkvägen 12, 222 22 Stockholm" },
        new Customer { Id = 3, Name = "Haralds Värdetransporter AB", Address = "Budgetvägen 1, 333 33 Uppsala" },
    };
    }
}

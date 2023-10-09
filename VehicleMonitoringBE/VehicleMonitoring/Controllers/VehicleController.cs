using Microsoft.AspNetCore.Mvc;
using VehicleMonitoring.Models;

namespace VehicleMonitoring.Controllers
{
    [Route("api/vehicles")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        //UpdateVehicleStatus : this method creates random status for vehicles.
        private static void UpdateVehicleStatus()
        {
            var random = new Random();
            // Creatinig a new list to hold the updated vehicles
            var updatedVehicles = new List<Vehicle>();

            foreach (var vehicle in DataStore.Vehicles)
            {
                // Generating random status, e.g., "Connected" or "Disconnected"
                var status = random.Next(2) == 0 ? "Connected" : "Disconnected";

                var updatedVehicle = new Vehicle
                {
                    Id = vehicle.Id,
                    Vin = vehicle.Vin,
                    RegistrationNumber = vehicle.RegistrationNumber,
                    Status = status,
                    CustomerId = vehicle.CustomerId
                };

                updatedVehicles.Add(updatedVehicle);
            }

            //updating DataStore with new random status
            DataStore.Vehicles = updatedVehicles;
        }

        [HttpGet]
        public async Task<List<Vehicle>> GetVehicles()
        {
            UpdateVehicleStatus();
            List<Vehicle> vehicles = await Task.Run(() =>
            {
                return DataStore.Vehicles.ToList();
            });
            return vehicles;
        }

        [HttpGet("{id}")]
        public ActionResult<Vehicle> GetVehicle(int id)
        {
            var vehicle = DataStore.Vehicles.FirstOrDefault(v => v.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        [HttpGet("by-customer/{customerId}")]
        public ActionResult<IEnumerable<Vehicle>> GetVehiclesByCustomer(int customerId)
        {
            var filteredVehicles = DataStore.Vehicles.Where(v => v.CustomerId == customerId).ToList();

            if (filteredVehicles.Count == 0)
            {
                return NotFound();
            }

            return filteredVehicles;
        }

        [HttpGet("by-status/{status}")]
        public ActionResult<IEnumerable<Vehicle>> GetVehiclesByStatus(string status)
        {
            var filteredVehicles = DataStore.Vehicles.Where(v => v.Status.Equals(status, StringComparison.OrdinalIgnoreCase)).ToList();

            if (filteredVehicles.Count == 0)
            {
                return NotFound();
            }

            return filteredVehicles;
        }
    }

}
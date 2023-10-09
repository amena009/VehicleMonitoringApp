using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VehicleMonitoring.Controllers;
using VehicleMonitoring.Models;

namespace VehicleMonitoringTesting
{
    public class VehicleControllerTests
    {
        [Fact]
        public void GetVehicles_ReturnsListOfVehicles()
        {
            // Arrange
            var dataStore = new DataStore(); // Create an instance of your DataStore
            var controller = new VehicleController();

            // Act
            var result = controller.GetVehicles();

            // Assert
            var vehicles = Assert.IsAssignableFrom<IEnumerable<Vehicle>>(result.Result);
            Assert.Equal(DataStore.Vehicles.Count, vehicles.Count());
        }

        [Fact]
        public void GetVehicle_ReturnsVehicle_WhenVehicleExists()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var vehicleId = 1;

            // Act
            var result = controller.GetVehicle(vehicleId);

            // Assert

            var vehicle = Assert.IsAssignableFrom<Vehicle>(result.Value);
            Assert.Equal(vehicleId, vehicle.Id);
        }

        [Fact]
        public void GetVehicle_ReturnsNotFound_WhenVehicleDoesNotExist()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var vehicleId = 10;

            // Act
            var result = controller.GetVehicle(vehicleId);

            // Assert
            Assert.IsType<ActionResult<Vehicle>>(result);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void GetVehiclesByCustomer_ReturnsListOfVehicles_WhenCustomerExists()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var customerId = 1;

            // Act
            var result = controller.GetVehiclesByCustomer(customerId);

            // Assert
            var vehicles = Assert.IsAssignableFrom<IEnumerable<Vehicle>>(result.Value);
            Assert.Equal(DataStore.Vehicles.Count(v => v.CustomerId == customerId), vehicles.Count());
        }

        [Fact]
        public void GetVehiclesByCustomer_ReturnsNotFound_WhenCustomerDoesNotExist()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var customerId = 10; // non-existing customer's ID

            // Act
            var result = controller.GetVehiclesByCustomer(customerId);

            // Assert
            Assert.IsType<ActionResult<IEnumerable<Vehicle>>>(result);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void GetVehiclesByStatus_ReturnsListOfVehicles_WhenStatusExists()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var status = "Connected"; // existing status

            // Act
            var result = controller.GetVehiclesByStatus(status);

            // Assert
            var vehicles = Assert.IsAssignableFrom<IEnumerable<Vehicle>>(result.Value);
            Assert.Equal(DataStore.Vehicles.Count(v => v.Status.Equals(status, StringComparison.OrdinalIgnoreCase)), vehicles.Count());
        }

        [Fact]
        public void GetVehiclesByStatus_ReturnsNotFound_WhenStatusDoesNotExist()
        {
            // Arrange
            var dataStore = new DataStore();
            var controller = new VehicleController();
            var status = "NonExistentStatus"; //non-existing status

            // Act
            var result = controller.GetVehiclesByStatus(status);

            // Assert
            Assert.IsType<ActionResult<IEnumerable<Vehicle>>>(result);
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}


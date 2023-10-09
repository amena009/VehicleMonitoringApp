using Microsoft.AspNetCore.Mvc;
using VehicleMonitoring.Controllers;
using VehicleMonitoring.Models;

namespace VehicleMonitoringTesting
{
    public class CustomerControllerTests
    {
        [Fact]
        public void GetCustomers_ReturnsListOfCustomers()
        {
            // Arrange
            var controller = new CustomerController();

            // Act
            var result = controller.GetCustomers();

            // Assert
            var customers = Assert.IsAssignableFrom<IEnumerable<Customer>>(result.Value);
            Assert.Equal(DataStore.Customers.Count, customers.Count());
        }

        [Fact]
        public void GetCustomer_ReturnsCustomer_WhenCustomerExists()
        {
            // Arrange
            var controller = new CustomerController();
            var customerId = 1; // Replace with an existing customer's ID

            // Act
            var result = controller.GetCustomer(customerId);

            // Assert
            var customer = Assert.IsAssignableFrom<Customer>(result.Value);
            Assert.Equal(customerId, customer.Id);
        }

        [Fact]
        public void GetCustomer_ReturnsNotFound_WhenCustomerDoesNotExist()
        {
            // Arrange
            var controller = new CustomerController();
            var customerId = 10; // Replace with a non-existing customer's ID

            // Act
            var result = controller.GetCustomer(customerId);

            // Assert
            Assert.IsType<ActionResult<Customer>>(result);
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
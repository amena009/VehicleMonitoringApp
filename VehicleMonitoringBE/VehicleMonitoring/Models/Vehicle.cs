namespace VehicleMonitoring.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Vin { get; set; }
        public string RegistrationNumber { get; set; }
        public string Status { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime LastPingTime { get; set; }
    }
}

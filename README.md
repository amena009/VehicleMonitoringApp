# FullStack-Vehicle-Monitoring
The Vehicle Monitoring App is a web-based application that allows users to monitor and filter vehicles based on various criteria, such as customer and status. 

**Prerequisites**
Before you can run the Vehicle Monitoring App, ensure you have the following software installed on your system:
Node.js and npm: To manage project dependencies and run scripts.

**Functionality**
The Vehicle Monitoring App provides the following functionality:

1. Vehicle List: View a list of vehicles, including their VIN, registration number, and status (shown as red dot - for disconnected and green dot for connected).
2. Filter Vehicles By Customer: Filter vehicles by customer name from the dropdown menu. The list updates to display only the vehicles associated with the selected customer.
3. Filter Vehicles By Status: Filter vehicles by their status (Connected or Disconnected) from the dropdown menu. The list updates to display vehicles with the chosen status.
4. Error Handling: If there is an error in fetching data from the server, an error modal will appear with error details, including error status code and message.

Added Functionality for improvement - 
A loader will spin when when the api call brings data from backend.
A push notification will appear after every 1 minute when new signal is received from backend.


Running the Full Application (Backend and Frontend)
To run the full Vehicle Monitoring App, you'll need to run both the backend server and the frontend application simultaneously. Follow the steps below:

Installation
1. Clone the repository to your local machine:
 - git clone https://github.com/your-username/vehicle-monitoring-app.git
2. Navigate to the project directory:
 - cd vehicle-monitoring-app
3. Install project dependencies (frontend):
 - npm install
4. Start the development server (frontend):
 - ng s -o

With these instructions, users will be able to run the entire Vehicle Monitoring App, including both the backend and frontend components, for a seamless monitoring experience.








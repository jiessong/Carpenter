# Carpenter Application
This is a full-stack application assisting carpenters to find the optimal cutting plans for lengths of wood.

Frontend: React
Backend: Springboot, Gradle

# Requirement
Detailed Description:
The application allows users to input the lengths and quantities of wood needed, e.g., 15 pieces of 1800mm, 8 pieces of 900mm, and 10 pieces of 1350mm.
The standard wood size available for purchase is 5400mm.
The system should calculate the total amount of wood needed and generate an efficient cutting plan to minimize waste.
The cutting plan should detail how each 5400mm wood piece should be cut to fulfill the requirements.

# Wood Cutting Algorithm
Assumption
We always start with a new standard wood length of 5400 mm for each requirement, and the number of standard woods is limitless.

Algorithm Overview
The algorithm begins by identifying the longest wood needed in the requirements.
It then starts cutting from a standard wood of length 5400 mm until the required pieces are completed.
If the existing wood is insufficient, the algorithm checks if the second longest wood can be obtained from the remaining wood. If yes, it is cut; otherwise, it checks the third-longest wood, and so on.
If the first wood has been cut until it is shorter than any required wood, the remaining wood is considered waste.
A new wood is then taken, and the process is repeated starting from the longest wood needed.
This process continues until all required wood pieces have been cut.


# Hire-N-Hop
Car Rental Service

# Team Members

<b>Varsha Pothaganahalli Jairam</b> - 013931242 <br />
<b>Ashwini Ulhas Talele</b> - 014483456 <br />
<b>Kedar Acharya</b> - 014151891 <br/>
<b>Belinda Terry</b> - 013785668 <br />



# Wireframes
https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/blob/master/UI-wireframes/UIWireframe.png


# Scrum Report + Journal 
https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/tree/master/Aglie%20Documents


# Application Screenshots
https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/blob/master/Application%20Screenshot/Application%20Screenshots.pdf

# Load Balancing Screenshots
https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/blob/master/Application%20Screenshot/Load%20Balancing.pdf

# Design Patterns used

## DAO Pattern

We have used DAO classes to interact with database layer.


## MVC Pattern

We have used Controller classes. It is the first point of contact when the request is sent from View. 
Also, we have Model classes for our entities. This is how we implemented MVC pattern.

## Command Pattern

We have used ReactJS. It has states and there is an event which continuously listens to any change in states.
This is how Command Pattern is used in this project.


<h1>Architecture Diagram</h1>

![Architecture diagram](Architecture.jpg)

# Load Blancing

We have used load balancing with auto scaling on AWS.
Client uses the load balancer URL and according to the requests the load balancing creates new servers.

# Database

We used MYSQL database and hosted it on Amazon RDS.
We choosed relational database as the requirements had functional relationships and we thought relational database could be the best fit in this scenario.

scripts- 
https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/tree/master/database

# Backend

We used Java Spring Boot as our backend technology stack.
We used hibernate session to connect to the database and for inserting/updating/deleting/reading from and to database.

https://github.com/gopinathsjsu/sp20-cmpe-202-sec-03-team-project-team-202-akbv/tree/master/database

# Frontend

We used ReactJS as our frontend technology stack.
React gives the benifits of using state for responsive UI development, so we choosed ReactJS.

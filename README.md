# Purpose
This is rebuilt of dashboard with Rails backend and react with typescript. Plus practice of what I pick up from Michael Hartl's Ruby on Rails 7th edition book.

### Thought Process and Considerations
Rails is based on MVC architecture, React will replace parts of the V (view) in the architecture as unlike Angular, React only narrowly focus on view.
- to include Authorization
- debouncing requests
- PostgreSQL database
- to perform following functionalities on API endpoints from PostGreSQL by following between Tranasctions and Customer details:-
````
- to view table of accounts transactions in 1 page
- pagination of 10 accounts transactions per page
- to sort,search,filter date from table
- click transactions and view transactions detail in new page (not modal)
- register new customer detail 
- view listing of registered customers
- click registered customer and view the customer detail in a new page (not modal)
- update customer detail
- delete customer detail
- use Redux-toolkit to abstract state management
````
### Design Pattern
The key difference to this from prior dashboard built is that the addition of Rails backend and different architectural software design. 

A combination between Redux that uses Redux architecture pattern which implements simpler Flux that succeeds Model-View-Controller (MVC). Focused on client-side web apps. Unidirectional data flow. Reducer handles business logic.
While Rails follows MVC design pattern. Architectural design pattern for developing UI. Bidirectional data flow. Controller handles logic.

In the end decided to input the Redux architecture within the Rails MVC structure specifically with Rails as centralized API.


### To Replicate:
* Open two separate terminals
* From root directory of `node-js/client`:
    * First run `npm i` to install client app
    * Then run `npm run start` to start client app
* From root directory of `node-js/server`:
    * First run `npm i` to install server
    * Then run `npm run start` to start server

### Intro:
* This app displays the status for robots that are deployed in harsh environments and sending telemetry.  The client shows robot status (i.e. operational or non-operational), as well as the topology of the robots as a connected graph of location data.  Each robot is connected with its nearest neighbor.  The server for supplies robot states (e.g. id, x and y coordinates, battery current, and voltage reading).  

### Demo and notes:
![graph-demo](./graph-demo.png)
* I calculate the distance between each pair of robots just once and store it in an object. Then separately I loop through that object once to add the edges.  This is more efficient than my first implementation, which iterated through the entire robotStates array once for each robot, resulting in a time complexity of O(n^2)
* Instead of that, by sorting the robots by their x_pose O(n log n) and then iterating through that array once O(n) to find the closest robot, I improved the overall time complexity to O(n log n).  The space complexity of both approaches was the same, using a constant amount of memory to store closest distance O(n).

### To Dos:
* I had difficulty loading JQuery and Arbor.js (from the local script) in such a way that the `$` and `jQuery` objects were consistently available to the Arbor.js library and to my rendering code.  I assume that it could have something to do with the order in which scripts are loaded in.  Some next steps might be to look into testing the usage of `defer` over `async` for this use case, or using webpack to expose jQuery as a global object.  This would also allow me to separate out the Renderer const code into a separate component for readability.
* It was a challenge to combine jQuery and React.  I used `useRef` to split responsibility of control over the DOM between the Arbor.js library and React, but this could use further refactoring to make the app more stateful.  
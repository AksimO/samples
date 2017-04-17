# WeatherApp - by John Archambault
Node JS/Redux/React app which shows the weather condition for 10 US cities.

## Setup:
This WebApp runs on Node.js, specifically version 6.9.4. If you need to update or install Node.js, go here: https://nodejs.org/en/
Once you have cloned the directory locally, one first needs to install all the node packages. To do this via the command line:
 * go to the correct directory and type 'npm install'
 * once modules are installed, type 'npm start'
 * the WebApp should launch, and will be viewable at: http://localhost:3000/

If you are deploying the app using some sort of platform like Heroku, then it is likely you need not type anything to either install
the modules or run the app.


## My Solution:
It seems that it is not possible to use the wunderground api to get data for multiple locations in one call. Message boards
with comments from as recently as two months ago indicate this:

https://apicommunity.wunderground.com/weatherapi/topics/query-multiple-locations-in-one-call

From my point of view the fact that I needed to make ten api calls to get all the required data was the key challenge in this exercise.
I chose a more non-standard, pragmatic way of managing state, relying more on the state of the React component than I normally would.
I reasoned that this was best as otherwise there would be a lot of code duplication in the app's actions and reducers. Besides, I was
already relying heavily on the component's state to sort the cities by temperature.

Another pragmatic choice I made was to add a boolean flag 'updateComponent' to the component's state. By doing this I was able to keep
the component from re-rendering an enormous number of times, as would otherwise be the case given all the api calls. In the end the
component only renders twice - once when it is mounted, and once more when the data has been sorted properly.




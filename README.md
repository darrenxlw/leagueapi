# INTcarry

INTCarry is a front end web application based on React that uses Riot Games' API to retrieve stats and allows you to easily compare multiple players' performances.
The current iteration is still an early stage framework that gets data on the last 10 games and calculates advances statistics.

![screenshot](https://raw.githubusercontent.com/dxlw/intcarry/master/src/screenshot.PNG)

Feel free to fork, edit or do whatever you want with it. 
Since this is a front end only javascript app you need to be careful about the API key and implement another layer that will also help with caching. The limited rates of the development key will throw a lot of 429s otherwise.

**TODO:**  
Bugs:  
-429 related bugs, on enter will add object without displaying
-missing GETs
-closing player above another removes the latter one's stats  

Features:  
-Implementing a backend, Layering/Caching  
-Select Region  
-Update listed players to teams attending worlds  
-more statistics  

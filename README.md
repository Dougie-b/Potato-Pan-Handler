
# Potato Pan-Handler

In one week, as my first project, I designed and wrote a game using HTML, CSS and Vanilla JavaScript.

I made what ended up being somewhat of a rhythm game where you had to match inputs to the correct falling items.

## Deployment

Please follow the link to have a go!

https://dougie-b.github.io/Potato-Pan-Handler/
## Tech Stack

**Client:** HTML, CSS, JavaScript

**Dev Tools:** Visual Studio Code, Github, Excalidraw
## Planning

I decided to design a game rather than recreate an existing one so initially I spent some time figuring out mechanics and a theme.

Once decided I wireframed out what I had envisioned and finalised what I wanted shown on screen.
## Build

**Start Screen** 

I needed an initial prompt screen to play the game as I wouldn't want the timer to start before they were ready! (as well as to prompt the music to start)

![Start Screen](https://i.postimg.cc/MpRgZp1V/Screenshot-2022-04-08-at-03-08-57.png)

![Startgame function](https://i.postimg.cc/Zqxg3s7q/Screenshot-2022-04-08-at-03-12-45.png)

![rungame 1](https://i.postimg.cc/HxShvcCD/Screenshot-2022-04-08-at-03-12-53.png)

![rungame 2](https://i.postimg.cc/DZfNcQHP/Screenshot-2022-04-08-at-03-13-07.png)

**The Game**

Initially I needed to create a grid so I could apply classes to cells to show the various pots and pans and used flexbox to manipulate them.

![HTML](https://i.postimg.cc/hvf3kDSJ/Screenshot-2022-04-08-at-03-11-40.png)

I overlayed the start screen and end screen on the grid and changed their display types to show or hide them.

![Create grid](https://i.postimg.cc/fRS4pvHz/Screenshot-2022-04-08-at-03-37-19.png)

I used a function to generate classes for the starting position of the column randomly. Each different class had a key assigned to it that matched the key pressed to break it.

![Random blocks](https://i.postimg.cc/vm5JHZFC/Screenshot-2022-04-08-at-03-38-54.png)

**Moving blocks and changing score**

I used an array to store the class values of each cell and used a second array to map through and move the blocks down the column one block and generate a new one at the top.

![Crazy arrays 1](https://i.postimg.cc/qR09tHpq/Screenshot-2022-04-08-at-03-43-31.png)

![Crazy arrays 2](https://i.postimg.cc/9MpsZgfp/Screenshot-2022-04-08-at-03-43-53.png)

**End Game** 

The end of the game is triggered after 50 blocks have fallen & generated a score based on the time taken and accuracy.

![Score calculator](https://i.postimg.cc/nL88JQ5v/Screenshot-2022-04-08-at-03-52-28.png)
## Bugs

I broke the class generator in a way I couldn't quickly fix that causes some of the cells to have more than one class associated so it appears as if the column doesn't move or blocks move randomly. Guess you could call it hard mode?

## Wins

Despite it being a bit of a buggy mess and a questionable use case for flexbox I was pleased I managed to get my vision working mostly as intended.

## Challenges

With the initial brief being to use CSS flexbox to make a game from a list of examples; choosing to make my own was honestly a mistake. It was far too early in my coding career to fully understand what was needed to make my idea.

I ended up using a sort of bastardised flexbox game using it in a way that really wasn't efficient but I had to work to the brief!
## Key Learnings

Setting myself up with a difficult scope certainly forced me to learn the ins and outs of the technology as I had to use it in a fairly unusual way.

If I was to make this game again I certainly wouldn't use arrays! Lists would have been significantly better.
## Future Features

Obviously first thing is to fix the main bug.

Add a few features to the game screen to help orientate the player a little more such as an indicator of how many blocks have fallen.

Otherwise I would like to flesh out the start screen and add a little overview of what you're to do, how to win and maybe a little bit of a backstory for Senor Potate just to add flavour.

![HTML](https://i.postimg.cc/XYnWG5x4/Screenshot-2022-04-08-at-04-11-33.png)

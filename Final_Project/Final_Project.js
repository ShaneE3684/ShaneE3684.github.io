var mazeWidth = 10;
var mazeHeight = 10;

function init()
{

    createBlankMaze();

    paint();

    beginStopwatchCycle();
}

function createBlankMaze()
{

    var rowIndex, colIndex;

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    for (rowIndex = 1; rowIndex <= mazeHeight; rowIndex++)
    {

        var row = document.createElement("tr");

        for (colIndex = 1; colIndex <= mazeWidth; colIndex++)
        {

            var col = document.createElement("td");
            if (rowIndex == 1 && colIndex == 1 )
            {

                col.style["border-top"] = "none";
                col.setAttribute("type", "start");

            } else if (rowIndex == mazeHeight && colIndex == mazeWidth)
            {
                col.style["border-bottom"] = "none";;
                col.setAttribute("type", "finish");

            }
            col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
            
            row.appendChild(col);

        }

        tbody.appendChild(row);

    }
    
    table.appendChild(tbody);

    document.getElementById("maze_container").appendChild(table);
}

function paint()
{

    var startAtRow = 1;
    var startAtCol = 1;

    var currentCell;
    
    addRoute(startAtRow, startAtCol, false);

    for (n = 1; n < (mazeWidth * mazeHeight) - 1; n++) {

        var currentCell = document.getElementById("cell_" + startAtRow + "_" + startAtCol);
        
        if (currentCell.getAttribute("occupied") == "true")
        {

            addRoute(startAtRow, startAtCol, true);

        }

        if (startAtCol == mazeWidth)
        {
            
            startAtRow++;
            startAtCol = 1;

        } else
        {

            startAtCol++;

        }

    }

}

function addRoute(startAtRow, startAtCol, createDetour)
{

    var validExits = ["right", "bottom", "left", "top"];
    
    var remainingExits = {"right": mazeWidth, "bottom": mazeHeight, "left": 0, "top": 0};
    
    var nextExits = [];
    
    var lastCells= [];

    var rowIndex = startAtRow;
    
    var colIndex = startAtCol;
    
    var currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);

    var exit;

    var lastExit;

    var exitIndex;

    var loop = 0;

    var loopFuse = 0;

    var maxLoops = 3 * mazeWidth * mazeHeight;

    var nextPossibleCell;

    while (loop < ((mazeWidth * mazeHeight) - 1))
    {

        loopFuse++;

        if (loopFuse >= maxLoops) {break;}

        nextExits = [];

        for (i = 0; i < validExits.length; i++)
        {

            switch(validExits[i])
            {

                case "right":
                    nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex + 1));
                    break;

                case "left":
                    nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex - 1));
                    break;

                case "bottom":
                    nextPossibleCell = document.getElementById("cell_" + (rowIndex + 1) + "_" + colIndex);
                    break;

                case "top":
                    nextPossibleCell = document.getElementById("cell_" + (rowIndex - 1) + "_" + colIndex);
                    break;

            }
            
            if (nextPossibleCell != null)
            {

                if (nextPossibleCell.getAttribute("occupied") != "true")
                {
                    
                    for (t = 0; t < remainingExits[validExits[i]]; t++)
                    {

                        nextExits.push(validExits[i]);

                    }

                }

            } 

        }

        if (nextExits.length == 0)
        {

            if (createDetour == true)
            {

                return false;


            } else
            {
                
                lastCells.splice(lastCells.length - 1, 1);

                rowIndex = lastCells[lastCells.length - 1][0];
                colIndex = lastCells[lastCells.length - 1][1];
                currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);

                continue;
            
            }

        } 

        exitIndex = Math.floor(Math.random() * Math.floor(nextExits.length));

        exit = nextExits[exitIndex];

        if (createDetour == false)
        {

            currentCell.style["border-"+exit] = "none";

        } else
        {

            if (!(exit == "right" && colIndex == mazeWidth - 1 && rowIndex == mazeHeight) &&
                !(exit == "bottom" && colIndex == mazeWidth && rowIndex == mazeHeight - 1) )
                {

                currentCell.style["border-"+exit] = "none";

            }
        }
        
        switch(exit)
        {

            case "right":

                colIndex = colIndex + 1;
                remainingExits.left++;
                remainingExits.right--;
                break;

            case "bottom":

                rowIndex = rowIndex + 1;
                remainingExits.top++;
                remainingExits.bottom--;
                break;

            case "left":

                colIndex = colIndex - 1;
                remainingExits.left--;
                remainingExits.right++;
                break;

            case "top":

                rowIndex = rowIndex - 1;
                remainingExits.top--;
                remainingExits.bottom++;
                break;
                
        }

        lastCells.push([rowIndex, colIndex]);

        currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);

        switch(exit)
        {

            case "right":

                currentCell.style["border-left"] = "none";
                break;

            case "bottom":

                currentCell.style["border-top"] = "none";
                break;

            case "left":

                currentCell.style["border-right"] = "none";
                break;

            case "top":

                currentCell.style["border-bottom"] = "none";
                break;

        }

        if (rowIndex == mazeHeight && colIndex == mazeWidth)
        {

            break;

        }

        currentCell.setAttribute("occupied", "true");

        lastExit = exit;

        loop++;
    }


}


const stopwatch = document.getElementById('Stopwatch');

var hr = 0;
var min = 0;
var sec = 0;

var useStopwatch = 1;

function displayWatch()
{
    if(useStopwatch == 0)
    {
        stopwatch.style.display = "none";
    }else
    {
        stopwatch.style.display = "block";
    }
}



function beginStopwatchCycle()
{
    if(useStopwatch != 0)
    {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec+1;

        if(sec == 60)
        {
            min = min+1;
            sec = 0;
        }

        if(min = 60)
        {
            hr = hr+1
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }
    
        timer.innerHTML = hr + " : " + min + " : " + sec;
    
        setTimeout("timerCycle()", 1000);
    }
    
}

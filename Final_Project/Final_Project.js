var mazeWidth = 20;
var mazeHeight = 20;
var currentCell;
var cellID;
var currentX = 1;
var currentY = 1;

function startTheGame()
{
    createBlankMaze();

    paint();

    addCellID();

    gameDisplay(currentX,currentY);
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

                col.style.borderTopColor = "red";
                col.setAttribute("type", "start");

            } else if (rowIndex == mazeHeight && colIndex == mazeWidth)
            {
                col.style.borderBottomColor = "green"; 
                col.setAttribute("type", "finish");

            }
            col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
            
            row.appendChild(col);

        }

        tbody.appendChild(row);

    }
    
    table.appendChild(tbody);

    $("#maze_container").html(table);
}

function paint()
{
    var startAtRow = 1;
    var startAtCol = 1;

    addRoute(startAtRow, startAtCol, false);

    for (n = 1; n < (mazeWidth * mazeHeight) - 1; n++)
    {

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

function addCellID ()
{
    var startAtRow = 1;
    var startAtCol = 1;

    for (n = 1; n < (mazeWidth * mazeHeight) - 1; n++)
    {
        currentCell = document.getElementById("cell_" + startAtRow + "_" + startAtCol);
        
        if (currentCell.style["border-top"] == "none" && currentCell.style["border-left"] == "none" && currentCell.style["border-right"] == "none" && currentCell.style["border-bottom"] == "none")
        {
            currentCell.setAttribute("cellID", "15");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-left"] == "none" && currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "14");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-left"] == "none" && currentCell.style["border-bottom"] == "none")
        {
            currentCell.setAttribute("cellID", "13");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-bottom"] == "none" && currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "12");

        }else if (currentCell.style["border-bottom"] == "none" && currentCell.style["border-left"] == "none" && currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "11");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-bottom"] == "none")
        {
            currentCell.setAttribute("cellID", "10");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-bottom"] == "none")
        {
            currentCell.setAttribute("cellID", "9");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-left"] == "none")
        {
            currentCell.setAttribute("cellID", "8");

        }else if (currentCell.style["border-top"] == "none" && currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "7");

        }else if (currentCell.style["border-bottom"] == "none" && currentCell.style["border-left"] == "none")
        {
            currentCell.setAttribute("cellID", "6");

        }else if (currentCell.style["border-bottom"] == "none" && currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "5");

        }else if (currentCell.style["border-top"] == "none")
        {
            currentCell.setAttribute("cellID", "4");

        }else if (currentCell.style["border-bottom"] == "none")
        {
            currentCell.setAttribute("cellID", "3");

        }else if (currentCell.style["border-left"] == "none")
        {
            currentCell.setAttribute("cellID", "2");

        }else if (currentCell.style["border-right"] == "none")
        {
            currentCell.setAttribute("cellID", "1");

        }else
        {
            currentCell.setAttribute("cellID", "0");
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

function gameDisplay(DisplayRowIndex, DisplayColIndex)
{
    document.getElementById("mazeDisplay").style["borderTop"] = "2vh solid";
    document.getElementById("mazeDisplay").style["borderRight"] = "2vh solid";
    document.getElementById("mazeDisplay").style["borderLeft"] = "2vh solid";
    document.getElementById("mazeDisplay").style["borderBottom"] = "2vh solid";

    if(DisplayRowIndex == 1 && DisplayColIndex == 1)
    {
        document.getElementById("mazeDisplay").style.borderTopColor = "red";
    }
    else
    {
        document.getElementById("mazeDisplay").style.borderTopColor = "black";
    }

    if(DisplayRowIndex == mazeWidth && DisplayColIndex == mazeHeight)
    {
        document.getElementById("mazeDisplay").style.borderBottomColor = "green";
    }
    else
    {
        document.getElementById("mazeDisplay").style.borderBottomColor = "black";
    }

    var currentPosition = document.getElementById("cell_" + DisplayRowIndex + "_" + DisplayColIndex);

    switch(currentPosition.getAttribute("cellID"))
    {
        case "15":
            document.getElementById("mazeDisplay").style["borderTop"] = "none";
            document.getElementById("mazeDisplay").style["borderBottom"] = "none";
            document.getElementById("mazeDisplay").style["borderLeft"] = "none";
            document.getElementById("mazeDisplay").style["borderRight"] = "none";
            break;

        case "14":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "13":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            break;

        case "12":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "11":
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "10":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            break;

        case "9":
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "8":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            break;
            
        case "7":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "6":
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            break;

        case "5":
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;

        case "4":
            document.getElementById("mazeDisplay").style["border-top"] = "none";
            break;

        case "3":
            document.getElementById("mazeDisplay").style["border-bottom"] = "none";
            break;

        case "2":
            document.getElementById("mazeDisplay").style["border-left"] = "none";
            break;

        case "1":
            document.getElementById("mazeDisplay").style["border-right"] = "none";
            break;
    }   

}

function gameMovement(e)
{
    var key_code = e.which || e.keyCode;
    switch (key_code)
    {
        case 37: //left arrow key
            moveLeft();
            break;

        case 38: //Up arrow key
            moveUp();
            break;

        case 39: //right arrow key
            moveRight();
            break;

        case 40: //down arrow key
            moveDown();
            break;
    }

    gameDisplay(currentX, currentY);
}

function moveLeft()
{
    if(document.getElementById("mazeDisplay").style["borderLeft"] != "none")
    {
        return;
    }
    else
    {
        currentX--;
        return currentX;
    }
}

function moveUp()
{
    if(document.getElementById("mazeDisplay").style["borderTop"] != "none")
    {
        return;
    }
    else
    {
        currentY++;
        return currentY;
    }
}

function moveRight()
{
    if(document.getElementById("mazeDisplay").style["borderRight"] != "none")
    {
        return;
    }
    else
    {
        currentX++;
        return currentX;
    }
}

function moveDown()
{
    if(document.getElementById("mazeDisplay").style["borderBottom"] != "none")
    {
        return;
    }
    else
    {
        currentY--;
        return currentY;
    }
}

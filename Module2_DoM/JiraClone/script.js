
let addBtn = document.querySelector(".add");
let body = document.querySelector("body");

let grid = document.querySelector(".grid");
let colors = ["pink", "blue", "green", "black"];

let allFiltersChildren = document.querySelectorAll(".filter div");

for (let i = 0 ; i < allFiltersChildren.length ; i++){
    allFiltersChildren[i].addEventListener("click", function(e){
        if (e.currentTarget.classList.contains("color-selected")){
            e.currentTarget.classList.remove("color-selected");
            loadTasks();
            return;
        } else {
            e.currentTarget.classList.add("color-selected");
        }
        
        let filterColor = e.currentTarget.classList[0];
        loadTasks(filterColor);
    });
}

let deleteBtn = document.querySelector(".delete");
let deleteMode = false;

if (localStorage.getItem("AllTickets") == undefined){
    let allTickets = {};

    allTickets = JSON.stringify(allTickets);

    localStorage.setItem("AllTickets", allTickets);
}

loadTasks();

deleteBtn.addEventListener("click", function(e){
    if (e.currentTarget.classList.contains("delete-selected")){
        e.currentTarget.classList.remove("delete-selected");
        deleteMode = false;
    } else {
        e.currentTarget.classList.add("delete-selected");
        deleteMode = true;
    }
})

addBtn.addEventListener("click", function(){

    // delete moda off krne k liye
    deleteBtn.classList.remove("delete-selected");
    deleteMode = false ;

    let preModal = document.querySelector(".modal");
    if (preModal != null) return;

    let div = document.createElement("div");

    div.classList.add("modal");

    div.innerHTML = `<div class="task-section">
        <div class="task-inner-container" contenteditable="true"></div>
    </div>
    <div class="modal-priority-section">
        <div class="priority-inner-container">
            <div class="modal-priority pink"></div>
            <div class="modal-priority blue"></div>
            <div class="modal-priority green"></div>
            <div class="modal-priority black selected"></div>
        </div>
    </div>`;

    let ticketColor = "black";

    let allModalPriority = div.querySelectorAll(".modal-priority");

    for (let i=0 ; i < allModalPriority.length ; i++){
        allModalPriority[i].addEventListener("click", function(e){

            for (let j=0 ; j<allModalPriority.length ; j++){
                allModalPriority[j].classList.remove("selected");
            }

            e.currentTarget.classList.add("selected");

            ticketColor = e.currentTarget.classList[1];
        });
    }

    let taskInnerContainer = div.querySelector(".task-inner-container");

    taskInnerContainer.addEventListener("keydown", function(e){
        if (e.key == "Enter"){

            let id = uid();
            let task =  e.currentTarget.innerText ;

            // Steps to save data in local storage
            // Step 1 => jobhi data hai localStorage m use lekr aao
            
            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            // Step 2 => jo data aya hai use update kro

            let ticketObj = {
                color : ticketColor,
                taskValue : task,
            };

            allTickets[id] = ticketObj;

            // Step 3 => wapis updated object ko localStorage m save kr do

            localStorage.setItem("AllTickets", JSON.stringify (allTickets))



            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.setAttribute("data-id", id);

            

            ticketDiv.innerHTML = `<div data-id="${id}" class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id">
                #${id}
            </div>
            <div class="actual-task" contenteditable="true"> 
                ${task}
            </div>` ;

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            let actualTaskDIv = ticketDiv.querySelector(".actual-task");

            actualTaskDIv.addEventListener("input", function(e){
                let updatedTask = e.currentTarget.innerText;

                let currTicketId = e.currentTarget.getAttribute("data-id");
                
                // 1.fetch
                let allTickets = JSON.parse(localStorage.getItem("Alltickets"));

                // 2. update
                allTickets[currTicketId].taskValue = updatedTask ;

                // 3.save
                localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            })

            ticketColorDiv.addEventListener("click", function(e){
              // let colors = ["pink", "blue", "green", "black"];

              let currTicketId = e.currentTarget.getAttribute("data-id")

              let currColor = e.currentTarget.classList[1];
              let index = -1 ;
              for (let i=0 ; i<colors.length ; i++){
                if (colors[i] == currColor) index = i ;
              }

              index++ ;
              index = index % 4;

              let newColor = colors[index];

              
              // 1- Alln tickets lana ; 2- update karna ; 3- Wapis save karna

              let allTickets = JSON.parse(localStorage.getItem("AllTIckets"));

              allTickets[currTicketId].color = newColor;

              localStorage.setItem("AllTickets", JSON.stringify(allTickets));
              

              ticketColorDiv.classList.remove(currColor);
              ticketColorDiv.classList.add(newColor);
            });

            ticketDiv.addEventListener("click", function(e){
                if (deleteMode){

                    // TO delete ticket from localStorage after deleting from ui
                    // 1. Fetch id
                    let currTicketId = e.currentTarget.getAttribute("data-id");

                    // Deleting from UI
                    e.currentTarget.remove();

                    // 2. Fetch saved data from localStorage
                    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                    // 3. Updata - Simply deleting data of ticket from storage
                    delete allTickets[currTicketId];

                    // 4. Save - Saving updated data item
                    localStorage.setItem("ALlTickets", JSON.stringify(allTickets));
                }
            })

            grid.append(ticketDiv);
            div.remove();
        } else if (e.key === "Escape"){
          div.remove();
        }
    });

    body.append(div);
});



function loadTasks(color){
    let ticketsOnUi = document.querySelectorAll(".ticket");

    for (let i = 0 ; i < ticketsOnUi.length ; i++){
        ticketsOnUi[i].remove();
    }

    // 1. Fetch allTickets data

    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

    // 2. Create Tickets UI for each ticket obj
    // 3. Attach required listeners
    // 4. Add Tickets in the grid section of UI

    for (x in allTickets){
        let currTicketId = x ;
        let singleTicketObj = allTickets[x]; // e.g., pink

        // Passed color was black
        if (color){
            if (color != singleTicketObj.color) continue;
        }

        let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.setAttribute("data-id", currTicketId);

            

            ticketDiv.innerHTML = `<div data-id="${currTicketId}" class="ticket-color ${singleTicketObj.color}"></div>
            <div class="ticket-id">
                #${currTicketId}
            </div>
            <div class="actual-task" contenteditable="true"> 
                ${singleTicketObj.taskValue}
            </div>` ;

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            let actualTaskDIv = ticketDiv.querySelector(".actual-task");

            actualTaskDIv.addEventListener("input", function(e){
                let updatedTask = e.currentTarget.innerText;

                let currTicketId = e.currentTarget.getAttribute("data-id");
                
                // 1.fetch
                let allTickets = JSON.parse(localStorage.getItem("Alltickets"));

                // 2. update
                allTickets[currTicketId].taskValue = updatedTask ;

                // 3.save
                localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            })

            ticketColorDiv.addEventListener("click", function(e){
              // let colors = ["pink", "blue", "green", "black"];

              let currTicketId = e.currentTarget.getAttribute("data-id")

              let currColor = e.currentTarget.classList[1];
              let index = -1 ;
              for (let i=0 ; i<colors.length ; i++){
                if (colors[i] == currColor) index = i ;
              }

              index++ ;
              index = index % 4;

              let newColor = colors[index];

              
              // 1- Alln tickets lana ; 2- update karna ; 3- Wapis save karna

              let allTickets = JSON.parse(localStorage.getItem("AllTIckets"));

              allTickets[currTicketId].color = newColor;

              localStorage.setItem("AllTickets", JSON.stringify(allTickets));
              

              ticketColorDiv.classList.remove(currColor);
              ticketColorDiv.classList.add(newColor);
            });

            ticketDiv.addEventListener("click", function(e){
                if (deleteMode){

                    // TO delete ticket from localStorage after deleting from ui
                    // 1. Fetch id
                    let currTicketId = e.currentTarget.getAttribute("data-id");

                    // Deleting from UI
                    e.currentTarget.remove();

                    // 2. Fetch saved data from localStorage
                    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                    // 3. Updata - Simply deleting data of ticket from storage
                    delete allTickets[currTicketId];

                    // 4. Save - Saving updated data item
                    localStorage.setItem("ALlTickets", JSON.stringify(allTickets));
                }
            })

            grid.append(ticketDiv);

    }
}





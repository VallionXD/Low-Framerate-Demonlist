/* index.html script */

/*
    * List Data Information *

    The list works by storing the top 150 levels, from the main and extended list.
    When a level is pushed to legacy, we do not store placement, since anything in legacy is not worth maintaining an accurate ranking.

*/

// Get the list data.
const GetListData = async () => {
    try {
        // Fetch the list data.
        const Response = await fetch("./Data/List.json", {
            method: "GET",
        });

        // If the response succeeds.
        if (Response.ok) {
            let Data = await Response.json();
            return Data;
        }

        // If the response does not succeed.
        else if (!Response.ok) {
            console.error(`HTTP error! status: ${Response.status}`);
        }

    // Catch any errors.
    } catch (Err) {
        console.error("Error fetching List Data:", Err.message);
    }
};

// // Get the list data.
// const GetListData = async () => {
//     try {
//         // Fetch the list data.
//         await fetch("/Data/List.json", {
//             // Set the method to get.
//             "method": "GET",
//         })
//         .then(Response => Response.json())
//         .then(Data => ListData = Data);
//     } catch (Err) {
//         throw new Error(Err); 
//     }
// }

// Function to create an level on the list page.
const CreateLevel = (Image, Placement, Title, Creator) => {
    console.log(`
        ${Image}
        ${Placement}
        ${Title}
        ${Creator}
        `);

    try {
        // Get the levels list.
        const LevelsList = document.querySelector(".levels");

        // Create the elements.
        const Card = document.createElement("div");
        const ImageContainer = document.createElement("div");
        const LevelPreviewImage = document.createElement("img");
        const PlayButtonContainer = document.createElement("div");
        const PlayButtonBackground = document.createElement("div");
        const PlayButtonIcon = document.createElement("span"); // TODO: Switch to an svg instead of using a possibly unsupported text character.
        const CardContent = document.createElement("div");
        const LevelTitle = document.createElement("h2");
        const LevelCreator = document.createElement("p");

        // Set the classes.
        Card.setAttribute("class", `max-w-2xl mb-8 mt-2 z-10 min-w-[80%] w-[100%] bg-[#151518] border border-[#272727] shadow-lg rounded-lg overflow-hidden flex transform transition-all duration-1000 opacity-0 hover:scale-105 hover:shadow-2xl`);
        ImageContainer.setAttribute("class", "relative w-1/3 select-none");
        LevelPreviewImage.setAttribute("class", "w-full object-cover");
        PlayButtonContainer.setAttribute("class", "absolute inset-0 flex items-center justify-center");
        PlayButtonBackground.setAttribute("class", "w-16 h-16 bg-black bg-opacity-80 rounded-full flex items-center justify-center");
        PlayButtonIcon.setAttribute("class", "text-white text-2xl rotate-90");
        CardContent.setAttribute("class", "p-4 flex flex-col justify-center");
        LevelTitle.setAttribute("class", "text-xl font-bold text-white");
        LevelCreator.setAttribute("class", "text-sm text-neutral-400 mt-2");

        // Set the image attributes.
        LevelPreviewImage.setAttribute("src", Image);
        LevelPreviewImage.setAttribute("alt", Title);
        ImageContainer.setAttribute("onclick", `alert('kys')`);

        // Set the text contents.
        PlayButtonIcon.textContent = "▲";
        LevelCreator.textContent = `${Creator}`;

        // Special level title case.
        if (Placement === null) {
            LevelTitle.tetContent = `${Title}`;
        }

        // If the level is not in the legacy list.
        else {
            LevelTitle.textContent = `${Placement} - ${Title}`;
        }

        // Card.innerHTML = `
        //     <div class="relative w-1/3 select-none">
                // <img
                //     src="${Image}"
                //     alt="Card Image"
                //     class="w-full object-cover"
                // />
        //         <!-- Dark Mode Play Button -->
        //         <div class="absolute inset-0 flex items-center justify-center">
        //             <div class="w-16 h-16 bg-black bg-opacity-80 rounded-full flex items-center justify-center">
        //                 <span class="text-white text-2xl rotate-90">▲</span>
        //             </div>
        //         </div>
        //     </div>
        //     <!-- Card Content -->
        //     <div class="p-4 flex flex-col justify-center">
        //         <h2 class="text-xl font-bold text-white">${Placement} - ${Title}</h2>
        //         <p class="text-sm text-neutral-400 mt-2">${Creator}</p>
        //     </div>`;

        // Append children to the image container
        PlayButtonBackground.appendChild(PlayButtonIcon);
        PlayButtonContainer.appendChild(PlayButtonBackground);
        ImageContainer.appendChild(LevelPreviewImage);
        ImageContainer.appendChild(PlayButtonContainer);

        // Append children to the card content
        CardContent.appendChild(LevelTitle);
        CardContent.appendChild(LevelCreator);

        // Append everything to the card
        Card.appendChild(ImageContainer);
        Card.appendChild(CardContent);

        // Append the card to the levels list
        LevelsList.appendChild(Card);

        // Return the card element.
        return Card;
    } catch (Err) {
        console.error(Err);
    }
};

// Function to create a level popup.
const LevelPopup = () => {

}

// Initialize the list.
const InitializeList = async (ListData) => {
    // Get the levels list.
    const LevelsList = document.querySelector(".levels");

    // If there is more than 0 children.
    if (LevelsList.children.length > 0) {
        // Loop through all children of the levels list.
        Object.keys(LevelsList.children).forEach(Child => {
            // Get the child elenment.
            const ChildElement = LevelsList.children[Child];

            // Remove the child element from the page.
            ChildElement.Remove();
        })
    }

    // Store the loop information.
    let EnoughLevelsToLoop = true;
    let LoopStartIndex = 1;
    let LoopEndIndex;

    // Check if the list data exists.
    if (ListData.Levels) {
        // Check if there is 75 or more levels.
        if (Object.keys(ListData.Levels).length >= 75) {
            // Set the loop end index to 75.
            LoopEndIndex = 75;
        } 
        
        // If there is not, use the length of levels instead.
        else {
            // Set the end index to the length of levels.
            LoopEndIndex = Object.keys(ListData.Levels).length;
        }
    }

    // If the function is called with some random bs.
    else {
        // Exit the function.
        return;
    }

    if (EnoughLevelsToLoop) {
        // Loop through all of the levels in the data.
        for (let Index = LoopStartIndex; LoopEndIndex >= Index; Index++) {
            try {
                // Get the level and level placement using the index.
                const LevelPlacement = ["#", Index].join("");
                const Level = ListData.Levels[`${Index}`];
                
                // Create the list element.
                const ListElement = await CreateLevel(
                        // Set the image / video icon of the level.
                        Level.Image,

                        // Set the placement of the level.
                        LevelPlacement,

                        // Set the title / name of the level.
                        Level.Title,

                        // Set the creator of the level.
                        Level.Creator
                );

                // Whenever the user clicks the list entry.
                ListElement.addEventListener("click", (Event) => {
                    // Get the current URI.
                    const CurrentURI = new URL(window.location.href);

                    // Determine the base path (fallback if "index.html" isn't in the URL).
                    const BasePath = CurrentURI.pathname.replace(/index\.html$/, "").replace(/\/$/, "");

                    // Construct the new URL.
                    const NewURL = `${CurrentURI.origin}${BasePath}/record.html?Record=${Index}`;

                    // Redirect to the new URL.
                    window.location.assign(NewURL);
                })

                setTimeout(() => {
                    // Remove the invisible class.
                    ListElement.classList.remove("opacity-0");

                    setTimeout(() => {
                        // Replace the duration.
                        ListElement.classList.replace("duration-1000", "duration-500")
                    }, 1100)
                }, 750);
            } catch (Err) {
                console.error(Err);
            }
        }
    }
};

// Main function, to use async.
const Main = async () => {
    // Initialize the list data.
    ListData = await GetListData();

    // Get the levels element.
    const Levels = document.querySelector(".levels");

    // Set the default height for the levels container.
    let DefaultContainerHeight = 75;

    // If there is not 75 levels on the list.
    if (Object.keys(ListData.Levels).length < DefaultContainerHeight) {
        // Set the default container height to the length of the list.
        DefaultContainerHeight = Object.keys(ListData.Levels).length;
    }

    // Calculate the new max height for the levels container.
    const CalculatedHeight = (DefaultContainerHeight * (125 + 16 * 2 + 1 + 32)); // (Levels * (125+16*2+1+32))

    // Set the new max height property. (Allows for proper transitioning)
    Levels.style.maxHeight = `${CalculatedHeight}px`
    
    // If the list data wasn't recieved properly.
    if (!ListData) {
        // Networking error.
        throw new Error("Network request error, levels list data not recieved in time.");
        
    } else {
        // Initialize the list.
        await InitializeList(ListData);
    }   

    // -=- List Rules -=- \\
    const ListRules = document.querySelector("")
}

// Call the main function when the page is loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Get the unload element.
    const UnloadElement = document.querySelector(".unload");

    // Start the transition.
    UnloadElement.classList.remove("opacity-0");

    // Call the main function,
    Main();

    // Unload event.
    window.addEventListener("beforeunload", () => {
        // Fade-out the page.
        UnloadElement.classList.replace("duration-500", "duration-300");
        UnloadElement.classList.add("opacity-0");
    });     
});
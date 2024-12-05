/* record.html script */

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

// Function to go to the homepage.
const GoBack = (CurrentURI) => {
    // Remove the query string (parameters) from the URL.
    const BaseURL = CurrentURI.origin + CurrentURI.pathname.replace("record.html", "index.html");

    // Redirect to the homepage.
    window.location.assign(BaseURL);
}


// Check and extract the parameter.
const GetRecord = () => {
    // Get the url, and search the parameters.
    const CurrentURI = new URL(window.location.href);
    const Parameters = new URLSearchParams(CurrentURI.search);

    // Construct a query-based search.
    const Query = Array.from(Parameters.keys()).find(Key => Key.toLowerCase() === "record");

    // Check if the record parameter exists.
    if (Query) {
        // Get the record parameter.
        const RecordValue = Parameters.get(Query);

        // Return the record parameter.
        return { 
            RecordValue: RecordValue,
            CurrentURI: CurrentURI 
        };
    } else {
        // Return null.
        return { 
            RecordValue: null,
            CurrentURI: CurrentURI 
        };
    }
}

// Add the record information.
const AddRecordInformation = (Placement, ListData) => {
    // Verify that the placement exists.
    if (Object.keys(ListData.Levels).length === 75 && Placement > 0 && Placement <= 75 || Object.keys(ListData.Levels).length < 75 && Placement > 0 && Placement <= Object.keys(ListData.Levels).length) {
        // Get the records element.
        const Records = document.querySelector(".records");

        // Get the level and level placement using the index.
        const LevelPlacement = ["#", Placement].join("");
        const Level = ListData.Levels[`${Placement}`];

        // Set the page title.
        document.title = `${Level.Title} - Low Framerate Demonlist`;

        // Create the list records.
        Object.keys(Level.Records).forEach(Record => {
            // Get the record data.
            const RecordData = Level.Records[Record];
            
            // Create the elements.
            const RowContainer = document.createElement("tr");
            const RecordHolder = document.createElement("th");
            const RecordProgress = document.createElement("td");
            const RecordFramerate = document.createElement("td");
            const RecordVideoProof = document.createElement("td");
            const RecordVideoLink = document.createElement("a");

            // Set the classes.
            RowContainer.setAttribute("class", "bg-[#151518] border-t border-[#26272b]");
            RecordHolder.setAttribute("class", "px-6 py-4 font-medium text-neutral-300 whitespace-nowrap");
            RecordProgress.setAttribute("class", "px-6 py-4");
            RecordFramerate.setAttribute("class", "px-6 py-4");
            RecordVideoProof.setAttribute("class", "px-6 py-4");
            RecordVideoLink.setAttribute("class", "text-blue-600 font-medium whitespace-nowrap");

            // Set the row scope.
            RecordHolder.setAttribute("scope", "row");

            // Set the text contents.
            RecordHolder.textContent = Record;
            RecordProgress.textContent = RecordData.Progress;
            RecordFramerate.textContent = RecordData.Framerate;
            RecordVideoLink.textContent = RecordData.VideoPlatform;

            // Set the link uri.
            RecordVideoLink.setAttribute("src", RecordData.VideoURI);

            // Append the children.
            Records.appendChild(RowContainer);
            RowContainer.appendChild(RecordHolder);
            RowContainer.appendChild(RecordProgress);
            RowContainer.appendChild(RecordFramerate);
            RowContainer.appendChild(RecordVideoProof);
            RecordVideoProof.appendChild(RecordVideoLink);
        });

        // Get the template infos.
        const LevelTitle = document.querySelector(".title");
        const LevelCreator = document.querySelector(".creator");
        const LevelID = document.querySelector(".levelid");
        const LevelGDBrowser = document.querySelector(".gdbrowser");
        const VideoElement = document.querySelector(".video");

        // Set the proper information.
        LevelTitle.textContent = `${LevelPlacement} - ${Level.Title}`;
        LevelCreator.textContent = `${Level.Creator}`;
        LevelGDBrowser.innerHTML = `<b>View on GDBrowser:</b> <a class="text-blue-600" href="https://gdbrowser.com/${Level.LevelID}">https://gdbrowser.com/${Level.LevelID}</a>`;
        LevelID.innerHTML = `<b>Level ID:</b> ${Level.LevelID}`;
        VideoElement.src = `https://www.youtube.com/embed/${Level.ID}`;
    }



//     <tr class="bg-[#151518] border-b border-[#26272b]">
//     <th scope="row" class="px-6 py-4 font-medium text-neutral-300 whitespace-nowrap">
//         Apple MacBook Pro 17"
//     </th>
//     <td class="px-6 py-4">
//         Silver
//     </td>
//     <td class="px-6 py-4">
//         Laptop
//     </td>
//     <td class="px-6 py-4">
//         $2999
//     </td>
// </tr>
}

// Main function, to use async.
const Main = async () => {
    // Get the main element.
    const MainElement = document.querySelector(".main");

    // Get the list data.
    const ListData = await GetListData();

    // Get the record parameter.
    const Record = GetRecord();

    // Extract the data from it.
    const CurrentURI = Record.CurrentURI;
    const RecordValue = Record.RecordValue;

    // If record is not null.
    if (RecordValue) {
        // Add record information.
        AddRecordInformation(RecordValue, ListData);

        // Remove the hidden & opacity zero class from main.
        MainElement.classList.remove("hidden");
        MainElement.classList.remove("opacity-0");
    } else {
        // Go back to the homepage.
        GoBack(CurrentURI);
    }
}

// Call the main function when the page is loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Get the unload element.
    const UnloadElement = document.querySelector(".unload");

    // Call the main function,
    Main();

    // Unload event.
    window.addEventListener("beforeunload", () => {
        // Fade-out the page.
        UnloadElement.classList.replace("duration-500", "duration-300");
        UnloadElement.classList.add("opacity-0");
    });     
});

window.onload = function () {
    Papa.parse("../../listofnames.csv", {
        header: true,
        download: true,
        complete: function (results) {
            displayData(results.data);
        }
    });
  
};

function parseDate(dateString) {

    const parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}



let isOpen = 0
function revealSearchBar() {
    const searchBar = document.getElementById("search-bar");



    if (isOpen === 1) {
        searchBar.style.display = "none";
        isOpen -= 1

    }

    else {

        searchBar.style.display = "block";
        isOpen += 1

    }
};


function displayData(data) {
    var displayDiv = document.getElementById("data-display");

    var html = "";
 

    data.forEach(function (row) {
    
        let photo = "<div class='data-display-profile'><div class='data-display-profile-child'><img src=" + row.Photo + "></div><div class='data-display-profile-child'><h4>"
        let name = row.First_Name_S + " " + row.Family_Name
        if (row.Location === "") {
            locationPlace = "Palestine"
        }
        else {
            locationPlace = ", " + row.Location + ""
        }

        if (row.DOB === "") {
            DOBdate = "Date of death: "
        }
        else {
            DOBdate = row.DOB + " - "
        }

        if (row.DOD === "") {
            DODdate = "unknown"

        }
        else {
            DODdate = row.DOD

        }

        if (row.Age === "") {


            try {
                const timeDifference = parseDate(row.DOD) - parseDate(row.DOB);

                const daysDifference = timeDifference / (1000 * 60 * 60 * 24);



                ageyear = ", aged " + Math.floor(daysDifference / 365);

            }




            catch (error) { ageyear = ", age unknown" }
        }
        else {
            ageyear = ", aged " + row.Age
        }

        let agedates = "<br>" + DOBdate + " " + DODdate + ageyear

        if (row.Cause_of_death === "") {

            causeofdeath = "<br>Cause of Death: Unknown"
        }
        else {
            causeofdeath = "<br>Cause of Death: " + row.Cause_of_death
        }
        if (row.Submitted_By_Name === "") {
            Submittedname = "Anonymous"
        }
        else {
            Submittedname = row.Submitted_By_Name
        }

        if (row.Submitted_By_Rel === "") {
            Submittedrel = "Relationship unknown"
        }
        else {
            Submittedrel = row.Submitted_By_Rel
        }


        let obituary = "</h4><div class='data-display-profile-grandchild'><p>" + row.Obituary + " - by " + Submittedname + ", " + Submittedrel + "</p></div></div></div>";
        html += photo + name + locationPlace + agedates + causeofdeath + obituary
    });

    html += "</ul>";
    displayDiv.innerHTML = html;
}


function filterData() {
    console.log("Searching")
    isOpen -= 1
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log(searchTerm)

    Papa.parse("../../listofnames.csv", {
        header: true,
        download: true,
        complete: function (results) {
            console.log(results)

            const filteredData = results.data.filter(row =>
                Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                )
            );
            console.log(filteredData)
            displayData(filteredData);
        }
    });

    
}
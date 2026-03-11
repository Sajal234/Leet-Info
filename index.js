addEventListener("DOMContentLoaded",function(){

    const searchBtn = document.getElementById("searchButton");
    const usrName = document.getElementById("username");
    const statsContainer = document.querySelector(".userStats");
    const easyCircle = document.querySelector(".easy");
    const mediumCircle = document.querySelector(".medium");
    const hardCircle = document.querySelector(".hard");
    const easyLabel = document.getElementById("easy");
    const mediumLabel =  document.getElementById("medium");
    const hardLabel =  document.getElementById("hard");
    const cardsContainer = document.querySelector(".cards");
    const img = document.querySelector("#usrImg")



    function updateCircle(total, solved, label, circle){
        const per = (solved/total);
        const degree = per * 360;
        circle.style.setProperty("--progress-degree", `${degree}deg`); // Correctly sets a degree value
        
        // Check if the label already contains the full string
        const currentText = label.textContent;
        if (currentText.includes(':')) {
            // If it does, update the value
            label.textContent = `${currentText.split(':')[0].trim()} : ${solved} (${(per * 100).toFixed(1)}%)`;
        } 
        else {
            // Otherwise, set the initial full string
            label.textContent = `${currentText} : ${solved} (${(per * 100).toFixed(1)}%)`;
        }
    }

    // display user
    function displayUser(parsedData){

        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;
        
        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;


        const imgurl = parsedData.data.matchedUser.profile.userAvatar;
        img.src = imgurl;
        console.log("Solved easy :", solvedEasyQues)
        console.log("Solved medium :", solvedMediumQues)
        console.log("Solved hard :", solvedHardQues)
        
        console.log("Total easy :", totalEasyQues)
        console.log("Total medium :", totalMediumQues)
        console.log("Total hard :", totalHardQues)



        updateCircle(totalEasyQues, solvedEasyQues, easyLabel, easyCircle)
        updateCircle(totalMediumQues, solvedMediumQues, mediumLabel, mediumCircle)
        updateCircle(totalHardQues, solvedHardQues, hardLabel, hardCircle)

    }


    // valid userName or not
    function validUsername(userName){
        if(userName.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,30}$/;
        if(!regex.test(userName)){
            alert("Invalid username");
            return false;
        }
        return true;
    }

    // api call
    async function userDetails(userName) {
        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;
            
            // get req access first from this link
            // https://cors-anywhere.herokuapp.com/corsdemo


            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        totalSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        }
                        profile {
                            userAvatar
                        }
                    }
                    }
                `,
                variables: { "username": userName }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl + targetUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const parsedData = await response.json(); // <-- yaha data extract
            console.log("API Response:", parsedData);


            displayUser(parsedData);

        } catch (err) {
            console.error("Error Occurred:", err);
            statsContainer.innerHTML = `<h1>Error Occurred !!</h1>`;
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }



    searchBtn.addEventListener("click", function(){
        const userName = usrName.value;
        console.log("Logging user : ",userName);

        if(validUsername(userName)){
            userDetails(userName);
        }
    });
});
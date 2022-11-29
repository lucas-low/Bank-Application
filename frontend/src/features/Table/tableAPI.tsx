
const API_URL = 'http://localhost:3000';


export async function fetchAccounts() {
    console.log("fetched accounts");
    fetch(`${API_URL}/bank.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
            console.log(resultData);
            return resultData;
        }
        )
}

//     fetch(`${API_URL}/bank.json`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => response.json())
//         .catch((error) => {
//             console.log("Error: ", error);
//             console.log("GET success")
//             return {} as AccountsState;
//         });
// }

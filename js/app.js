//fetch the json data on input field
//create a filter array to only display the input value
//display this filter array in the matchList

const search = document.getElementById("search");
const matchList = document.querySelector("#match-list");

// On keypress send the request to the api

search.addEventListener("keyup", () => {
  searchStates(search.value);
});

// Api Request
const searchStates = async (searchText) => {
  const res = await fetch("../data/state_capitals.json");
  const states = await res.json();
  console.log(states);

  // Get matches to current text input
  // filter return an array base on the user input
  // 'gi' - match all instances of the pattern in a string
  // RegExp object is used for matching text.
  // new regex - cria un novo construtor que vai filtrar o array com base num input
  let matches = states.filter((state) => {
    const find = new RegExp(`^${searchText}`, "gi");
    return state.name.match(find);
  });

  console.log(matches);

  // hide the match-list if the input is empty
  const hide = document.getElementById("match-list");
  let textarea = document.getElementById("search");

  if (textarea.value == 0) {
    hide.style.display = "none";
  } else {
    hide.style.display = "block";
  }

  //this function will display each state found in the search
  useApiData(matches);
};

function useApiData(matches) {
  let useApiData = "";
  matches.forEach((match) => {
    useApiData += `
            <div class="card card-body m-1">
                <h4>${match.name}</h4>
            </div>
        `;
  });
  matchList.innerHTML = useApiData;
}

const inputField = document.getElementById('inputField');
const cardField = document.getElementById('cardField');


const visitResult = () => {
    const searchText = inputField.value;
    cardField.innerHTML = '';

   // dynamic url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    inputField.value = '';

    fetch(url)
    .then(response => response.json())
    .then(data => displayResult(data))
}


const displayResult = data => {
     
    //error handle start
    if (data.numFound === 0) {
      alert('No Result Found.')
  } 
      //error handle end



      // total result part start
  const totalResult = document.getElementById('total-results');
   totalResult.innerText = `Total search result: ${data.numFound}`;
      // total result part end

   // search card part start

    data.docs.forEach(item => {
        const url = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
               <div class = "card h-100">
                 <img src="${url}" class= "card-img-top" alt = "No phpto">
                 <div class = "card-body">
                     <h3 class = "card-title">${item.title}</h3>
                     <h5> Author: ${item?.author_name} </h5>
                     <h5> First Publish Year: ${item.first_publish_year ? item.first_publish_year: ""} </h5>
                     <h5> publisher Name: ${item.publisher ? item.publisher: ""} </h5>
                 </div>
               </div>
         `;
        cardField.appendChild(div);
    })
}
// search card part end
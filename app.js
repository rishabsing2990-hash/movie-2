// if (!localStorage.getItem('user')) {
//   window.location.href = 'login.html';
// }
let loginLink = document.getElementById('login');
let user = JSON.parse(localStorage.getItem('user'));

if (user) {
  loginLink.innerText = `Logout (${user.username})`;
  loginLink.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.reload();
  });
} else {
  loginLink.href = 'login.html';
}
let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards= document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');


left_btn.addEventListener('click',()=>{
     cards.scrollLeft -= 140;
})
right_btn.addEventListener('click',()=>{
     cards.scrollLeft += 140;
})

let json_url = "movie.json"

fetch(json_url)
  .then(response => response.json())
  .then((data) => {
    data.forEach((ele,i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let card = document.createElement('a');
      card.classList.add('card');
      card.href = url || "#";
      card.innerHTML = `
        <img src="${sposter}" alt="" class="poster" />
        <div class="restcard">
          <img src="${bposter}" alt="" />
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
            </div>
          </div>
        </div>
      `
      cards.appendChild(card);
  });
     document.getElementById('title').innerText = data[0].name;
     document.getElementById('genre').innerText = data[0].genre;
     document.getElementById('date').innerText = data[0].date;
     document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;

       //filter 
       let genreLinks = document.querySelectorAll('.genre-filter');

genreLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let selectedGenre = link.getAttribute('data-genre');
    cards.innerHTML = '';

    let genre_array = data.filter(ele => ele.genre.includes(selectedGenre));
    
    genre_array.forEach((ele) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let card = document.createElement('a');
      card.classList.add('card');
      card.href = url || "#";
      card.innerHTML = `
        <img src="${sposter}" alt="" class="poster" />
        <div class="restcard">
          <img src="${bposter}" alt="" />
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
            </div>
          </div>
        </div>
      `;
      cards.appendChild(card);
    });
  });
}); 
// //watchlist
// document.getElementById('watchlist').addEventListener('click', () => {
//   cards.innerHTML = '';
//   let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

//   watchlist.forEach((ele) => {
//     let { name, imdb, date, sposter, genre, url } = ele;
//     let card = document.createElement('a');
//     card.classList.add('card');
//     card.href = url || "#";
//     card.innerHTML = `
//       <img src="${sposter}" alt="" class="poster" />
//       <div class="restcard">
//         <img src="${sposter}" alt="" />
//         <div class="cont">
//           <h4>${name}</h4>
//           <div class="sub">
//             <p>${genre}, ${date}</p>
//             <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
//           </div>
//           <button class="remove-watchlist">−</button>
//         </div>
//       </div>
//     `;
//     cards.appendChild(card);

//     // Remove from watchlist
//     card.querySelector('.remove-watchlist').addEventListener('click', (e) => {
//       e.stopPropagation();
//       let updated = watchlist.filter(item => item.name !== name);
//       localStorage.setItem('watchlist', JSON.stringify(updated));
//       card.remove();
//     });
//   });
// });
     //search data load
data.forEach(element => {
  let { name, imdb, date, sposter, genre, url } = element;
  let card = document.createElement('a');
  card.classList.add('card');
  card.href = url;
  card.innerHTML = `
    <img src="${sposter}" alt="">
    <div class="cont">
      <h3>${name}</h3>
      <p>${genre}, ${date},<span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</p>
    </div>
  `;
  search.appendChild(card);
});


  // search filter
        search_input.addEventListener('keyup', ()=>{
            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');

            for(let index = 0; index < a.length; index++)
            {
             let b = a[index].getElementsByClassName('cont')[0];
             let TextValue = b.textContent || b.innerText;
             if(TextValue.toUpperCase().indexOf(filter)>-1)
            {
                a[index].style.display = "flex";
                search.style.visibility = "visible"
                search.style.opacity = 1;
             }  
             else
            a[index].style.display = "none";
            }
            if(search_input.value == 0)
            {
                 search.style.visibility = "hidden";
                search.style.opacity = 0;
            }
        })

        //series filter
      let series = document.getElementById('series');  
        series.addEventListener('click', () => {
        cards.innerHTML = '';
       
        let series_array = data.filter(ele =>{
            return ele.type === "series";
        });
         
        series_array.forEach((ele,i) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url || "#";
            card.innerHTML = `
         <img src="${sposter}" alt="" class="poster" />
         <div class="restcard">
          <img src="${bposter}" alt="" />
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
            </div>
          </div>
        </div>
      `
      cards.appendChild(card);
       
        });
  });
  // movie filter
        let movies = document.getElementById('movies');
        movies.addEventListener('click', () => {
        cards.innerHTML = '';
       
        let movies_array = data.filter(ele =>{
            return ele.type === "movie";
        });
         
        movies_array.forEach((ele,i) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url || "#";
            card.innerHTML = `
         <img src="${sposter}" alt="" class="poster" />
         <div class="restcard">
          <img src="${bposter}" alt="" />
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
            </div>
          </div>
        </div>
      `
      cards.appendChild(card);
       

});

});
  });


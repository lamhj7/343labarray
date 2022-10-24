console.log(data);
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards

const courseToCard = ({
  prefix,
  number,
  title,
  url,
  desc,
  prereqs,
  credits,
}) => {
  const prereqLinks = prereqs
    .map((prereq) => `<a href="#" class="card-link">${prereq}</a>`)
    .join();
  const courseTemplate = `<div class="col">
            <div class="card" style="width: 18rem;">
              <h3 class="card-header"><a href="${url}">${title}</a></h3>
              <div class="card-body">
                <h5 class="card-title">${prefix} ${number}</h5>
                <p class="card-text">${desc}</p>
                ${prereqLinks}
                <div class="card-footer text-muted">
                  ${credits}
                </div>
              </div>
            </div>
          </div>`;
  return courseTemplate;
};
const resultsContainer = document.querySelector("#filtered-results");
const courses = data.items;
const courseCards = data.items.map(courseToCard);
let filteredCourseCards = courseCards;
resultsContainer.innerHTML = filteredCourseCards.join("");
// courseCards.forEach((c) => document.write(c));

// console.log(courseCards);
// document.write(courseCards.join(''))

// 2. maybe we only show those that match the search query?
//

const filterCourseCard = (markup, query) => {
  console.log(markup, query);
  return markup.toLowerCase().includes(query.toLowerCase());
};

const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", (ev) => {
  console.log(ev);
  ev.preventDefault();
  // ev.stopPropagation();
  console.log("query text");
  const searchField = document.querySelector('input[name="query-text"]');
  const queryText = searchField.value;
  console.log(queryText);
  filteredCourseCards = courseCards.filter((card) =>
    filterCourseCard(card, queryText)
  );
  console.log('filteredCourseCards', filteredCourseCards);
  resultsContainer.innerHTML = filteredCourseCards.join("");
  updateCount();
  updateCredits();
  updatePrereqs();
});

// 3. we update the result count and related summary info as we filter
function updateCount() {
  const count = document.getElementById("result-count");
  const countValue = filteredCourseCards.length;
  count.innerText = `${countValue} `;
}

updateCount();

function updateCredits() {
  const credits = document.getElementById("credit-count");
  totalCredits = 0;
  const countCredits = document.querySelectorAll('.card-footer.text-muted');
  countCredits.forEach(credit => {
    totalCredits += parseInt(credit.innerText);
  });
  credits.innerText = `${totalCredits}`;
}

updateCredits();

function updatePrereqs() {
  const prereqs = document.getElementById("prereq-count");
  totalPrereqs = 0;
  const countPrereqs = document.querySelectorAll('.card-link');
  totalPrereqs = 3 * countPrereqs.length;
  prereqs.innerText = `${totalPrereqs}`;
}

updatePrereqs();
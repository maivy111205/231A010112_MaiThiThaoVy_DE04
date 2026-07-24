const moviesData = [
    {
        id: 1,
        title: "Detective Conan: The Million-dollar Pentagram",
        year: 2024,
        genre: "Hoạt hình",
        director: "Tomoka Nagaoka",
        cast: "Kappei Yamaguchi, Minami Takayama",
        description: "Thanh kiếm của Shinsengumi liên quan đến một kho báu lớn ở Hakodate bị Kaitou Kid nhắm tới, kéo theo Heiji Hattori và Conan vào cuộc chiến suy luận gay cấn.",
        poster: "images/conan1.jpg"
    },
    {
        id: 2,
        title: "Detective Conan: Black Iron Submarine",
        year: 2023,
        genre: "Hoạt hình",
        director: "Yuzuru Tachikawa",
        cast: "Minami Takayama, Megumi Hayashibara",
        description: "Vụ án diễn ra tại cơ sở 'Pacific Buoy' của Interpol dưới biển. Tổ chức Áo Đen bắt cóc một nữ kỹ sư để nắm giữ hệ thống nhận diện khuôn mặt toàn cầu.",
        poster: "images/conan2.jpg"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: "Hành động",
        director: "Christopher Nolan",
        cast: "Christian Bale, Heath Ledger",
        description: "Khi mối đe dọa mang tên Joker tàn phá thành phố Gotham, Batman phải đối mặt với thử thách lớn nhất.",
        poster: "images/batman.jpg"
    },
    {
        id: 4,
        title: "Inception",
        year: 2010,
        genre: "Khoa học viễn tưởng",
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
        description: "Một tên trộm đánh cắp bí mật thông qua công nghệ chia sẻ giấc mơ được giao nhiệm vụ cấy ý tưởng.",
        poster: "images/inception.jpg"
    },
    {
        id: 5,
        title: "Interstellar",
        year: 2014,
        genre: "Khoa học viễn tưởng",
        director: "Christopher Nolan",
        cast: "Matthew McConaughey, Anne Hathaway",
        description: "Nhóm các nhà thám hiểm du hành qua một lỗ sâu trong không gian để đảm bảo sự sống còn cho loài người.",
        poster: "images/interstellar.jpg"
    }
];

const movieGrid = document.getElementById("movie-grid");
const searchInput = document.getElementById("search-input");
const genreCheckboxesContainer = document.getElementById("genre-checkboxes");
const modal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");
const themeToggleBtn = document.getElementById("theme-toggle");

function displayMovies(movies) {
    movieGrid.innerHTML = "";
    if (movies.length === 0) {
        movieGrid.innerHTML = "<p>Không tìm thấy bộ phim nào phù hợp.</p>";
        return;
    }
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p>Năm: ${movie.year} | ${movie.genre}</p>
            </div>
        `;
       
        card.addEventListener("click", () => openModal(movie));
        movieGrid.appendChild(card);
    });
}

function setupGenres() {
    const genres = [...new Set(moviesData.map(m => m.genre))];
    genreCheckboxesContainer.innerHTML = "";
    genres.forEach(genre => {
        const div = document.createElement("div");
        div.style.marginBottom = "5px";
        div.innerHTML = `
            <label style="font-weight: normal; cursor: pointer;">
                <input type="checkbox" value="${genre}" class="genre-checkbox"> ${genre}
            </label>
        `;
        genreCheckboxesContainer.appendChild(div);
    });

    document.querySelectorAll(".genre-checkbox").forEach(chk => {
        chk.addEventListener("change", filterAndSearchMovies);
    });
}


function filterAndSearchMovies() {
    const keyword = searchInput.value.toLowerCase().trim();
    

    const selectedGenres = Array.from(document.querySelectorAll(".genre-checkbox:checked"))
                                .map(chk => chk.value);

    const filtered = moviesData.filter(movie => {
        const matchesKeyword = movie.title.toLowerCase().includes(keyword);
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
        return matchesKeyword && matchesGenre;
    });

    displayMovies(filtered);
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debouncedSearch = debounce(filterAndSearchMovies, 400);
searchInput.addEventListener("input", debouncedSearch);

function openModal(movie) {
    modalBody.innerHTML = `
        <h2>${movie.title} (${movie.year})</h2>
        <p><strong>Thể loại:</strong> ${movie.genre}</p>
        <p><strong>Đạo diễn:</strong> ${movie.director}</p>
        <p><strong>Diễn viên:</strong> ${movie.cast}</p>
        <p><strong>Mô tả:</strong> ${movie.description}</p>
    `;
    modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Chức năng Light/Dark Mode + localStorage (Bài 3.2)
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupGenres();
    displayMovies(moviesData);
});

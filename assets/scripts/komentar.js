const COMMENT_CACHE_KEY = "comments_data";

function checkStorage() {
  return typeof Storage !== "undefined";
}

function getInputValue() {
  let comment = document.getElementById("comment");
  storeComment({ user: CurrentUser, message: comment.value });
  comment.value = "";
}

function storeComment(comment) {
  if (checkStorage) {
    let commentList = null;
    if (localStorage.getItem(COMMENT_CACHE_KEY) === null) {
      commentList = [];
    } else {
      commentList = JSON.parse(localStorage.getItem(COMMENT_CACHE_KEY));
    }

    commentList.unshift(comment);
    if (commentList.length > 100) {
      commentList.pop();
    }

    localStorage.setItem(COMMENT_CACHE_KEY, JSON.stringify(commentList));
    displayComments();
  }
}

function showComments() {
  if (checkStorage) {
    return (
      JSON.parse(localStorage.getItem(COMMENT_CACHE_KEY)) ||
      generateDummyComments()
    );
  } else {
    return [];
  }
}

function displayComments() {
  const commentData = showComments().reverse();
  let commentList = document.getElementById("comment-list");

  commentList.innerHTML = "";

  for (let cd of commentData) {
    let li = document.createElement("li");
    let current = cd.user === CurrentUser ? "card-current" : "";
    let inerHTML = `
    <div class="card ${current}">
    <h4>
      <u>${cd.user}</u>
    </h4>
    <p>${cd.message}</p>
    </div>`;

    li.innerHTML = inerHTML;

    commentList.appendChild(li);
  }
}

function clearStorage() {
  localStorage.clear();
}
function generateDummyComments() {
  const comments = [
    {
      user: "Sri Wulandari",
      message:
        "Wah artikelnya sangat bagus, saya jadi merasa lebih tau sekarang, terimakasih Kak.",
    },
    {
      user: "Panji Nugraha",
      message:
        "Oh! Ternyata banyak sekali khasiat buah dan sayur, jadi makin semangat nih buat makan buah dan sayur",
    },
    {
      user: "Sri Wulandari",
      message: "Iya Kak. Emang Bermanfaat Banget Nih, Mampir kesini :) .",
    },
    {
      user: "Caca Marica",
      message: "Nyimak kak, Ehehehe..",
    },
  ];
  localStorage.setItem(COMMENT_CACHE_KEY, JSON.stringify(comments.reverse()));
  return comments.reverse();
}
displayComments();

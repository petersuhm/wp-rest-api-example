// Simple snippet to fetch posts via the WP REST API
ready(function() {
    var loadMore = document.getElementById('load-more');

    loadPosts();

    loadMore.addEventListener('click', e => {
        e.preventDefault();

        loadPosts();
    });
});

function loadPosts() {
    var postList = document.getElementById('post-list');

    getPosts(10, postList.childElementCount).then(posts => {
        posts.forEach(post => {
            var titleElement = document.createElement('li');
            var titleText = document.createTextNode(post.title.rendered);

            titleElement.appendChild(titleText);
            postList.appendChild(titleElement);
        });
    });
}

const getPosts = (perPage = 10, offset = 0) => get('/posts', perPage, offset)

const get = (path, perPage = 10, offset = 0) => fetch(`http://localhost/wp-json/wp/v2${path}?per_page=${perPage}&offset=${offset}`)
    .then((response) => response.json())

function ready(callback) {
    document.addEventListener('DOMContentLoaded', callback, false);
}

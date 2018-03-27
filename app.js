const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 3000 || process.env.PORT;

const XKCD_URL = 'http://xkcd.com/info.0.json';
const HACKER_NEWS_URL = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty';

app.get('/', (req, res) => {
  Promise.all([getData(XKCD_URL), getData(HACKER_NEWS_URL)]).then(([comic, article]) =>
    res
      .json({ comic_title: comic.safe_title, comic_url: comic.img, article: article.url })
      .catch(err => res.status(500).send({ message: 'Oops, something has gone wrong' }))
  );
});

function getData(url) {
  return fetch(url).then(res => res.json());
}

app.listen(PORT);

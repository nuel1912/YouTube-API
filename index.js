const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, my name is Oluwanifemi - Welcome to my API!')
})

let videos = [];
let comments = [];

app.post('/videos', (req, res) => {
  const { title, description, url } = req.body;
  const newVideo = {
    id: videos.length + 1,
    title,
    description,
    url,
  };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

app.get('/videos', (req, res) => {
  res.json(videos);
})

app.get('/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (!video) {
    return res.status(404).send('Video Not Found');
  }
  res.json(video);
});

app.post('/videos/:id/comments', (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find(v => v.id === videoId);
  if (!video) {
    return res.status(404).send('Video Not Found');
  }

  const { text } = req.body;
  const newComment = {
    id: comments.length + 1,
    videoId,
    text,
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/videos/:id/comments', (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoComments = comments.filter(c => c.videoId === videoId);
  res.json(videoComments);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
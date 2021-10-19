import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import fs from 'fs';
import fetch from 'node-fetch';
import { load } from 'cheerio';
import resizeImg from 'resize-image-buffer';

app.use(cors({origin: "http://localhost:8081"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('front'))

app.get('/links', async(req, res)=>{
  const link = req.query.link;
  const response = await fetch(link);
  const page = await response.text();
  const $ = load(page);
  const Arr = ['PC wallpapers', 'mobile wallpapers', 'tablet wallpapers', 'HD desktop', 'free download', '1080P', '2K', '4K', '5K'];
  let keys = $('meta[itemprop="keywords"]').attr('content').split(',').map(x=>x.trim());
  keys = keys.filter(x=>!Arr.includes(x) && keys.indexOf(x)<50).join(' ,') + ',';
  let item = {
      img: $('#vimg').attr('src'),
      title: $('#vimg').attr('alt'),
      keywords: keys
  };
  res.send(JSON.stringify(item));
});

app.get('/img', async(req, res)=>{
  const params = { 
      link: req.query.link, 
      path: req.query.path, 
      width: parseInt(req.query.width), 
      height: parseInt(req.query.height) 
  };
  const imgResp = await fetch(params.link);
  const buffer = await imgResp.buffer();
  const imgFile = await resizeImg(buffer, {
      width: params.width,
      height: params.height,
  });
  
  try {
      fs.writeFile(params.path, imgFile, (err) => {
          if (err)
              console.log('error: ', err);
      });
  } catch (error) {
      console.log('error: ', error);
  }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
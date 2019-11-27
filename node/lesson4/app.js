var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express')
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';
let app = express();

app.get('/',(req, res, next)=>{
  superagent.get(cnodeUrl)
    .end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      var topicUrls = [];
      var $ = cheerio.load(res.text);
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
      });
      var ep = new eventproxy();

      ep.after('topic_html', topicUrls.length, function (topics) {
        console.log(topics)
        topics = topics.map(function (topicPair) {
          var topicUrl = topicPair[0];
          var topicHtml = topicPair[1];
          var $ = cheerio.load(topicHtml);
          return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim(),
          });
        });

        console.log('final:');
        console.log(topics);
      });

      topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl)
          .end(function (err, res) {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
          });
      });
    });

  res.send('hello')
})

app.listen(3030,(req, res)=>{
  console.log('🌍=>app is running at port 3030')
})


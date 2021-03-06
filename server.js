/**
 * Created by I060307 on 01/03/2015.
 */
/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, '/')));
//app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
    fs.readFile('./data/_comments.json', function(err, data) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments.json', function(req, res) {
    fs.readFile('./data/_comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./data/_comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});


app.get('/cards.json', function(req, res) {
    fs.readFile('./data/_cards.json', function(err, data) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/cards.json', function(req, res) {
    fs.readFile('./data/_cards.json', function(err, data) {
        var cardss = JSON.parse(data);
        cards.push(req.body);
        fs.writeFile('./data/_cards.json', JSON.stringify(cards, null, 4), function(err) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(cards));
        });
    });
});


app.listen(process.env.PORT || 3000);

console.log('Server started: http://localhost:3000/');
const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use(cors());

app.use('/static', express.static('../app/public'));

app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) { 
          if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this); 
            return null;
          },                    
        ifCond: function(v1, operator, v2, options){
            switch(operator){
                case '==':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        eachIndex: function(array, options) {
            var result = '';
            for (var i = 0; i < array.length; i++) {
              result += options.fn({item: array[i], index: i});
            }
            return result;
        }
      }
}))

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;
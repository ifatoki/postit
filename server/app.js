import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import index from './routes/index';

const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

index(app);

export default app;

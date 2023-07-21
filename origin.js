//라우팅의 시작점
const express = require('express');
const http=require('http');
const socketIO=require('socket.io');
//bodyParser-POST 파라미터 추출에 필요

const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const io=require('socket.io')(http);
const port = process.env.PORT || 3000;

// 서버를 시작하여 로봇 컨트롤러와의 연결을 대기합니다.
http.listen(port, () => {
  console.log(`listening on... (포트: ${port})`);
});

// 변경코드
//const routes = require('./routes');

//app.use('/', routes);

// 로봇 컨트롤러와 소켓 연결을 수립합니다.
io.on('connection', (socket) => {
  console.log('로봇 컨트롤러와 연결되었습니다.');
  socket.emit('msg', `${socket.id} 연결 되었습니다.`);
  socket.on('msg', function (data) {
    console.log(socket.id, data);
    socket.emit('msg', `Server : "${data}" 받았습니다.`);
  })
// 소켓 연결이 끊겼을 때의 처리 로직
io.on('disconnect', () => {
  console.log('로봇 컨트롤러와의 연결이 끊어졌습니다.');
});
  });


//body-parser-POST 파라미터 추출에 필요 - start
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const maria = require('./database/connect/maria');
maria.connect();


//const port = process.env.PORT || 3000;

/*app.listen(port, () => {
  console.log(`listening on ${port}`);
});*/

//frontend 관련
app.get('/ang', (req, res) => {
  maria.query(
    "select positionX, positionY from rastechPosTable where id = (select max(id) from rastechPosTable)",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(`err : ${err}`);
        res.send(err);
      }
    }
  );
});

// POST 요청 처리
//robot 통신
app.post('/', (req, res, next) => {
  // POST 요청 데이터 확인
  console.log(req.body);

  // 응답 보내기
  res.json({ message: 'POST 요청이 성공적으로 수신되었습니다.' });
});
const axios = require('axios');

//database 관련
//rastechPosTable
app.post("/",(req,res)=>{
  var sql = 'INSERT INTO rastechPosTable VALUES (?,?)';
  var params = [req.body.positionX,req.body.positionY];
  
  maria.query(sql, params, (err, rows, fields)=>{
      if(err) {console.log(err);}
      else{
        res.json(rows);}})
      }
);

import socketio
import time

# 백엔드 서버의 주소와 포트 번호로 바꾸세요
BACKEND_SERVER_URL = 'http://your_backend_server_ip:port'

# SocketIO 클라이언트 생성
sio = socketio.Client()

@sio.event
def connect():
    print('SocketIO connection established.')

@sio.event
def disconnect():
    print('SocketIO connection lost.')

@sio.on('move_command')
def handle_move_command(command):
    print('Received move command:', command)
    # 이동 명령에 따라 로봇을 제어하는 로직을 추가합니다.
    # 예를 들어, 'MOVE_FORWARD' 명령이면 직진하는 로직을 추가할 수 있습니다.
    if command == 'MOVE_FORWARD':
        print('Moving forward...')
        # 로봇의 직진 제어 코드를 추가하세요.

def main():
    try:
        # SocketIO 백엔드 서버에 연결
        sio.connect(BACKEND_SERVER_URL)

        # 메인 루프에서 연결 유지 및 이벤트 핸들링을 위해 실행될 때까지 대기
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print('KeyboardInterrupt: Stopping the client.')

    finally:
        # SocketIO 연결 종료
        sio.disconnect()

if __name__ == "__main__":
    main()

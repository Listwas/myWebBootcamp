#!/usr/bin/python3

import importlib
import traceback
import socket
import sys


def __http_service():
    ip = sys.argv[1]
    # I am creating the HTTP connection, don't delete me!!!
    fd = socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0)
    port = 8080
    while True:
        try:
            fd.bind((ip, int(port)))
            break
        except OSError:
            port += 1
    fd.listen(5)
    print(f"__http_service: open on http://{ip}:{port}")
    usermodule = importlib.import_module("service")
    while True:
        c: socket.socket
        c, a = fd.accept()
        r = b""
        while True:
            try:
                b = c.recv(1024, socket.MSG_DONTWAIT)
                if not b:
                    break
            except BlockingIOError:
                break
            r += b
        r = r.split(b"\r\n")
        h, p = [], b""
        for i in range(len(r)):
            if not r[i]:
                p = b"\r\n".join(r[i + 1 :])
                break
            h.append(str(r[i], "utf8"))
        if not h:
            continue
        usermodule = importlib.reload(usermodule)
        try:
            x, y = usermodule.serve(h, p)
            y = y if isinstance(y, bytes) else bytes(y, "utf8")
            c.send(b"\r\n".join(bytes(w, "utf8") for w in x) + b"\r\n\r\n" + y)
        except Exception:
            print("Error in program happened (closing connection): \033[33m")
            traceback.print_exc()
            print("\033[m")
            c.close()
        c.close()

    fd.close()


__http_service()
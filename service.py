#!/usr/bin/python3

def serve(headers: list, raw_payload: bytes) -> dict:

    payload = str(raw_payload, encoding="utf8")

    print("Headers:", headers)
    # print("Payload:", payload)

    paths = {
        "/index":"index.html",
        "/test":"test.html",
        "/main.js":["main.js", "text/jscript"],
        "/potos/reviewers1.png":["potos/reviewers1.png.gz", "image/png"],
        "/styles.css": ["styles.css", "text/css"]
    }

    header = headers[0].split()
    url = header[1].split("?")


    if url[0] not in paths:
        # if there's wrong url then error 404
        with open("404.html", 'r') as f:
            html_string = f.read()
        status_code = "404 Not Found"
        content_type = "text/html"
    else: 
        # if there's url without param then error 401
        with open("401.html", 'r') as f: 
                html_string = f.read()
        status_code = "401 Unauthorized"
        content_type = "text/html"
    
    # displaying other files than html e.g. css, img 
    if url[0] in paths:
        if isinstance(paths[url[0]], list):
            file_path, file_type = paths[url[0]] 

            with open(file_path, "rb") as f:
                html_string = f.read() 
            status_code = "200 OK"
            content_type = file_type

        # displaying html file only when 'user' param is entered
        if len(url) == 2:
            if url[1] == "user=admin":
                file_path = paths[url[0]]

                with open(file_path, "r") as f:
                    html_string = f.read()
                status_code = "200 OK"
                content_type = "text/html"

    reply = html_string
    
    headers = [
        f"HTTP/1.1 {status_code}",
        f"Content-Type: {content_type}",
        f"Content-Length: {len(reply)}",
    ]

    # encoding an image 
    if content_type == "image/png":
        headers.append("Content-Encoding: gzip")

    return (headers, reply)
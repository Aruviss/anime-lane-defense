import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output if possible, or fallback safely
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = int(os.environ.get("PORT", 8080))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for smooth dev experience
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

class ThreadingServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"[+] Starting Anime Battle Cats Server on port {PORT}...")
    
    # Try opening browser automatically only in local environment
    if not os.environ.get("RAILWAY_ENVIRONMENT") and not os.environ.get("PORT"):
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass

    with ThreadingServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT} (Press Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


if __name__ == '__main__':
    main()

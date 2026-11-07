"""Afghan AI web app and secure AI tutor API.

Keep provider credentials in environment variables; never expose them to the browser.
"""
import os
from flask import Flask, jsonify, request, send_from_directory
from openai import OpenAI

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=None)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024  # 16 KiB request limit

# Only publish files the website actually needs. Never expose the project directory.
PUBLIC_ROOT_FILES = {
    "styles.css",
    "app.js",
    "manifest.json",
    "sw.js",
    "icon.svg",
}
PUBLIC_ASSETS = {
    "afghan-ai-logo.svg",
    "afghan-ai-social-hero.svg",
}


@app.after_request
def add_security_headers(response):
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    if request.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/social-support-center.html")
def social_support_page():
    return send_from_directory(BASE_DIR, "social-support-center.html")


@app.get("/<path:filename>")
def public_root_file(filename):
    if filename not in PUBLIC_ROOT_FILES:
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(BASE_DIR, filename)


@app.get("/assets/<path:filename>")
def public_asset(filename):
    if filename not in PUBLIC_ASSETS:
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(os.path.join(BASE_DIR, "assets"), filename)


@app.get("/api/health")
def health():
    return jsonify({
        "ok": True,
        "ai_configured": bool(os.getenv("OPENAI_API_KEY")),
    })


@app.post("/api/chat")
def chat():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return jsonify({"error": "A JSON object is required"}), 400

    raw_message = body.get("message", "")
    if not isinstance(raw_message, str):
        return jsonify({"error": "Message must be text"}), 400
    message = raw_message.strip()
    if not message:
        return jsonify({"error": "Message is required"}), 400
    if len(message) > 5000:
        return jsonify({"error": "Message is too long"}), 413

    language = body.get("language", "fa")
    if not isinstance(language, str):
        return jsonify({"error": "Language must be text"}), 400
    lang_name = {
        "fa": "Dari Persian",
        "ps": "Pashto",
        "en": "English",
    }.get(language, "Dari Persian")

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return jsonify({"error": "AI service is not configured"}), 503

    try:
        client = OpenAI(
            api_key=api_key,
            timeout=35.0,
            max_retries=1,
        )
        response = client.responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
            instructions=(
                "You are Afghan AI, a kind, accurate, age-appropriate school tutor for students in Afghanistan. "
                f"Answer in {lang_name}. Explain step by step, use simple examples, and encourage independent learning. "
                "For homework, explain the method rather than only giving a final answer. Be transparent about uncertainty. "
                "Do not claim to quote official Afghan curriculum unless the source is provided. Avoid requesting personal data."
            ),
            input=message,
        )
        return jsonify({"answer": response.output_text})
    except Exception:
        app.logger.exception("AI request failed")
        return jsonify({"error": "AI request failed"}), 502


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": "Request is too large"}), 413


if __name__ == "__main__":
    # Production hosting supplies its own WSGI server (Gunicorn).
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=False)

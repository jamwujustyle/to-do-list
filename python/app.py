from flask import Flask, request, jsonify, render_template
import psycopg2
import bcrypt
from db import connect
from flask_cors import CORS
import logging


def log_config():
    logging.basicConfig(
        level=logging.DEBUG,
        format="  %(name)s - %(levelname)s - %(message)s",
        # logging.debug
        # logging.info
        # logging.warning
        # logging.error
        # logging.critical
    )


log_config()
app = Flask(__name__)
CORS(app)


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )

    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO login_data 
            (email, password_hash) VALUES (%s, %s)
            ON CONFLICT (email) 
            DO NOTHING RETURNING id""",
            (email, hashed_password),
        )
        result = cursor.fetchone()
        conn.commit()
        if result:
            return jsonify({"message": "registration successful"}), 201
        else:
            return jsonify({"message": "email already exists"}), 409
    except Exception as e:
        return jsonify({"error": f"an error occured: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    logging.info("logging smth")

    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute(
            """SELECT password_hash
                FROM login_data
                WHERE email = %s""",
            (email,),
        )
        result = cursor.fetchone()
        if result:
            stored_password_hash = result[0]
            if bcrypt.checkpw(
                password.encode("utf-8"), stored_password_hash.encode("utf-8")
            ):
                return jsonify({"message": "login successful"}), 200
            else:
                return jsonify({"error": "invalid credentials"}), 401
        else:
            return jsonify({"error": "user not found"}), 404
    except Exception as e:
        logging.info(e)
        return jsonify({"error": "internal server error"})
    finally:
        conn.close()


@app.route("/index")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)

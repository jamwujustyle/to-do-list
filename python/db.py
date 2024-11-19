import psycopg2
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


def connect():
    conn = psycopg2.connect(
        dbname="to_do", host="localhost", password="0880", user="postgres", port=5432
    )
    try:
        logging.info("successfully connected to database")
        return conn

    except Exception as ex:
        print(f"error connecting to database: {ex}")

from server import app

#
# Command to start multi threaded app
# ----------------------------------------
# gunicorn --bind 0.0.0.0:5000 wsgi:APP -w 4 --daemon
#
#
if __name__ == "__main__":
    app.run()


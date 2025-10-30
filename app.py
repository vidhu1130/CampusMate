from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Replace with a secure key

def query_db(query, args=(), one=False):
    conn = sqlite3.connect('campusmate.db')
    cur = conn.cursor()
    cur.execute(query, args)
    conn.commit()
    rv = cur.fetchall()
    conn.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    query_db("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    session['username'] = username
    return redirect('/dashboard')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = query_db("SELECT * FROM users WHERE username=? AND password=?", (username, password), one=True)
    if user:
        session['username'] = username
        return redirect('/dashboard')
    return "Login failed"

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect('/')
    return render_template('dashboard.html', username=session['username'])

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        query_db("INSERT INTO chat (message) VALUES (?)", (request.form['message'],))
    messages = query_db("SELECT message FROM chat")
    return render_template('chat.html', messages=messages)

# Add similar routes for event, badge, notes, skill, lostfound, analytics, profile, leaderboard

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)

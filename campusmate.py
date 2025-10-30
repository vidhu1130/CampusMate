import sqlite3

conn = sqlite3.connect('campusmate.db')
cur = conn.cursor()

cur.execute("CREATE TABLE users (username TEXT, password TEXT)")
cur.execute("CREATE TABLE chat (message TEXT)")
# Add tables for events, badges, notes, skills, lostfound

conn.commit()
conn.close()

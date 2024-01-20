import jwt
import string
import random
import hashlib
from flask import abort, request

# generate token
def generate_token(username):
    msg = {
        'username': username
    }
    token = jwt.encode(msg, 'secret',
                       algorithm='HS256').decode('utf-8')
    return token

# check name is between 1-50 characters inclusive in length
def valid_name(name):
    if len(name) < 1:
        abort(401, description="Name cannot be empty.")
    elif len(name) > 50:
        abort(401, description="Please enter a name between 1-50 characters long.")
    else:
        return True
    
def valid_username(username):
        # connect to database
    try:
        conn = sqlite3.connect("sqliteDB.db")
    except sqlite3.Error as e:
        print(e)
        return {
            "is_success": False
        }

    c = conn.cursor()

    # find customer id by email
    cus_query = '''SELECT ID
        FROM CUSTOMER
        WHERE EMAIL = ?
        '''
    c.execute(cus_query, (email,))
    data = c.fetchone()

    if data is None:
        # find restaurant id by email
        res_query = '''SELECT ID
        FROM RESTAURANT
        WHERE EMAIL = ?
        '''
        c.execute(res_query, (email,))
        data = c.fetchone()

    # if email cannot match any user
    if data is None:
        abort(400, description="Cannot find user with provided email")
        # raise InputError("Cannot find user with provided token")

    id = data[0]

    c.close()
    conn.commit()
    conn.close()

    return id
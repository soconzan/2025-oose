from app.core.database import engine
from sqlalchemy import text

with engine.connect() as con:
    rs = con.execute(text("PRAGMA table_info(workrooms)"))
    for row in rs:
        print(row)

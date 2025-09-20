from fastapi import FastAPI
from magnum import Magnum

app = FastAPI()

@app.get("/teste")
def home():
    return {"message": "Hello, World!"}

handler = Magnum(app)
from fastapi import FastAPI

app = FastAPI()

@app.get("/teste")
def home():
    return {"message": "Hello, World!"}


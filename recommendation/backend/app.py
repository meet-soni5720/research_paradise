# Import Library
import uvicorn
from fastapi import FastAPI
from chatbot import run_quary
from pydantic import BaseModel

app = FastAPI()

@app.get('/')
def index():
    return {'message': 'Project Candidate Recommendation with ChatGPT'}

class Item(BaseModel):
    job_id: str

@app.post("/get_recommendation")
async def manual(input: Item):
    query = {}
    query['job_id'] = input.job_id
    response = run_quary(query)

    return {response}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
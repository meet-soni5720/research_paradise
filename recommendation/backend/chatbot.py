# Import Library
import pandas as pd
import os
import tiktoken
from dotenv import load_dotenv
from pymongo import MongoClient
import json
from bson.objectid import ObjectId


from langchain.chains import RetrievalQA, LLMChain
from langchain_core.documents import Document
from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.document_loaders import DataFrameLoader
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain

# Load environment variables from .env
load_dotenv()

# Access the MongoDB URI
def _connect_mongo(host, port, username, password, db):
    """ A util for making a connection to mongo """

    if username and password:
        mongo_uri = 'mongodb://%s:%s@%s:%s/%s' % (username, password, host, port, db)
        conn = MongoClient(mongo_uri)
    else:
        conn = MongoClient(host, port)

    return conn[db]

# Access the OpenAI API key
openai_api_key = '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'

###
# Document splitting
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

# embeddings model
embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

# Prompt Engineering

prompt_template = ChatPromptTemplate.from_messages(
    [("system", """ 
You are a friendly, conversational assistant that helps professors to find suitable candidates for their research projects.
From the following context which gives email and research statement of the candidates, assist professors in finding suitable candidates based on their input.
Rank all the candidates based on their research statement. Provide short summary for the resonses behind the ranking.
Sort the answer by the most relevant candidate.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Project Description: {description}
input: "Sort the candidates based on their research statement and provide the emails of the candidates who are suitable for the project" 
Your Response:
""")]
)

llm = ChatOpenAI(openai_api_key=openai_api_key,model_name='gpt-3.5-turbo', temperature=0)

db_host='localhost'
db_port=27017
username=None 
password=None 
db = _connect_mongo(host=db_host, port=db_port, username=username, password=password, db='ResearchDB')

def run_quary(query):
    db_job = db['hiringforms']
    db_user = db['users']
    db_pr = db['researchposts']

    application = db_job.aggregate([
        {"$match": {
            "researchPostId": query['job_id']
        } },
        {"$group": { 
            "_id": "$researchPostId",
            "details": {"$push": {'userId': "$userId", "researchStatement": "$researchStatement"}}, 
        } },
        ])
    
    application = list(application)[0]['details']
    application = [{"userId": ObjectId(x['userId']), "researchStatement": x['researchStatement']} for x in application]

    candidates = [x['userId'] for x in application]
    candidates = [ObjectId(x) for x in candidates]

    # Get the user details from all the userId
    user_details = db_user.find({"_id": {"$in": candidates}})
    user_details = list(user_details)

    # pandas dataframe for the user details
    user_details = pd.DataFrame(user_details)
    user_details = user_details.loc[:, user_details.columns.intersection(['_id', 'email', 'name'])]

    rs = pd.DataFrame(application)
    user_details = pd.merge(user_details, rs, left_on='_id', right_on='userId', how='left')
    user_details.drop(columns=['userId'], inplace=True)
    user_details['combined_info'] = user_details.apply(lambda row: f"Name: {row['name']} Email: {row['email']}. statement: {row['researchStatement']}.", axis=1)

    # Load Processed Dataset
    docs = list(user_details['combined_info'])

    # Get the research post details
    statements = [x['researchStatement'] for x in application]
    # print(research_post)
    requirement = db_pr.find_one({"_id": ObjectId(query['job_id'])})
    requirement = requirement['description']

    # Document splitting
    texts = text_splitter.create_documents(docs)

    chain = create_stuff_documents_chain(llm=llm, 
                                         prompt=prompt_template)

    # Create the LangChain conversational chain
    response = chain.invoke({'context': texts, 'description': requirement})

    return response
    

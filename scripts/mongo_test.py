import pymongo, sys, json
URI = 'mongodb+srv://rameshalpharive:Ramesh6435@coolwell.4gydwqe.mongodb.net/ultraexchange'
try:
    c = pymongo.MongoClient(URI, serverSelectionTimeoutMS=12000, tls=True)
    c.admin.command('ping')
    dbs = c.list_database_names()
    print('MONGO_OK')
    print('DBS:', dbs)
    db = c['ultraexchange']
    colls = db.list_collection_names()
    print('COLLS:', colls)
    for coll in colls:
        cnt = db[coll].count_documents({})
        print(f'{coll}: {cnt} docs')
        for doc in db[coll].find({}, {'_id': 0}).limit(5):
            print(json.dumps(doc, default=str))
except Exception as e:
    print('MONGO_ERR:', str(e))

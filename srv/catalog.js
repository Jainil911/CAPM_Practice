const cds = require('@sap/cds')
const {Store} = cds.entities

module.exports = srv => {
    const db = cds.db

    // srv.on('READ','ProductSet', async(req, res)=>{
    //     results = []
    //     results = await db.run([
    //         SELECT.from(Store) //.where({ProductID: req.data.ProductID})
    //     ])
    //     return results
    // })
    srv.before('CREATE','ProductSet', req =>{
        if(req.data.Price<=0) req.error(400,'Price cannot be negative')
    })
    srv.on('CREATE','ProductSet', async(req, res)=>{
        results = []
        results = await db.run([
            INSERT.into(Store).entries(req.data)
        ])
        .then((resolve, reject)=>{
            if(resolve){
                return req.data
            }else{
                return req.error(404,"Data is not Created")
            }    
        })
        .catch(err =>{
            return req.error(500,"Server Down, Try Again"+err.toString())
        })
        return results;
    })
    srv.after()
    srv.on('UPDATE','ProductSet', async(req, res)=>{
        results = []
        results = await db.run([
            //INSERT.into(Store).entries(req.data)
            UPDATE(Store).set(req.data).where({ProductID: req.data.ProductID})
        ])
        .then((resolve, reject)=>{
            if(resolve){
                return req.data
            }else{
                return req.error(404,"Data is not Created")
            }    
        })
        .catch(err =>{
            return req.error(500,"Server Down, Try Again"+err.toString())
        })
        return results;
    })
}  
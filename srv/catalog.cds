using { db.sampledata as Products } from '../db/sampledata';

service storeSrv {
    entity ProductSet as projection on Products.Store;
}

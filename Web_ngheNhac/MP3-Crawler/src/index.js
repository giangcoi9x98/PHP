const dbUtil = require("./util/databaseUtil")

const boostrap = async function (){
    return new Promise(async (res, rej) => {
        const sql = 'INSERT INTO songs(id, name) VALUES (?, ?)';
        const transaction = await dbUtil.beginTransaction();
        try {
            await dbUtil.execute(sql, ['928798278-234544342', "Hieu pro sql"], transaction);
            await dbUtil.execute(sql, ['928798278-2380432', "Hieu pro sql"], transaction);
            await dbUtil.commitTransaction(transaction);
        }catch (e) {
            console.log(e);
            await dbUtil.rollbackTransaction(transaction);
        }
        
    });
}

boostrap();
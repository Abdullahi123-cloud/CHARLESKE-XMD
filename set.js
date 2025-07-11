const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEJCM2twZDVoTE8xZnY5bHBSZXZlVjV0eURDUTVxRHMxMWVlbnAzYkIyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJTY0dnMnlGVkV0bG9ncGpIL2kxaTdMMTBXbmRhSFd0M3lJdGpWdDhrOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRTZYb1BVMjRwNjBIYkk5RkJlcFhpbEx3VVhYT3pEc2ZFWTAvWXlCdkdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoZDhrWG5MVktqc1Z2a1lwUURJaTFLVDhRZGZyWDgzdzVnaXpDVitqQ1dnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFDV2VtMFNaM2V5VnAwZ0NlVVdsVkplZmtjR0RVWUQzMjZWNjJmZytTMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjY0cUxXdDF6dUxSdzRzdmpYOHFKVmt3UVZraTRySG5yN2h1ZnB0Q3VzbTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUgrbVAzT1ZtbS9qMC8vOHp6aFdnME81VVFLcmxjL2xYODROSDJrVWYxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1MwaytVT3REMXFqVGQ2UllpS25EMFd4QzFZV1ZLejFSSmpjaG5rOURqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFMSHZ0UDkvY1kreFV0c1IvSHFWZzhzZ1JIS29XV25HMW1idkVRVE9NMFBRRUJ3VFgrWkFKWGluT2JnN1d5OHpydHdjV3l1RVFPZG5XaGpLUWh5WGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJtK3JxWEl0TkJNV3hHZjJrenZqWHhKSDBLQ2NyMzRjN3p1ZjRKWEErcnhRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNjE1MTY5NzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTA0ODRFNUYyQTlCRTAyNzk4QzlDM0Q1ODJFQkE4OUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjE1MzYyOH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjIzNDgwNjE1MTY5NzM6MTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQWJkdWx4cHJlc3MgR3JhcGhpY3MiLCJsaWQiOiI5OTkzMTUyNDIzMTE5NDoxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00renpmOERFSVQ4dnNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZYL212Wi8xS3hobGJvZTFFNXBkUkYrN1VWSHAxc3ZxSFF3bURmVU5VRnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imt3WksyVDlsOGFjRFBTbEsrVVcyY3BjUHVieGNpVkxSd25KTEhyaldneGJDQlBhcHdGVzRibGVHbVhRc2RmSUg5cEkxNm1CUGI0bU5DdjZieExpNUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnKzRxVHFIcGZrMnNwV0hBbENZVmFudFVkWk5yd1h0aVR2Zm9LeGQ4b3NLMGNSenZwL3A4RytVejcyZW05NTAxRHN4MloyMG93andCa2VJUC9nWHBpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNjE1MTY5NzM6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYjEvNXIyZjlTc1laVzZIdFJPYVhVUmZ1MUZSNmRiTDZoME1KZzMxRFZCYyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyMTUzNjE3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUM2MSJ9 || '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348061516973",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

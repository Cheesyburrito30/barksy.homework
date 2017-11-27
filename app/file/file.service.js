FileService.$inject = ['$log', 'AWS', 'Firebase'];

function FileService($log, AWS, Firebase) {
    const log = $log.log;
    const s3 = new AWS.S3({
        Bucket: 'barksy.homework'
    });
    const database = Firebase.database()
    const BASE_URL = 'https://s3.us-east-2.amazonaws.com/barksy.homework/'
    
    return {
        getList: getFiles,
        postFile: postFile,
        getSingleItem: getSingleFile
    };
    function getSingleFile(key) {
        return new Promise ((resolve, reject) => {
            database.ref(key).once('value', (snapshot) => {
                resolve(snapshot.val())
            })
        })
    }
    function getFiles() {
        return new Promise ((resolve, reject) => {
            database.ref().once('value', (snapshot) => {
                let results = [];
                snapshot.forEach((childSnapshot) => {
                    results.push(childSnapshot.val())
                })
                resolve(results)
            })
        })
    }
    function postFile(config){
        log(config)
        return new Promise ((resolve, reject) => {
            let newFileKey = getUniqueKey()
            config.s3.Key = newFileKey
            config.firebase.fileUrl = BASE_URL + newFileKey
            config.firebase.key = newFileKey
            postFileToS3(config.s3)
            postFileToFirebase(config.firebase, newFileKey)
            resolve(config.firebase)
        })
    }
    function postFileToS3(config) {
        return new Promise ((resolve, reject) => {
            log(config)
            s3.putObject(config, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    function postFileToFirebase(config, key){
        return new Promise((resolve, reject) => {
            log(config)
            database.ref(key).set(config)
        })
    }
    function getUniqueKey() {
        return database.ref().child('files').push().key;
    }

};


module.exports = FileService;


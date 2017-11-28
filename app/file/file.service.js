FileService.$inject = ['$log', 'AWS', 'Firebase'];

function FileService($log, AWS, Firebase) {
    const log = $log.log;
    const s3  = new AWS.S3({
        accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
    });
    const database = Firebase.database()
    const storage = Firebase.storage()
    let uploadedImageUrl = ''
    
    // const BASE_URL = 'https://s3.us-east-2.amazonaws.com/barksy.homework/'
    
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
            config.firebase.key = newFileKey
            postFileToFirebaseStorage(config.s3).then(success => {
                config.firebase.fileUrl = success
                postFileToFirebase(config.firebase, newFileKey)
            })
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
    function postFileToFirebaseStorage(config) {    
        return new Promise ((resolve, reject) => {
            const storageRef = storage.ref()
            const imageRef = storageRef.child(`${config.Key}/${config.Body.name}`)
            let imageUrl;
            imageRef.put(config.Body).then(success => {
                resolve(uploadedImageUrl = success.metadata.downloadURLs[0])
            })
            log(imageUrl)
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


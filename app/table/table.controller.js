// THIS IS WAY TOO MUCH IN A CONTROLLER, PUT MOST OF THIS IN A SERVICE
// ... once I figure out how to inject services into controllers


TableController.$inject = ['$scope', 'FileService', '$log'];

function TableController($scope, FileService, $log) {
    var vm = this;
    const log = $log.log;

    let SelectedImage;
    vm.Objects = []
    vm.getObjects = getObjectsHandler;
    $scope.fileSelected = fileSelectedHandler; 
    vm.uploadImage = uploadImageHandler;
    
    function getObjectsHandler() {
        log('in the controller:')
        FileService.getList()
            .then(success => {
                log(success)
                vm.Objects = success
                $scope.$digest()
            })
    }

    function fileSelectedHandler(event) {
        SelectedImage = event.files[0];
        log(SelectedImage)
    }   
    
    function uploadImageHandler() {
        config = setUpConfigForPost()
        FileService.postFile(config)
            .then(success => {
                vm.Objects.push(success)
                $scope.$digest()
            })
    }
    function setUpConfigForPost(){
        let name = SelectedImage.name;
        let today = new Date().toDateString()
        log(today)
        return {
            s3: {
                Bucket: 'barksy.homework',
                Key: '',
                Body: SelectedImage
            },
            firebase: {
                name: name,
                dateCreated: today,
                fileUrl: ''
            }
        }
    }
}

module.exports = TableController;
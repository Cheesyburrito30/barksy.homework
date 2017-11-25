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
    vm.formData = {
        tags: '',
        file: {}
    }
    
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
        vm.formData.file = event.files
    }   
    
    function uploadImageHandler() {
        log(vm.formData)
        let tags = []
        tags.push(vm.formData.tags.split(', '))
        log(tags[0])
        config = setUpConfigForPost()
        FileService.postFile(config)
            .then(success => {
                vm.Objects.push(success)
                $scope.$digest()
            })
    }
    function setUpConfigForPost(){
        let form = vm.formData
        let today = new Date().toDateString()
        let tags = []
        tags.push(form.tags.split(', '))
        return {
            s3: {
                Bucket: 'barksy.homework',
                Key: '',
                Body: form.file[0]
            },
            firebase: {
                name: form.file[0].name,
                tags: tags[0],
                dateCreated: today,
                fileUrl: ''
            }
        }
    }
}

module.exports = TableController;
ItemController.$inject = ['$scope', 'FileService', '$log', '$route', '$routeParams', '$location'];

function ItemController($scope, FileService, $log, $route, $routeParams, $location) {
    var vm = this;
    const log = $log.log;

    vm.onInit = retrieveFileInformationFromFirebase
    vm.itemInfo = {}
    $scope.fileSelected = fileSelectedHandler;
    vm.uploadImage = uploadImageHandler;
    vm.formData = {
        tags: '',
        file: {}
    };

    function retrieveFileInformationFromFirebase() {
        let fileKey = $routeParams.id
        FileService.getSingleItem(fileKey).then(success => {
            vm.itemInfo = success
            log(vm.itemInfo.fileUrl)
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
                $route.reload()
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
module.exports = ItemController;
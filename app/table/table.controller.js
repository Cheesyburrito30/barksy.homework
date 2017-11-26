// THIS IS WAY TOO MUCH IN A CONTROLLER, PUT MOST OF THIS IN A SERVICE
// ... once I figure out how to inject services into controllers


TableController.$inject = ['$scope', 'FileService', '$log', '$location'];

function TableController($scope, FileService, $log, $location) {
    var vm = this;
    const log = $log.log;

    let SelectedImage;
    vm.Objects = []
    vm.filteredObjects = []
    vm.getObjects = getObjectsHandler;
    vm.filterTable = filterResultsByInput
    vm.tableRowClicked = tableRowClicked

    function tableRowClicked(rowId) {
        $location.path(`/items/single/${rowId}`)
    }
    
    function getObjectsHandler() {
        log('in the controller:')
        FileService.getList()
            .then(success => {
                log(success)
                vm.unfilteredObjects = success
                vm.filteredObjects = success
                $scope.$digest()
                log(success[0].tags.includes('asdf'))
            })
    }

    function filterResultsByInput(input) {
        let tagsToFilterBy = []
        tagsToFilterBy.push(input.split(', '))
        let filteredObjects = []
        if(input === '') {
            vm.filteredObjects = vm.unfilteredObjects
        }
        tagsToFilterBy[0].forEach(function searchByMultipleTags(tag){
            log(tag)
            vm.unfilteredObjects.forEach(function searchTagsForMatch(obj) {
                if (obj.tags.includes(tag)) {
                    filteredObjects.push(obj)
                    vm.filteredObjects = filteredObjects
                }
            })
        })
    }
}

module.exports = TableController;
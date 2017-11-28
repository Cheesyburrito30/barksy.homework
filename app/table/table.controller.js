// THIS IS WAY TOO MUCH IN A CONTROLLER, PUT MOST OF THIS IN A SERVICE
// ... once I figure out how to inject services into controllers


TableController.$inject = ['$scope', 'FileService', '$log', '$location'];

function TableController($scope, FileService, $log, $location) {
    var vm = this;
    const log = $log.log;

    let SelectedImage;
    vm.unfilteredObjects = []
    vm.Objects = []
    vm.filteredObjects = []
    vm.getObjects = getObjectsHandler;
    vm.filterTable = filterResultsByInput
    vm.tableRowClicked = tableRowClicked
    vm.orderByDateCreated = orderByDate

    function tableRowClicked(rowId) {
        $location.path(`/items/single/${rowId}`)
    }
    
    function getObjectsHandler() {
        log('in the controller:')
        FileService.getList()
            .then(success => {
                log(success)
                vm.Objects = success
                vm.filteredObjects = success
                $scope.$digest()
                log(success[0].tags.includes('asdf'))
            })
    }

    function filterResultsByInput(input) {
        let tagsToFilterBy = []
        tagsToFilterBy.push(input.split(', '))
        let filteredObjects = []
        vm.filteredObjects = filteredObjects
        if(input === '') {
            filteredObjects = []
            vm.filteredObjects = vm.Objects
            // this throws an error, but doesn't crash page. Don't know why it throws and error, feature doesn't work without it.
            $scope.$digest()
        }
        tagsToFilterBy[0].forEach(function searchByMultipleTags(tag){
            console.log(tag)
            vm.Objects.forEach(function searchTagsForMatch(obj) {
                obj.tags.forEach(objTag => {
                    if (objTag.indexOf(tag) !== -1) {
                        if(!filteredObjects.includes(obj)){
                            filteredObjects.push(obj)
                        } else {
                            vm.filteredObjects = filteredObjects
                        }
                    }
                })
                // if (obj.tags.includes(tag)) {
                //     if (!filteredObjects.includes(obj)){
                //         filteredObjects.push(obj)
                //     vm.filteredObjects = filteredObjects
                //     }
                // }
                // else {
                //     vm.filteredObjects = filteredObjects
                // }
            })
        })
    }
    function orderByDate() {
        vm.filteredObjects.reverse()
        // $scope.$digest()
    }
}

module.exports = TableController;
describe('TableController', () => {
  let TableController;
  beforeEach(() => {
    angular.mock.module('barksy');
    inject(_$controller_)
  });


  it('should load with a loading message if no items present', () => {
    TableController.message = 'NOT LOADING';
    expect(TableController.message).toBe('LOADING');
  })

});
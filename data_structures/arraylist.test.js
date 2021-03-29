import ArrayList from '../data_structures/arraylist.js'

describe('ArrayListTest', function() {
    describe('addFirstTest', function(){
        var arrList = new ArrayList();
        it('should be size of 1 when element is added', function(){          
            arrList.addFirst(1);
            expect(arrList.getSize()).toBe(1);
        });
        it('should be size of 2 when element is added', function(){           
            arrList.addFirst(2);
            expect(arrList.getSize()).toEqual(2);
           
            
    
        });
        it('get(0) should return 2 and get(1) should return 1', function(){
            expect(arrList.toString()).toEqual('[2, 1]');
        });

    });
    describe('addLastTest', function(){
        var arrList = new ArrayList();
        it('should be size of 1 when element is added', function(){          
            arrList.addLast(1);
            expect(arrList.getSize()).toBe(1);
        });
        it('should be size of 2 when element is added', function(){           
            arrList.addLast(2);
            expect(arrList.getSize()).toEqual(2);
       });
        it('toString() should return [1, 2, 3]', function(){
            arrList.addLast(3);
            expect(arrList.getSize()).toEqual(3);
            expect(arrList.toString()).toEqual('[1, 2, 3]');
        });

    });

    describe('addTest', function(){
        var arrList = new ArrayList();
        it('Adding ten elements should expand size of array to 20', function(){
            expect(() => arrList.add(10, 1)).toThrow(RangeError);
            arrList.add(1, 1);
            arrList.add(2, 1);
            arrList.add(3, 1);
            arrList.add(4, 1);
            arrList.add(5, 1);
            arrList.add(6, 1);
            arrList.add(7, 1);
            arrList.add(8, 1);
            arrList.add(9, 1);
            arrList.add(10, 1);
            expect(() => arrList.add(20, 1)).toThrow(RangeError);
            arrList.add(19, 1);   
        });

    });
    describe('removeTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('remove(1) should reduce size to 3 and return [0, 2, 3]', function(){
            arrList.remove(1);
            expect(arrList.getSize()).toBe(3);
            expect(arrList.toString()).toEqual('[0, 2, 3]');
        });
    });
    describe('removeFirstTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('removeFirst() should reduce size to 3 and return 1, 2, 3]', function(){
            arrList.removeFirst();
            expect(arrList.getSize()).toBe(3);
            expect(arrList.toString()).toEqual('[1, 2, 3]');
        });
    });
    describe('removeLastTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('removeLast() should reduce size to 3 and return [0, 1, 2]', function(){
            arrList.removeLast();
            expect(arrList.getSize()).toBe(3);
            expect(arrList.toString()).toEqual('[0, 1, 2]');
        });

        it('removeLast() should return an error if all elements are removed and it removes an element from an empty array list', function(){
            arrList.removeLast();
            expect(arrList.getSize()).toBe(2);
            expect(arrList.toString()).toEqual('[0, 1]');
            arrList.removeLast();
            expect(arrList.getSize()).toBe(1);
            expect(arrList.toString()).toEqual('[0]');
            arrList.removeLast();
            expect(arrList.getSize()).toBe(0);
            expect(arrList.toString()).toEqual('[]');
            
            expect(() => arrList.removeLast()).toThrow(Error);
        });
    });
    describe('removeMiddleTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('remove(2) should reduce size to 2 and return [0, 1, 3]', function(){
            expect(arrList.remove(2)).toBe(2);
            expect(arrList.getSize()).toBe(3);
            expect(arrList.toString()).toEqual('[0, 1, 3]');
        });
    });
    describe('isEmptyTest', function(){
        var arrList = new ArrayList();
        it('isEmpty() should return true', function(){
            expect(arrList.isEmpty()).toBe(true)
        });

    });
    describe('isNotEmptyTest', function(){
        var arrList = new ArrayList();
        arrList.add(0,0);
        it('isEmpty() should return false', function(){
            expect(arrList.isEmpty()).toBe(false)
        });

    });
    describe('getTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('Test get for each index of the array list', function(){
            expect(arrList.get(0)).toBe(0);
            expect(arrList.get(1)).toBe(1);
            expect(arrList.get(2)).toBe(2);
            expect(arrList.get(3)).toBe(3);
            
        });

    });
    describe('setTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('Set each element to a new number so toString() reads [40, 30, 20, 10]', function(){
            expect(arrList.set(0, 40)).toBe(0);
            expect(arrList.set(1, 30)).toBe(1);
            expect(arrList.set(2, 20)).toBe(2);
            expect(arrList.set(3, 10)).toBe(3);
            expect(arrList.toString()).toBe('[40, 30, 20, 10]');
        });
        it('Have set() try to change out of bounds index', function(){
            expect(() => arrList.set(-1, 2)).toThrow(RangeError);
            expect(() => arrList.set(5, 2)).toThrow(RangeError);
        });

    });

    describe('toJSONTest', function(){
        var arrList = new ArrayList();
        arrList.add(0, 0);
        arrList.add(1, 1);
        arrList.add(2, 2);
        arrList.add(3, 3);
        it('', function(){
            
        });
        

    });

});
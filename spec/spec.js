// import { sha256 } from '../node_modules/js-sha256';

let hash;
text = 'text';

describe("Unit test hashing", () => {
    it("should convert the numbers into ascii code", () => {
        let length = text.length
        let asciiKeys = [];

        //recursive function
        function ascii(start, length, asciiKeys) {
            if (start < length) {   
                asciiKeys.push(text[start].charCodeAt(0));
            } else {
                return asciiKeys
            }

            return ascii(start + 1, length, asciiKeys)
        }

        ascii(0, length, asciiKeys)

        expect(asciiKeys).toEqual([116, 101, 120, 116])
    })

    it("should transform every digit in a array", () => {
        let asciiKeys = [116, 101, 120, 116]
        let length = asciiKeys.length;

        seperateAsciikeys = []

        function singleCharacterArray(start, length, seperateAsciikeys) {
            if (start < length) {   
                let arr = (""+asciiKeys[start]).split("");
                seperateAsciikeys = [...seperateAsciikeys, ...arr]
            } else {
                return seperateAsciikeys
            }

            return singleCharacterArray(start + 1, length, seperateAsciikeys)
        }

        seperateAsciikeys = singleCharacterArray(0, length, seperateAsciikeys);

        let mappedArray = seperateAsciikeys.map(x => parseInt(x))

        expect(mappedArray).toEqual([1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6])
    })

    it("should split the array every 10th", () => {
        let seperateAsciikeys = [1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6];
        let motherArray = []
        let length = seperateAsciikeys.length;

        function splitEveryTenth(start, length, motherArray) {
            if (start < length) {   
                if (start % 10 === 0) {
                    let newArray = seperateAsciikeys.splice(0, 10)
                    motherArray.push(newArray)
                } 
            } else {
                return seperateAsciikeys
            }
            return splitEveryTenth(start + 1, length, motherArray)
        }

        seperateAsciikeys = splitEveryTenth(0, length, motherArray);

        expect(motherArray).toEqual([[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6]])
    })

    it("should get the last array", () => {
        let motherArray = [[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6]];
        let lastItem = motherArray.splice(-1)

        expect(lastItem).toEqual([[1, 6]])
    })

    it("should add numbers to the array and splice so the length will be 10", () => {
        let arr = [[1, 6]]

        arr[0].push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        
        let newLastItem = arr[0].splice(0, 10);

        expect(newLastItem).toEqual([1, 6, 0, 1, 2, 3, 4, 5, 6, 7])
    })

    it("should push the last item back in de motherarray", () => {
        let lastItem = [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]
        let motherArray = [[1, 1, 6, 1, 0, 1, 1, 2, 0, 1]]
        motherArray2 = motherArray.push(lastItem)

        expect(motherArray).toEqual([[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]])
    })

    it("should get the first index and second index from the motherarray and sum module add new array", () => {
        let motherArray = [[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6, 0, 1, 2, 3, 4, 5, 6, 7], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
        // let firstIndex = motherArray.splice(0, 1)
        // let secondIndex = motherArray.splice(0, 1)
        let newSum = []

        // function loopThroughMotherArray(result) {
            // for(let i = 0; i < motherArray.length; i++) {
            //     let firstIndex;
            //     let result;

            //     if(i == 0) {
            //         firstIndex = motherArray.slice(0, 1);
            //         console.log('eerst')
            //     } else {
            //         firstIndex = [result];
            //         console.log('result', result)
            //         console.log('twee')
            //     }
                
            //     console.log('firstIndex', firstIndex)
            //     let secondIndex = motherArray.splice(0, 1)
            //     result = sumUpArrays(0, firstIndex.length, firstIndex, secondIndex, newSum);
    
            //     // console.log(result); //2
            // }
        // }

        let result = loopThroughMotherArray(0, motherArray.length, motherArray.splice(0, 1))
        let result2 = result[0];

        function loopThroughMotherArray(start, end, result) {
            let next = motherArray.splice(0, 1);
            if(end > 0) {
                sum = sumUpArrays(0, next[0].length, result, next, [[]]);
                loopThroughMotherArray(start + 1, motherArray.length, sum)
            } else {
                return sum;
            }

            return sum;
        }

        function sumUpArrays(start, length, result, next, newSum) {
            if (start < length) { 
                let sum = (result[0][start] + next[0][start])%10
                newSum[0].push(sum);

            //     if (start === firstIndex[0].length) 
            //     {
            //         for (x = start; x < secondIndex[0].length; x++)   {
            //         result.push(secondIndex[0][x]);
            //         }
            //     } 
            //     else
            //     {
            //     for (x = start; x < firstIndex[0].length; x++) 
            //         {
            //         result.push(firstIndex[0][x]);
            //         }
            //     }
            // } else if (start == firstIndex[0].length) {
            //     for (x = start; x < secondIndex[0].length; x++)   {
            //         result.push(secondIndex[0][x]);
            //     }
            // } else {
            //     for (x = start; x < firstIndex[0].length; x++) {
            //         result.push(firstIndex[0][x]);
            //     }

                // return newSum;
            } else {
                return newSum;
            }

            return sumUpArrays(start + 1, length, result, next, newSum)
        }
        // expect(result).toEqual([2, 7, 6, 2, 2, 4, 5, 7, 6, 8])
        // expect(result2).toEqual([3, 8, 7, 3, 3, 5, 6, 8, 7, 9])
        expect(result2).toEqual([4, 9, 8, 4, 4, 6, 7, 9, 8, 0])
    })

    // it("should hash it with sha256", () => {
    //     let result = [2, 7, 6, 2, 2, 4, 5, 7, 6, 8];
    //     result = result.join('')
    //     console.log(result)
    //     let hash = sha256(result);

    //     // console.log(hash)

    //     expect(hash).toEqual(d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079)
    // })
})